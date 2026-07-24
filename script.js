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
    contact_email: 'lajuntadaeventos@gmail.com',
    min_guests_qty: '40',
    cash_discount_percent: '10',
    living_set_price: '18000',
    salon_norte_base_price: '300000',
    salon_norte_extra_pax_price: '7500',
    salon_norte_cover_image: 'assets/wedding_event.png',
    salon_norte_carousel_images: '["assets/wedding_event.png","assets/hero_bg.png","assets/catering_premium.png"]',
    salon_norte_equipamiento: '["Capacidad: hasta 40 personas","Parque verde y piscina","Climatización central","Asadores de gran capacidad","Estacionamiento privado","Conectividad de alta velocidad"]',
    salon_centro_base_price: '300000',
    salon_centro_extra_pax_price: '7500',
    salon_centro_cover_image: 'assets/social_event.png',
    salon_centro_carousel_images: '["assets/social_event.png","assets/birthday_sweet.png","assets/birthday_event.png"]',
    salon_centro_equipamiento: '["Capacidad: hasta 40 personas","Ubicación céntrica accesible","Ambiente climatizado","Equipamiento de DJ e audio","Iluminación perimetral led","Seguridad médica integrada"]',
    salon_weekday_discount_percent: '15',
    admin_username: 'leo',
    admin_password: 'leo123'
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
  let specialDietPax = 0;

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
      } else {
        activeServices = [...DEFAULT_SERVICES];
      }

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
    const localConfigs = localStorage.getItem('lajuntada_configs') || localStorage.getItem('lajuntada_site_configs');
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

  function getServiceUnitLabel(srv) {
    if (!srv) return '/ pers.';
    if (!srv.is_per_person) return 'fijo';
    return '/ pers.';
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
      const labelText = `${srv.name} <span style="color: var(--primary-orange); font-size: 0.82rem; font-weight: 700;">(A cotizar)</span>`;

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

      const descText = srv.description || 'Infraestructura y equipamiento adicional opcional para tu evento.';
      const needsToggle = descText.length > 65;

      grid.innerHTML += `
        <div class="menu-item-card ${activeClass} ${disabledClass}" id="rental-card-${srv.key}" style="transition: all 0.3s ease; position: relative; height: 100%; display: flex; flex-direction: column;">
          ${tagHtml}
          <h4 style="margin-top: 10px;">${srv.name} <span style="color: var(--primary-orange); font-size: 0.82rem; font-weight: 700;">(A cotizar)</span></h4>
          
          <div class="item-desc-container" style="flex-grow: 1; margin-bottom: 10px;">
            <p class="item-desc-text" id="desc-text-rental-${srv.key}">${descText}</p>
            ${needsToggle ? `
              <button type="button" class="btn-toggle-desc" data-target="desc-text-rental-${srv.key}">
                <span>Ver más</span> <i class="fa-solid fa-chevron-down" style="font-size: 0.7rem;"></i>
              </button>
            ` : ''}
          </div>

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

        const unitSuffix = getServiceUnitLabel(srv);
        let priceInfo = '';
        if (priceVal > 0) {
          priceInfo = `${formatCurrency(priceVal)} ${unitSuffix}`;
        } else {
          priceInfo = 'Incluido en Menú Base';
        }
        
        // Determinar si es ítem de dieta especial
        const isDietItem = srv.key === 'pri_dietas' || srv.key.startsWith('pri_dietas');
        const isSelected = isDietItem ? (specialDietPax > 0) : selectedMenuItems.has(srv.key);
        const activeClass = isSelected ? 'active' : '';
        const buttonText = isSelected ? 'Quitar de Cotización' : 'Sumar a Cotización';
        const buttonClass = isSelected ? 'btn-secondary' : 'btn-primary';
        
        const descText = srv.description || '';
        const needsToggle = descText.length > 65;

        if (isDietItem) {
          grid.innerHTML += `
            <div class="menu-item-card ${activeClass} ${disabledClass}" id="menu-card-${srv.key}" style="transition: all 0.3s ease; position: relative; height: 100%; display: flex; flex-direction: column; border: 2px solid ${specialDietPax > 0 ? 'var(--primary-orange)' : 'var(--border-light)'};">
              <span class="menu-tag orange"><i class="fa-solid fa-leaf"></i> Especial / Aislado</span>
              <h4 style="margin-top: 10px;">${srv.name}</h4>

              <div class="item-desc-container" style="flex-grow: 1; margin-bottom: 10px;">
                <p class="item-desc-text" id="desc-text-menu-${srv.key}">${descText}</p>
              </div>

              ${isAvailable ? `
                <div style="margin-top: auto; display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; border-top: 1px solid var(--border-light); padding-top: 15px;">
                  <span style="font-size: 0.85rem; font-weight: 700; color: var(--primary-orange);">${priceInfo}</span>
                  
                  <div style="display: flex; align-items: center; gap: 6px; background: #faf6f0; padding: 4px 10px; border-radius: 50px; border: 1px solid var(--border-light);">
                    <button type="button" class="btn-diet-menu-minus" style="width: 26px; height: 26px; border-radius: 50%; border: 1px solid var(--border-light); background: white; font-weight: 800; cursor: pointer; font-size: 0.9rem; color: var(--charcoal);">-</button>
                    <span style="font-size: 0.88rem; font-weight: 800; min-width: 20px; text-align: center; color: var(--primary-orange);">${specialDietPax} pers.</span>
                    <button type="button" class="btn-diet-menu-plus" style="width: 26px; height: 26px; border-radius: 50%; border: none; background: var(--primary-orange); color: white; font-weight: 800; cursor: pointer; font-size: 0.9rem;">+</button>
                  </div>
                </div>
              ` : `<span class="unavailable-badge" style="font-size: 0.75rem; margin-top: auto; display: inline-block; padding-top: 10px;">No Disponible</span>`}
            </div>
          `;
          return;
        }

        grid.innerHTML += `
          <div class="menu-item-card ${activeClass} ${disabledClass}" id="menu-card-${srv.key}" style="transition: all 0.3s ease; position: relative; height: 100%; display: flex; flex-direction: column;">
            ${tagHtml}
            <h4 style="margin-top: 10px;">${srv.name}</h4>

            <div class="item-desc-container" style="flex-grow: 1; margin-bottom: 10px;">
              <p class="item-desc-text" id="desc-text-menu-${srv.key}">${descText}</p>
              ${needsToggle ? `
                <button type="button" class="btn-toggle-desc" data-target="desc-text-menu-${srv.key}">
                  <span>Ver más</span> <i class="fa-solid fa-chevron-down" style="font-size: 0.7rem;"></i>
                </button>
              ` : ''}
            </div>

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

    // Registrar escuchadores de la dieta especial en la carta
    document.querySelectorAll('.btn-diet-menu-minus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (specialDietPax > 0) specialDietPax--;
        renderMenuDOM();
        renderTab2MenuTiemposDOM();
        calculateBudget();
      });
    });

    document.querySelectorAll('.btn-diet-menu-plus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        specialDietPax++;
        renderMenuDOM();
        renderTab2MenuTiemposDOM();
        calculateBudget();
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
    renderTab2MenuTiemposDOM();
  }

  // Renderizar 8 Tiempos del Menú en la Pestaña 2 del Cotizador
  function renderTab2MenuTiemposDOM() {
    const container = document.getElementById('calc-menu-tiempos-container');
    if (!container) return;

    const timeCategories = [
      { key: 'recepcion', label: '1. Recepción & Bocaditos' },
      { key: 'entradas', label: '2. Entrada' },
      { key: 'principales', label: '3. Plato Principal' },
      { key: 'postres', label: '4. Postre' },
      { key: 'mesadulce', label: '5. Mesa Dulce' },
      { key: 'bebidas', label: '6. Bebidas & Gaseosas' },
      { key: 'barratragos', label: '7. Barra de Tragos' },
      { key: 'findeevento', label: '8. Fin de Evento (Trasnoche)' }
    ];

    let html = '';

    timeCategories.forEach(cat => {
      let items = activeServices.filter(s => s.category === cat.key);
      if (cat.key === 'barratragos' && items.length === 0) {
        items = activeServices.filter(s => s.key === 'srv_barra' || s.name.toLowerCase().includes('barra'));
      }

      if (items.length === 0) return;

      html += `
        <div style="background: rgba(250, 246, 240, 0.6); border: 1px solid var(--border-light); border-radius: 16px; padding: 16px;">
          <h4 style="font-size: 0.95rem; font-weight: 800; color: var(--charcoal); margin: 0 0 12px; display: flex; align-items: center; justify-content: space-between;">
            <span><i class="fa-solid fa-utensils text-orange"></i> ${cat.label}</span>
            <span style="font-size: 0.75rem; color: var(--charcoal-muted); font-weight: 600;">${items.length} opción(es)</span>
          </h4>
          <div class="menu-tiempos-grid">
      `;

      items.forEach(srv => {
        const isDietItem = srv.key === 'pri_dietas' || srv.key.startsWith('pri_dietas');
        const isSelected = isDietItem ? (specialDietPax > 0) : selectedMenuItems.has(srv.key);
        let priceVal = parseFloat(srv.price) || 0;
        if (srv.category === 'principales' && priceVal <= 0) {
          if (srv.key === 'pri_parrillada') priceVal = 35000;
          else if (srv.key === 'pri_pollo') priceVal = 28000;
          else priceVal = 25000;
        }
        const unitSuffix = getServiceUnitLabel(srv);
        const priceLabel = priceVal > 0 ? `${formatCurrency(priceVal)} ${unitSuffix}` : 'Incluido en Menú Base';

        const descText = srv.description || 'Deliciosa especialidad para tu evento.';
        const needsToggle = descText.length > 60;

        if (isDietItem) {
          html += `
            <div class="menu-tiempos-card ${isSelected ? 'selected' : ''}" data-key="${srv.key}" data-is-diet="true" style="background: white; border: 2px solid ${specialDietPax > 0 ? 'var(--primary-orange)' : 'var(--border-light)'}; border-radius: 12px; padding: 12px; transition: all 0.2s ease; position: relative;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
                <strong style="font-size: 0.88rem; color: var(--charcoal); line-height: 1.3;">${srv.name}</strong>
                <span style="font-size: 0.7rem; font-weight: 800; color: white; background: #2e7d32; border-radius: 50px; padding: 2px 8px; flex-shrink: 0;"><i class="fa-solid fa-leaf"></i> Especial</span>
              </div>

              <div class="item-desc-container" style="margin: 6px 0 6px;">
                <p class="item-desc-text" id="desc-text-cat-${cat.key}-${srv.key}">${descText}</p>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px; border-top: 1px dashed var(--border-light); padding-top: 8px;">
                <div style="font-size: 0.82rem; font-weight: 800; color: var(--primary-orange);">${priceLabel}</div>
                
                <div style="display: flex; align-items: center; gap: 6px; background: #faf6f0; padding: 4px 8px; border-radius: 50px; border: 1px solid var(--border-light);" onclick="event.stopPropagation();">
                  <button type="button" class="btn-diet-tab2-minus" style="width: 24px; height: 24px; border-radius: 50%; border: 1px solid var(--border-light); background: white; font-weight: 800; cursor: pointer; font-size: 0.85rem; color: var(--charcoal);">-</button>
                  <span style="font-size: 0.85rem; font-weight: 800; min-width: 18px; text-align: center; color: var(--primary-orange);">${specialDietPax} pers.</span>
                  <button type="button" class="btn-diet-tab2-plus" style="width: 24px; height: 24px; border-radius: 50%; border: none; background: var(--primary-orange); color: white; font-weight: 800; cursor: pointer; font-size: 0.85rem;">+</button>
                </div>
              </div>
            </div>
          `;
          return;
        }

        html += `
          <div class="menu-tiempos-card ${isSelected ? 'selected' : ''}" data-key="${srv.key}" style="background: white; border: 2px solid ${isSelected ? 'var(--primary-orange)' : 'var(--border-light)'}; border-radius: 12px; padding: 12px; cursor: pointer; transition: all 0.2s ease; position: relative;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
              <strong style="font-size: 0.88rem; color: var(--charcoal); line-height: 1.3;">${srv.name}</strong>
              <span style="font-size: 0.75rem; font-weight: 800; color: white; background: ${isSelected ? 'var(--primary-orange)' : '#ccc'}; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">${isSelected ? '✓' : '+'}</span>
            </div>

            <div class="item-desc-container" style="margin: 6px 0 6px;">
              <p class="item-desc-text" id="desc-text-cat-${cat.key}-${srv.key}">${descText}</p>
              ${needsToggle ? `
                <button type="button" class="btn-toggle-desc" data-target="desc-text-cat-${cat.key}-${srv.key}">
                  <span>Ver más</span> <i class="fa-solid fa-chevron-down" style="font-size: 0.7rem;"></i>
                </button>
              ` : ''}
            </div>

            <div style="font-size: 0.82rem; font-weight: 800; color: var(--primary-orange);">${priceLabel}</div>
          </div>
        `;
      });

      html += `</div></div>`;
    });

    container.innerHTML = html;

    // Registrar escuchadores de la dieta especial en tab 2
    container.querySelectorAll('.btn-diet-tab2-minus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (specialDietPax > 0) specialDietPax--;
        renderTab2MenuTiemposDOM();
        renderMenuDOM();
        calculateBudget();
      });
    });

    container.querySelectorAll('.btn-diet-tab2-plus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        specialDietPax++;
        renderTab2MenuTiemposDOM();
        renderMenuDOM();
        calculateBudget();
      });
    });

    // Registrar clics
    container.querySelectorAll('.menu-tiempos-card').forEach(card => {
      if (card.getAttribute('data-is-diet') === 'true') {
        card.addEventListener('click', () => {
          if (specialDietPax === 0) specialDietPax = 1;
          else specialDietPax = 0;
          renderTab2MenuTiemposDOM();
          renderMenuDOM();
          calculateBudget();
        });
        return;
      }

      card.addEventListener('click', () => {
        const key = card.getAttribute('data-key');
        toggleMenuItemInQuote(key);
      });
    });
  }

  function toggleMenuItemInQuote(key) {
    if (key === 'pri_dietas' || key.startsWith('pri_dietas')) {
      if (specialDietPax === 0) specialDietPax = 1;
      else specialDietPax = 0;
      renderTab2MenuTiemposDOM();
      renderMenuDOM();
      calculateBudget();
      return;
    }

    if (selectedMenuItems.has(key)) {
      selectedMenuItems.delete(key);
    } else {
      selectedMenuItems.add(key);
    }
    renderTab2MenuTiemposDOM();
    renderMenuDOM();
    calculateBudget();
  }

  // Actualizar selector de livings
  function updateLivingSelector(livingService) {
    const srvLivingQtySelect = document.getElementById('srv-living-qty');
    if (srvLivingQtySelect && livingService) {
      srvLivingQtySelect.setAttribute('data-cost', 0);
      
      if (!livingService.is_available) {
        srvLivingQtySelect.disabled = true;
        srvLivingQtySelect.innerHTML = `<option value="0" selected>Ninguno (No Disponible)</option>`;
      } else {
        srvLivingQtySelect.disabled = false;
        srvLivingQtySelect.innerHTML = `
          <option value="0" selected>Ninguno (A cotizar)</option>
          <option value="1">1 Juego de Living (A cotizar)</option>
          <option value="2">2 Juegos de Living (A cotizar)</option>
          <option value="3">3 Juegos de Living (A cotizar)</option>
          <option value="4">4 Juegos de Living (A cotizar)</option>
          <option value="5">5 Juegos de Living (A cotizar)</option>
          <option value="6">6 Juegos de Living (A cotizar)</option>
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

  // Elementos de Entrada del Cotizador
  const calcClientNameInput = document.getElementById('calc-client-name');
  const calcEventDateInput = document.getElementById('calc-event-date');
  const calcSalonSelect = document.getElementById('calc-salon-select');
  // Modal Popup & Gestor de Acciones
  const modalClientData = document.getElementById('modal-client-data');
  const formModalData = document.getElementById('form-modal-data');
  const modalClientName = document.getElementById('modal-client-name');
  const modalEventDate = document.getElementById('modal-event-date');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const modalSubmitText = document.getElementById('modal-submit-text');

  let pendingAction = null; // 'whatsapp' | 'pdf'

  function updateSalonPriceDisplays() {
    const norteWkday = document.getElementById('norte-price-weekday');
    const norteWkend = document.getElementById('norte-price-weekend');
    const centroWkday = document.getElementById('centro-price-weekday');
    const centroWkend = document.getElementById('centro-price-weekend');

    const norteBase = parseFloat(activeConfigs.salon_norte_base_price) || 300000;
    const centroBase = parseFloat(activeConfigs.salon_centro_base_price) || 300000;
    const discountPercent = parseFloat(activeConfigs.salon_weekday_discount_percent) || 15;

    if (norteWkday) norteWkday.textContent = formatCurrency(norteBase);
    if (norteWkend) norteWkend.textContent = `${discountPercent}% OFF`;
    if (centroWkday) centroWkday.textContent = formatCurrency(centroBase);
    if (centroWkend) centroWkend.textContent = `${discountPercent}% OFF`;
  }

  function calculateBudget(clientNameOverride = '', dateValOverride = '') {
    if (!guestCountInput) return;

    const minGuestsLimit = parseInt(activeConfigs.min_guests_qty) || 40;
    let guestCount = parseInt(guestCountInput.value) || minGuestsLimit;
    if (guestCount < minGuestsLimit) {
      guestCount = minGuestsLimit;
      guestCountInput.value = minGuestsLimit;
      if (guestCountNumBox) guestCountNumBox.value = minGuestsLimit;
      const guestRange = document.getElementById('guest-count');
      if (guestRange) guestRange.value = minGuestsLimit;
    }
    
    // Detectar si hay salón seleccionado para tope de capacidad
    const selectedSalonKey = calcSalonSelect ? calcSalonSelect.value : 'none';
    const isSalonSelected = selectedSalonKey === 'norte' || selectedSalonKey === 'centro';

    if (isSalonSelected && guestCount > 100) {
      guestCount = 100;
      guestCountInput.value = 100;
      if (guestCountNumBox) guestCountNumBox.value = 100;
      const guestRange = document.getElementById('guest-count');
      if (guestRange) guestRange.value = 100;
    }

    // Actualizar campo de invitados numérico
    if (guestCountVal) guestCountVal.textContent = guestCount;
    if (guestCountNumBox && document.activeElement !== guestCountNumBox) {
      guestCountNumBox.value = guestCount;
    }
    
    // Validar avisos de límite de capacidad en salones
    if (minGuestsWarning) {
      if (isSalonSelected && parseInt(guestCountInput.value) >= 100) {
        minGuestsWarning.style.display = 'block';
        minGuestsWarning.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Capacidad máxima del salón alcanzada (100 personas). Para eventos más grandes, seleccioná "Catering a Domicilio".';
      } else {
        minGuestsWarning.style.display = 'none';
      }
    }

    // Detectar día de la semana para descuento del 15% en días de semana (Lunes a Jueves)
    let formattedDate = '';
    let dayOfWeek = -1;
    const dateVal = dateValOverride || (calcEventDateInput && calcEventDateInput.value ? calcEventDateInput.value : (modalEventDate ? modalEventDate.value : ''));

    if (dateVal) {
      const dateParts = dateVal.split('-');
      if (dateParts.length === 3) {
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1;
        const day = parseInt(dateParts[2]);
        const dateObj = new Date(year, month, day);
        dayOfWeek = dateObj.getDay(); // 0 = Domingo, 1 = Lunes, 2 = Martes, 3 = Miércoles, 4 = Jueves, 5 = Viernes, 6 = Sábado
        formattedDate = `${day.toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}/${year}`;
      }
    }

    // Calcular costo del salón seleccionado desde la configuración activa del admin.
    let salonCost = 0;
    let salonName = 'Sin Salón (Evento en Quinta Propia / Catering a Domicilio)';

    if (isSalonSelected) {
      const isNorte = selectedSalonKey === 'norte';
      salonName = isNorte ? 'Salón La Juntada Norte (Villa Allende)' : 'Salón La Juntada Centro (Alta Córdoba)';

      const basePrice = parseFloat(isNorte ? activeConfigs.salon_norte_base_price : activeConfigs.salon_centro_base_price) || 300000;
      const extraRate = parseFloat(isNorte ? activeConfigs.salon_norte_extra_pax_price : activeConfigs.salon_centro_extra_pax_price) || 7500;
      const discountPercent = parseFloat(activeConfigs.salon_weekday_discount_percent) || 15;

      const extraPax = Math.max(0, guestCount - 40);
      let baseTotalSalon = basePrice + (extraPax * extraRate);

      // Descuento en días de semana (Lunes a Jueves: dayOfWeek 1, 2, 3, 4)
      const isWeekdayDiscount = (dayOfWeek >= 1 && dayOfWeek <= 4);
      if (isWeekdayDiscount && discountPercent > 0) {
        const discountFactor = (100 - discountPercent) / 100;
        salonCost = Math.round(baseTotalSalon * discountFactor);
        salonName += ` (${discountPercent}% OFF aplicado)`;
      } else {
        salonCost = baseTotalSalon;
      }
    }

    let menuItemsTotalPerPerson = 0;
    let dynamicHtml = '';
    let selectedAddonsList = [];
    let selectedMenuOptionsList = [];

    // 1. Sumar acumulativamente TODOS los platos seleccionados desde la carta
    if (selectedMenuItems.size > 0) {
      selectedMenuItems.forEach(key => {
        const srv = activeServices.find(s => s.key === key);
        if (srv) {
          const cost = parseFloat(srv.price) || 0;
          menuItemsTotalPerPerson += cost;
          const unitSuffix = getServiceUnitLabel(srv);
          selectedMenuOptionsList.push(`${srv.name} (${formatCurrency(cost)} ${unitSuffix})`);
          
          dynamicHtml += `
            <div class="summary-item">
              <span><i class="fa-solid fa-check text-orange" style="font-size: 0.8rem; margin-right: 6px;"></i> ${srv.name}</span>
            </div>`;
        }
      });
    } else {
      dynamicHtml = `<div style="font-size: 0.85rem; color: var(--charcoal-muted); font-style: italic; text-align: center; padding: 10px 0;">Sumá tus platos en "Nuestra Carta" arriba para ver la selección.</div>`;
    }

    // Mostrar Salón en el resumen si corresponde
    if (salonCost > 0) {
      dynamicHtml += `
        <div class="summary-item" style="border-top: 1px dashed var(--border-light); padding-top: 8px; margin-top: 8px;">
          <span><i class="fa-solid fa-building text-orange" style="font-size: 0.8rem; margin-right: 6px;"></i> ${salonName}: <strong style="color: var(--primary-orange);">${formatCurrency(salonCost)} Aprox.</strong></span>
        </div>`;
    }

    // 2. Recorrer los servicios opcionales tildados
    const addonsContainer = document.getElementById('calc-addons-container');
    if (addonsContainer) {
      const checkboxes = addonsContainer.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(chk => {
        if (chk.checked && !chk.disabled) {
          const srvName = chk.getAttribute('data-name');
          selectedAddonsList.push(`${srvName} (A cotizar por Admin)`);
          
          dynamicHtml += `
            <div class="summary-item">
              <span><i class="fa-solid fa-plus text-orange" style="font-size: 0.8rem; margin-right: 6px;"></i> ${srvName}</span>
            </div>`;
        }
      });
    }

    // 3. Cantidad de Juegos de Living
    if (srvLivingQtySelect && srvLivingQtySelect.value > 0) {
      const qty = parseInt(srvLivingQtySelect.value);
      selectedAddonsList.push(`${qty} Juego(s) de Living (A cotizar por Admin)`);
      dynamicHtml += `
        <div class="summary-item">
          <span><i class="fa-solid fa-couch text-orange" style="font-size: 0.8rem; margin-right: 6px;"></i> ${qty} Juegos de Living</span>
        </div>`;
    }

    // 4. Recorrer alquileres opcionales
    let selectedOptionalList = [];
    selectedOptionalRentals.forEach(key => {
      const srv = activeServices.find(s => s.key === key);
      if (srv) {
        selectedOptionalList.push(`${srv.name} (A cotizar)`);
        dynamicHtml += `
          <div class="summary-item">
            <span><i class="fa-solid fa-plus text-orange" style="font-size: 0.8rem; margin-right: 6px;"></i> ${srv.name}</span>
          </div>`;
      }
    });

    // 5. Menú Dietas Especiales por personas individuales
    let specialDietCostTotal = 0;
    let dietPrice = 25000;
    if (specialDietPax > 0) {
      const dietSrv = activeServices.find(s => s.key === 'pri_dietas' || s.key.startsWith('pri_dietas'));
      dietPrice = dietSrv ? (parseFloat(dietSrv.price) || 25000) : 25000;
      if (dietPrice <= 0) dietPrice = 25000;
      specialDietCostTotal = specialDietPax * dietPrice;

      selectedMenuOptionsList.push(`Menú Dietas Especiales (${specialDietPax} pers. x ${formatCurrency(dietPrice)})`);
      dynamicHtml += `
        <div class="summary-item" style="border-top: 1px dashed var(--border-light); padding-top: 6px; margin-top: 6px;">
          <span><i class="fa-solid fa-leaf text-orange" style="font-size: 0.8rem; margin-right: 6px;"></i> ${specialDietPax} Menú(s) Dieta Especial (${formatCurrency(dietPrice)} / pers.)</span>
        </div>`;
    }

    if (dynamicSummaryItems) dynamicSummaryItems.innerHTML = dynamicHtml;
    
    // Cálculo final:
    const pricePerPerson = menuItemsTotalPerPerson;
    const gastroCostTotal = (menuItemsTotalPerPerson * guestCount) + specialDietCostTotal;
    const addonsCostTotal = 0;
    const grandTotal = gastroCostTotal + salonCost;
    
    if (calcTotal) calcTotal.textContent = formatCurrency(grandTotal);
    
    const calcPerPerson = document.getElementById('calc-per-person');
    if (calcPerPerson) {
      calcPerPerson.textContent = formatCurrency(pricePerPerson);
    }

    // Actualizar Gauge Bar de Porcentajes de Presupuesto
    const segSalon = document.getElementById('gauge-seg-salon');
    const segGastro = document.getElementById('gauge-seg-gastro');
    const segAddons = document.getElementById('gauge-seg-addons');
    const pctSalonLbl = document.getElementById('gauge-pct-salon');
    const pctGastroLbl = document.getElementById('gauge-pct-gastro');
    const pctAddonsLbl = document.getElementById('gauge-pct-addons');

    if (grandTotal > 0) {
      const pctSalon = Math.round((salonCost / grandTotal) * 100);
      const pctAddons = Math.round((addonsCostTotal / grandTotal) * 100);
      const pctGastro = Math.max(0, 100 - pctSalon - pctAddons);

      if (segSalon) segSalon.style.width = pctSalon + '%';
      if (segGastro) segGastro.style.width = pctGastro + '%';
      if (segAddons) segAddons.style.width = pctAddons + '%';

      if (pctSalonLbl) pctSalonLbl.textContent = pctSalon + '%';
      if (pctGastroLbl) pctGastroLbl.textContent = pctGastro + '%';
      if (pctAddonsLbl) pctAddonsLbl.textContent = pctAddons + '%';
    }



    // Actualizar badges de precios en la sección salones
    updateSalonPriceDisplays();

    return {
      clientName: clientNameOverride || (modalClientName ? modalClientName.value.trim() : ''),
      eventDate: formattedDate,
      rawDate: dateVal,
      salonName,
      salonCost,
      guestCount,
      perPerson: pricePerPerson,
      specialDietPax,
      specialDietPrice: dietPrice,
      specialDietCostTotal,
      grandTotal,
      addons: selectedAddonsList,
      menuItems: selectedMenuOptionsList,
      optionalRentals: selectedOptionalList
    };
  }

  // Abrir/Cerrar Modal de Confirmación de Datos
  function openClientModal(action) {
    pendingAction = action;
    const modalEl = document.getElementById('modal-client-data');
    const nameEl = document.getElementById('modal-client-name');
    const dateEl = document.getElementById('modal-event-date');
    const submitTextEl = document.getElementById('modal-submit-text');

    if (submitTextEl) {
      submitTextEl.textContent = action === 'whatsapp' ? 'Confirmar y Enviar a WhatsApp' : 'Confirmar y Descargar PDF';
    }
    
    if (modalEl) {
      modalEl.style.display = 'flex';
      modalEl.style.opacity = '1';
      modalEl.style.visibility = 'visible';
    }

    if (nameEl) {
      setTimeout(() => {
        nameEl.focus();
      }, 100);
    }
  }

  function closeClientModal() {
    const modalEl = document.getElementById('modal-client-data');
    if (modalEl) {
      modalEl.style.display = 'none';
    }
  }

  if (btnCloseModal) btnCloseModal.addEventListener('click', closeClientModal);
  if (modalClientData) {
    modalClientData.addEventListener('click', (e) => {
      if (e.target === modalClientData) closeClientModal();
    });
  }

  // Submit Handler del Modal
  if (formModalData) {
    formModalData.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('modal-client-name');
      const dateInput = document.getElementById('modal-event-date');

      const clientName = nameInput ? nameInput.value.trim() : '';
      const rawDate = dateInput ? dateInput.value : '';

      if (!clientName) {
        alert('⚠️ Por favor ingresá tu Nombre y Apellido.');
        if (nameInput) nameInput.focus();
        return;
      }

      if (!rawDate) {
        alert('⚠️ Por favor seleccioná la Fecha del Evento.');
        if (dateInput) dateInput.focus();
        return;
      }

      closeClientModal();

      if (pendingAction === 'whatsapp') {
        executeWhatsAppSend(clientName, rawDate);
      } else if (pendingAction === 'pdf') {
        executePDFDownload(clientName, rawDate);
      }
    });
  }

  // Manejador de Pestañas del Cotizador
  document.querySelectorAll('.calc-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.calc-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.calc-tab-pane').forEach(p => p.classList.remove('active'));
      
      btn.classList.add('active');
      const targetPane = document.getElementById(btn.getAttribute('data-tab'));
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // Manejador de Botones Siguiente / Anterior / Finalizar en pestañas del cotizador
  function switchCalcTab(targetTabId) {
    document.querySelectorAll('.calc-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.calc-tab-pane').forEach(p => p.classList.remove('active'));
    const targetPane = document.getElementById(targetTabId);
    if (targetPane) targetPane.classList.add('active');
    // Activar el botón de pestaña correspondiente
    document.querySelectorAll('.calc-tab-btn').forEach(b => {
      if (b.getAttribute('data-tab') === targetTabId) b.classList.add('active');
    });
  }

  document.querySelectorAll('.btn-tab-next, .btn-tab-prev').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = btn.getAttribute('data-target-tab');
      if (targetTab) switchCalcTab(targetTab);
    });
  });

  // Botón "Finalizar: Solicitar Presupuesto" — abre WhatsApp o Modal
  document.querySelectorAll('.btn-tab-finish').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const whatsappBtn = document.getElementById('btn-calc-whatsapp');
      if (whatsappBtn) whatsappBtn.click();
    });
  });

  // Manejador de Botones de Acceso Rápido de Pax (50, 80, 100, 150)
  document.querySelectorAll('.quick-pax-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.quick-pax-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const pax = parseInt(btn.getAttribute('data-pax'));
      if (guestCountInput) guestCountInput.value = pax;
      if (guestCountNumBox) guestCountNumBox.value = pax;
      const guestRange = document.getElementById('guest-count');
      if (guestRange) guestRange.value = pax;
      calculateBudget();
    });
  });

  function updateSalonCardBadges(selectedVal) {
    document.querySelectorAll('.salon-opt-card').forEach(card => {
      const val = card.getAttribute('data-salon-opt');
      const badge = card.querySelector('.salon-opt-badge-circle');
      if (val === selectedVal) {
        card.classList.add('selected');
        card.style.opacity = '1';
        card.style.borderColor = 'var(--primary-orange)';
        if (badge) {
          badge.textContent = '✓';
          badge.style.background = 'var(--primary-orange)';
        }
      } else {
        card.classList.remove('selected');
        card.style.opacity = '0.65';
        card.style.borderColor = 'var(--border-light)';
        if (badge) {
          badge.textContent = '+';
          badge.style.background = '#ccc';
        }
      }
    });
  }

  // Manejador de Tarjetas de Selección de Salón en Pestaña 1
  document.querySelectorAll('.salon-opt-card').forEach(card => {
    card.addEventListener('click', () => {
      const salonVal = card.getAttribute('data-salon-opt');
      updateSalonCardBadges(salonVal);
      if (calcSalonSelect) {
        calcSalonSelect.value = salonVal;
        calculateBudget();
      }
    });
  });

  // Listeners de cambio para la calculadora
  if (calcSalonSelect) calcSalonSelect.addEventListener('change', () => calculateBudget());
  
  // Manejador para botones "Sumar Salón a Cotización"
  document.querySelectorAll('.btn-select-salon-quote').forEach(btn => {
    btn.addEventListener('click', () => {
      const salonKey = btn.getAttribute('data-salon');
      if (calcSalonSelect) {
        calcSalonSelect.value = salonKey;
        updateSalonCardBadges(salonKey);
        calculateBudget();
        const calcSec = document.getElementById('calculadora');
        if (calcSec) {
          calcSec.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        sessionStorage.setItem('lajuntada_selected_salon', salonKey);
        window.location.href = 'index.html#calculadora';
      }
    });
  });

  // Verificar salón guardado desde salones.html
  const savedSalon = sessionStorage.getItem('lajuntada_selected_salon');
  if (savedSalon && calcSalonSelect) {
    calcSalonSelect.value = savedSalon;
    updateSalonCardBadges(savedSalon);
    sessionStorage.removeItem('lajuntada_selected_salon');
    calculateBudget();
  }
  if (eventTypeSelect && guestCountInput) {
    eventTypeSelect.addEventListener('change', () => calculateBudget());
    guestCountInput.addEventListener('input', () => calculateBudget());
  }
  if (guestCountNumBox && guestCountInput) {
    guestCountNumBox.addEventListener('input', () => {
      let val = parseInt(guestCountNumBox.value);
      if (!isNaN(val)) {
        if (val < 40) val = 40;
        guestCountInput.value = val;
        calculateBudget();
      }
    });
    guestCountNumBox.addEventListener('change', () => {
      let val = parseInt(guestCountNumBox.value);
      if (isNaN(val) || val < 40) val = 40;
      guestCountNumBox.value = val;
      guestCountInput.value = val;
      calculateBudget();
    });
  }
  if (srvLivingQtySelect) {
    srvLivingQtySelect.addEventListener('change', () => calculateBudget());
  }

  // Listeners para botones de WhatsApp y PDF con delegación directa
  document.addEventListener('click', (e) => {
    const waBtn = e.target.closest('#btn-calc-whatsapp, .btn-whatsapp-send');
    if (waBtn) {
      e.preventDefault();
      e.stopPropagation();
      openClientModal('whatsapp');
      return;
    }

    const pdfBtn = e.target.closest('#btn-calc-pdf');
    if (pdfBtn) {
      e.preventDefault();
      e.stopPropagation();
      openClientModal('pdf');
      return;
    }
  });

  // Ejecución de envío a WhatsApp con los datos confirmados (formato 100% compatible)
  function executeWhatsAppSend(clientName, rawDate) {
    if (!clientName || !clientName.trim()) {
      alert('Por favor ingresá tu Nombre y Apellido para enviar la cotización.');
      openClientModal('whatsapp');
      return;
    }

    const results = calculateBudget(clientName, rawDate);
    if (!results) return;
    
    let menuItemsText = '';
    if (selectedMenuItems && selectedMenuItems.size > 0) {
      const categoriesOrder = [
        { key: 'recepcion', label: 'Recepción y Bocaditos' },
        { key: 'entradas', label: 'Entrada' },
        { key: 'principales', label: 'Plato Principal General' },
        { key: 'postres', label: 'Postre' },
        { key: 'mesadulce', label: 'Mesa Dulce' },
        { key: 'bebidas', label: 'Bebidas y Gaseosas' },
        { key: 'barratragos', label: 'Barra de Tragos' },
        { key: 'findeevento', label: 'Fin de Evento (Trasnoche)' }
      ];

      categoriesOrder.forEach(cat => {
        const items = Array.from(selectedMenuItems)
          .map(k => activeServices?.find(s => s.key === k))
          .filter(s => s && (s.category === cat.key || (cat.key === 'barratragos' && (s.key === 'srv_barra' || s.name.toLowerCase().includes('barra')))));
        
        if (items.length > 0) {
          menuItemsText += `\n\n*${cat.label}:*`;
          items.forEach(srv => {
            menuItemsText += `\n  - ${srv.name}`;
          });
        }
      });
    } else {
      menuItemsText = '\n  - Ninguno (Menú a definir)';
    }

    if (results.specialDietPax > 0) {
      const dietSrv = activeServices?.find(s => s.key === 'pri_dietas' || s.key.startsWith('pri_dietas'));
      const dietName = dietSrv ? dietSrv.name : 'Menú Dietas Especiales';
      menuItemsText += `\n\n*MENÚ ESPECIAL EXTRA (Diferenciado):*\n  - ${dietName}: ${results.specialDietPax} persona(s) (${formatCurrency(results.specialDietPrice)} / pers.)`;
    }

    let addonsText = '';
    if (results.addons.length > 0) {
      results.addons.forEach(item => {
        const cleanedName = item.split(' (')[0].trim();
        addonsText += `\n  - ${cleanedName}`;
      });
    } else {
      addonsText = '\n  - Ninguno';
    }

    const warningText = results.guestCount < 40 ? '\n\n*Nota:* La cantidad de invitados es menor al mínimo de 40 personas requerido.' : '';

    const waMessage = `Hola equipo de La Juntada Eventos!
Mi nombre es *${results.clientName}* y estuve armando mi propuesta en el Cotizador Online.

*INFORMACION DEL EVENTO:*
- Cliente: ${results.clientName}
- Fecha: ${results.eventDate}
- Salon / Locacion: ${results.salonName}
- Invitados: ${results.guestCount} personas${warningText}

*MENU GASTRONOMICO ELEGIDO:*${menuItemsText}

*SERVICIOS Y EQUIPAMIENTO OPCIONAL:*${addonsText}

*PRESUPUESTO ESTIMADO:*
- Estimado Por Persona: ${formatCurrency(results.perPerson)} / pers.
${results.salonCost > 0 ? `- Alquiler de Salon: ${formatCurrency(results.salonCost)} Aprox.\n` : ''}
Podrian confirmarme disponibilidad para esta fecha y coordinar los detalles? Muchas gracias!`;

    // Enviar a WhatsApp
    const cleanPhone = activeConfigs.contact_phone1.replace(/\s+/g, '');
    const waUrl = `https://wa.me/549${cleanPhone}?text=${encodeURIComponent(waMessage)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  }

  // Ejecución de descarga de PDF Vectorial Directo (100% sin canvas ni hojas en blanco)
  function executePDFDownload(clientName, rawDate) {
    const results = calculateBudget(clientName, rawDate);
    if (!results) return;

    const today = new Date().toLocaleDateString('es-AR');

    // Obtener instancia de jsPDF
    const jsPDF = window.jspdf ? window.jspdf.jsPDF : (window.jsPDF || null);
    
    if (!jsPDF) {
      alert("⚠️ El motor de PDF se está cargando. Por favor intentá nuevamente en unos segundos.");
      return;
    }

    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // 1. Cabecera Naranjo
      doc.setFillColor(224, 83, 38);
      doc.rect(0, 0, 210, 26, 'F');

      // Título Marca
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('LA JUNTADA EVENTOS', 14, 14);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'italic');
      doc.text('Le agrega sabor a tus encuentros', 14, 20);

      // Fecha y Titulo Presupuesto
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('PRESUPUESTO ESTIMADO', 196, 13, { align: 'right' });
      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'normal');
      doc.text(`Fecha: ${today}`, 196, 19, { align: 'right' });

      // 2. Tabla de Datos del Cliente / Evento
      const clientTableRows = [
        ['Nombre del Cliente', results.clientName || 'Cliente'],
        ['Fecha del Evento', results.eventDate || 'A confirmar'],
        ['Salón Elegido', `${results.salonName} ${results.salonCost > 0 ? '(' + formatCurrency(results.salonCost) + ' Aprox.)' : ''}`],
        ['Cantidad de Invitados', `${results.guestCount} personas`],
        ['Gastronomía General', `${formatCurrency(results.perPerson)} x pers.`]
      ];

      if (results.specialDietPax > 0) {
        clientTableRows.push(['Menú Especial Extra', `${results.specialDietPax} pers. (${formatCurrency(results.specialDietPrice)} / pers.)`]);
      }

      doc.autoTable({
        startY: 32,
        head: [['Detalle de Solicitud', 'Información del Evento']],
        body: clientTableRows,
        theme: 'striped',
        headStyles: { fillColor: [29, 23, 21], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 9.5 },
        bodyStyles: { fontSize: 8.5, textColor: [29, 23, 21] },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 55 } },
        margin: { left: 14, right: 14 }
      });

      let currentY = doc.lastAutoTable.finalY + 8;

      // 3. Tabla de Menú Seleccionado (Agrupado por submenús sin precios individuales)
      const menuRows = [];
      if (selectedMenuItems && selectedMenuItems.size > 0) {
        const categoriesOrder = [
          { key: 'recepcion', label: 'Recepción & Bocaditos' },
          { key: 'entradas', label: 'Entrada' },
          { key: 'principales', label: 'Plato Principal General' },
          { key: 'postres', label: 'Postre' },
          { key: 'mesadulce', label: 'Mesa Dulce' },
          { key: 'bebidas', label: 'Bebidas & Gaseosas' },
          { key: 'barratragos', label: 'Barra de Tragos' },
          { key: 'findeevento', label: 'Fin de Evento (Trasnoche)' }
        ];

        categoriesOrder.forEach(cat => {
          const items = Array.from(selectedMenuItems)
            .map(k => activeServices?.find(s => s.key === k))
            .filter(s => s && (s.category === cat.key || (cat.key === 'barratragos' && (s.key === 'srv_barra' || s.name.toLowerCase().includes('barra')))));
          
          if (items.length > 0) {
            const itemsListStr = items.map(s => `• ${s.name}`).join('\n');
            menuRows.push([cat.label, itemsListStr]);
          }
        });
      }

      if (results.specialDietPax > 0) {
        const dietSrv = activeServices?.find(s => s.key === 'pri_dietas' || s.key.startsWith('pri_dietas'));
        const dietName = dietSrv ? dietSrv.name : 'Menú Dietas Especiales (Vegetariano / Vegano / Celíaco)';
        menuRows.push(['Menú Especial Extra', `• ${results.specialDietPax} porción(es) ${dietName} (${formatCurrency(results.specialDietPrice)} / pers.)`]);
      }

      if (menuRows.length === 0) {
        menuRows.push(['Menú Gastronómico', 'Menú base según contratación (Consultar variedad)']);
      }

      doc.autoTable({
        startY: currentY,
        head: [['Submenú / Categoría', 'Platos e Ítems Seleccionados']],
        body: menuRows,
        theme: 'grid',
        headStyles: { fillColor: [224, 83, 38], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 9 },
        bodyStyles: { fontSize: 8.5, cellPadding: 3 },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50 } },
        margin: { left: 14, right: 14 }
      });

      currentY = doc.lastAutoTable.finalY + 8;

      // 4. Tabla de Servicios Adicionales
      const addonRows = [];
      if (results.addons && results.addons.length > 0) {
        results.addons.forEach(item => {
          let cleanedName = item.split(' (')[0].trim();
          let srv;
          let qty = 1;
          let isLiving = item.includes('Juego(s) de Living');
          
          if (isLiving) {
            qty = parseInt(item.split(' ')[0]) || 1;
            srv = activeServices?.find(s => s.key === 'srv_living');
          } else {
            srv = activeServices?.find(s => s.name === cleanedName || s.name === item);
          }
          
          const cost = srv ? parseFloat(srv.price) || 0 : 0;
          const isPerPerson = srv ? srv.is_per_person : false;
          const totalCost = isPerPerson ? cost * results.guestCount : cost * qty;
          const displayName = (srv ? srv.name : cleanedName) + (isLiving ? ` (${qty} juegos)` : '');

          addonRows.push([
            displayName,
            'A Cotizar por Admin',
            'A Cotizar por Admin'
          ]);
        });
      } else {
        addonRows.push(['Sin servicios adicionales seleccionados', '-', '-']);
      }

      doc.autoTable({
        startY: currentY,
        head: [['Servicio / Equipamiento Adicional', 'Valor Unitario', 'Subtotal']],
        body: addonRows,
        theme: 'grid',
        headStyles: { fillColor: [224, 83, 38], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 9 },
        bodyStyles: { fontSize: 8.5 },
        columnStyles: { 1: { halign: 'right' }, 2: { halign: 'right', fontStyle: 'bold' } },
        margin: { left: 14, right: 14 }
      });

      currentY = doc.lastAutoTable.finalY + 10;

      // 5. Cuadro Final Estimado por Persona
      doc.setFillColor(29, 23, 21);
      doc.roundedRect(14, currentY, 182, 18, 3, 3, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'normal');
      doc.text('PRESUPUESTO ESTIMADO POR PERSONA', 105, currentY + 6, { align: 'center' });

      doc.setTextColor(224, 83, 38);
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.text(`ESTIMADO POR PERSONA: ${formatCurrency(results.perPerson)}`, 105, currentY + 13.5, { align: 'center' });

      currentY += 24;

      // 6. Legales y Pie de página
      doc.setTextColor(128, 112, 107);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.text('ACLARACIONES E INFORMACIÓN IMPORTANTE:', 14, currentY);

      doc.setFont('helvetica', 'normal');
      const textLines = [
        '• El presente presupuesto constituye una estimación inicial en base a las opciones cargadas online. No asegura disponibilidad de fecha ni congelamiento de precios.',
        '• Descuento Especial: Bonificación del 10% sobre el saldo final abonando de contado efectivo.',
        '• Financiación disponible: consultá planes de pago adaptados a tu comodidad.',
        '• Los precios informados tienen validez por 15 días corridos a partir de la fecha de generación.'
      ];
      
      let lineY = currentY + 4;
      textLines.forEach(line => {
        doc.text(line, 14, lineY);
        lineY += 4;
      });

      // Pie de página final
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(224, 83, 38);
      doc.text('La Juntada Eventos | Mendoza 3147, Alta Córdoba | Tel: 351 606 9743', 105, 287, { align: 'center' });

      // Guardar archivo PDF directamente
      const clientCleanName = (results.clientName || 'cliente').toLowerCase().replace(/[^a-z0-9]/g, '_');
      doc.save(`la_juntada_presupuesto_${clientCleanName}.pdf`);

    } catch (err) {
      console.error("Error al generar PDF vectorial:", err);
      alert("Ocurrió un error al generar el PDF. Intentalo nuevamente.");
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

    // Delegación global para botones "Ver más" / "Ver menos" en tarjetas del cotizador
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-toggle-desc');
      if (btn) {
        e.stopPropagation();
        e.preventDefault();
        const targetId = btn.getAttribute('data-target');
        const descEl = document.getElementById(targetId);
        if (descEl) {
          const isExpanded = descEl.classList.toggle('expanded');
          if (isExpanded) {
            btn.innerHTML = '<span>Ver menos</span> <i class="fa-solid fa-chevron-up" style="font-size: 0.7rem;"></i>';
          } else {
            btn.innerHTML = '<span>Ver más</span> <i class="fa-solid fa-chevron-down" style="font-size: 0.7rem;"></i>';
          }
        }
      }
    });
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
