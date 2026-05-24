# CINEXD

> Cinematic Video Production · Jammu &amp; Nearby

A professional cinematography portfolio website for **CINEXD**, a two-person video production studio based in Jammu, J&K, specialising in cinematic commercials for car showrooms, restaurants, hotels, events and brands.

Built from scratch in pure HTML, CSS and vanilla JS — no frameworks, no build step. Open `index.html` in any modern browser and it just runs.

---

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home — hero, showreel, services preview, clients, IG feed, testimonials |
| `portfolio.html` | Filterable masonry grid of project tiles |
| `services.html` | Services, 5-step process, equipment |
| `pricing.html` | Pricing on request + WhatsApp CTA |
| `about.html` | Studio story, team, stats |
| `contact.html` | Contact form, direct lines, FAQ |

## Tech

- **HTML5** semantic structure
- **CSS3** with custom properties (design tokens) — no preprocessor
- **Vanilla JS** for cursor, nav, FAQ, portfolio filter, contact form, scroll reveals
- **Google Fonts** — Playfair Display (display) + Inter (body)

## Design System

| Token | Value |
|-------|-------|
| Background | `#ffffff` |
| Text | `#0a0a0a` |
| Secondary | `#f5f5f5` |
| Highlight | `#c9a84c` (gold) |
| Display font | Playfair Display |
| Body font | Inter |

Aesthetic: editorial, cinematic, minimal — film grain, scanlines, custom cursor, parallax hero, scroll-triggered reveals.

## File Structure

```
CINEXD/
├── index.html
├── portfolio.html
├── services.html
├── pricing.html
├── about.html
├── contact.html
├── css/
│   ├── style.css       Core stylesheet & components
│   ├── animations.css  Keyframes & entrance animations
│   └── responsive.css  Breakpoints (1024 / 768 / 480)
├── js/
│   ├── main.js         Cursor, nav, FAQ, filter, form
│   └── animations.js   Reveals, parallax, counters
└── assets/             Placeholder
```

## Configuration — Things to Update

Replace all placeholders before going live:

1. **WhatsApp number** — Search-replace `91XXXXXXXXXX` across all `.html` files with your real WhatsApp number (with country code, no `+`). Example: `919876543210`.
2. **Email** — Search-replace `hello@cinexd.com` with your real address.
3. **Team photos** — Drop into `assets/` and swap the placeholder initials in `about.html`.
4. **Portfolio thumbnails** — Replace `<div class="portfolio-thumb-text">` placeholders with `<img>` tags pointing to your real thumbnails in `assets/`.
5. **Instagram reel embeds** — Each portfolio tile and the showreel currently link to the profile (`https://www.instagram.com/cinexd_`). Swap to specific reel URLs as you publish.

## Running Locally

Just open `index.html` in any browser. That's it.

For a local dev server (recommended for fonts, etc.):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Browser Support

Modern Chrome, Firefox, Safari, Edge. Custom cursor automatically disables on touch devices.

## License

© CINEXD. All rights reserved.
