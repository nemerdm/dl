/**
 * @fileoverview Moduł Animacji
 * @description Obsługuje animacje wyzwalane przez scroll, pasek postępu i animowany podtytuł.
 * @module animations
 * @exports {Function} initScrollAnimations - Inicjalizuje IntersectionObserver dla animacji scroll
 * @exports {Function} initProgressBar - Inicjalizuje pasek postępu przewijania
 * @exports {Function} initAnimatedSubtitle - Inicjalizuje rotację podtytułu w sekcji hero
 */

/**
 * Inicjalizuje animacje wyzwalane przez scroll używając IntersectionObserver.
 * Dodaje klasę 'is-visible' do elementów z klasą 'animate-on-scroll' gdy wchodzą w viewport.
 */
export function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if (animatedElements.length === 0) {
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  animatedElements.forEach(element => observer.observe(element));
}

/**
 * Inicjalizuje pasek postępu przewijania na górze strony.
 * Używa requestAnimationFrame dla płynnej wydajności.
 */
export function initProgressBar() {
  const progressBar = document.getElementById('scroll-progress-bar');

  if (!progressBar) {
    return;
  }

  let isScrolling = false;

  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight =
          document.documentElement.scrollHeight - document.documentElement.clientHeight;

        if (scrollHeight > 0) {
          const scrollPercent = (scrollTop / scrollHeight) * 100;
          progressBar.style.width = `${scrollPercent}%`;
        } else {
          progressBar.style.width = '0%';
        }

        isScrolling = false;
      });
      isScrolling = true;
    }
  });
}

/**
 * Inicjalizuje animowaną rotację podtytułu w sekcji hero.
 * Efekt pisania (typing) - litera po literze z kursorem.
 * Respektuje ustawienie użytkownika "prefers-reduced-motion".
 */
export function initAnimatedSubtitle() {
  const subtitles = [
    'strony internetowe zgodne ze standardami',
    'spójna identyfikacja wizualna',
    'widoczność w wynikach wyszukiwania',
    'współpraca partnerska na lata',
  ];

  let subtitleIndex = 0;
  const subtitleElement = document.getElementById('animated-subtitle');
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!subtitleElement) {
    return;
  }

  // Pomiń animację jeśli użytkownik preferuje ograniczony ruch
  if (mediaQuery.matches) {
    subtitleElement.textContent = subtitles[0];
    return;
  }

  /**
   * Wpisuje frazę litera po literze
   * @param {string} phrase - Fraza do wpisania
   */
  async function typePhrase(phrase) {
    for (let i = 0; i <= phrase.length; i++) {
      subtitleElement.textContent = phrase.substring(0, i);
      await new Promise(r => setTimeout(r, 50));
    }
  }

  /**
   * Kasuje aktualną frazę litera po literze
   */
  async function deletePhrase() {
    const currentText = subtitleElement.textContent;
    for (let i = currentText.length; i >= 0; i--) {
      subtitleElement.textContent = currentText.substring(0, i);
      await new Promise(r => setTimeout(r, 30));
    }
  }

  /**
   * Główna pętla rotatora
   */
  async function loop() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      await typePhrase(subtitles[subtitleIndex]);
      await new Promise(r => setTimeout(r, 2000)); // Pauza na odczytanie
      await deletePhrase();
      subtitleIndex = (subtitleIndex + 1) % subtitles.length;
      await new Promise(r => setTimeout(r, 500)); // Pauza przed następną frazą
    }
  }

  // Wyczyść początkowy tekst i uruchom pętlę
  subtitleElement.textContent = '';
  loop();
}
