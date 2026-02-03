/**
 * @fileoverview Moduł Przełącznika Motywu
 * @description Obsługuje przełączanie motywu jasny/ciemny z zapisem w localStorage.
 *              Współpracuje z Tailwind v4 (darkMode: 'class' via @custom-variant).
 * @module theme
 * @exports {Function} initTheme - Inicjalizuje funkcjonalność przełącznika motywu
 */

/**
 * Inicjalizuje przycisk przełącznika motywu i stosuje zapisany motyw z localStorage.
 * Zarządza widocznością ikon słońca/księżyca w zależności od aktualnego motywu.
 */
export function initTheme() {
  // Funkcja pomocnicza do pobierania ikon (są w dynamicznym navbarze)
  const getIcons = () => ({
    darkIcon: document.getElementById('theme-toggle-dark-icon'),
    lightIcon: document.getElementById('theme-toggle-light-icon'),
  });

  /**
   * Ustawia motyw na podstawie parametru.
   * @param {boolean} isDark - true = ciemny motyw, false = jasny motyw
   */
  const setTheme = isDark => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const { darkIcon, lightIcon } = getIcons();

    // Ikony: w trybie ciemnym pokazujemy słońce (light icon), w jasnym księżyc (dark icon)
    if (lightIcon) {
      lightIcon.classList.toggle('hidden', isDark);
    }
    if (darkIcon) {
      darkIcon.classList.toggle('hidden', !isDark);
    }
  };

  // Zastosuj zapisany motyw przy ładowaniu (domyślnie ciemny)
  const savedTheme = localStorage.getItem('theme');
  const isDark = savedTheme !== 'light'; // dark jest domyślny
  setTheme(isDark);

  // Obsługa kliknięcia przełącznika (Event Delegation dla dynamicznie ładowanej nawigacji)
  document.addEventListener('click', event => {
    const toggleBtn = event.target.closest('#theme-toggle');
    if (!toggleBtn) return;

    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    const newIsDark = !isCurrentlyDark;

    setTheme(newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  });
}
