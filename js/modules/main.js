/**
 * @fileoverview Główny Punkt Wejścia
 * @description Centralny moduł importujący i inicjalizujący wszystkie pozostałe moduły.
 *              Jest to punkt wejścia ładowany przez HTML poprzez <script type="module">.
 * @module main
 */

// Import wszystkich modułów
import { initCursor } from './cursor.js';
import { initTheme } from './theme.js';
import { initScrollAnimations, initProgressBar, initAnimatedSubtitle } from './animations.js';
import { initNavigation } from './navigation.js';

import { initFAQ } from './faq.js';
import { initCookieBanner } from './cookies.js';
import { initMultiStepForm } from './forms.js';
import { initPreloader, initTilt } from './components.js';
import { initFloatingPreview } from './floating-preview.js';
import { initFollowUpButton } from './scroll-top.js';
import { initParallaxBlobs } from './parallax.js';

/**
 * Inicjalizuje wszystkie moduły gdy DOM jest gotowy.
 * Kolejność ma znaczenie dla niektórych inicjalizacji (np. preloader powinien być pierwszy).
 */
function initializeApp() {
  // === Główne Komponenty UI ===
  initPreloader(); // Animacja ładowania strony
  initTheme(); // Przełącznik motywu ciemny/jasny
  initCursor(); // Niestandardowy kursor (tylko desktop)

  // === Nawigacja ===
  initNavigation(); // Menu mobilne i rozwijane menu

  // === Animacje ===
  initScrollAnimations(); // Animacje wyzwalane przez scroll
  initProgressBar(); // Wskaźnik postępu przewijania
  initAnimatedSubtitle(); // Rotacja podtytułu w sekcji hero
  initParallaxBlobs(); // Efekt parallax dla globalnych blobów

  // === Komponenty Interaktywne ===
  initFAQ(); // Akordeon FAQ (logika klikania)
  initCookieBanner(); // Zgoda na cookies GDPR
  initMultiStepForm(); // Kreator formularza briefu

  // === Zewnętrzne Biblioteki ===
  initTilt(); // Efekt 3D tilt na obrazach

  // === Portfolio V2 (Floating Preview) ===
  initFloatingPreview(); // Pływający podgląd projektu

  // === UI Extras ===
  initFollowUpButton(); // Przycisk powrotu na górę "Follow Up"
}

// Czekaj aż DOM będzie gotowy
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  // DOM jest już gotowy
  initializeApp();
}
