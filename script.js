/* ==========================================================================
   JavaScript - La Juntada Eventos
   Lógica interactiva: Menú, Carrusel, Galería Filtrable, Lightbox, Cotizador y Formularios
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

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

  // Hacer scroll suave para botones "Contactar"
  const navContactBtn = document.querySelector('.nav-link-btn');
  if (navContactBtn) {
    navContactBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(navContactBtn.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }


  /* ==========================================================================
     2. Carrusel / Slider de Fotos
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
    slideInterval = setInterval(nextSlide, 5000); // Cambiar cada 5 segundos
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

  // Soporte para swipe táctil en carrusel
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
      nextSlide(); // Deslizar izquierda -> siguiente
      resetInterval();
    } else if (endX - startX > threshold) {
      prevSlide(); // Deslizar derecha -> anterior
      resetInterval();
    }
  }

  startAutoPlay();


  /* ==========================================================================
     3. Galería de Fotos con Filtros y Lightbox Modal
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
    document.body.style.overflow = 'hidden'; // Evitar scroll de fondo
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

  // Teclas de dirección para Lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextLightbox();
    if (e.key === 'ArrowLeft') prevLightbox();
  });


  /* ==========================================================================
     4. Cotizador de Presupuestos Interactivo
     ========================================================================== */
  const eventTypeSelect = document.getElementById('event-type');
  const guestCountInput = document.getElementById('guest-count');
  const guestCountVal = document.getElementById('guest-count-val');
  const srvDrinks = document.getElementById('srv-drinks');
  const srvTableware = document.getElementById('srv-tableware');
  const srvDecor = document.getElementById('srv-decor');
  const srvSound = document.getElementById('srv-sound');
  
  const sumBase = document.getElementById('sum-base');
  const dynamicSummaryItems = document.getElementById('dynamic-summary-items');
  const calcTotal = document.getElementById('calc-total');
  const btnCalcWhatsapp = document.getElementById('btn-calc-whatsapp');

  // Formateador de moneda (Pesos Argentinos / General)
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  function calculateBudget() {
    const selectedOption = eventTypeSelect.options[eventTypeSelect.selectedIndex];
    const basePricePerPerson = parseFloat(selectedOption.getAttribute('data-base'));
    const guestCount = parseInt(guestCountInput.value);
    
    // Actualizar valor numérico del slider
    guestCountVal.textContent = guestCount;
    
    const baseCateringTotal = basePricePerPerson * guestCount;
    sumBase.textContent = `${formatCurrency(baseCateringTotal)} (${guestCount} invitados)`;
    
    let additionalTotal = 0;
    let dynamicHtml = '';
    
    // Adicional 1: Barra Libre
    if (srvDrinks.checked) {
      const drinksCost = parseFloat(srvDrinks.getAttribute('data-cost')) * guestCount;
      additionalTotal += drinksCost;
      dynamicHtml += `
        <div class="summary-item">
          <span>Barra Libre Premium:</span>
          <strong>${formatCurrency(drinksCost)}</strong>
        </div>`;
    }
    
    // Adicional 2: Vajilla
    if (srvTableware.checked) {
      const tablewareCost = parseFloat(srvTableware.getAttribute('data-cost')) * guestCount;
      additionalTotal += tablewareCost;
      dynamicHtml += `
        <div class="summary-item">
          <span>Alquiler de Vajilla Completa:</span>
          <strong>${formatCurrency(tablewareCost)}</strong>
        </div>`;
    }
    
    // Adicional 3: Decoración (Fijo)
    if (srvDecor.checked) {
      const decorCost = parseFloat(srvDecor.getAttribute('data-cost'));
      additionalTotal += decorCost;
      dynamicHtml += `
        <div class="summary-item">
          <span>Ambientación y Luces (Fijo):</span>
          <strong>${formatCurrency(decorCost)}</strong>
        </div>`;
    }
    
    // Adicional 4: Sonido (Fijo)
    if (srvSound.checked) {
      const soundCost = parseFloat(srvSound.getAttribute('data-cost'));
      additionalTotal += soundCost;
      dynamicHtml += `
        <div class="summary-item">
          <span>Sonido, DJ e Iluminación (Fijo):</span>
          <strong>${formatCurrency(soundCost)}</strong>
        </div>`;
    }
    
    dynamicSummaryItems.innerHTML = dynamicHtml;
    
    const grandTotal = baseCateringTotal + additionalTotal;
    calcTotal.textContent = formatCurrency(grandTotal);

    return {
      eventType: selectedOption.text.split(' ($')[0],
      guestCount,
      grandTotal,
      addons: {
        drinks: srvDrinks.checked,
        tableware: srvTableware.checked,
        decor: srvDecor.checked,
        sound: srvSound.checked
      }
    };
  }

  // Listeners para la calculadora
  if (eventTypeSelect && guestCountInput) {
    eventTypeSelect.addEventListener('change', calculateBudget);
    guestCountInput.addEventListener('input', calculateBudget);
    srvDrinks.addEventListener('change', calculateBudget);
    srvTableware.addEventListener('change', calculateBudget);
    srvDecor.addEventListener('change', calculateBudget);
    srvSound.addEventListener('change', calculateBudget);
    
    // Cálculo inicial
    calculateBudget();
  }

  // Botón enviar cotización a WhatsApp
  if (btnCalcWhatsapp) {
    btnCalcWhatsapp.addEventListener('click', () => {
      const results = calculateBudget();
      
      let addonText = '';
      if (results.addons.drinks) addonText += '\n- Barra Libre Premium';
      if (results.addons.tableware) addonText += '\n- Alquiler de Vajilla Completa';
      if (results.addons.decor) addonText += '\n- Ambientación y Luces';
      if (results.addons.sound) addonText += '\n- Sonido, DJ e Iluminación';
      if (!addonText) addonText = ' Ninguno';

      const waNumber = '5491123456789'; // Número ficticio de WhatsApp
      const waMessage = `¡Hola La Juntada! Coticé mi evento en su sitio web y me interesa recibir un presupuesto formal.

*Detalles de mi Evento:*
- *Tipo:* ${results.eventType}
- *Cantidad de Invitados:* ${results.guestCount} personas
- *Servicios Adicionales:* ${addonText}
- *Total Estimado:* ${formatCurrency(results.grandTotal)}

¿Podrían indicarme disponibilidad y pasos a seguir? ¡Muchas gracias!`;

      const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }


  /* ==========================================================================
     5. Vinculación de tarjetas de servicio con cotizador y contacto
     ========================================================================== */
  const serviceCtaBtns = document.querySelectorAll('.service-btn');
  const contactFormEventSelect = document.getElementById('frm-event');
  
  serviceCtaBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetEvent = btn.getAttribute('data-event'); // 'casamiento', 'cumpleaños', 'general'
      
      // 1. Pre-seleccionar en la calculadora
      if (eventTypeSelect) {
        eventTypeSelect.value = targetEvent;
        calculateBudget();
      }
      
      // 2. Pre-seleccionar en el formulario de contacto si es posible
      if (contactFormEventSelect) {
        if (targetEvent === 'casamiento') contactFormEventSelect.value = 'Casamiento';
        else if (targetEvent === 'cumpleaños') contactFormEventSelect.value = 'Cumpleaños';
        else if (targetEvent === 'general') contactFormEventSelect.value = 'Empresarial';
      }

      // 3. Scroll suave directo al cotizador
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
     6. Formulario de Contacto
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

      // Generar mensaje de confirmación/Redirigir a WhatsApp (opcional pero muy directo)
      const waNumber = '5491123456789';
      const contactMessage = `¡Hola La Juntada! Les dejo mis datos de contacto para coordinar un presupuesto para mi evento.

*Mis Datos:*
- *Nombre:* ${name}
- *Teléfono:* ${phone}
- *Email:* ${email}
- *Evento:* ${eventType}
- *Fecha:* ${date}
- *Invitados:* ${guests} personas
- *Mensaje:* ${msg}`;

      const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(contactMessage)}`;
      
      // Alert premium antes de redirigir
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
          <h3 style="font-size: 1.6rem; font-weight: 800; color: #1d1715; margin-bottom: 15px;">¡Mensaje Recibido!</h3>
          <p style="color: #483d39; font-size: 0.95rem; line-height: 1.6; margin-bottom: 25px;">Tu consulta ha sido procesada. Para agilizar el presupuesto, te redireccionaremos a WhatsApp para chatear directamente con nosotros.</p>
          <button id="modal-redirect-btn" style="background-color: #25d366; color: white; border: none; padding: 14px 28px; border-radius: 50px; font-weight: 700; width: 100%; font-size: 1rem; box-shadow: 0 8px 16px rgba(37,211,102,0.2); cursor: pointer; transition: all 0.3s;">
            <i class="fa-brands fa-whatsapp"></i> Abrir Chat de WhatsApp
          </button>
        </div>`;

      document.body.appendChild(successModal);

      document.getElementById('modal-redirect-btn').addEventListener('click', () => {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
        successModal.remove();
      });

      // Resetear el formulario
      contactForm.reset();
    });
  }

});
