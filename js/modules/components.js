/**
 * @fileoverview Moduł Komponentów Zewnętrznych
 * @description Inicjalizuje zewnętrzne biblioteki: Swiper (opinie), VanillaTilt i Preloader.
 *              Te biblioteki są ładowane z CDN w HTML.
 * @module components
 * @exports {Function} initPreloader - Inicjalizuje preloader strony
 * @exports {Function} initSwiper - Inicjalizuje slider opinii Swiper
 * @exports {Function} initTilt - Inicjalizuje efekt VanillaTilt na obrazach
 */

/* global Swiper, VanillaTilt */

/**
 * Inicjalizuje preloader i ukrywa go po załadowaniu strony.
 * Obsługuje przypadek gdy strona może być już załadowana przy wywołaniu funkcji.
 */
export function initPreloader() {
  const preloader = document.getElementById('preloader');

  if (!preloader) {
    return;
  }

  const hidePreloader = () => {
    preloader.classList.add('hidden');
    // Całkowite usunięcie z DOM po animacji dla pewności
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 600);
  };

  // Check states
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // Jeśli strona jest już wczytana lub interaktywna, ukryj z lekkim opóźnieniem
    setTimeout(hidePreloader, 100);
  } else {
    // W przeciwnym razie czekaj na load
    window.addEventListener('load', hidePreloader);
    // Fallback: wymuś ukrycie po 3 sekundach jeśli load nie nadejdzie
    setTimeout(hidePreloader, 3000);
  }
}

/**
 * Inicjalizuje slider opinii Swiper.
 * Sprawdza czy biblioteka Swiper jest dostępna przed inicjalizacją.
 */
export function initSwiper() {
  // Sprawdź czy Swiper jest załadowany
  // Sprawdź czy Swiper jest załadowany
  if (typeof Swiper === 'undefined') {
    // Jeśli nie ma Swipera, spróbuj poczekać na pełne załadowanie strony
    if (document.readyState !== 'complete') {
      window.addEventListener('load', initSwiper);
      return;
    }
    // Swiper not loaded - slider will be static
    return;
  }

  const testimonialSlider = document.querySelector('.testimonial-slider');

  if (!testimonialSlider) {
    return;
  }

  new Swiper('.testimonial-slider', {
    loop: false,
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
}

/**
 * Inicjalizuje efekt VanillaTilt na obrazie "O mnie".
 * Respektuje ustawienie użytkownika "prefers-reduced-motion".
 */
export function initTilt() {
  // Sprawdź czy VanillaTilt jest załadowany
  if (typeof VanillaTilt === 'undefined') {
    return;
  }

  // Respektuj preferencję ograniczonego ruchu
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const tiltImages = document.querySelectorAll('#about-me-image');

  if (tiltImages.length === 0) {
    return;
  }

  VanillaTilt.init(tiltImages, {
    max: 8,
    speed: 600,
    glare: true,
    'max-glare': 0.3,
  });
}
