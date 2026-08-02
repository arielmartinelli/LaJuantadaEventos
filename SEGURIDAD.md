# Guía de seguridad y puesta en marcha

Este documento explica qué cambió en el bloque de seguridad y **qué tenés que hacer vos**
para que el panel siga funcionando. Los pasos 1 y 2 son obligatorios: sin ellos no vas a
poder entrar al panel.

---

## 1. Crear el usuario administrador en Supabase Auth

Antes había una contraseña escrita en el código (`leo123`) que servía siempre, incluso
después de cambiarla desde el panel. Eso se eliminó. Ahora el login usa **sólo Supabase Auth**.

1. Entrá al panel de Supabase → tu proyecto → **Authentication → Users**.
2. Botón **Add user → Create new user**.
3. Email: `lajuntadaeventos@gmail.com` (o el que prefieras).
4. Contraseña: una nueva, de al menos 8 caracteres. **No uses `leo123`.**
5. Marcá **Auto Confirm User** para que quede activa sin verificación por correo.

A partir de ahora se entra al panel con **el correo** (no con el usuario `leo`) y esa contraseña.

> Si ya existía un usuario con esa contraseña vieja, entrá a **Authentication → Users**, abrí el
> usuario y usá **Reset password** para poner una nueva.

### Cerrar el registro público

En **Authentication → Providers → Email**, desactivá **Enable sign ups**. Si queda abierto,
cualquiera podría registrarse solo. (Igual está cubierto por `ADMIN_EMAILS`, ver punto 2.)

---

## 2. Variables de entorno en Vercel

En **Vercel → tu proyecto → Settings → Environment Variables**, agregá o revisá:

| Variable | Obligatoria | Para qué sirve |
|---|---|---|
| `SUPABASE_URL` | Sí | URL del proyecto Supabase. |
| `SUPABASE_ANON_KEY` | Sí | Clave pública. Se usa para validar los tokens de sesión. |
| `SUPABASE_SERVICE_ROLE_KEY` | Sí | Clave secreta de escritura. **Nunca se envía al navegador.** |
| `ADMIN_EMAILS` | Recomendada | Correos autorizados a administrar, separados por coma. Si queda vacía, **cualquier usuario registrado** puede escribir. |
| `ALLOWED_ORIGINS` | Opcional | Dominios autorizados. Si queda vacía, sólo se acepta el mismo dominio que sirve la API. |

Después de cargarlas hay que **redeployar** para que tomen efecto.

---

## 3. Row Level Security (RLS) en Supabase

Las tablas `lajuntada_config`, `lajuntada_services`, `lajuntada_carousel` y `lajuntada_gallery`
deben tener RLS activado: lectura pública, escritura sólo autenticada. En el **SQL Editor**:

```sql
alter table lajuntada_config    enable row level security;
alter table lajuntada_services  enable row level security;
alter table lajuntada_carousel  enable row level security;
alter table lajuntada_gallery   enable row level security;

-- Lectura pública (el sitio la necesita para mostrar precios y fotos)
create policy "lectura publica" on lajuntada_config   for select using (true);
create policy "lectura publica" on lajuntada_services for select using (true);
create policy "lectura publica" on lajuntada_carousel for select using (true);
create policy "lectura publica" on lajuntada_gallery  for select using (true);

-- Escritura sólo para usuarios autenticados
create policy "escritura admin" on lajuntada_config   for all using (auth.role() = 'authenticated');
create policy "escritura admin" on lajuntada_services for all using (auth.role() = 'authenticated');
create policy "escritura admin" on lajuntada_carousel for all using (auth.role() = 'authenticated');
create policy "escritura admin" on lajuntada_gallery  for all using (auth.role() = 'authenticated');
```

## 4. Borrar la contraseña vieja de la base

Si en la tabla `lajuntada_config` quedaron filas con la contraseña en texto plano, borralas:

```sql
delete from lajuntada_config where key in ('admin_password', 'admin_username');
```

El endpoint ya filtra esas claves, pero conviene que no existan.

---

## Qué se cambió en el código

**`api/config.js`**

- El `GET` ya no devuelve `admin_password` ni `admin_username`. Antes cualquiera podía leer
  la contraseña con un simple `curl tusitio.com/api/config`.
- El `POST` ahora exige un token de Supabase Auth válido y verifica que el correo esté en
  `ADMIN_EMAILS`. Antes el endpoint usaba la `service_role` sin comprobar quién llamaba:
  cualquiera podía reescribir precios o borrar la galería.
- El borrado de registros obsoletos ya no arma el filtro concatenando strings (era inyectable).
  Ahora lee los registros existentes y borra con `.in()`, que escapa los valores.
- Se corrigió el bug que impedía borrar el último servicio, slide o foto de la galería.
- CORS pasó de `*` a una lista de orígenes autorizados para las peticiones con credenciales.

**`api/upload.js`**

- Requiere sesión de admin. Antes cualquiera podía subir archivos a tu Storage.
- Valida tipo de imagen (jpg/png/webp/gif), tamaño máximo (8 MB) y carpeta destino.
- Se quitó el `createBucket` en cada request (no funcionaba: supabase-js no lanza excepción).

**`admin.html`**

- Se eliminó la contraseña `leo123` hardcodeada y el auto-login silencioso.
- Se eliminó el bypass: antes alcanzaba con `sessionStorage.lajuntada_logged_in = 'true'`
  desde la consola del navegador para entrar. Ahora la única prueba de sesión es Supabase Auth.
- Se eliminó el match de usuario que aceptaba cualquier texto con `@`.
- El "Modo Local" quedó restringido a `localhost` (desarrollo). En el sitio publicado no existe.
- El campo de contraseña en la pestaña de configuración se reemplazó por un cambio de
  contraseña real vía `auth.updateUser()`. Ya no se guarda ninguna credencial en la tabla
  de configuración ni en `localStorage`.
- Los `fetch` a `/api/config` y `/api/upload` mandan el token, refrescándolo si venció.

**`script.js`**

- Se quitaron `admin_username` y `admin_password` de `DEFAULT_CONFIGS`. Estaban visibles para
  cualquiera que abriera el archivo en el navegador.

---

## Pendiente (no incluido en este bloque)

- Conectar el formulario de contacto de `index.html` (hoy no hace nada al enviar).
- Comprimir las imágenes de `assets/` (5,5 MB en total, ~1 MB cada PNG).
- Agregar meta tags Open Graph para que el link se vea bien al compartirlo por WhatsApp.
