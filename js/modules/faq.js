/**
 * @fileoverview Moduł Akordeonu FAQ
 * @description Obsługuje funkcjonalność rozwijania/zwijania sekcji FAQ z obsługą dostępności i logiką exclusive accordion (tylko jeden otwarty).
 * @module faq
 * @exports {Function} initFAQ - Inicjalizuje akordeon FAQ
 */

/**
 * Inicjalizuje funkcjonalność akordeonu FAQ.
 * Wykorzystuje natywne elementy <details> i <summary>.
 * Zapewnia, że tylko jeden element jest otwarty naraz.
 */
/**
 * Inicjalizuje funkcjonalność akordeonu FAQ.
 * Wykorzystuje Event Delegation, aby obsługiwać elementy ładowane dynamicznie.
 */
export function initFAQ() {
  document.addEventListener('click', e => {
    // Sprawdź czy kliknięto w element <summary> wewnątrz <details class="faq-card">
    const summary = e.target.closest('details.faq-card summary');

    if (!summary) return;

    const targetDetail = summary.parentElement; // Element <details>

    // Jeśli otwieramy element (kliknięcie następuje przed zmianą atrybutu open przez przeglądarkę)
    if (!targetDetail.hasAttribute('open')) {
      // Znajdź wszystkie otwarte karty FAQ
      const allDetails = document.querySelectorAll('details.faq-card[open]');

      // Zamknij pozostałe
      allDetails.forEach(detail => {
        if (detail !== targetDetail) {
          detail.removeAttribute('open');
        }
      });
    }
  });
}
