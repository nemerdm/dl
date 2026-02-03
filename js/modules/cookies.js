/**
 * @fileoverview Moduł Zgody na Cookies
 * @description Obsługuje baner zgody na cookies z funkcjonalnością akceptacji/odrzucenia.
 *              Używa cookies (nie localStorage) do przechowywania preferencji użytkownika.
 * @module cookies
 * @exports {Function} initCookieBanner - Inicjalizuje baner zgody na cookies
 */

/**
 * Ustawia cookie z określoną nazwą, wartością i czasem wygaśnięcia.
 * @param {string} name - Nazwa cookie
 * @param {string} value - Wartość cookie
 * @param {number} days - Dni do wygaśnięcia
 * @private
 */
function setCookie(name, value, days) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/; SameSite=Lax; Secure';
}

/**
 * Pobiera wartość cookie po nazwie.
 * @param {string} name - Nazwa cookie
 * @returns {string|null} - Wartość cookie lub null jeśli nie znaleziono
 * @private
 */
function getCookie(name) {
  const nameEQ = name + '=';
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  return null;
}

/**
 * Inicjalizuje baner zgody na cookies.
 * Pokazuje baner jeśli nie istnieje cookie zgody, ukrywa po decyzji użytkownika.
 */
export function initCookieBanner() {
  const cookieBanner = document.getElementById('cookie-consent-banner');
  const acceptBtn = document.getElementById('accept-cookies');
  const declineBtn = document.getElementById('decline-cookies');

  if (!cookieBanner || !acceptBtn || !declineBtn) {
    return;
  }

  // Pokaż baner jeśli brak zapisanej zgody
  if (!getCookie('cookie_consent')) {
    setTimeout(() => {
      cookieBanner.classList.add('show');
    }, 1500);
  }

  // Obsługa akceptacji
  acceptBtn.addEventListener('click', () => {
    setCookie('cookie_consent', 'accepted', 365);
    cookieBanner.classList.remove('show');
  });

  // Obsługa odrzucenia
  declineBtn.addEventListener('click', () => {
    setCookie('cookie_consent', 'declined', 365);
    cookieBanner.classList.remove('show');
  });
}
