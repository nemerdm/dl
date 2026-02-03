<!-- markdownlint-disable MD024 -->

# STATIC_CHANGELOG

## [0.5.0] - 2026-02-03

### Dodano

- **Zunifikowany System Zmiennych CSS dla Sekcji:**
  - `--bg-section` (97% opacity) - główne tło sekcji z widocznością blobów
  - `--bg-section-alt` - alternatywne tło dla zebra striping
  - `--bg-section-glass` (85% opacity) - tło dla efektu glassmorphism
  - `--border-section` - jednolite obramowanie sekcji

### Zmieniono

- **`.dl-section-glass`**: Zaktualizowano do użycia zmiennych CSS, blur zmniejszony z 30px do 20px
- **Nowe klasy**: `.dl-section`, `.dl-section--alt`, `.dl-section--no-border-*`
- **Zgodność z P13**: Eliminacja hardcoded wartości kolorów

## [0.4.0] - 2026-02-03

### Dodano

- **Premium Blob Effect z Parallax** - globalny system dekoracyjnych blobów z efektem 3D:
  - **Globalne pozycjonowanie:** Bloby na poziomie `<body>` z `position: fixed` - brak ucinania na granicach sekcji
  - **Efekt Parallax:** Bloby poruszają się z różną prędkością przy scrollowaniu (`data-parallax`)
  - **Glass Effect Sections:** Nowa klasa `.dl-section-glass` z `backdrop-filter: blur(20px)`
  - **Moduł `parallax.js`:** Wydajny skrypt z `requestAnimationFrame`
- **System klas `.dl-blob`** - reużywalne komponenty CSS:
  - **Rozmiary:** `--sm`, `--md`, `--lg`, `--xl` (300-600px)
  - **Kolory Dark:** `--coral` (#F53844), `--indigo` (#6366f1)
  - **Kolory Light:** `--blue` (#4CA9DF), `--mint` (#2dd4bf)

### Zmieniono

- **Sekcja Usługi:** Zamieniono `bento-section-bg` na `dl-section-glass` dla efektu glassmorphism
- **Zgodność z P48:** System używa prefiksu `dl-` dla wszystkich klas
- **Modernizacja Tailwind CSS v4:** Zaktualizowano wszystkie klasy do nowoczesnej składni:
  - Gradienty: `bg-gradient-to-*` → `bg-linear-to-*`
  - Z-index: `z-[9999]` → `z-9999`
  - Important modifier: `!px-6` → `px-6!`
  - Utility: `flex-shrink-0` → `shrink-0`

## [0.3.1] - 2026-02-03

### Naprawiono

- **Cookie Banner**: Naprawiono baner zgody na cookies, który nie znikał po kliknięciu "Akceptuj":
  - Dodano brakujące style CSS dla `#cookie-consent-banner` i `.show` class
  - Animacja slide-up/slide-down działa poprawnie
  - Persystencja cookie działa - baner nie pojawia się po odświeżeniu
- **Mega Menu (Oferta)**: Naprawiono zagęszczenie elementów w rozwijalnym menu nawigacji:
  - Dodano `min-width: 600px` dla lepszego rozkładu 3-kolumnowego
  - Zwiększono padding kontenera (`1.5rem`) i elementów (`1.25rem`)
  - Dodano hover effect `translateY(-2px)` dla lepszej interakcji
  - Połączono zduplikowane deklaracje CSS `.mega-menu`

### Zmieniono

- **Refaktoryzacja CSS**: Uporządkowano strukturę `.mega-menu` i `.mega-menu-item` zgodnie z `THEME_SYSTEM.md`:
  - Dodano komentarze strukturalne (`/* Layout */`, `/* Glass Effect */`)
  - Ujednolicono składnię kolorów (`rgba()` zamiast `rgb() / %`)
  - Zachowano pattern `html:not(.dark)` dla Light Mode override

## [0.3.0] - 2025-12-20

### Zmieniono

- **Visual Polish**: Zestandaryzowano zaokrąglenia (`border-radius`) na całej stronie:
  - Karty i kontenery: `rounded-4xl`
  - Elementy nawigacyjne i mniejsze kontenery: `rounded-2xl`
  - Przyciski (toggle, icon wrappers): `rounded-full`
- **Typografia**: Ujednolicono zaokrąglenia w elementach bloga i słownika.
- **Konsystencja**: Poprawiono spójność wizualną przycisków motywu (`theme-toggle`) we wszystkich plikach.

### Naprawiono

- **Linting**: Usunięto niespójności w klasach Tailwind (np. `rounded-lg` vs `rounded-2xl`).

## [0.2.1] - 2025-12-19

### Zmieniono

- **CSS Organization**: Uporządkowano numerację sekcji w `css/style.css`:
  - Naprawiono zduplikowaną numerację (2x sekcja 13, 2x 2.1)
  - Zmieniono 7.1, 10.5 na "(cont.)" dla spójności
  - Dodano spis treści z 21 sekcjami i numerami linii
  - Plik ma teraz spójną numerację 1-21

## [0.2.0] - 2025-12-19

### Naprawiono

- **System Motywów**: Przywrócono działający `css/style.css` z backupu po nieudanej próbie refaktoryzacji klas adaptacyjnych.
  - Usunięto 30 eksperymentalnych klas (`form-input`, `text-adaptive-*`, `btn-adaptive-*`, etc.) które powodowały problemy z przełączaniem motywów.
  - System motywów ponownie działa poprawnie na wszystkich podstronach.

### Dodano

- **Dokumentacja**: Utworzono `docs/THEME_SYSTEM.md` - kompletny przewodnik po systemie przełączania motywów:
  - Architektura (`:root` dark default + `html.light-theme` override)
  - Lista wszystkich zmiennych CSS z wartościami dla obu motywów
  - Wzorce użycia w HTML (`index.html`, `kontakt.html`)
  - Checklist dla nowych komponentów
  - Ostrzeżenie o nieużywaniu Tailwind `dark:` klas

### Usunięto

- Usunięto `css/style_bc.css` (plik backupu - już niepotrzebny po przywróceniu)

## [0.1.0] - 2025-12-18

### Dodano

- Dodano nowe klasy użytkowe w `css/style.css` (`.w-dl-contact`, `.h-dl-contact`, `.w-dl-menu`, `.h-dl-menu`) w celu wyeliminowania arbitralnych wartości w Tailwind.

### Zmieniono

- Zaktualizowano `index.html` oraz `polityka-prywatnosci.html` w celu naprawy ostrzeżeń lintera dotyczących starszej składni Tailwind (np. `bg-[var(...)]` -> `bg-(...)`).
- **Wycofano** zmiany wprowadzające składnię Tailwind v4 (np. `bg-linear-to-r`, `px-6!`), ponieważ projekt korzysta z wersji v3 via CDN. Przywrócono kompatybilną składnię (np. `bg-gradient-to-r`).

### Naprawiono

- **RWD & Typografia** (Wdrożenie standardów H2 2025):
  - Skalibrowano płynną typografię (`clamp`), eliminując problem "ogromnych fontów".
  - Wdrożono **Bento Grid** w sekcji usług z ujednoliconą typografią (usunięto niestabilne skalowanie `cqi`, wprowadzono spójne rozmiary `rem` dla wszystkich kart).
  - Zastosowano **Golden Breath** spacing (płynne odstępy sekcji oparte na złotej proporcji).
- **BUG FIX**: Naprawiono "rozsypaną" stopkę poprzez korektę CSS Grid (`col-span`).
- **BUG FIX**: Naprawiono regresję typografii (zbyt duży tekst, niespójne rozmiary w kartach).
- Rozwiązano problem błędów renderowania po próbie migracji do składni Tailwind v4.
