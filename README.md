# Design Portfolio

Four brand-inspired landing pages built from `DESIGN.md` specifications — a study in how much visual language a single markdown file can encode.

[![Deployed on Cloudflare Pages](https://img.shields.io/badge/deployed-Cloudflare%20Pages-F38020?logo=cloudflare&logoColor=white)](https://pages.cloudflare.com)
[![Built with Claude Code](https://img.shields.io/badge/built%20with-Claude%20Code-D97757)](https://claude.com/claude-code)
[![DESIGN.md spec](https://img.shields.io/badge/spec-DESIGN.md-000000)](https://getdesign.md)
[![License MIT](https://img.shields.io/badge/license-MIT-blue.svg)](#license)

---

## Live Demos

| Site | Aesthetic | What makes it distinct | Live URL |
|---|---|---|---|
| **Heartwood** | Inspired by **Lovable** | Warm parchment canvas `#f7f4ed`, humanist Bricolage Grotesque display, opacity-driven grayscale, inset-shadow buttons, AI prompt-card hero | [heartwood-demo.pages.dev](https://heartwood-demo.pages.dev) |
| **Tessera** | Inspired by **Ollama** | Pure grayscale — zero chromatic colour, SF Pro Rounded via system font stack, binary radius system (12 px containers / 9999 px pills), zero shadows | [tessera-demo.pages.dev](https://tessera-demo.pages.dev) |
| **Orbital** | Inspired by **SpaceX** | Full-viewport cinematic photography as the interface, universal uppercase with positive letter-spacing (0.96 px → 1.17 px), a single ghost button as all chrome | [orbital-demo.pages.dev](https://orbital-demo.pages.dev) |
| **Volare** | Inspired by **Lamborghini** | True black canvas `#000000`, Lamborghini Gold `#FFC000` reserved for primary CTAs only, Archivo Neo-Grotesk at 120 px display, zero border-radius | [volare-demo.pages.dev](https://volare-demo.pages.dev) |

### Volare — a deeper build

Volare is the only site in the portfolio with more than a single landing page. It models a full marque site, with shared chrome and a drilldown menu overlay loaded from a single JS module:

| Page | Pattern |
|---|---|
| [`index.html`](./volare/index.html) | Cinematic hero with Ken Burns motion, model lineup, stats strip, news grid, heritage closer |
| [`models.html`](./volare/models.html) | Sidebar model picker + variant tabs + floating car photo + live spec-sheet swap |
| [`contact.html`](./volare/contact.html) | Dark full-viewport hero transitioning into white customer-care sections with black `+` action buttons |
| [`motorsport.html`](./volare/motorsport.html) | Squadra Corse hero, season stats, 2026 race calendar, works-drivers grid |
| [`store.html`](./volare/store.html) | 3-slide carousel hero, 8-product accessories grid, collection strip |
| [`menu.js`](./volare/menu.js) + [`common.css`](./volare/common.css) | Full-screen menu overlay: 3×3 primary tile grid + secondary link grid + category sub-views; the Models sub-view is a working two-pane drilldown with variant tabs and a car preview |

---

## Built With

- **[Claude Code](https://claude.com/claude-code)** — authored end-to-end in a single developer session
- **[getdesign.md](https://getdesign.md)** — every site is seeded from a `DESIGN.md` installed via `npx getdesign@latest add <brand>`
- **Vanilla HTML, CSS, and JavaScript** — no frameworks, no build step, every page ships as a standalone file
- **[Cloudflare Pages](https://pages.cloudflare.com)** — four separate projects, global edge distribution, deployed via `wrangler pages deploy`
- **[Unsplash](https://unsplash.com)** — all photography; every photo ID is `curl -I` verified for HTTP 200 before being committed

---

## How It Works

Each subdirectory is seeded with a `DESIGN.md` file that describes a visual system — palette with hex codes, typography hierarchy with sizes and letter-spacing, component rules, layout grid, do's and don'ts.

```bash
mkdir heartwood && cd heartwood
npx getdesign@latest add lovable        # installs DESIGN.md for the Lovable aesthetic
# hand the DESIGN.md to a developer (or to Claude Code) and build to spec
# then ship:
npx wrangler@latest pages project create heartwood-demo --production-branch main
npx wrangler@latest pages deploy . --project-name heartwood-demo
```

No shared framework, no common chrome. Each site is its own world — the only consistency across them is that each one obeys its own `DESIGN.md` without crossing the wires. Fonts, colours, radii, spacing scales, and shadow philosophies are intentionally incompatible from site to site.

---

## Project Structure

```
design-portfolio/
├── heartwood/        # Lovable aesthetic — DESIGN.md + index.html
├── tessera/          # Ollama aesthetic — DESIGN.md + index.html
├── orbital/          # SpaceX aesthetic — DESIGN.md + index.html
└── volare/           # Lamborghini aesthetic — 5 pages + common.css + menu.js
```

---

## Running Locally

No build. Open any `index.html` directly in a browser, or serve the root:

```bash
python3 -m http.server 8000 --directory .
# then visit http://localhost:8000/heartwood/
```

---

## License

MIT. `DESIGN.md` files are sourced from [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) (MIT). Each `DESIGN.md` is explicitly *inspired by* — not affiliated with — the brand it references.
