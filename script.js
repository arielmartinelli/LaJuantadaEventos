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
    { key: 'srv_drinks', name: 'Gaseosas libres, Vinos y Cervezas', description: 'Gaseosas Pepsi/7up, cerveza Quilmes/Brahma libre y vinos Otro Loco Mas.', price: 4500, is_per_person: true, is_available: true },
    { key: 'srv_bar', name: 'Barra Movil Libre (Tragos)', description: 'Fernet, Campari, Gancia, Gin y Vodka libre por 4 horas con barmans.', price: 6500, is_per_person: true, is_available: true },
    { key: 'srv_tableware', name: 'Alquiler de Vajilla y Manteleria', description: 'Vajilla de loza, cubiertos, cristalería y mantelería a tono.', price: 2500, is_per_person: true, is_available: true },
    { key: 'srv_living', name: 'Alquiler de Juego de Living (10 pers.)', description: 'Juegos de living de ecocuero blanco con mesa ratona (precio por juego).', price: 18000, is_per_person: false, is_available: true },
    { key: 'srv_sound', name: 'DJ, Sonido Basico y Luces', description: 'Cabina de DJ, parlantes activos, luces roboticas e iluminacion de pista.', price: 90000, is_per_person: false, is_available: true },
    { key: 'srv_gazebo', name: 'Gazebo Estructural (6x3m)', description: 'Gazebo estructural cerrado con guirnaldas de luces led decorativas.', price: 45000, is_per_person: false, is_available: true },
    { key: 'srv_screen', name: 'Pantalla 120" y Proyector HD', description: 'Pantalla gigante y proyector de alta luminosidad para videos.', price: 35000, is_per_person: false, is_available: true },
    { key: 'srv_photo', name: 'Fotografia Digital Profesional', description: 'Cobertura completa del evento con entrega digital de fotografias.', price: 80000, is_per_person: false, is_available: true }
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
      
      renderServicesDOM();
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
    const localData = localStorage.getItem('lajuntada_config');
    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        activeConfigs = { ...DEFAULT_CONFIGS, ...parsed };
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

    renderServicesDOM();
    renderCarouselDOM(DEFAULT_CAROUSEL);
    renderGalleryDOM(DEFAULT_GALLERY);
  }

  // Renderizar checkboxes y lista de precios
  function renderServicesDOM() {
    const addonsContainer = document.getElementById('calc-addons-container');
    const rentalPriceList = document.getElementById('rental-price-list');
    
    // 1. Checkboxes calculadora
    if (addonsContainer) {
      addonsContainer.innerHTML = '';
      activeServices.forEach(srv => {
        // living_qty se maneja por selector numérico separado en el html
        if (srv.key === 'srv_living') {
          updateLivingSelector(srv);
          return;
        }

        const disabledAttr = srv.is_available ? '' : 'disabled';
        const disabledClass = srv.is_available ? '' : 'disabled';
        const badgeHtml = srv.is_available ? '' : ' <span class="unavailable-badge">No Disponible</span>';
        const priceSuffix = srv.is_per_person ? 'x pers.' : 'fijo';
        const labelText = `${srv.name} (+${formatCurrency(srv.price)} ${priceSuffix})`;

        addonsContainer.innerHTML += `
          <label class="custom-checkbox-container ${disabledClass}">
            <input type="checkbox" id="${srv.key}" data-cost="${srv.price}" data-name="${srv.name}" data-per-person="${srv.is_per_person}" ${disabledAttr}>
            <span class="checkmark"></span>
            <span class="chk-label">${labelText}${badgeHtml}</span>
          </label>
        `;
      });

      // Agregar listeners a los nuevos checkboxes
      const checkboxes = addonsContainer.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(chk => {
        chk.addEventListener('change', calculateBudget);
      });
    }

    // 2. Lista de Precios de Alquiler
    if (rentalPriceList) {
      rentalPriceList.innerHTML = '';
      activeServices.forEach(srv => {
        const priceSuffix = srv.is_per_person ? '<small>(por persona)</small>' : '<small>(fijo)</small>';
        rentalPriceList.innerHTML += `
          <li>
            <span>${srv.name} ${priceSuffix}</span>
            <strong>${formatCurrency(srv.price)}</strong>
          </li>
        `;
      });
    }
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

  function calculateBudget() {
    if (!eventTypeSelect || !guestCountInput) return;

    const selectedOption = eventTypeSelect.options[eventTypeSelect.selectedIndex];
    if (!selectedOption) return;
    
    // Obtener precio base
    let basePricePerPerson = parseFloat(selectedOption.getAttribute('data-base')) || 0;

    const guestCount = parseInt(guestCountInput.value);
    
    // Actualizar burbuja de invitados
    if (guestCountVal) guestCountVal.textContent = guestCount;
    
    // Validar mínimos de invitados
    if (minGuestsWarning) {
      if (guestCount < 50) {
        minGuestsWarning.style.display = 'block';
      } else {
        minGuestsWarning.style.display = 'none';
      }
    }

    const baseCateringTotal = basePricePerPerson * guestCount;
    const selectedMenuName = selectedOption.text.split(' (')[0];
    if (sumBase) sumBase.textContent = `${formatCurrency(baseCateringTotal)} (${guestCount} invitados)`;
    
    let additionalTotal = 0;
    let dynamicHtml = '';
    let selectedAddonsList = [];

    // 1. Recorrer dinámicamente los adicionales del contenedor
    const addonsContainer = document.getElementById('calc-addons-container');
    if (addonsContainer) {
      const checkboxes = addonsContainer.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(chk => {
        if (chk.checked && !chk.disabled) {
          const cost = parseFloat(chk.getAttribute('data-cost')) || 0;
          const isPerPerson = chk.getAttribute('data-per-person') === 'true';
          const totalCost = isPerPerson ? cost * guestCount : cost;
          const srvName = chk.getAttribute('data-name');
          
          additionalTotal += totalCost;
          selectedAddonsList.push(`${srvName} (${isPerPerson ? guestCount + ' pers.' : 'fijo'})`);
          
          dynamicHtml += `
            <div class="summary-item">
              <span>${srvName}:</span>
              <strong>${formatCurrency(totalCost)}</strong>
            </div>`;
        }
      });
    }

    // 2. Cantidad de Juegos de Living (livingQty * srv_living_price)
    if (srvLivingQtySelect && !srvLivingQtySelect.disabled) {
      const qty = parseInt(srvLivingQtySelect.value);
      const costPerUnit = parseFloat(srvLivingQtySelect.getAttribute('data-cost')) || 0;
      if (qty > 0) {
        const totalCost = qty * costPerUnit;
        additionalTotal += totalCost;
        selectedAddonsList.push(`${qty} Juego(s) de Living`);
        dynamicHtml += `
          <div class="summary-item">
            <span>${qty} Juegos de Living:</span>
            <strong>${formatCurrency(totalCost)}</strong>
          </div>`;
      }
    }

    if (dynamicSummaryItems) dynamicSummaryItems.innerHTML = dynamicHtml;
    
    const grandTotal = baseCateringTotal + additionalTotal;
    if (calcTotal) calcTotal.textContent = formatCurrency(grandTotal);

    return {
      menuName: selectedMenuName,
      guestCount,
      grandTotal,
      addons: selectedAddonsList
    };
  }

  // Listeners de cambio para la calculadora
  if (eventTypeSelect && guestCountInput) {
    eventTypeSelect.addEventListener('change', calculateBudget);
    guestCountInput.addEventListener('input', calculateBudget);
  }
  if (srvLivingQtySelect) {
    srvLivingQtySelect.addEventListener('change', calculateBudget);
  }

  // Botón enviar cotización a WhatsApp
  if (btnCalcWhatsApp) {
    btnCalcWhatsApp.addEventListener('click', () => {
      const results = calculateBudget();
      if (!results) return;
      
      let addonsText = '';
      if (results.addons.length > 0) {
        results.addons.forEach(item => {
          addonsText += `\n- ${item}`;
        });
      } else {
        addonsText = '\n- Ninguno';
      }

      const warningText = results.guestCount < 50 ? '\n⚠️ *Nota:* La cantidad de invitados es menor al mínimo de 50 requerido para contratos generales.' : '';

      const waMessage = `¡Hola La Juntada! Realicé una cotización estimada de mi evento en su sitio web y me interesa coordinar la fecha y los detalles.

*Detalles del Presupuesto:*
- *Menú Elegido:* ${results.menuName}
- *Invitados:* ${results.guestCount} personas ${warningText}
- *Servicios Adicionales Seleccionados:${addonsText}*

*Total Estimado:* ${formatCurrency(results.grandTotal)}

¿Podrían confirmarme disponibilidad para presupuesto formal y reserva? ¡Muchas gracias!`;

      // Enviar a WhatsApp
      const cleanPhone = activeConfigs.contact_phone1.replace(/\s+/g, '');
      const waUrl = `https://wa.me/549${cleanPhone}?text=${encodeURIComponent(waMessage)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
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
