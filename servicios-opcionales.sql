insert into lajuntada_services (key, name, description, price, is_per_person, is_available, category, tag)
values
  ('srv_sound', 'DJ + Sonido + Iluminacion', 'Cabina de DJ profesional, sistema de sonido e iluminacion de pista para toda la duracion del evento.', 90000, false, true, 'adicional', 'Equipamiento'),
  ('srv_graves', 'Refuerzo de Graves', 'Subwoofers adicionales para reforzar los graves. Recomendado para eventos de mas de 100 personas.', 0, false, true, 'adicional', 'Equipamiento'),
  ('srv_ilum_deco', 'Iluminacion Decorativa', 'Iluminacion ambiental y decorativa para realzar el salon: guirnaldas, apliques y luces calidas.', 0, false, true, 'adicional', 'Ambientacion'),
  ('srv_screen', 'Proyector y Pantalla 120''''', 'Proyector de alta luminosidad con pantalla de 120 pulgadas para videos y presentaciones.', 35000, false, true, 'adicional', 'Equipamiento'),
  ('srv_led', 'Pantallas LED (hasta 3 x 6 metros)', 'Pantallas LED de alta definicion, configurables hasta 3 x 6 metros segun el espacio.', 0, false, true, 'adicional', 'Equipamiento'),
  ('srv_escenario', 'Escenario', 'Estructura de escenario modular para shows en vivo, discursos o presentaciones.', 0, false, true, 'adicional', 'Estructura'),
  ('srv_photo', 'Fotografia', 'Cobertura fotografica profesional del evento con entrega digital de las imagenes.', 80000, false, true, 'adicional', 'Servicio'),
  ('srv_gazebo', 'Gazebos', 'Gazebos estructurales cerrados con guirnaldas de luces led decorativas.', 45000, false, true, 'adicional', 'Estructura'),
  ('srv_tableware', 'Vajilla y Manteleria', 'Vajilla de loza, cubiertos, cristaleria y manteleria a tono con la ambientacion.', 2500, true, true, 'adicional', 'Opcional')
on conflict (key) do update set
  name          = excluded.name,
  description   = excluded.description,
  price         = excluded.price,
  is_per_person = excluded.is_per_person,
  is_available  = excluded.is_available,
  category      = excluded.category,
  tag           = excluded.tag;