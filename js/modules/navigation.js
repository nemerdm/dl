/**
 * @fileoverview Moduł Nawigacji
 * @description Obsługuje przełączanie menu mobilnego i rozwijane menu usług/wiedzy mobilnych.
 * @module navigation
 * @exports {Function} initNavigation - Inicjalizuje całą funkcjonalność nawigacji
 */

/**
 * Inicjalizuje menu nawigacji mobilnej i rozwijane menu.
 * Zarządza atrybutami ARIA dla dostępności.
 */
export function initNavigation() {
  initMobileMenu();
  initMobileAccordion('mobile-services-toggle', 'mobile-services-links', 'mobile-services-arrow');
  initMobileAccordion(
    'mobile-knowledge-toggle',
    'mobile-knowledge-links',
    'mobile-knowledge-arrow'
  );
}

/**
 * Inicjalizuje przełącznik mobilnego menu hamburger.
 * @private
 */
function initMobileMenu() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!mobileMenuButton || !mobileMenu) {
    return;
  }

  mobileMenuButton.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.toggle('hidden');

    if (isHidden) {
      mobileMenuButton.setAttribute('aria-expanded', 'false');
      mobileMenuButton.setAttribute('aria-label', 'Otwórz menu nawigacyjne');
    } else {
      mobileMenuButton.setAttribute('aria-expanded', 'true');
      mobileMenuButton.setAttribute('aria-label', 'Zamknij menu nawigacyjne');
    }
  });
}

/**
 * Inicjalizuje rozwijane podmenu w mobile menu (uniwersalna funkcja).
 * @param {string} toggleId - ID przycisku toggle
 * @param {string} linksId - ID kontenera z linkami
 * @param {string} arrowId - ID strzałki SVG
 * @private
 */
function initMobileAccordion(toggleId, linksId, arrowId) {
  const toggle = document.getElementById(toggleId);
  const links = document.getElementById(linksId);
  const arrow = document.getElementById(arrowId);

  if (!toggle || !links || !arrow) {
    return;
  }

  // Upewnij się, że jest zamknięte domyślnie
  links.classList.remove('links-open');
  toggle.setAttribute('aria-expanded', 'false');

  toggle.addEventListener('click', () => {
    links.classList.toggle('links-open');
    arrow.classList.toggle('rotate-180');

    const isExpanded = links.classList.contains('links-open');
    toggle.setAttribute('aria-expanded', isExpanded.toString());
  });
}
