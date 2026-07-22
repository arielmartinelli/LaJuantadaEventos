// script.js
document.addEventListener('DOMContentLoaded', () => {

  // CONFIGURACIONES POR DEFECTO (SEMILLA LOCAL)
  const DEFAULT_CONFIGS = {
    menu_diente_libre_price: '25000',
    menu_pollo_noisette_price: '28000',
    menu_parrillada_price: '35000',
    srv_drinks_price: '4500',
    srv_bar_price: '6500',
    srv_tableware_price: '2500',
    srv_sound_price: '90000',
    srv_gazebo_price: '45000',
    srv_screen_price: '35000',
    srv_photo_price: '80000',
    srv_living_price: '18000',
    srv_bar_available: 'true',
    srv_tableware_available: 'true',
    srv_sound_available: 'true',
    srv_gazebo_available: 'true',
    srv_screen_available: 'true',
    srv_photo_available: 'true',
    srv_living_available: 'true',
    contact_phone1: '3516069743',
    contact_phone2: '3512160141',
    contact_address: 'Mendoza 3147, Alta Córdoba, Córdoba',
    contact_email: 'lajuntadaeventos@gmail.com'
  };

  const DEFAULT_SERVICES = [
    // Recepción
    { key: 'rec_bocaditos', name: 'Bocaditos Surtidos', description: 'Tartaletas de hojaldre rellenas de queso crema saborizado: Queso Azul, Choclo, Jamón Cocido y Atún.', price: 1800, is_per_person: true, is_available: true, category: 'recepcion', tag: 'Copetín' },
    { key: 'rec_miga', name: 'Sándwich de Miga Copetín', description: 'Clásicos sándwiches triangulares en sus variedades: Jamón/Queso, Jamón/Verdura o Queso/Verdura.', price: 2200, is_per_person: true, is_available: true, category: 'recepcion', tag: 'Copetín' },
    { key: 'rec_empanadas', name: 'Empanadas Copetín', description: 'Empanaditas crujientes al horno. Sabores: Criollas Saladas, Árabes, Pollo o Verdura.', price: 2000, is_per_person: true, is_available: true, category: 'recepcion', tag: 'Horno' },
    { key: 'rec_pinchos', name: 'Pinchos Calientes', description: 'Bocados a la plancha/parrilla: Chinchulines a la provenzal, Riñoncitos a la crema y Mollejitas al limón.', price: 2800, is_per_person: true, is_available: true, category: 'recepcion', tag: 'Parrilla' },
    { key: 'rec_pizzetas', name: 'Mini Pizzetas', description: 'Base crocante con salsas caseras: Mozzarella, Napolitana, Jamón y Morrones, o Fugazzeta.', price: 1500, is_per_person: true, is_available: true, category: 'recepcion', tag: 'Horno' },

    // Entradas
    { key: 'ent_fiambres', name: 'Tablas de Fiambres y Quesos', description: 'Regionales: Salame de la Colonia, Bondiola, Jamón Cocido, Mozzarella, Pategras y Dambo.', price: 3800, is_per_person: true, is_available: true, category: 'entradas', tag: 'Regional' },
    { key: 'ent_tostadas', name: 'Tostadas de Pan Casero o Árabes Relleno', description: 'Opción jamón crudo con rúcula y oliva, o jamón cocido con huevo y tomate.', price: 3200, is_per_person: true, is_available: true, category: 'entradas', tag: 'Especial' },
    { key: 'ent_tartas', name: 'Mini Tartas de Pollo y Ajíes', description: 'Hojaldre salteado con pollo desmenuzado, pimientos rojos y verdes, tomate y verdeo.', price: 3000, is_per_person: true, is_available: true, category: 'entradas', tag: 'Caliente' },

    // Platos Principales
    { key: 'pri_pata', name: 'Pata Flambeada', description: 'Ternera y Cerdo caliente trinchada en vivo con panes saborizados y 10 salsas caseras.', price: 25000, is_per_person: true, is_available: true, category: 'principales', tag: 'Diente Libre' },
    { key: 'pri_cazuelas', name: 'Variedad de Cazuelas', description: 'Pollo con puerros/champiñones, Ternera al verdeo, Locro, Humita, Pollo al disco o Bondiola.', price: 25000, is_per_person: true, is_available: true, category: 'principales', tag: 'Diente Libre' },
    { key: 'pri_burgers', name: 'Hamburguesas y Choripán', description: 'Medallón de ternera y chorizo a las brasas en pan de papa con cheddar y salsas.', price: 25000, is_per_person: true, is_available: true, category: 'principales', tag: 'Diente Libre' },
    { key: 'pri_pizza', name: 'Pizza a la Parrilla', description: 'Show de pizzas a las brasas con 10 variedades diferentes (Fugazza, 4 Quesos, etc.).', price: 25000, is_per_person: true, is_available: true, category: 'principales', tag: 'Diente Libre' },
    { key: 'pri_fajitas', name: 'Fajitas y Sándwich Criollos', description: 'Tiras de ternera, cerdo, pollo y vegetales con tortillas calientes y panes.', price: 25000, is_per_person: true, is_available: true, category: 'principales', tag: 'Diente Libre' },
    { key: 'pri_desmechado', name: 'Sándwich de Campo Desmechado', description: 'Cortes ultra tiernos desmechados de Bondiola de cerdo y Vacío de ternera.', price: 25000, is_per_person: true, is_available: true, category: 'principales', tag: 'Diente Libre' },
    { key: 'pri_parrillada', name: 'Parrillada Completa a las Brasas', description: 'Asado libre: Costilla, vacío, matambre, chorizo, morcilla y ensaladas.', price: 35000, is_per_person: true, is_available: true, category: 'principales', tag: 'Premium' },
    { key: 'pri_pollo', name: 'Pollo Deshuesado Noisette', description: 'Roulete de pollo deshuesado relleno con papas noisette doradas.', price: 28000, is_per_person: true, is_available: true, category: 'principales', tag: 'Plato Servido' },
    { key: 'pri_dietas', name: 'Menú Dietas Especiales', description: 'Viandas calientes adaptadas para invitados vegetarianos, veganos y celíacos.', price: 25000, is_per_person: true, is_available: true, category: 'principales', tag: 'Especial' },

    // Postres
    { key: 'pos_individuales', name: 'Postres Clásicos individuales', description: 'Budín de pan o Flan casero con dulce de leche; Macedonia con helado; o Brownie.', price: 2200, is_per_person: true, is_available: true, category: 'postres', tag: 'Clásico' },
    { key: 'pos_autor', name: 'Copas y Postres de Autor', description: 'Formatos individuales: Chocotorta clásica, Tiramisú italiano o Cheesecake.', price: 2800, is_per_person: true, is_available: true, category: 'postres', tag: 'De Autor' },
    { key: 'pos_torta', name: 'Torta de Evento o Simbólica', description: 'Torta de bodas/cumpleaños calculada a 100gr por invitado o torta simbólica.', price: 3000, is_per_person: true, is_available: true, category: 'postres', tag: 'Torta' },

    // Mesa Dulce
    { key: 'pos_tartas', name: 'Tartas Dulces Artesanales (12 Porciones)', description: 'Lemon Pie, Frutilla, Durazno, Multi-frutal, Mousse, Coco o Ricota.', price: 2500, is_per_person: true, is_available: true, category: 'mesadulce', tag: 'Artesanal' },
    { key: 'pos_panaderia', name: 'Especialidades de Panadería por Kg', description: 'Mini alfajores de chocolate/maicena, cañoncitos, conitos y palmeritas.', price: 1800, is_per_person: true, is_available: true, category: 'mesadulce', tag: 'Panadería' },
    { key: 'pos_candy', name: 'Candy Bar & Cafetería Caliente', description: 'Candy bar surtido (Rocklets, Titas, etc.) con servicio final de Cafetería caliente.', price: 2000, is_per_person: true, is_available: true, category: 'mesadulce', tag: 'Candy Bar' },
    { key: 'pos_cascada', name: 'Cascada de Chocolate & Frutas', description: 'Cascada de chocolate cobertura tibio con brochettes de frutas frescas de estación.', price: 3200, is_per_person: true, is_available: true, category: 'mesadulce', tag: 'Show Dulce' },
    { key: 'pos_shots', name: 'Shots Dulces de Autor', description: 'Copitas individuales de Chocotorta, Tiramisú, Cheesecake, Oreo y Lemon Pie.', price: 2800, is_per_person: true, is_available: true, category: 'mesadulce', tag: 'De Autor' },
    { key: 'pos_churros', name: 'Mini Churros & Donuts Glaseadas', description: 'Churros calentitos fritos en el momento con abundante dulce de leche y donuts.', price: 2200, is_per_person: true, is_available: true, category: 'mesadulce', tag: 'Cálido' },

    // Fin del Evento (Trasnoche)
    { key: 'fin_pizzas', name: 'Pizza Party Trasnoche', description: 'Show de mini pizzetas variadas a las brasas de madrugada para recargar energías.', price: 2500, is_per_person: true, is_available: true, category: 'findeevento', tag: 'Trasnoche' },
    { key: 'fin_pernil', name: 'Pata de Cerdo Trasnoche', description: 'Pata de cerdo caliente desmechada en vivo con figacitas de manteca y salsas.', price: 3200, is_per_person: true, is_available: true, category: 'findeevento', tag: 'Trasnoche' },
    { key: 'fin_tostados', name: 'Tostados & Medialunas Calientes', description: 'Sándwiches de miga tostados de jamón y queso, medialunas calientes y servicio de café.', price: 2200, is_per_person: true, is_available: true, category: 'findeevento', tag: 'Trasnoche' },
    { key: 'fin_panchos', name: 'Panchos Gourmet & Papas Pay', description: 'Salchichas gigantes en pan suave de viena con aderezos y lluvias de papas pay.', price: 2000, is_per_person: true, is_available: true, category: 'findeevento', tag: 'Trasnoche' },
    { key: 'fin_caldos', name: 'Caldos Criollos & Mini Empanadas', description: 'Consomé caliente reparador y mini empanadas criollas jugosas de ternera.', price: 2400, is_per_person: true, is_available: true, category: 'findeevento', tag: 'Trasnoche' },
    { key: 'fin_lomitos', name: 'Mini Lomitos & Hamburguesitas', description: 'Sándwiches mini de lomo tierno con queso y hamburguesitas caseras de madrugada.', price: 3500, is_per_person: true, is_available: true, category: 'findeevento', tag: 'Trasnoche' },

    // Bebidas
    { key: 'beb_sin_alcohol', name: 'Bebidas Sin Alcohol (Libre)', description: 'Línea Pepsi, agua saborizada y agua mineral con y sin gas.', price: 2500, is_per_person: true, is_available: true, category: 'bebidas', tag: 'Sin Alcohol' },
    { key: 'beb_cervezas', name: 'Cervezas (Libre)', description: 'Canilla libre de cervezas Quilmes o Brahma frías durante el servicio.', price: 3500, is_per_person: true, is_available: true, category: 'bebidas', tag: 'Con Alcohol' },
    { key: 'beb_vinos', name: 'Vinos & Espumante', description: 'Vinos Otro Loco Más y Copa de brindis con Espumante DU Renaissance.', price: 3800, is_per_person: true, is_available: true, category: 'bebidas', tag: 'Vinos' },

    // Opcionales
    { key: 'srv_tableware', name: 'Alquiler de Vajilla y Manteleria', description: 'Vajilla de loza, cubiertos, cristalería y mantelería a tono.', price: 2500, is_per_person: true, is_available: true, category: 'adicional', tag: 'Opcional' },
    { key: 'srv_living', name: 'Alquiler de Juego de Living (10 pers.)', description: 'Juegos de living de ecocuero blanco con mesa ratona (precio por juego).', price: 18000, is_per_person: false, is_available: true, category: 'adicional', tag: 'Living' },
    { key: 'srv_sound', name: 'DJ, Sonido Basico y Luces', description: 'Cabina de DJ, parlantes activos, luces roboticas e iluminacion de pista.', price: 90000, is_per_person: false, is_available: true, category: 'adicional', tag: 'Equipamiento' },
    { key: 'srv_gazebo', name: 'Gazebo Estructural (6x3m)', description: 'Gazebo estructural cerrado con guirnaldas de luces led decorativas.', price: 45000, is_per_person: false, is_available: true, category: 'adicional', tag: 'Equipamiento' },
    { key: 'srv_screen', name: 'Pantalla 120" y Proyector HD', description: 'Pantalla gigante y proyector de alta luminosidad para videos.', price: 35000, is_per_person: false, is_available: true, category: 'adicional', tag: 'Equipamiento' },
    { key: 'srv_photo', name: 'Fotografia Digital Profesional', description: 'Cobertura completa del evento con entrega digital de fotografias.', price: 80000, is_per_person: false, is_available: true, category: 'adicional', tag: 'Servicio' }
  ];

  const DEFAULT_CAROUSEL = [
    { title: 'Bodas de Ensueño', description: 'Servicio integral de catering, barras móviles y vajilla para casamientos inolvidables.', image_url: 'assets/wedding_event.png' },
    { title: 'Cumpleaños & Fiestas', description: 'Pata flambeada, cazuelas criollas y barras de tragos para que tu fiesta sea única.', image_url: 'assets/birthday_event.png' },
    { title: 'Eventos Corporativos', description: 'Coordinación y producción gastronómica premium para lanzamientos y empresariales.', image_url: 'assets/social_event.png' }
  ];

  const DEFAULT_GALLERY = [
    { title: 'Boda al Aire Libre', category: 'casamiento', image_url: 'assets/wedding_event.png' },
    { title: 'Fiesta de 40 Años', category: 'cumpleaños', image_url: 'assets/birthday_event.png' },
    { title: 'Lanzamiento Corporativo', category: 'corporativo', image_url: 'assets/social_event.png' },
    { title: 'Buffet de Bodas', category: 'casamiento', image_url: 'assets/hero_bg.png' },
    { title: 'Mesa de Postres Temática', category: 'cumpleaños', image_url: 'assets/birthday_sweet.png' },
    { title: 'Gourmet Finger Food', category: 'corporativo', image_url: 'assets/catering_premium.png' }
  ];

  let activeConfigs = { ...DEFAULT_CONFIGS };
  let activeServices = [...DEFAULT_SERVICES];
  let selectedMenuItems = new Set();

  /* ==========================================================================
     1. Menú de Navegación y Scroll
     ========================================================================== */
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const mainHeader = document.querySelector('.main-header');
  const navLinks = document.querySelectorAll('.nav-link, .nav-link-btn, .admin-nav-link');

  // Menú hamburguesa móvil
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !expanded);
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }

  // Header opaco al hacer scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }
  });

  // Enlaces activos según sección (ScrollSpy)
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-list a[href*=${sectionId}]`);
      
      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  });

  // Scroll suave para botones CTA
  const btnCtaCalc = document.getElementById('hero-cta-calc');
  const btnCtaServ = document.getElementById('hero-cta-serv');
  const btnCtaRent = document.getElementById('rental-cta-calc');

  const smoothScrollTo = (targetId) => {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  };

  if (btnCtaCalc) btnCtaCalc.addEventListener('click', (e) => { e.preventDefault(); smoothScrollTo('#calculadora'); });
  if (btnCtaServ) btnCtaServ.addEventListener('click', (e) => { e.preventDefault(); smoothScrollTo('#menu-carta'); });
  if (btnCtaRent) btnCtaRent.addEventListener('click', (e) => { e.preventDefault(); smoothScrollTo('#calculadora'); });

  /* Formateador de moneda */
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(value);
  };

  /* ==========================================================================
     2. Carga en Tiempo Real (Supabase API / Local Fallback)
     ========================================================================== */
  async function loadDataAndRender() {
    try {
      const response = await fetch('/api/config');
      if (!response.ok) {
        console.warn("API /api/config no disponible. Cargando fallback local.");
        loadLocalFallback();
        return;
      }
      
      const data = await response.json();
      if (data.configs) {
        activeConfigs = { ...DEFAULT_CONFIGS, ...data.configs };
      }
      if (data.services && data.services.length > 0) {
        activeServices = data.services;
      }

      // Fusionar nuevos ítems predeterminados automáticamente
      DEFAULT_SERVICES.forEach(defItem => {
        if (!activeServices.some(s => s.key === defItem.key)) {
          activeServices.push(defItem);
        }
      });

      // Garantizar precios actualizados en platos principales
      activeServices.forEach(s => {
        if (s.category === 'principales' && (!s.price || s.price <= 0)) {
          if (s.key === 'pri_parrillada') s.price = 35000;
          else if (s.key === 'pri_pollo') s.price = 28000;
          else s.price = 25000;
        }
      });
      
      renderServicesDOM();
      renderOptionalRentalsDOM();
      renderMenuDOM();
      renderCarouselDOM(data.carousel || DEFAULT_CAROUSEL);
      renderGalleryDOM(data.gallery || DEFAULT_GALLERY);
      
      console.log("Configuraciones dinámicas y recursos cargados con éxito.");
    } catch (err) {
      console.warn("Fallo de red al conectar con /api/config. Cargando fallback local:", err);
      loadLocalFallback();
    }

    applyDOMConfigurations();
    calculateBudget();
  }

  function loadLocalFallback() {
    const localConfigs = localStorage.getItem('lajuntada_configs');
    if (localConfigs) {
      try {
        activeConfigs = { ...DEFAULT_CONFIGS, ...JSON.parse(localConfigs) };
      } catch (e) {
        activeConfigs = { ...DEFAULT_CONFIGS };
      }
    } else {
      activeConfigs = { ...DEFAULT_CONFIGS };
    }

    // Cargar servicios locales de localStorage
    const localServices = localStorage.getItem('lajuntada_services_list');
    if (localServices) {
      try {
        activeServices = JSON.parse(localServices);
      } catch (e) {
        activeServices = [...DEFAULT_SERVICES];
      }
    } else {
      activeServices = [...DEFAULT_SERVICES];
    }

    // Fusionar nuevos ítems predeterminados automáticamente
    DEFAULT_SERVICES.forEach(defItem => {
      if (!activeServices.some(s => s.key === defItem.key)) {
        activeServices.push(defItem);
      }
    });

    // Garantizar precios actualizados en platos principales
    activeServices.forEach(s => {
      if (s.category === 'principales' && (!s.price || s.price <= 0)) {
        if (s.key === 'pri_parrillada') s.price = 35000;
        else if (s.key === 'pri_pollo') s.price = 28000;
        else s.price = 25000;
      }
    });

    renderServicesDOM();
    renderOptionalRentalsDOM();
    renderMenuDOM();
    renderCarouselDOM(DEFAULT_CAROUSEL);
    renderGalleryDOM(DEFAULT_GALLERY);
  }

  // Renderizar checkboxes de adicionales en el cotizador
  function renderServicesDOM() {
    const addonsContainer = document.getElementById('calc-addons-container');
    if (!addonsContainer) return;
    
    addonsContainer.innerHTML = '';
    activeServices.filter(srv => srv.category === 'adicional' || !srv.category).forEach(srv => {
      if (srv.key === 'srv_living' || srv.key === 'srv_drinks' || srv.key === 'srv_bar') {
        if (srv.key === 'srv_living') updateLivingSelector(srv);
        return;
      }

      const disabledAttr = srv.is_available ? '' : 'disabled';
      const disabledClass = srv.is_available ? '' : 'disabled';
      const badgeHtml = srv.is_available ? '' : ' <span class="unavailable-badge">No Disponible</span>';
      const labelText = srv.name;

      addonsContainer.innerHTML += `
        <label class="custom-checkbox-container ${disabledClass}">
          <input type="checkbox" id="${srv.key}" data-cost="${srv.price}" data-name="${srv.name}" data-per-person="${srv.is_per_person}" ${disabledAttr}>
          <span class="checkmark"></span>
          <span class="chk-label">${labelText}${badgeHtml}</span>
        </label>
      `;
    });

    const checkboxes = addonsContainer.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(chk => {
      chk.addEventListener('change', calculateBudget);
    });
  }

  // Set para almacenar alquileres opcionales seleccionados (sin costo fijo)
  let selectedOptionalRentals = new Set();

  // Renderizar tarjetas de opciones de alquiler opcionales
  function renderOptionalRentalsDOM() {
    const grid = document.getElementById('optional-rentals-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    const items = activeServices.filter(srv => srv.category === 'adicional' || !srv.category);
    items.forEach(srv => {
      const isAvailable = srv.is_available;
      const disabledClass = isAvailable ? '' : 'disabled';
      const tagHtml = srv.tag ? `<span class="menu-tag orange">${srv.tag}</span>` : `<span class="menu-tag orange">Opcional</span>`;
      
      const isSelected = selectedOptionalRentals.has(srv.key);
      const activeClass = isSelected ? 'active' : '';
      const buttonText = isSelected ? 'Quitar de Cotización' : 'Sumar a Cotización';
      const buttonClass = isSelected ? 'btn-secondary' : 'btn-primary';
      const whatsappText = encodeURIComponent(`Hola! Quisiera consultar la cotización para el alquiler de: ${srv.name}`);
      const whatsappUrl = `https://wa.me/5493516069743?text=${whatsappText}`;

      grid.innerHTML += `
        <div class="menu-item-card ${activeClass} ${disabledClass}" id="rental-card-${srv.key}" style="transition: all 0.3s ease; position: relative; height: 100%; display: flex; flex-direction: column;">
          ${tagHtml}
          <h4 style="margin-top: 10px;">${srv.name}</h4>
          <p style="flex-grow: 1;">${srv.description || 'Infraestructura y equipamiento adicional opcional para tu evento.'}</p>
          ${isAvailable ? `
            <div style="margin-top: auto; display: flex; flex-direction: column; gap: 10px; border-top: 1px solid var(--border-light); padding-top: 15px;">
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <button type="button" class="${buttonClass} btn-rental-toggle-quote" data-key="${srv.key}" style="flex: 1; padding: 8px 12px; font-size: 0.75rem; border-radius: 50px; cursor: pointer; border: none; font-weight: 700;">
                  ${buttonText}
                </button>
                <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="padding: 8px 12px; font-size: 0.75rem; border-radius: 50px; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 4px; background-color: #25D366; border: none; font-weight: 700; color: white;">
                  <i class="fa-brands fa-whatsapp"></i> Consultar
                </a>
              </div>
            </div>
          ` : `<span class="unavailable-badge" style="font-size: 0.75rem; margin-top: auto; display: inline-block; padding-top: 10px;">No Disponible</span>`}
        </div>
      `;
    });

    // Registrar clics de botón "Sumar a Cotización" / "Quitar"
    grid.querySelectorAll('.btn-rental-toggle-quote').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-key');
        toggleOptionalRentalInQuote(key);
      });
    });

    // Registrar spotlight de cursor
    grid.querySelectorAll('.menu-item-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  function toggleOptionalRentalInQuote(key) {
    if (selectedOptionalRentals.has(key)) {
      selectedOptionalRentals.delete(key);
    } else {
      selectedOptionalRentals.add(key);
    }
    renderOptionalRentalsDOM();
    calculateBudget();
  }

  // Renderizar Platos y Opciones de Menú
  function renderMenuDOM() {
    const categories = ['recepcion', 'entradas', 'principales', 'postres', 'mesadulce', 'bebidas', 'findeevento'];
    
    categories.forEach(cat => {
      const grid = document.getElementById(`grid-${cat}`);
      if (!grid) return;
      grid.innerHTML = '';
      
      const items = activeServices.filter(s => s.category === cat);
      items.forEach(srv => {
        const isAvailable = srv.is_available;
        const disabledClass = isAvailable ? '' : 'disabled';
        const tagHtml = srv.tag ? `<span class="menu-tag orange">${srv.tag}</span>` : '';
        let priceVal = srv.price;
        if (srv.category === 'principales' && (!priceVal || priceVal <= 0)) {
          if (srv.key === 'pri_parrillada') priceVal = 35000;
          else if (srv.key === 'pri_pollo') priceVal = 28000;
          else priceVal = 25000;
        }

        let priceInfo = '';
        if (priceVal > 0) {
          priceInfo = srv.category === 'principales' ? `${formatCurrency(priceVal)} x pers.` : `+${formatCurrency(priceVal)} x pers.`;
        } else {
          priceInfo = 'Incluido en Menú Base';
        }
        
        // Determinar si está seleccionado
        const isSelected = selectedMenuItems.has(srv.key);
        const activeClass = isSelected ? 'active' : '';
        const buttonText = isSelected ? 'Quitar de Cotización' : 'Sumar a Cotización';
        const buttonClass = isSelected ? 'btn-secondary' : 'btn-primary';
        
        grid.innerHTML += `
          <div class="menu-item-card ${activeClass} ${disabledClass}" id="menu-card-${srv.key}" style="transition: all 0.3s ease; position: relative; height: 100%; display: flex; flex-direction: column;">
            ${tagHtml}
            <h4 style="margin-top: 10px;">${srv.name}</h4>
            <p style="flex-grow: 1;">${srv.description}</p>
            ${isAvailable ? `
              <div style="margin-top: auto; display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; border-top: 1px solid var(--border-light); padding-top: 15px;">
                <span style="font-size: 0.85rem; font-weight: 700; color: var(--primary-orange);">${priceInfo}</span>
                <button type="button" class="${buttonClass} btn-menu-toggle-quote" data-key="${srv.key}" style="padding: 6px 12px; font-size: 0.75rem; border-radius: 50px; cursor: pointer; border: none; font-weight: 700;">
                  ${buttonText}
                </button>
              </div>
            ` : `<span class="unavailable-badge" style="font-size: 0.75rem; margin-top: auto; display: inline-block; padding-top: 10px;">No Disponible</span>`}
          </div>
        `;
      });
    });

    // Re-registrar escuchadores de clics
    document.querySelectorAll('.btn-menu-toggle-quote').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-key');
        toggleMenuItemInQuote(key);
      });
    });

    // Re-registrar spotlight en las nuevas tarjetas de menú
    const spotlightMenuCards = document.querySelectorAll('.menu-item-card');
    spotlightMenuCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  function toggleMenuItemInQuote(key) {
    if (selectedMenuItems.has(key)) {
      selectedMenuItems.delete(key);
    } else {
      selectedMenuItems.add(key);
    }
    renderMenuDOM();
    calculateBudget();
  }

  // Actualizar selector de livings
  function updateLivingSelector(livingService) {
    const srvLivingQtySelect = document.getElementById('srv-living-qty');
    if (srvLivingQtySelect && livingService) {
      const price = parseFloat(livingService.price);
      srvLivingQtySelect.setAttribute('data-cost', price);
      
      if (!livingService.is_available) {
        srvLivingQtySelect.disabled = true;
        srvLivingQtySelect.innerHTML = `<option value="0" selected>Ninguno (No Disponible)</option>`;
      } else {
        srvLivingQtySelect.disabled = false;
        srvLivingQtySelect.innerHTML = `
          <option value="0" selected>Ninguno (${formatCurrency(price)} c/u)</option>
          <option value="1">1 Juego de Living (+${formatCurrency(price)})</option>
          <option value="2">2 Juegos de Living (+${formatCurrency(price * 2)})</option>
          <option value="3">3 Juegos de Living (+${formatCurrency(price * 3)})</option>
          <option value="4">4 Juegos de Living (+${formatCurrency(price * 4)})</option>
          <option value="5">5 Juegos de Living (+${formatCurrency(price * 5)})</option>
          <option value="6">6 Juegos de Living (+${formatCurrency(price * 6)})</option>
        `;
      }
    }
  }

  // Renderizar Carrusel dinámicamente
  function renderCarouselDOM(slidesList) {
    const sliderContainer = document.getElementById('slider');
    if (sliderContainer) {
      sliderContainer.innerHTML = '';
      slidesList.forEach(slide => {
        sliderContainer.innerHTML += `
          <div class="slide">
            <img src="${slide.image_url}" alt="${slide.title || 'Foto de comida'}">
            <div class="slide-caption">
              <h3>${slide.title || ''}</h3>
              <p>${slide.description || ''}</p>
            </div>
          </div>
        `;
      });

      initializeSlider();
    }
  }

  // Renderizar Galería dinámicamente
  function renderGalleryDOM(galleryList) {
    const galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid) {
      galleryGrid.innerHTML = '';
      galleryList.forEach(item => {
        const readableCategory = item.category === 'casamiento' ? 'Casamientos' :
                                 item.category === 'cumpleaños' ? 'Cumpleaños' : 'Corporativos';

        galleryGrid.innerHTML += `
          <div class="gallery-item" data-category="${item.category}">
            <div class="gallery-item-inner">
              <img src="${item.image_url}" alt="${item.title}" class="gallery-img">
              <div class="gallery-hover-overlay">
                <span class="gallery-zoom-icon"><i class="fa-solid fa-magnifying-glass-plus"></i></span>
                <h4>${item.title}</h4>
                <p>${readableCategory}</p>
              </div>
            </div>
          </div>
        `;
      });

      initializeGallery();
    }
  }

  // Aplicar configuraciones de contacto al DOM
  function applyDOMConfigurations() {
    // Menú base precios
    const optDienteLibre = document.querySelector('option[value="diente-libre"]');
    if (optDienteLibre) {
      optDienteLibre.setAttribute('data-base', activeConfigs.menu_diente_libre_price);
      optDienteLibre.textContent = `Menú Diente Libre (Pata, Cazuela, Burgers, Pizza, Sándwich Campo) (${formatCurrency(activeConfigs.menu_diente_libre_price)} x pers.)`;
    }

    const optPollo = document.querySelector('option[value="pollo-noisette"]');
    if (optPollo) {
      optPollo.setAttribute('data-base', activeConfigs.menu_pollo_noisette_price);
      optPollo.textContent = `Menú Pollo Deshuesado con Papas Noisette (${formatCurrency(activeConfigs.menu_pollo_noisette_price)} x pers.)`;
    }

    const optParrillada = document.querySelector('option[value="parrillada"]');
    if (optParrillada) {
      optParrillada.setAttribute('data-base', activeConfigs.menu_parrillada_price);
      optParrillada.textContent = `Menú Parrillada Completa a las Brasas (${formatCurrency(activeConfigs.menu_parrillada_price)} x pers.)`;
    }

    // Datos de contacto en vivo (footer/header/contacto)
    const phoneLink1 = document.getElementById('contact-phone-link1');
    const phoneText1 = document.getElementById('contact-phone-text1');
    if (phoneLink1 && phoneText1) {
      phoneText1.textContent = activeConfigs.contact_phone1;
      phoneLink1.href = `https://wa.me/549${activeConfigs.contact_phone1.replace(/\s+/g, '')}`;
    }

    const phoneLink2 = document.getElementById('contact-phone-link2');
    const phoneText2 = document.getElementById('contact-phone-text2');
    if (phoneLink2 && phoneText2) {
      phoneText2.textContent = activeConfigs.contact_phone2;
      phoneLink2.href = `tel:${activeConfigs.contact_phone2.replace(/\s+/g, '')}`;
    }

    const emailLink = document.getElementById('contact-email-link');
    if (emailLink) {
      emailLink.textContent = activeConfigs.contact_email;
      emailLink.href = `mailto:${activeConfigs.contact_email}`;
    }

    const addressText = document.getElementById('contact-address-text');
    if (addressText) {
      addressText.textContent = activeConfigs.contact_address;
    }
  }


  /* ==========================================================================
     3. Carrusel / Slider de Fotos (Nuestra Cocina)
     ========================================================================== */
  let currentSlide = 0;
  let slideInterval;
  let slides = [];
  let dots = [];

  function initializeSlider() {
    const slider = document.getElementById('slider');
    const btnPrev = document.getElementById('slider-prev');
    const btnNext = document.getElementById('slider-next');
    const indicatorsContainer = document.getElementById('slider-indicators');
    
    slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;

    currentSlide = 0;
    
    // Limpiar y crear indicadores
    if (indicatorsContainer) {
      indicatorsContainer.innerHTML = '';
      slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.classList.add('indicator-dot');
        if (idx === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Ir a foto ${idx + 1}`);
        dot.addEventListener('click', () => goToSlide(idx));
        indicatorsContainer.appendChild(dot);
      });
    }

    dots = document.querySelectorAll('.indicator-dot');

    function updateSlider() {
      if (!slider) return;
      slider.style.transform = `translateX(-${currentSlide * 100}%)`;
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlide);
      });
    }

    window.nextSlide = function() {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlider();
    };

    window.prevSlide = function() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlider();
    };

    window.goToSlide = function(idx) {
      currentSlide = idx;
      updateSlider();
      resetInterval();
    };

    function startAutoPlay() {
      clearInterval(slideInterval);
      if (slides.length > 0 && slider) {
        slideInterval = setInterval(window.nextSlide, 5000);
      }
    }

    function resetInterval() {
      clearInterval(slideInterval);
      startAutoPlay();
    }

    // Registrar eventos para flechas
    if (btnNext && btnPrev) {
      // Remover listeners viejos clonando los nodos
      const newNext = btnNext.cloneNode(true);
      const newPrev = btnPrev.cloneNode(true);
      btnNext.parentNode.replaceChild(newNext, btnNext);
      btnPrev.parentNode.replaceChild(newPrev, btnPrev);

      newNext.addEventListener('click', () => {
        window.nextSlide();
        resetInterval();
      });
      newPrev.addEventListener('click', () => {
        window.prevSlide();
        resetInterval();
      });
    }

    // Soporte para swipe táctil
    let startX = 0;
    let endX = 0;
    
    if (slider) {
      slider.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
      }, { passive: true });

      slider.addEventListener('touchend', e => {
        endX = e.changedTouches[0].clientX;
        const threshold = 50;
        if (startX - endX > threshold) {
          window.nextSlide();
          resetInterval();
        } else if (endX - startX > threshold) {
          window.prevSlide();
          resetInterval();
        }
      }, { passive: true });
    }

    startAutoPlay();
  }


  /* ==========================================================================
     4. Galería de Fotos con Filtros y Lightbox Modal
     ========================================================================== */
  let filteredImages = [];
  let currentLightboxIdx = 0;

  function initializeGallery() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    let activeFilter = 'all';
    filteredImages = [...galleryItems];

    // Filtrado de Galería
    tabBtns.forEach(btn => {
      // Evitar acumulación de eventos
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);

      newBtn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        newBtn.classList.add('active');
        
        activeFilter = newBtn.getAttribute('data-filter');
        filteredImages = [];
        
        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (activeFilter === 'all' || category === activeFilter) {
            item.classList.remove('hide');
            item.classList.add('show');
            filteredImages.push(item);
          } else {
            item.classList.remove('show');
            item.classList.add('hide');
          }
        });
      });
    });

    // Abrir Lightbox
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        currentLightboxIdx = filteredImages.indexOf(item);
        openLightbox();
      });
    });

    function openLightbox() {
      const activeItem = filteredImages[currentLightboxIdx];
      if (!activeItem || !lightboxImg) return;
      
      const imgEl = activeItem.querySelector('.gallery-img');
      const titleEl = activeItem.querySelector('h4');
      
      lightboxImg.src = imgEl.src;
      lightboxImg.alt = imgEl.alt;
      lightboxCaption.textContent = titleEl.textContent;
      
      lightboxModal.classList.add('active');
      lightboxModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    window.closeLightbox = function() {
      if (!lightboxModal) return;
      lightboxModal.classList.remove('active');
      lightboxModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    window.nextLightbox = function() {
      if (filteredImages.length === 0) return;
      currentLightboxIdx = (currentLightboxIdx + 1) % filteredImages.length;
      openLightbox();
    };

    window.prevLightbox = function() {
      if (filteredImages.length === 0) return;
      currentLightboxIdx = (currentLightboxIdx - 1 + filteredImages.length) % filteredImages.length;
      openLightbox();
    };

    if (lightboxClose) {
      lightboxClose.addEventListener('click', window.closeLightbox);
      lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) window.closeLightbox();
      });
    }

    if (lightboxNext && lightboxPrev) {
      lightboxNext.addEventListener('click', window.nextLightbox);
      lightboxPrev.addEventListener('click', window.prevLightbox);
    }
  }

  // Teclas de dirección globales
  document.addEventListener('keydown', (e) => {
    const lightboxModal = document.getElementById('lightbox-modal');
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') window.closeLightbox();
    if (e.key === 'ArrowRight') window.nextLightbox();
    if (e.key === 'ArrowLeft') window.prevLightbox();
  });


  /* ==========================================================================
     5. Cotizador de Presupuestos Interactivo
     ========================================================================== */
  const eventTypeSelect = document.getElementById('event-type');
  const guestCountInput = document.getElementById('guest-count');
  const guestCountVal = document.getElementById('guest-count-val');
  const minGuestsWarning = document.getElementById('min-guests-warning');
  
  const srvLivingQtySelect = document.getElementById('srv-living-qty');
  const sumBase = document.getElementById('sum-base');
  const dynamicSummaryItems = document.getElementById('dynamic-summary-items');
  const calcTotal = document.getElementById('calc-total');
  const btnCalcWhatsApp = document.getElementById('btn-calc-whatsapp');
  const guestCountNumBox = document.getElementById('guest-count-input');

  function calculateBudget() {
    if (!guestCountInput) return;

    const guestCount = parseInt(guestCountInput.value) || 80;
    
    // Actualizar campo de invitados numérico y burbuja
    if (guestCountVal) guestCountVal.textContent = guestCount;
    if (guestCountNumBox && document.activeElement !== guestCountNumBox) {
      guestCountNumBox.value = guestCount;
    }
    
    // Validar mínimos de invitados
    if (minGuestsWarning) {
      if (guestCount < 50) {
        minGuestsWarning.style.display = 'block';
      } else {
        minGuestsWarning.style.display = 'none';
      }
    }

    // Verificar si hay algún plato principal seleccionado
    const mainDishesInQuote = Array.from(selectedMenuItems).map(k => activeServices.find(s => s.key === k)).filter(Boolean);
    const hasSelectedMainDish = mainDishesInQuote.some(s => s.category === 'principales');
    
    const lockNotice = document.getElementById('cotizador-lock-notice');
    const addonsContainer = document.getElementById('calc-addons-container');
    
    // Actualizar aviso de bloqueo/desbloqueo
    if (lockNotice) {
      if (!hasSelectedMainDish) {
        lockNotice.style.background = 'rgba(224, 83, 38, 0.08)';
        lockNotice.style.border = '1px dashed var(--primary-orange)';
        lockNotice.style.color = 'var(--charcoal)';
        lockNotice.innerHTML = `<i class="fa-solid fa-lock" style="color: var(--primary-orange); font-size: 1.1rem; flex-shrink: 0;"></i> <span>Seleccioná primero un <strong>Plato Principal</strong> en la sección "Nuestra Carta" arriba para iniciar la cotización y habilitar los servicios opcionales.</span>`;
      } else {
        lockNotice.style.background = 'rgba(46, 125, 50, 0.08)';
        lockNotice.style.border = '1px solid #2e7d32';
        lockNotice.style.color = '#2e7d32';
        lockNotice.innerHTML = `<i class="fa-solid fa-circle-check" style="font-size: 1.1rem; flex-shrink: 0;"></i> <span>¡Plato Principal Seleccionado! Servicios opcionales habilitados.</span>`;
      }
    }

    // Habilitar/deshabilitar controles opcionales si no hay plato principal elegido
    if (addonsContainer) {
      const checkboxes = addonsContainer.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(chk => {
        const srvKey = chk.id;
        const srv = activeServices.find(s => s.key === srvKey);
        if (srv && !srv.is_available) {
          chk.disabled = true;
        } else {
          chk.disabled = !hasSelectedMainDish;
        }
      });
    }

    if (srvLivingQtySelect) {
      srvLivingQtySelect.disabled = !hasSelectedMainDish;
    }

    let menuItemsTotal = 0;
    let basePricePerPerson = 0;
    let dynamicHtml = '';
    let selectedAddonsList = [];
    let selectedMenuOptionsList = [];
    let selectedMenuName = 'Ningún menú seleccionado';

    if (hasSelectedMainDish) {
      // 1. Sumar los platos seleccionados desde el menú dinámico
      selectedMenuItems.forEach(key => {
        const srv = activeServices.find(s => s.key === key);
        if (srv) {
          const cost = parseFloat(srv.price) || 0;
          const totalCost = cost * guestCount;
          
          if (srv.category === 'principales') {
            basePricePerPerson += cost;
            selectedMenuName = srv.name;
          } else {
            menuItemsTotal += totalCost;
          }
          
          selectedMenuOptionsList.push(srv.name);
          
          dynamicHtml += `
            <div class="summary-item">
              <span>+ ${srv.name}:</span>
              <strong>${formatCurrency(totalCost)}</strong>
            </div>`;
        }
      });
    } else {
      dynamicHtml = `<div style="font-size: 0.85rem; color: var(--charcoal-muted); font-style: italic; text-align: center; padding: 15px 0;">Elegí tu plato principal en "Nuestra Carta" arriba para ver la cotización estimada.</div>`;
    }

    // 2. Recorrer los servicios opcionales tildados (A cotizar por el admin, costo $0 al estimado)
    if (addonsContainer && hasSelectedMainDish) {
      const checkboxes = addonsContainer.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(chk => {
        if (chk.checked && !chk.disabled) {
          const srvName = chk.getAttribute('data-name');
          selectedAddonsList.push(`${srvName} (A cotizar por Admin)`);
          
          dynamicHtml += `
            <div class="summary-item">
              <span>+ ${srvName}:</span>
              <strong style="color: var(--primary-orange); font-size: 0.85rem;">A cotizar</strong>
            </div>`;
        }
      });
    }

    // 3. Cantidad de Juegos de Living (A cotizar por el admin, costo $0 al estimado)
    if (srvLivingQtySelect && !srvLivingQtySelect.disabled && hasSelectedMainDish) {
      const qty = parseInt(srvLivingQtySelect.value);
      if (qty > 0) {
        selectedAddonsList.push(`${qty} Juego(s) de Living (A cotizar por Admin)`);
        dynamicHtml += `
          <div class="summary-item">
            <span>+ ${qty} Juegos de Living:</span>
            <strong style="color: var(--primary-orange); font-size: 0.85rem;">A cotizar</strong>
          </div>`;
      }
    }

    // 4. Recorrer los alquileres opcionales seleccionados
    let selectedOptionalList = [];
    selectedOptionalRentals.forEach(key => {
      const srv = activeServices.find(s => s.key === key);
      if (srv) {
        selectedOptionalList.push(`${srv.name} (A cotizar)`);
        dynamicHtml += `
          <div class="summary-item">
            <span>+ ${srv.name} (Alquiler Opcional):</span>
            <strong style="color: var(--primary-orange); font-size: 0.85rem;">A cotizar</strong>
          </div>`;
      }
    });

    if (dynamicSummaryItems) dynamicSummaryItems.innerHTML = dynamicHtml;
    
    // Si no hay plato principal seleccionado, el estimado es $0
    const grandTotal = hasSelectedMainDish ? ((basePricePerPerson * guestCount) + menuItemsTotal) : 0;
    const pricePerPerson = hasSelectedMainDish ? (grandTotal / guestCount) : 0;
    
    if (calcTotal) calcTotal.textContent = formatCurrency(grandTotal);
    
    const calcPerPerson = document.getElementById('calc-per-person');
    if (calcPerPerson) {
      calcPerPerson.textContent = hasSelectedMainDish ? formatCurrency(pricePerPerson) : "$0";
    }

    return {
      menuName: hasSelectedMainDish ? selectedMenuName : 'Sin Menú Seleccionado',
      guestCount,
      perPerson: pricePerPerson,
      grandTotal,
      addons: selectedAddonsList,
      menuItems: selectedMenuOptionsList,
      optionalRentals: selectedOptionalList
    };
  }

  // Listeners de cambio para la calculadora
  if (eventTypeSelect && guestCountInput) {
    eventTypeSelect.addEventListener('change', calculateBudget);
    guestCountInput.addEventListener('input', calculateBudget);
  }
  if (guestCountNumBox && guestCountInput) {
    guestCountNumBox.addEventListener('input', () => {
      let val = parseInt(guestCountNumBox.value);
      if (!isNaN(val)) {
        guestCountInput.value = val;
        calculateBudget();
      }
    });
    guestCountNumBox.addEventListener('change', () => {
      let val = parseInt(guestCountNumBox.value);
      if (isNaN(val) || val < 15) val = 15;
      guestCountNumBox.value = val;
      guestCountInput.value = val;
      calculateBudget();
    });
  }
  if (srvLivingQtySelect) {
    srvLivingQtySelect.addEventListener('change', calculateBudget);
  }

  // Botón enviar cotización a WhatsApp
  if (btnCalcWhatsApp) {
    btnCalcWhatsApp.addEventListener('click', () => {
      const results = calculateBudget();
      if (!results) return;
      
      let menuItemsText = '';
      if (results.menuItems.length > 0) {
        results.menuItems.forEach(item => {
          menuItemsText += `\n  • ${item}`;
        });
      } else {
        menuItemsText = '\n  • Ninguno';
      }

      let addonsText = '';
      if (results.addons.length > 0) {
        results.addons.forEach(item => {
          addonsText += `\n  • ${item}`;
        });
      } else {
        addonsText = '\n  • Ninguno';
      }

      const warningText = results.guestCount < 50 ? '\n⚠️ *Nota:* La cantidad de invitados es menor al mínimo de 50 requerido para contratos generales.' : '';

      const waMessage = `¡Hola La Juntada! Realicé una cotización estimada de mi evento en su sitio web y me interesa coordinar la fecha y los detalles.

*Detalles del Presupuesto:*
- *Menú Elegido:* ${results.menuName}
- *Invitados:* ${results.guestCount} personas ${warningText}
- *Platos de Menú Seleccionados:${menuItemsText}*
- *Servicios Adicionales Seleccionados:${addonsText}*

*Estimado Por Persona:* ${formatCurrency(results.perPerson)}
*Total Estimado del Evento:* ${formatCurrency(results.grandTotal)}

¿Podrían confirmarme disponibilidad para presupuesto formal y reserva? ¡Muchas gracias!`;

      // Enviar a WhatsApp
      const cleanPhone = activeConfigs.contact_phone1.replace(/\s+/g, '');
      const waUrl = `https://wa.me/549${cleanPhone}?text=${encodeURIComponent(waMessage)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // Botón descargar PDF
  const btnCalcPDF = document.getElementById('btn-calc-pdf');
  if (btnCalcPDF) {
    btnCalcPDF.addEventListener('click', downloadBudgetPDF);
  }

  // Generación y descarga de PDF con formato estético corporativo
  function downloadBudgetPDF() {
    const results = calculateBudget();
    if (!results) return;

    // Obtener la fecha de hoy
    const today = new Date().toLocaleDateString('es-AR');

    // Construir lista de platos de menú
    let menuItemsHtml = '';
    if (results.menuItems.length > 0) {
      results.menuItems.forEach(item => {
        // Encontrar precio
        const srv = activeServices.find(s => s.name === item);
        const price = srv ? parseFloat(srv.price) : 0;
        menuItemsHtml += `
          <tr style="border-bottom: 1px solid #ebdcd5;">
            <td style="padding: 10px; text-align: left; font-weight: 500;">${srv ? srv.name : item}</td>
            <td style="padding: 10px; text-align: right;">${formatCurrency(price)} x pers.</td>
            <td style="padding: 10px; text-align: right; font-weight: 700; color: #e05326;">${formatCurrency(price * results.guestCount)}</td>
          </tr>
        `;
      });
    } else {
      menuItemsHtml = `<tr><td colspan="3" style="padding: 15px; color: #80706b; font-style: italic; text-align: center;">Ningún plato adicional seleccionado.</td></tr>`;
    }

    // Construir lista de servicios adicionales
    let addonsHtml = '';
    if (results.addons.length > 0) {
      results.addons.forEach(item => {
        // Buscar servicio original
        let cleanedName = item.split(' (')[0];
        let srv;
        let qty = 1;
        let isLiving = item.includes('Juego(s) de Living');
        if (isLiving) {
          qty = parseInt(item.split(' ')[0]) || 1;
          srv = activeServices.find(s => s.key === 'srv_living');
        } else {
          srv = activeServices.find(s => s.name === cleanedName);
        }
        
        if (srv) {
          const cost = parseFloat(srv.price);
          const totalCost = srv.is_per_person ? cost * results.guestCount : cost * qty;
          addonsHtml += `
            <tr style="border-bottom: 1px solid #ebdcd5;">
              <td style="padding: 10px; text-align: left; font-weight: 500;">${srv.name} ${isLiving ? '(' + qty + ' juegos)' : ''}</td>
              <td style="padding: 10px; text-align: right;">${formatCurrency(cost)} ${srv.is_per_person ? 'x pers.' : 'fijo'}</td>
              <td style="padding: 10px; text-align: right; font-weight: 700; color: #e05326;">${formatCurrency(totalCost)}</td>
            </tr>
          `;
        }
      });
    } else {
      addonsHtml = `<tr><td colspan="3" style="padding: 15px; color: #80706b; font-style: italic; text-align: center;">Ningún servicio adicional seleccionado.</td></tr>`;
    }

    // Construir lista de alquileres opcionales
    let optionalRentalsHtml = '';
    if (results.optionalRentals && results.optionalRentals.length > 0) {
      results.optionalRentals.forEach(name => {
        optionalRentalsHtml += `
          <tr style="border-bottom: 1px solid #ebdcd5;">
            <td style="padding: 10px; text-align: left; font-weight: 500;">${name}</td>
            <td style="padding: 10px; text-align: right; color: #80706b;">A Consultar</td>
            <td style="padding: 10px; text-align: right; font-weight: 700; color: #80706b;">A Consultar</td>
          </tr>
        `;
      });
    }

    // Buscar precio unitario base del menu elegido
    let basePricePerPerson = 25000;
    if (eventTypeSelect) {
      if (eventTypeSelect.tagName === 'SELECT') {
        const selOpt = eventTypeSelect.options[eventTypeSelect.selectedIndex];
        if (selOpt) basePricePerPerson = parseFloat(selOpt.getAttribute('data-base')) || 25000;
      } else {
        basePricePerPerson = parseFloat(eventTypeSelect.getAttribute('data-base')) || 25000;
      }
    }

    // Crear contenedor temporal con estilos refinados de impresión
    const optHtml = `
      <div style="font-family: 'Outfit', sans-serif; color: #1d1715; padding: 40px; background-color: #ffffff; max-width: 800px; margin: 0 auto; box-sizing: border-box;">
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #e05326; padding-bottom: 20px; margin-bottom: 30px;">
          <div>
            <h1 style="margin: 0; color: #e05326; font-size: 28px; font-weight: 800; text-transform: uppercase;">La Juntada</h1>
            <p style="margin: 5px 0 0 0; color: #80706b; font-size: 14px; font-weight: 600; font-style: italic;">Le agrega sabor a tus encuentros!</p>
          </div>
          <div style="text-align: right;">
            <h2 style="margin: 0; color: #1d1715; font-size: 18px; font-weight: 700; letter-spacing: 0.5px;">PRESUPUESTO ESTIMADO</h2>
            <p style="margin: 5px 0 0 0; color: #80706b; font-size: 12px; font-weight: 500;">Fecha de Emisión: ${today}</p>
          </div>
        </div>

        <!-- Info Evento -->
        <div style="background-color: #faf6f0; border-radius: 8px; padding: 20px; margin-bottom: 30px; border-left: 5px solid #e05326; box-shadow: 0 4px 10px rgba(0,0,0,0.02);">
          <h3 style="margin-top: 0; color: #e05326; font-size: 15px; font-weight: 700; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 0.5px;">Detalles del Evento</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 5px 0; color: #80706b;"><strong>Menú Base Elegido:</strong></td>
              <td style="padding: 5px 0; text-align: right; font-weight: 600;">${results.menuName}</td>
            </tr>
            <tr>
              <td style="padding: 5px 0; color: #80706b;"><strong>Cantidad de Invitados:</strong></td>
              <td style="padding: 5px 0; text-align: right; font-weight: 600;">${results.guestCount} personas</td>
            </tr>
            <tr>
              <td style="padding: 5px 0; color: #80706b;"><strong>Valor Base Unitario:</strong></td>
              <td style="padding: 5px 0; text-align: right; font-weight: 600;">${formatCurrency(basePricePerPerson)} x pers.</td>
            </tr>
            <tr style="border-top: 1px solid #ebdcd5;">
              <td style="padding: 10px 0 5px 0; color: #1d1715; font-weight: 700;">Subtotal Gastronomía Base:</td>
              <td style="padding: 10px 0 5px 0; text-align: right; font-weight: 700; color: #e05326; font-size: 16px;">${formatCurrency(basePricePerPerson * results.guestCount)}</td>
            </tr>
          </table>
        </div>

        <!-- Opciones de Menu -->
        <div style="margin-bottom: 35px;">
          <h3 style="color: #e05326; font-size: 14px; font-weight: 700; border-bottom: 2px solid #ebdcd5; padding-bottom: 6px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 0.5px;">Platos Adicionales del Menú</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <thead>
              <tr style="background-color: #faf6f0; color: #1d1715; font-weight: 700; border-bottom: 1px solid #ebdcd5;">
                <th style="padding: 10px; text-align: left;">Descripción del Plato</th>
                <th style="padding: 10px; text-align: right; width: 140px;">Valor Unitario</th>
                <th style="padding: 10px; text-align: right; width: 120px;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${menuItemsHtml}
            </tbody>
          </table>
        </div>

        <!-- Opciones de Alquiler Opcionales -->
        ${optionalRentalsHtml ? `
          <div style="margin-bottom: 35px;">
            <h3 style="color: #e05326; font-size: 14px; font-weight: 700; border-bottom: 2px solid #ebdcd5; padding-bottom: 6px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 0.5px;">Alquileres Opcionales a Consultar</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
              <thead>
                <tr style="background-color: #faf6f0; color: #1d1715; font-weight: 700; border-bottom: 1px solid #ebdcd5;">
                  <th style="padding: 10px; text-align: left;">Descripción del Equipamiento</th>
                  <th style="padding: 10px; text-align: right; width: 140px;">Condición</th>
                  <th style="padding: 10px; text-align: right; width: 120px;">Estado</th>
                </tr>
              </thead>
              <tbody>
                ${optionalRentalsHtml}
              </tbody>
            </table>
          </div>
        ` : ''}

        <!-- Servicios Adicionales -->
        <div style="margin-bottom: 45px;">
          <h3 style="color: #e05326; font-size: 14px; font-weight: 700; border-bottom: 2px solid #ebdcd5; padding-bottom: 6px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 0.5px;">Servicios & Alquiler de Equipamiento</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <thead>
              <tr style="background-color: #faf6f0; color: #1d1715; font-weight: 700; border-bottom: 1px solid #ebdcd5;">
                <th style="padding: 10px; text-align: left;">Descripción del Servicio</th>
                <th style="padding: 10px; text-align: right; width: 140px;">Valor Unitario</th>
                <th style="padding: 10px; text-align: right; width: 120px;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${addonsHtml}
            </tbody>
          </table>
        </div>

        <!-- Resumen Financiero -->
        <div style="background-color: #1d1715; color: #ffffff; border-radius: 8px; padding: 25px; margin-bottom: 35px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 10px 25px rgba(29, 23, 21, 0.15);">
          <div>
            <p style="margin: 0; font-size: 11px; opacity: 0.8; text-transform: uppercase; letter-spacing: 1px;">Presupuesto Estimado</p>
            <h2 style="margin: 5px 0 0 0; color: #e05326; font-size: 24px; font-weight: 800; font-family: 'Outfit', sans-serif;">POR PERSONA: ${formatCurrency(results.perPerson)}</h2>
          </div>
          <div style="text-align: right;">
            <p style="margin: 0; font-size: 11px; opacity: 0.8; text-transform: uppercase; letter-spacing: 1px;">Valor Total Estimado</p>
            <h2 style="margin: 5px 0 0 0; color: #ffffff; font-size: 24px; font-weight: 800; font-family: 'Outfit', sans-serif;">${formatCurrency(results.grandTotal)}</h2>
          </div>
        </div>

        <!-- Nota / Terminos -->
        <div style="border-top: 1px solid #ebdcd5; padding-top: 20px; font-size: 11px; color: #80706b; line-height: 1.6;">
          <p style="font-weight: 700; color: #1d1715; margin-bottom: 5px; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px;">Aclaraciones e Información Importante:</p>
          <ul style="margin: 0; padding-left: 15px;">
            <li>El presente presupuesto constituye una estimación inicial en base a las opciones cargadas online. No asegura disponibilidad de fecha ni congelamiento de precios.</li>
            <li><strong>Descuento Especial:</strong> Bonificación del 10% sobre el saldo final abonando de contado efectivo.</li>
            <li>Financiación disponible: consultá planes de pago adaptados a tu comodidad.</li>
            <li>Los precios informados tienen validez por 15 días corridos a partir de la fecha de generación.</li>
          </ul>
          <p style="margin-top: 25px; text-align: center; font-weight: 700; color: #e05326; font-size: 12px;">La Juntada Eventos | Mendoza 3147, Alta Córdoba | Tel: 351 606 9743</p>
        </div>
      </div>
    `;

    try {
      if (typeof html2pdf === 'undefined') {
        alert("La librería de exportación de PDF no se cargó correctamente. Por favor, asegúrate de estar conectado a Internet o recarga la página.");
        return;
      }

      // Generar PDF usando html2pdf
      const element = document.createElement('div');
      element.style.position = 'fixed';
      element.style.left = '0';
      element.style.top = '0';
      element.style.width = '800px';
      element.style.background = '#ffffff';
      element.style.zIndex = '-9999';
      element.innerHTML = optHtml;
      document.body.appendChild(element);

      const opt = {
        margin:       10,
        filename:     `la_juntada_presupuesto_${results.menuName.toLowerCase().replace(/\s+/g, '_')}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { 
          scale: 2, 
          letterRendering: true,
          logging: false,
          scrollX: 0,
          scrollY: 0,
          useCORS: true
        },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      // Esperar a que el DOM se dibuje antes de capturar el canvas
      setTimeout(() => {
        html2pdf().from(element).set(opt).save().then(() => {
          document.body.removeChild(element);
        }).catch(err => {
          console.error("Error al generar PDF:", err);
          alert("Ocurrió un error al generar el PDF: " + err.message);
          document.body.removeChild(element);
        });
      }, 300);
    } catch (e) {
      console.error("Error en downloadBudgetPDF:", e);
      alert("Error inesperado en downloadBudgetPDF: " + e.message);
    }
  }


  /* ==========================================================================
     6. Acordeón de Preguntas Frecuentes (FAQ)
     ========================================================================== */
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const headerBtn = item.querySelector('.accordion-header');
    if (headerBtn) {
      headerBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Cerrar todos los demás
        accordionItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.accordion-header');
          if (otherBtn) {
            otherBtn.classList.remove('active');
            otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        // Abrir/Cerrar el actual
        if (!isActive) {
          item.classList.add('active');
          headerBtn.classList.add('active');
          headerBtn.setAttribute('aria-expanded', 'true');
        } else {
          item.classList.remove('active');
          headerBtn.classList.remove('active');
          headerBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });


  /* ==========================================================================
     7. Animaciones de Scroll (Scroll Reveal) & Spotlight Cursor Effect
     ========================================================================== */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
      });

      revealElements.forEach(el => observer.observe(el));
    } else {
      revealElements.forEach(el => el.classList.add('active'));
    }

    // Efecto de brillo de cursor (spotlight) en tarjetas
    const spotlightCards = document.querySelectorAll('.service-card, .menu-item-card, .rental-card-pricing, .calculator-card');
    spotlightCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });

    // Botón Volver al Inicio (Back-to-Top)
    const btnBackToTop = document.getElementById('btn-back-to-top');
    if (btnBackToTop) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
          btnBackToTop.classList.add('show');
        } else {
          btnBackToTop.classList.remove('show');
        }
      });
      btnBackToTop.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  /* ==========================================================================
     8. Pestañas de Menú Gastronómico (Menu Tabs)
     ========================================================================== */
  function initializeMenuTabs() {
    const menuTabs = document.querySelectorAll('.menu-tab-btn');
    const menuContents = document.querySelectorAll('.menu-tab-content');
    
    if (menuTabs.length === 0) return;
    
    menuTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetMenu = tab.getAttribute('data-menu');
        
        // Desactivar todas las pestañas y contenidos
        menuTabs.forEach(t => t.classList.remove('active'));
        menuContents.forEach(c => c.classList.remove('active'));
        
        // Activar la pestaña cliqueada y su respectivo contenido
        tab.classList.add('active');
        const targetEl = document.getElementById(`menu-${targetMenu}`);
        if (targetEl) {
          targetEl.classList.add('active');
        }
      });
    });
  }

  // Cargar datos al iniciar y registrar animaciones
  loadDataAndRender().then(() => {
    // Inicializar reveal y componentes después del renderizado dinámico
    initScrollReveal();
    initializeMenuTabs();
  });
});
