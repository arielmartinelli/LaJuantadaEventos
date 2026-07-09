/* ==========================================================================
   JavaScript - La Juntada Eventos
   Lógica interactiva: Menú, Carrusel, Galería Filtrable, Lightbox, Cotizador y Formularios
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // WhatsApp de Contacto Comercial (Córdoba)
  const WHATSAPP_NUMBER = '5493516069743';

  /* ==========================================================================
     1. Navegación y Menú Mobile
     ========================================================================== */
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Cambiar fondo de la cabecera al hacer scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Activar clase active en links según la sección visible
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 120)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });

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

  // Hacer scroll suave para botones
  const scrollBtns = document.querySelectorAll('a[href^="#"]');
  scrollBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetId = btn.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  });


  /* ==========================================================================
     2. Sección Interactiva de la Carta / Menú de Opciones
     ========================================================================== */
  const menuTabBtns = document.querySelectorAll('.menu-tab-btn');
  const menuTabContents = document.querySelectorAll('.menu-tab-content');

  menuTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remover activo de botones
      menuTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Ocultar contenidos
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
  slides.forEach((_, idx) => {
    const dot = document.createElement('button');
    dot.classList.add('indicator-dot');
    if (idx === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Ir a foto ${idx + 1}`);
    dot.addEventListener('click', () => goToSlide(idx));
    indicatorsContainer.appendChild(dot);
  });

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
    if (slides.length > 0) {
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
  const eventTypeSelect = document.getElementById('event-type');
  const guestCountInput = document.getElementById('guest-count');
  const guestCountVal = document.getElementById('guest-count-val');
  const minGuestsWarning = document.getElementById('min-guests-warning');
  
  // Opciones de Adicionales
  const srvDrinks = document.getElementById('srv-drinks');
  const srvBar = document.getElementById('srv-bar');
  const srvTableware = document.getElementById('srv-tableware');
  const srvSound = document.getElementById('srv-sound');
  const srvGazebo = document.getElementById('srv-gazebo');
  const srvScreen = document.getElementById('srv-screen');
  const srvPhoto = document.getElementById('srv-photo');
  const srvLivingQtySelect = document.getElementById('srv-living-qty');
  
  const sumBase = document.getElementById('sum-base');
  const dynamicSummaryItems = document.getElementById('dynamic-summary-items');
  const calcTotal = document.getElementById('calc-total');
  const btnCalcWhatsApp = document.getElementById('btn-calc-whatsapp');

  // Formateador de moneda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  function calculateBudget() {
    if (!eventTypeSelect) return;

    const selectedOption = eventTypeSelect.options[eventTypeSelect.selectedIndex];
    const basePricePerPerson = parseFloat(selectedOption.getAttribute('data-base'));
    const guestCount = parseInt(guestCountInput.value);
    
    // Actualizar valor del slider en la burbuja
    guestCountVal.textContent = guestCount;
    
    // Validar mínimo de 50 invitados
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

    // 1. Gaseosas, cervezas y vinos (por persona)
    if (srvDrinks && srvDrinks.checked) {
      const cost = parseFloat(srvDrinks.getAttribute('data-cost')) * guestCount;
      additionalTotal += cost;
      selectedAddonsList.push(`Bebida (Vino/Cerv/Gas) (${guestCount} pers.)`);
      dynamicHtml += `
        <div class="summary-item">
          <span>Bebidas Libres (c/ alcohol):</span>
          <strong>${formatCurrency(cost)}</strong>
        </div>`;
    }

    // 2. Barra Móvil Coctelería 4hs (por persona)
    if (srvBar && srvBar.checked) {
      const cost = parseFloat(srvBar.getAttribute('data-cost')) * guestCount;
      additionalTotal += cost;
      selectedAddonsList.push(`Barra Móvil 4hs (${guestCount} pers.)`);
      dynamicHtml += `
        <div class="summary-item">
          <span>Barra Móvil (Tragos):</span>
          <strong>${formatCurrency(cost)}</strong>
        </div>`;
    }

    // 3. Vajilla y Mantelería (por persona)
    if (srvTableware && srvTableware.checked) {
      const cost = parseFloat(srvTableware.getAttribute('data-cost')) * guestCount;
      additionalTotal += cost;
      selectedAddonsList.push(`Alquiler Vajilla/Mantelería (${guestCount} pers.)`);
      dynamicHtml += `
        <div class="summary-item">
          <span>Vajilla y Mantelería:</span>
          <strong>${formatCurrency(cost)}</strong>
        </div>`;
    }

    // 4. Sonido y DJ (Fijo)
    if (srvSound && srvSound.checked) {
      const cost = parseFloat(srvSound.getAttribute('data-cost'));
      additionalTotal += cost;
      selectedAddonsList.push(`DJ y Sonido básico`);
      dynamicHtml += `
        <div class="summary-item">
          <span>Sonido y DJ (Fijo):</span>
          <strong>${formatCurrency(cost)}</strong>
        </div>`;
    }

    // 5. Gazebo Estructural (Fijo)
    if (srvGazebo && srvGazebo.checked) {
      const cost = parseFloat(srvGazebo.getAttribute('data-cost'));
      additionalTotal += cost;
      selectedAddonsList.push(`Gazebo Estructural 6x3m`);
      dynamicHtml += `
        <div class="summary-item">
          <span>Gazebo Estructural (Fijo):</span>
          <strong>${formatCurrency(cost)}</strong>
        </div>`;
    }

    // 6. Pantalla 120" y proyector (Fijo)
    if (srvScreen && srvScreen.checked) {
      const cost = parseFloat(srvScreen.getAttribute('data-cost'));
      additionalTotal += cost;
      selectedAddonsList.push(`Pantalla 120" y Proyector`);
      dynamicHtml += `
        <div class="summary-item">
          <span>Pantalla y Proyector (Fijo):</span>
          <strong>${formatCurrency(cost)}</strong>
        </div>`;
    }

    // 7. Fotografía Digital Profesional (Fijo)
    if (srvPhoto && srvPhoto.checked) {
      const cost = parseFloat(srvPhoto.getAttribute('data-cost'));
      additionalTotal += cost;
      selectedAddonsList.push(`Fotografía Profesional`);
      dynamicHtml += `
        <div class="summary-item">
          <span>Fotografía Digital (Fijo):</span>
          <strong>${formatCurrency(cost)}</strong>
        </div>`;
    }

    // 8. Cantidad de Juegos de Living (livingQty * $18000)
    if (srvLivingQtySelect) {
      const qty = parseInt(srvLivingQtySelect.value);
      if (qty > 0) {
        const cost = qty * parseFloat(srvLivingQtySelect.getAttribute('data-cost'));
        additionalTotal += cost;
        selectedAddonsList.push(`${qty} Juego(s) de Living`);
        dynamicHtml += `
          <div class="summary-item">
            <span>${qty} Juegos de Living:</span>
            <strong>${formatCurrency(cost)}</strong>
          </div>`;
      }
    }

    dynamicSummaryItems.innerHTML = dynamicHtml;
    
    const grandTotal = baseCateringTotal + additionalTotal;
    calcTotal.textContent = formatCurrency(grandTotal);

    return {
      menuName: selectedMenuName,
      guestCount,
      grandTotal,
      addons: selectedAddonsList
    };
  }

  // Listeners para la calculadora
  if (eventTypeSelect && guestCountInput) {
    eventTypeSelect.addEventListener('change', calculateBudget);
    guestCountInput.addEventListener('input', calculateBudget);
    
    if (srvDrinks) srvDrinks.addEventListener('change', calculateBudget);
    if (srvBar) srvBar.addEventListener('change', calculateBudget);
    if (srvTableware) srvTableware.addEventListener('change', calculateBudget);
    if (srvSound) srvSound.addEventListener('change', calculateBudget);
    if (srvGazebo) srvGazebo.addEventListener('change', calculateBudget);
    if (srvScreen) srvScreen.addEventListener('change', calculateBudget);
    if (srvPhoto) srvPhoto.addEventListener('change', calculateBudget);
    if (srvLivingQtySelect) srvLivingQtySelect.addEventListener('change', calculateBudget);
    
    calculateBudget();
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

      const waMessage = `¡Hola La Juntada! Realicé una cotización estimada de mi evento en su sitio web y me gustaría coordinar la fecha y los detalles.

*Detalles del Presupuesto:*
- *Menú Elegido:* ${results.menuName}
- *Invitados:* ${results.guestCount} personas ${warningText}
- *Servicios Adicionales Seleccionados:${addonsText}*
- *Monto Estimado:* ${formatCurrency(results.grandTotal)}

*Condición de Pago de interés:* Contado Efectivo (10% Desc.) / Financiación Propia.
¿Me podrían confirmar disponibilidad de agenda? ¡Muchas gracias!`;

      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;
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

      // Cerrar los demás acordeones abiertos
      accordionHeaders.forEach(otherHeader => {
        if (otherHeader !== headerEl) {
          otherHeader.setAttribute('aria-expanded', 'false');
          otherHeader.classList.remove('active');
          otherHeader.nextElementSibling.style.maxHeight = null;
        }
      });

      // Alternar estado actual
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
      const targetEvent = btn.getAttribute('data-event'); // 'casamiento', 'cumpleaños', 'general'
      
      // Pre-seleccionar opciones sugeridas en la calculadora
      if (eventTypeSelect) {
        if (targetEvent === 'casamiento') {
          eventTypeSelect.value = 'parrillada'; // Parrillada sugerido para bodas
        } else {
          eventTypeSelect.value = 'diente-libre'; // Diente libre para cumpleaños / generales
        }
        calculateBudget();
      }
      
      // Pre-seleccionar tipo en formulario de contacto
      if (contactFormEventSelect) {
        if (targetEvent === 'casamiento') contactFormEventSelect.value = 'Casamiento';
        else if (targetEvent === 'cumpleaños') contactFormEventSelect.value = 'Cumpleaños';
        else if (targetEvent === 'general') contactFormEventSelect.value = 'Empresarial';
      }

      // Scroll suave
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

      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(contactMessage)}`;
      
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
          <p style="color: #483d39; font-size: 0.95rem; line-height: 1.6; margin-bottom: 25px;">Tus datos fueron cargados. Para enviarle el presupuesto formal a Sánchez Leonardo, te redirigiremos a WhatsApp para finalizar la consulta.</p>
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

});
