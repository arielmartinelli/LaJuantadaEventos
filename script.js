/* ==========================================================================
   JavaScript - La Juntada Eventos
   Lógica interactiva: Menú, Carrusel, Galería Filtrable, Lightbox, Cotizador y Formularios
   ========================================================================== */

document.addEventListener('DOMContentLoaded', async () => {

  /* ==========================================================================
     0. Configuración por Defecto (Fallback) y Conexión con Supabase
     ========================================================================== */
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

  // Copia de trabajo de configuración
  let activeConfigs = { ...DEFAULT_CONFIGS };

  // Formateador de moneda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Intentar cargar la configuración en tiempo real desde Supabase
  async function loadSupabaseConfigs() {
    // Verificar si las credenciales y el SDK de Supabase están cargados
    const isSupabaseConfigured = typeof supabase !== 'undefined' 
      && typeof SUPABASE_URL !== 'undefined' 
      && typeof SUPABASE_ANON_KEY !== 'undefined'
      && SUPABASE_URL !== 'https://tu-proyecto.supabase.co';

    if (!isSupabaseConfigured) {
      console.log("Supabase no configurado o cargado. Usando configuración local por defecto.");
      applyDOMConfigurations();
      return;
    }

    try {
      const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      const { data, error } = await supabaseClient
        .from('lajuntada_config')
        .select('key, value');

      if (error) {
        console.error("Error al descargar de Supabase:", error);
        applyDOMConfigurations();
        return;
      }

      if (data && data.length > 0) {
        data.forEach(item => {
          activeConfigs[item.key] = item.value;
        });
        console.log("Configuraciones descargadas y sincronizadas desde Supabase con éxito.");
      }
    } catch (err) {
      console.error("Fallo de red al conectar con Supabase:", err);
    }

    applyDOMConfigurations();
  }

  // Actualizar todos los elementos del DOM basados en activeConfigs
  function applyDOMConfigurations() {
    // 1. Actualizar los precios visibles en el selector de tipo de menú (Calculadora)
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

    // 2. Actualizar precios en la sección Alquileres
    const lblVajilla = document.getElementById('lbl-price-vajilla');
    if (lblVajilla) lblVajilla.textContent = formatCurrency(activeConfigs.srv_tableware_price);

    const lblLiving = document.getElementById('lbl-price-living');
    if (lblLiving) lblLiving.textContent = formatCurrency(activeConfigs.srv_living_price);

    const lblGazebo = document.getElementById('lbl-price-gazebo');
    if (lblGazebo) lblGazebo.textContent = formatCurrency(activeConfigs.srv_gazebo_price);

    const lblScreen = document.getElementById('lbl-price-screen');
    if (lblScreen) lblScreen.textContent = formatCurrency(activeConfigs.srv_screen_price);

    // 3. Actualizar textos de adicionales en la Calculadora
    updateAddonLabelText('srv-drinks', `Gaseosas libres, Vinos y Cervezas (+${formatCurrency(activeConfigs.srv_drinks_price)} x pers.)`);
    updateAddonLabelText('srv-bar', `Barra Móvil Libre (Coctelería 4 hs) (+${formatCurrency(activeConfigs.srv_bar_price)} x pers.)`);
    updateAddonLabelText('srv-tableware', `Alquiler de Vajilla y Mantelería (+${formatCurrency(activeConfigs.srv_tableware_price)} x pers.)`);
    updateAddonLabelText('srv-sound', `DJ, Sonido Básico y Luces (+${formatCurrency(activeConfigs.srv_sound_price)} fijo)`);
    updateAddonLabelText('srv-gazebo', `Gazebo Estructural (6x3m ambientado) (+${formatCurrency(activeConfigs.srv_gazebo_price)} fijo)`);
    updateAddonLabelText('srv-screen', `Pantalla 120" y Proyector HD (+${formatCurrency(activeConfigs.srv_screen_price)} fijo)`);
    updateAddonLabelText('srv-photo', `Fotografía Digital Profesional (+${formatCurrency(activeConfigs.srv_photo_price)} fijo)`);
    
    // Selector de living
    const optLivingSelect = document.getElementById('srv-living-qty');
    if (optLivingSelect) {
      optLivingSelect.setAttribute('data-cost', activeConfigs.srv_living_price);
      optLivingSelect.options[0].textContent = `Ninguno (${formatCurrency(activeConfigs.srv_living_price)} c/u)`;
      for (let i = 1; i <= 6; i++) {
        optLivingSelect.options[i].textContent = `${i} Juego${i>1?'s':''} de Living (+${formatCurrency(activeConfigs.srv_living_price * i)})`;
      }
    }

    // 4. Actualizar disponibilidad (Disponibilidad en la Calculadora)
    checkAvailability('srv-bar', activeConfigs.srv_bar_available, "Barra Móvil Libre");
    checkAvailability('srv-tableware', activeConfigs.srv_tableware_available, "Alquiler de Vajilla y Mantelería");
    checkAvailability('srv-sound', activeConfigs.srv_sound_available, "DJ, Sonido Básico y Luces");
    checkAvailability('srv-gazebo', activeConfigs.srv_gazebo_available, "Gazebo Estructural (6x3m)");
    checkAvailability('srv-screen', activeConfigs.srv_screen_available, "Pantalla 120\" y Proyector HD");
    checkAvailability('srv-photo', activeConfigs.srv_photo_available, "Fotografía Digital Profesional");
    checkAvailabilityLivingSelector('srv-living-qty', activeConfigs.srv_living_available);

    // 5. Sincronizar datos de contacto en cabecera y footer
    const contactLinks = document.querySelectorAll('a[href^="https://wa.me/549"]');
    contactLinks.forEach(link => {
      // Reemplazar número de WhatsApp conservando el mensaje predefinido
      const urlObj = new URL(link.href);
      const textParam = urlObj.searchParams.get('text') || '';
      link.href = `https://wa.me/549${activeConfigs.contact_phone1}?text=${encodeURIComponent(textParam)}`;
      if (link.textContent.includes('351') || link.textContent.includes('+54')) {
        // Si el texto del enlace contiene un teléfono anterior, actualizarlo visualmente
        link.textContent = activeConfigs.contact_phone1;
      }
    });

    const mailLinks = document.querySelectorAll('a[href^="mailto:"]');
    mailLinks.forEach(link => {
      link.href = `mailto:${activeConfigs.contact_email}`;
      link.textContent = activeConfigs.contact_email;
    });

    // Dirección comercial
    const addressLabels = document.querySelectorAll('.contact-detail-item p');
    addressLabels.forEach(p => {
      if (p.textContent.includes('Mendoza')) {
        p.innerHTML = `${activeConfigs.contact_address}<br><span style="font-size: 0.8rem; color: rgba(250, 246, 240, 0.5); margin-top: 3px;">Horario: Lunes a Sábados de 9 a 18 hs (avisar con 30 min de anticipación)</span>`;
      }
    });

    const footerBottomInner = document.querySelector('.footer-bottom-inner p:last-child');
    if (footerBottomInner) {
      footerBottomInner.textContent = `Alta Córdoba, ${activeConfigs.contact_address.split(',')[0]}. Tel: ${activeConfigs.contact_phone1} | ${activeConfigs.contact_phone2}`;
    }

    // Ejecutar recálculo
    calculateBudget();
  }

  // Funciones auxiliares para actualizar inputs
  function updateAddonLabelText(id, text) {
    const input = document.getElementById(id);
    if (input) {
      input.setAttribute('data-cost', activeConfigs[id.replace('-', '_') + '_price']);
      const label = input.closest('.custom-checkbox-container');
      if (label) {
        const textSpan = label.querySelector('.chk-label');
        if (textSpan) textSpan.textContent = text;
      }
    }
  }

  function checkAvailability(id, available, labelName) {
    const input = document.getElementById(id);
    if (input) {
      const container = input.closest('.custom-checkbox-container');
      if (container) {
        const textSpan = container.querySelector('.chk-label');
        if (available === 'false') {
          input.checked = false;
          input.disabled = true;
          container.classList.add('disabled');
          if (textSpan && !textSpan.textContent.includes('(No Disponible)')) {
            textSpan.innerHTML = `${labelName} <span class="unavailable-badge">No Disponible</span>`;
          }
        } else {
          input.disabled = false;
          container.classList.remove('disabled');
        }
      }
    }
  }

  function checkAvailabilityLivingSelector(id, available) {
    const select = document.getElementById(id);
    if (select) {
      const formGroup = select.closest('.form-group');
      if (formGroup) {
        if (available === 'false') {
          select.value = "0";
          select.disabled = true;
          formGroup.style.opacity = '0.5';
          formGroup.style.pointerEvents = 'none';
          const label = formGroup.querySelector('label');
          if (label && !label.textContent.includes('No Disponible')) {
            label.innerHTML = `<i class="fa-solid fa-couch text-orange"></i> Juegos de Living <span class="unavailable-badge">No Disponible</span>`;
          }
        } else {
          select.disabled = false;
          formGroup.style.opacity = '1';
          formGroup.style.pointerEvents = 'auto';
        }
      }
    }
  }


  /* ==========================================================================
     1. Navegación y Menú Mobile
     ========================================================================== */
  // Toggle menú mobile
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Cerrar menú mobile al hacer clic en un enlace
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });


  /* ==========================================================================
     2. Sección Interactiva de la Carta / Menú de Opciones
     ========================================================================== */
  const menuTabBtns = document.querySelectorAll('.menu-tab-btn');
  const menuTabContents = document.querySelectorAll('.menu-tab-content');

  menuTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      menuTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedMenu = btn.getAttribute('data-menu');
      menuTabContents.forEach(content => {
        content.classList.remove('active');
        if (content.getAttribute('id') === `menu-${selectedMenu}`) {
          content.classList.add('active');
        }
      });
    });
  });


  /* ==========================================================================
     3. Carrusel / Slider de Fotos (Nuestra Cocina)
     ========================================================================== */
  const slider = document.getElementById('slider');
  const slides = document.querySelectorAll('.slide');
  const btnPrev = document.getElementById('slider-prev');
  const btnNext = document.getElementById('slider-next');
  const indicatorsContainer = document.getElementById('slider-indicators');
  
  let currentSlide = 0;
  const slideCount = slides.length;
  let slideInterval;

  // Crear indicadores dinámicamente
  if (indicatorsContainer) {
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.classList.add('indicator-dot');
      if (idx === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Ir a foto ${idx + 1}`);
      dot.addEventListener('click', () => goToSlide(idx));
      indicatorsContainer.appendChild(dot);
    });
  }

  const dots = document.querySelectorAll('.indicator-dot');

  function updateSlider() {
    if (!slider) return;
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlide);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    updateSlider();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    updateSlider();
  }

  function goToSlide(idx) {
    currentSlide = idx;
    updateSlider();
    resetInterval();
  }

  function startAutoPlay() {
    if (slides.length > 0 && slider) {
      slideInterval = setInterval(nextSlide, 5000);
    }
  }

  function resetInterval() {
    clearInterval(slideInterval);
    startAutoPlay();
  }

  if (btnNext && btnPrev) {
    btnNext.addEventListener('click', () => {
      nextSlide();
      resetInterval();
    });
    btnPrev.addEventListener('click', () => {
      prevSlide();
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
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const threshold = 50;
    if (startX - endX > threshold) {
      nextSlide();
      resetInterval();
    } else if (endX - startX > threshold) {
      prevSlide();
      resetInterval();
    }
  }

  startAutoPlay();


  /* ==========================================================================
     4. Galería de Fotos con Filtros y Lightbox Modal
     ========================================================================== */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let activeFilter = 'all';
  let filteredImages = [...galleryItems];
  let currentLightboxIdx = 0;

  // Filtrado de Galería
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      activeFilter = btn.getAttribute('data-filter');
      
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
    if (!activeItem) return;
    
    const imgEl = activeItem.querySelector('.gallery-img');
    const titleEl = activeItem.querySelector('h4');
    
    lightboxImg.src = imgEl.src;
    lightboxImg.alt = imgEl.alt;
    lightboxCaption.textContent = titleEl.textContent;
    
    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function nextLightbox() {
    currentLightboxIdx = (currentLightboxIdx + 1) % filteredImages.length;
    openLightbox();
  }

  function prevLightbox() {
    currentLightboxIdx = (currentLightboxIdx - 1 + filteredImages.length) % filteredImages.length;
    openLightbox();
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  if (lightboxNext && lightboxPrev) {
    lightboxNext.addEventListener('click', nextLightbox);
    lightboxPrev.addEventListener('click', prevLightbox);
  }

  // Teclas de dirección
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextLightbox();
    if (e.key === 'ArrowLeft') prevLightbox();
  });


  /* ==========================================================================
     5. Cotizador de Presupuestos Interactivo
     ========================================================================== */
  const srvDrinksInput = document.getElementById('srv-drinks');
  const srvBarInput = document.getElementById('srv-bar');
  const srvTablewareInput = document.getElementById('srv-tableware');
  const srvSoundInput = document.getElementById('srv-sound');
  const srvGazeboInput = document.getElementById('srv-gazebo');
  const srvScreenInput = document.getElementById('srv-screen');
  const srvPhotoInput = document.getElementById('srv-photo');
  const srvLivingQtySelect = document.getElementById('srv-living-qty');
  
  const sumBase = document.getElementById('sum-base');
  const dynamicSummaryItems = document.getElementById('dynamic-summary-items');
  const calcTotal = document.getElementById('calc-total');
  const btnCalcWhatsApp = document.getElementById('btn-calc-whatsapp');

  function calculateBudget() {
    if (!eventTypeSelect) return;

    const selectedOption = eventTypeSelect.options[eventTypeSelect.selectedIndex];
    
    // Obtener precio desde la base de datos (activeConfigs)
    let basePricePerPerson = 0;
    if (selectedOption.value === 'diente-libre') basePricePerPerson = parseFloat(activeConfigs.menu_diente_libre_price);
    else if (selectedOption.value === 'pollo-noisette') basePricePerPerson = parseFloat(activeConfigs.menu_pollo_noisette_price);
    else if (selectedOption.value === 'parrillada') basePricePerPerson = parseFloat(activeConfigs.menu_parrillada_price);

    const guestCount = parseInt(guestCountInput.value);
    
    // Actualizar burbuja
    guestCountVal.textContent = guestCount;
    
    // Mínimos
    if (guestCount < 50) {
      minGuestsWarning.style.display = 'block';
    } else {
      minGuestsWarning.style.display = 'none';
    }

    const baseCateringTotal = basePricePerPerson * guestCount;
    const selectedMenuName = selectedOption.text.split(' ($')[0];
    sumBase.textContent = `${formatCurrency(baseCateringTotal)} (${guestCount} invitados)`;
    
    let additionalTotal = 0;
    let dynamicHtml = '';
    let selectedAddonsList = [];

    // 1. Bebidas sin alcohol libres, vinos y cervezas
    if (srvDrinksInput && srvDrinksInput.checked && !srvDrinksInput.disabled) {
      const cost = parseFloat(activeConfigs.srv_drinks_price) * guestCount;
      additionalTotal += cost;
      selectedAddonsList.push(`Bebidas Libres c/ alcohol (${guestCount} pers.)`);
      dynamicHtml += `
        <div class="summary-item">
          <span>Bebidas Libres:</span>
          <strong>${formatCurrency(cost)}</strong>
        </div>`;
    }

    // 2. Barra Móvil Coctelería 4hs
    if (srvBarInput && srvBarInput.checked && !srvBarInput.disabled) {
      const cost = parseFloat(activeConfigs.srv_bar_price) * guestCount;
      additionalTotal += cost;
      selectedAddonsList.push(`Barra Móvil Libre 4hs (${guestCount} pers.)`);
      dynamicHtml += `
        <div class="summary-item">
          <span>Barra Móvil:</span>
          <strong>${formatCurrency(cost)}</strong>
        </div>`;
    }

    // 3. Vajilla y Mantelería
    if (srvTablewareInput && srvTablewareInput.checked && !srvTablewareInput.disabled) {
      const cost = parseFloat(activeConfigs.srv_tableware_price) * guestCount;
      additionalTotal += cost;
      selectedAddonsList.push(`Alquiler Vajilla/Mantelería (${guestCount} pers.)`);
      dynamicHtml += `
        <div class="summary-item">
          <span>Vajilla y Mantelería:</span>
          <strong>${formatCurrency(cost)}</strong>
        </div>`;
    }

    // 4. Sonido y DJ (Fijo)
    if (srvSoundInput && srvSoundInput.checked && !srvSoundInput.disabled) {
      const cost = parseFloat(activeConfigs.srv_sound_price);
      additionalTotal += cost;
      selectedAddonsList.push(`DJ y Sonido básico`);
      dynamicHtml += `
        <div class="summary-item">
          <span>Sonido y DJ (Fijo):</span>
          <strong>${formatCurrency(cost)}</strong>
        </div>`;
    }

    // 5. Gazebo Estructural (Fijo)
    if (srvGazeboInput && srvGazeboInput.checked && !srvGazeboInput.disabled) {
      const cost = parseFloat(activeConfigs.srv_gazebo_price);
      additionalTotal += cost;
      selectedAddonsList.push(`Gazebo Estructural 6x3m`);
      dynamicHtml += `
        <div class="summary-item">
          <span>Gazebo Estructural (Fijo):</span>
          <strong>${formatCurrency(cost)}</strong>
        </div>`;
    }

    // 6. Pantalla 120" y proyector (Fijo)
    if (srvScreenInput && srvScreenInput.checked && !srvScreenInput.disabled) {
      const cost = parseFloat(activeConfigs.srv_screen_price);
      additionalTotal += cost;
      selectedAddonsList.push(`Pantalla 120" y Proyector`);
      dynamicHtml += `
        <div class="summary-item">
          <span>Pantalla y Proyector (Fijo):</span>
          <strong>${formatCurrency(cost)}</strong>
        </div>`;
    }

    // 7. Fotografía Digital Profesional (Fijo)
    if (srvPhotoInput && srvPhotoInput.checked && !srvPhotoInput.disabled) {
      const cost = parseFloat(activeConfigs.srv_photo_price);
      additionalTotal += cost;
      selectedAddonsList.push(`Fotografía Profesional`);
      dynamicHtml += `
        <div class="summary-item">
          <span>Fotografía Digital (Fijo):</span>
          <strong>${formatCurrency(cost)}</strong>
        </div>`;
    }

    // 8. Cantidad de Juegos de Living (livingQty * srv_living_price)
    if (srvLivingQtySelect && !srvLivingQtySelect.disabled) {
      const qty = parseInt(srvLivingQtySelect.value);
      if (qty > 0) {
        const cost = qty * parseFloat(activeConfigs.srv_living_price);
        additionalTotal += cost;
        selectedAddonsList.push(`${qty} Juego(s) de Living`);
        dynamicHtml += `
          <div class="summary-item">
            <span>${qty} Juegos de Living:</span>
            <strong>${formatCurrency(cost)}</strong>
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
    
    if (srvDrinksInput) srvDrinksInput.addEventListener('change', calculateBudget);
    if (srvBarInput) srvBarInput.addEventListener('change', calculateBudget);
    if (srvTablewareInput) srvTablewareInput.addEventListener('change', calculateBudget);
    if (srvSoundInput) srvSoundInput.addEventListener('change', calculateBudget);
    if (srvGazeboInput) srvGazeboInput.addEventListener('change', calculateBudget);
    if (srvScreenInput) srvScreenInput.addEventListener('change', calculateBudget);
    if (srvPhotoInput) srvPhotoInput.addEventListener('change', calculateBudget);
    if (srvLivingQtySelect) srvLivingQtySelect.addEventListener('change', calculateBudget);
  }

  // Botón enviar cotización a WhatsApp
  if (btnCalcWhatsApp) {
    btnCalcWhatsApp.addEventListener('click', () => {
      const results = calculateBudget();
      
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
- *Monto Estimado:* ${formatCurrency(results.grandTotal)}

*Condición de Pago de interés:* Contado Efectivo (10% Desc.) / Financiación Propia.
¿Me podrían confirmar disponibilidad de agenda? ¡Muchas gracias!`;

      const waUrl = `https://wa.me/549${activeConfigs.contact_phone1}?text=${encodeURIComponent(waMessage)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }


  /* ==========================================================================
     6. Condiciones de Contratación (Acordeón FAQs)
     ========================================================================== */
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(headerEl => {
    headerEl.addEventListener('click', () => {
      const isExpanded = headerEl.getAttribute('aria-expanded') === 'true';
      const itemBody = headerEl.nextElementSibling;

      accordionHeaders.forEach(otherHeader => {
        if (otherHeader !== headerEl) {
          otherHeader.setAttribute('aria-expanded', 'false');
          otherHeader.classList.remove('active');
          otherHeader.nextElementSibling.style.maxHeight = null;
        }
      });

      headerEl.setAttribute('aria-expanded', !isExpanded);
      headerEl.classList.toggle('active');

      if (!isExpanded) {
        itemBody.style.maxHeight = itemBody.scrollHeight + "px";
      } else {
        itemBody.style.maxHeight = null;
      }
    });
  });


  /* ==========================================================================
     7. Vinculación de botones de tarjeta de servicios al cotizador
     ========================================================================== */
  const serviceCtaBtns = document.querySelectorAll('.service-btn');
  const contactFormEventSelect = document.getElementById('frm-event');
  
  serviceCtaBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetEvent = btn.getAttribute('data-event');
      
      if (eventTypeSelect) {
        if (targetEvent === 'casamiento') {
          eventTypeSelect.value = 'parrillada';
        } else {
          eventTypeSelect.value = 'diente-libre';
        }
        calculateBudget();
      }
      
      if (contactFormEventSelect) {
        if (targetEvent === 'casamiento') contactFormEventSelect.value = 'Casamiento';
        else if (targetEvent === 'cumpleaños') contactFormEventSelect.value = 'Cumpleaños';
        else if (targetEvent === 'general') contactFormEventSelect.value = 'Empresarial';
      }

      const calcSection = document.getElementById('calculadora');
      if (calcSection) {
        e.preventDefault();
        window.scrollTo({
          top: calcSection.offsetTop - 85,
          behavior: 'smooth'
        });
      }
    });
  });


  /* ==========================================================================
     8. Formulario de Contacto
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('frm-name').value;
      const phone = document.getElementById('frm-phone').value;
      const email = document.getElementById('frm-email').value;
      const eventType = contactFormEventSelect.options[contactFormEventSelect.selectedIndex].text;
      const date = document.getElementById('frm-date').value;
      const guests = document.getElementById('frm-guests').value;
      const msg = document.getElementById('frm-msg').value;

      const contactMessage = `¡Hola La Juntada! Les dejo mis datos cargados desde el formulario web de consultas comerciales.

*Datos del Solicitante:*
- *Nombre y Apellido:* ${name}
- *Teléfono:* ${phone}
- *Email:* ${email}
- *Tipo de Evento:* ${eventType}
- *Fecha Tentativa:* ${date}
- *Invitados Estimados:* ${guests} personas
- *Detalles / Mensaje:* ${msg}`;

      const waUrl = `https://wa.me/549${activeConfigs.contact_phone1}?text=${encodeURIComponent(contactMessage)}`;
      
      // Mostrar Modal de Éxito
      const successModal = document.createElement('div');
      successModal.style.position = 'fixed';
      successModal.style.top = '0';
      successModal.style.left = '0';
      successModal.style.width = '100%';
      successModal.style.height = '100%';
      successModal.style.backgroundColor = 'rgba(18, 13, 11, 0.8)';
      successModal.style.backdropFilter = 'blur(10px)';
      successModal.style.zIndex = '3000';
      successModal.style.display = 'flex';
      successModal.style.alignItems = 'center';
      successModal.style.justifyContent = 'center';
      successModal.style.animation = 'fadeIn 0.3s ease';

      successModal.innerHTML = `
        <div style="background-color: white; padding: 40px; border-radius: 24px; text-align: center; max-width: 450px; width: 90%; box-shadow: 0 20px 40px rgba(0,0,0,0.2); border: 1px solid #ebdcd5;">
          <div style="width: 70px; height: 70px; background-color: #fdf1ed; color: #e05326; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 2rem;">
            <i class="fa-solid fa-circle-check"></i>
          </div>
          <h3 style="font-size: 1.6rem; font-weight: 800; color: #1d1715; margin-bottom: 15px;">¡Consulta Recibida!</h3>
          <p style="color: #483d39; font-size: 0.95rem; line-height: 1.6; margin-bottom: 25px;">Tus datos fueron cargados. Para enviarle el presupuesto formal a Sánchez Leonardo, te redireccionaremos a WhatsApp para finalizar la consulta.</p>
          <button id="modal-redirect-btn" style="background-color: #25d366; color: white; border: none; padding: 14px 28px; border-radius: 50px; font-weight: 700; width: 100%; font-size: 1rem; box-shadow: 0 8px 16px rgba(37,211,102,0.2); cursor: pointer; transition: all 0.3s;">
            <i class="fa-brands fa-whatsapp"></i> Enviar por WhatsApp
          </button>
        </div>`;

      document.body.appendChild(successModal);

      document.getElementById('modal-redirect-btn').addEventListener('click', () => {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
        successModal.remove();
      });

      contactForm.reset();
    });
  }

  // Cargar configuración de Supabase al iniciar
  loadSupabaseConfigs();

});
