/**
 * @fileoverview Moduł Kursora
 * @description Obsługuje niestandardowy animowany kursor (kropka + obwódka) z efektami hover.
 *              Aktywuje się tylko na urządzeniach bez dotyku z precyzyjnym wskaźnikiem.
 * @module cursor
 * @exports {Function} initCursor - Inicjalizuje funkcjonalność niestandardowego kursora
 */

/**
 * Inicjalizuje animację niestandardowego kursora i efekty hover.
 * Pomija inicjalizację na urządzeniach dotykowych dla lepszego UX mobilnego.
 */
export function initCursor() {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  const body = document.body;

  // Pomiń na urządzeniach dotykowych (mobile/tablet)
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

  if (!cursorDot || !cursorOutline || isTouchDevice) {
    return;
  }

  // Aktywuj stylowanie niestandardowego kursora (ukrywa kursor systemowy)
  body.classList.add('js-cursor-active');

  // Stan pozycji kursora
  let mouseX = 0;
  let mouseY = 0;
  let outlineX = 0;
  let outlineY = 0;

  // Śledź pozycję myszy
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Płynna animacja kursora używając requestAnimationFrame
  const animateCursor = () => {
    // Kropka podąża za myszą dokładnie
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;

    // Obwódka podąża z wygładzeniem (lerp)
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;

    requestAnimationFrame(animateCursor);
  };

  requestAnimationFrame(animateCursor);

  // Pokaż kursor natychmiast i aktualizuj przy zdarzeniach myszy
  // (sam mouseenter nie zadziała gdy mysz jest już wewnątrz dokumentu przy ładowaniu strony)
  body.classList.add('cursor-visible');

  // Obsługa widoczności przy opuszczaniu/wchodzeniu do okna przeglądarki
  document.addEventListener('mouseleave', () => body.classList.remove('cursor-visible'));
  document.addEventListener('mouseenter', () => body.classList.add('cursor-visible'));

  // Efekt hover na interaktywnych elementach
  const interactiveElements = document.querySelectorAll(
    'a, button, .project-card, .service-card, .blog-card, .process-card, .faq-item'
  );

  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => body.classList.add('cursor-interact'));
    el.addEventListener('mouseleave', () => body.classList.remove('cursor-interact'));
  });
}
