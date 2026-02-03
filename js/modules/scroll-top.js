/**
 * @fileoverview Scroll Top Module (Follow Up Button)
 * @description Zarządza widocznością i funkcjonalnością przycisku "Follow Up" (Powrót na górę).
 * @module scroll-top
 */

/**
 * Inicjalizuje przycisk Follow Up
 */
export function initFollowUpButton() {
  const button = document.getElementById('follow-up-btn');

  if (!button) {
    return;
  }

  /**
   * Sprawdza pozycję scrolla i pokazuje/ukrywa przycisk
   */
  const handleScroll = () => {
    if (window.scrollY > 400) {
      button.classList.add('is-visible');
    } else {
      button.classList.remove('is-visible');
    }
  };

  /**
   * Przewija stronę na samą górę
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Listeners
  window.addEventListener('scroll', handleScroll, { passive: true });
  button.addEventListener('click', scrollToTop);

  // Initial check
  handleScroll();
}
