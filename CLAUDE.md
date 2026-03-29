# NIPPON NITES – Claude Code Context

## Projektübersicht
Shopify-Theme für **NIPPON NITES** – Tokyo Underground Streetwear Brand.
Design-Ästhetik: "Neon Brutalist" — dark, high-contrast, editorial.

## Repository
- **GitHub:** https://github.com/pabloesteves91/nipponnitestheme
- **Branch:** `main`
- **Shopify:** verbunden via GitHub Integration (auto-deploy bei push)

---

## Design System

### Farben
| Token | Hex | Verwendung |
|---|---|---|
| `primary` | `#ffb4a9` | Akzente, Badges, Links |
| `primary-container` | `#fb5a48` | CTA-Gradient (Ende) |
| `on-primary-fixed` | `#410000` | Text auf Primary-Buttons |
| `surface` | `#131313` | Seiten-Hintergrund |
| `surface-container-low` | `#1b1b1b` | Sections-Hintergrund |
| `surface-container-high` | `#2a2a2a` | Cards |
| `surface-container-highest` | `#353535` | Modals, Chips |
| `tertiary-container` | `#909191` | Subtext |
| `outline-variant` | `#5a403d` | Ghost Borders |

### Typografie
- **Headlines:** `Space Grotesk` — font-black, uppercase, tracking-tighter
- **Body:** `Inter` — font-normal, leading-relaxed
- **Labels:** `Space Grotesk` — tracking-[0.2em], uppercase

### Design-Regeln ("Neon Brutalist")
- ❌ Keine border-radius (alles `0px`)
- ❌ Keine klassischen Schatten — nur `box-shadow: 0 32px 64px rgba(0,0,0,0.5)`
- ❌ Keine Trennlinien — Sektionen durch Farbschicht trennen
- ✅ Glassmorphism für Nav: `bg-[#131313]/70 backdrop-blur-xl`
- ✅ CTA-Gradient: `bg-gradient-to-r from-primary to-primary-container`
- ✅ Outline-Text: `-webkit-text-stroke: 2px #ffb4a9`
- ✅ Bilder dürfen aus dem Viewport bleed
- ✅ Asymmetrische Layouts bevorzugen

---

## Dateistruktur

```
nipponnitestheme/
├── assets/
│   ├── theme.css          ← Globale Styles & Komponenten-Klassen
│   └── global.js          ← Cart-Updates, Mobile-Menu, Add-to-Cart UX
├── config/
│   ├── settings_schema.json   ← Theme-Editor Einstellungen
│   └── settings_data.json     ← Default-Werte
├── layout/
│   └── theme.liquid       ← Master-Template (Fonts, Tailwind, Header/Footer)
├── locales/
│   └── en.default.json    ← Übersetzungen
├── sections/
│   ├── announcement-bar.liquid
│   ├── header.liquid
│   ├── hero.liquid              ← Fullscreen Hero (Stitch-Design)
│   ├── featured-duo.liquid      ← Tokyo Drift 2-Produkte editorial
│   ├── passion-banner.liquid    ← "PASSION IS NOT A CRIME" Banner
│   ├── featured-collection.liquid
│   ├── main-product.liquid      ← Editoriale PDP (Stitch-Design)
│   ├── main-collection.liquid
│   └── footer.liquid
├── snippets/              ← (leer, bereit für Erweiterungen)
└── templates/
    ├── index.json         ← Homepage: hero → featured-duo → passion → collection
    ├── product.json       ← PDP: main-product
    └── collection.json    ← PLP: main-collection
```

---

## Was bereits gebaut ist

### Sektionen (aus Stitch konvertiert)
- ✅ `hero.liquid` — Fullscreen mit Hintergrundbild, Outline-Text, Badge, 2x CTA
- ✅ `featured-duo.liquid` — 2 Produkte im 4:5 editorial mit Hover-Overlay
- ✅ `passion-banner.liquid` — Grosses Typo-Banner mit Hintergrund-Watermark
- ✅ `main-product.liquid` — 12-Col Grid, Sticky Sidebar, Varianten-Picker, Accordion
- ✅ `header.liquid` — Sticky, Glassmorphism, Mobile-Menu, Cart-Badge
- ✅ `footer.liquid` — 3-Spalten, Social Links, Newsletter-Input, Legal

### Noch nicht gebaut (Stitch-Screens vorhanden)
- ⬜ `cart-drawer.liquid` — Slide-out Cart (Stitch: `shopping_cart_slide_out`)
- ⬜ `main-collection.liquid` — PLP mit Masonry-Grid (Stitch: `all_hoodies_plp`)
- ⬜ `page-brand-story.liquid` — About/Story Page (Stitch: `brand_story_our_passion`)
- ⬜ `page-contact.liquid` — Kontaktseite (Stitch: `contact_support`)
- ⬜ `page-checkout.liquid` — Checkout (Stitch: `secure_checkout`)
- ⬜ `custom-hoodie.liquid` — Custom Configurator (Stitch: `custom_hoodie_landing_page`)

---

## Stitch-Screens (ZIP exportiert)
Alle HTML-Files liegen lokal vor (aus `stitch_product_detail_page.zip`):

| Screen | Datei | Status |
|---|---|---|
| Homepage Redesign | `homepage_redesign/code.html` | ✅ Konvertiert |
| Product Detail Page | `product_detail_page/code.html` | ✅ Konvertiert |
| All Hoodies PLP | `all_hoodies_plp/code.html` | ⬜ Ausstehend |
| Shopping Cart Slide-out | `shopping_cart_slide_out/code.html` | ⬜ Ausstehend |
| Secure Checkout | `secure_checkout/code.html` | ⬜ Ausstehend |
| Brand Story | `brand_story_our_passion/code.html` | ⬜ Ausstehend |
| Contact & Support | `contact_support/code.html` | ⬜ Ausstehend |
| Custom Hoodie | `custom_hoodie_landing_page/code.html` | ⬜ Ausstehend |
| Design System | `night_runner/DESIGN.md` | ✅ Referenz |

---

## Workflow

### Änderung vornehmen
```bash
# Datei bearbeiten, dann:
git add .
git commit -m "Beschreibung der Änderung"
git push
# → Shopify deployed automatisch
```

### Neue Sektion aus Stitch-HTML konvertieren
1. HTML aus `/stitch_product_detail_page/[screen]/code.html` lesen
2. `<head>` und `<nav>` entfernen (kommen aus `layout/theme.liquid`)
3. Statische Bilder durch `{{ product.featured_image | img_url: ... }}` ersetzen
4. Statische Texte durch `section.settings.*` ersetzen
5. `{% schema %}` Block anhängen
6. In `/sections/` speichern
7. In `/templates/*.json` referenzieren

### Neue Seite hinzufügen
```
templates/page.[name].json  ← Template
sections/page-[name].liquid ← Inhalt
```

---

## Wichtige Hinweise
- Tailwind via CDN (nicht kompiliert) — nur Core-Klassen verwenden
- Keine externen JS-Libraries ausser Google Fonts + Material Symbols
- Alle Liquid-Filter Standard Shopify 2.0
- `content_for_header` und `content_for_layout` nicht entfernen
- Bilder immer mit `| img_url: 'WIDTHxHEIGHT'` und `| escape` für alt-Text
