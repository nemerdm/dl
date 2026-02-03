# Architektura Strony Statycznej DrawLab

## Przegląd

**Nazwa Projektu:** `drawlab-statyczna`
**Typ:** Strona Statyczna (HTML5, CSS3, ES6+ Modules)
**Cel:** Wysokowydajna, dostępna i wizualnie premium strona internetowa dla agencji kreatywnej.
**Hosting:** Hosting statyczny (np. Netlify, Vercel, FTP/Apache/Nginx).

## Stos Technologiczny

### Technologie Bazowe

- **HTML5:** Semantyczny markup HTML z silnym naciskiem na Dostępność (WCAG 2.1 AA) i SEO.
- **CSS3:**
  - **Tailwind CSS v4.0 (Alpha):** Używany przez `@tailwindcss/cli` do buildów oraz `@tailwindcss/browser` CDN do szybkiego dewelopmentu.
  - **Custom CSS Variables:** Szerokie wykorzystanie zmiennych CSS do motywów (Kolory, Typografia, Odstępy).
  - **Vanilla CSS:** Złożone komponenty (Bento Grid, Animacje, Sekcja Hero) są stylowane w `css/style.css`.
- **JavaScript:**
  - **Vanilla ES6+:** Brak frameworka (React/Vue/Angular) używanego w runtime.
  - **ES Modules (ESM):** Logika jest podzielona na modułowe pliki w `js/modules/` i importowana przez `<script type="module">`.
  - **Brak Build Step dla JS:** Przeglądarki ładują moduły natywnie.

### Biblioteki Zewnętrzne (CDN)

- **Tailwind CSS Play CDN:** `https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4` (Używany w `index.html` dla dev/demo).
- **Vanilla Tilt:** `vanilla-tilt.min.js` (Używany do efektów tilt 3D na kartach).
- **Google Fonts:** `Inter` (sans-serif) i `Unbounded` (display).
- **Simple Icons:** Ikony SVG ładowane przez CDN (np. w marquee Tech Stack).

### Narzędzia Deweloperskie

- **Menedżer Pakietów:** `npm`
- **Serwer Deweloperski:** `live-server` (Hot reloading, lokalny dewelopment).
- **Linting i Formatowanie:**
  - `eslint` (Linting JavaScript)
  - `stylelint` (Linting CSS)
  - `prettier` (Formatowanie kodu)
  - `html-validator` (Audyt HTML)

## Struktura Katalogów

```text
drawlab-statyczna/
├── assets/                 # Obrazy, ikony i media statyczne
├── css/
│   ├── style.css           # Główny arkusz stylów (Bento, Animacje, Nadpisania)
│   └── (tailwind.css)      # (Domniemany) Źródło dla buildu Tailwind CLI
├── docs/                   # Dokumentacja (Architektura, System Motywów, Logi zmian)
├── js/
│   └── modules/            # ES Modules (Główna logika)
│       ├── main.js         # Punkt wejścia (importuje moduły funkcjonalne)
│       ├── animations.js   # Animacje przewijania i wejścia
│       ├── theme.js        # Logika przełączania trybu Ciemny/Jasny
│       ├── cursor.js       # Implementacja customowego kursora
│       ├── components.js   # Logika reużywalnych komponentów UI
│       └── ... (forms.js, cookies.js, itp.)
├── node_modules/           # Zależności deweloperskie (nie są deployowane)
├── index.html              # Główna strona lądowania (Landing Page)
├── (inne pliki .html)      # Podstrony (kontakt.html, oferta.html, itp.)
├── package.json            # Konfiguracja projektu i skrypty
└── ... (pliki config)      # .eslintrc, .prettierrc, itp.
```

## Kluczowe Pliki Konfiguracyjne

- **`package.json`**: Definiuje `npm run dev`, skrypty lintowania (`lint:js`, `validate:css`) oraz formatowanie.
- **`css/style.css`**: "Serce" customowego designu. Zawiera:
  - Zmienne `:root` dla kolorów i płynnej typografii.
  - Złożone animacje (`@keyframes fadeInUp`, `shine`).
  - Definicje układu Bento Grid.
  - Klasy użytkowe Glassmorphism (`.glass-effect`).
- **`index.html`**:
  - Ładuje Tailwind przez CDN (Runtime).
  - Ładuje `css/style.css` (Customowe nadpisania).
  - Inicjuje JS przez `<script type="module" src="js/modules/main.js">`.
  - Zawiera nadpisania w bloku `<style>` dla Critical CSS.

## Przepływ Pracy (Workflow)

1.  **Instalacja:** `npm install` (Instaluje linter, formatter, live-server).
2.  **Start Serwera Dev:** `npm run dev` (Uruchamia `live-server` na porcie 3000).
3.  **Budowanie CSS (Opcjonalne/Prod):** `npm run build:css` (Kompiluje Tailwind do statycznego CSS używając CLI).
4.  **Linting:** `npm run test` (Uruchamia walidator HTML, Stylelint i ESLint).

## System Designu i Motywy

- **Kolory:** Zdefiniowane w zmiennych CSS (`--dl-cyan`, `--dl-purple`, `--bg-color`).
- **Typografia:** System Fluid Typography używający `clamp()` (Zmienne: od `--font-size-xs` do `--font-size-5xl`).
- **Tryb Ciemny:** Oparty na klasach (`html.dark` vs `html.light-theme`). Przełączany przez `js/modules/theme.js`.
