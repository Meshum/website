# Meshum Design Language

Design language for the Meshum marketing site rebuild. Built on the fixed `@theme` tokens in `src/styles/meshum.css` (Tailwind v4). This document is the source of truth for the frontend implementation phase.

**Product in one line:** governance and distribution platform for AI tooling (MCP servers, skills, agents) — self-hosted, one control plane per org. Audience: skeptical platform/infra/security engineers and eng leadership at 10–500-person companies.

**Design north star:** it must read as *infrastructure you'd trust with your permission boundaries*, not as a consumer AI app or a growth-stage SaaS landing page.

---

## 1. Visual personality

**Instrument-grade. Structural. Quietly technical.**

Meshum should feel like a well-built control panel: precise, legible, confident, with restraint that signals competence. The visual language borrows from the tools our audience already respects — terminals, dashboards, network topology views, permission matrices — but rendered with editorial polish rather than raw utilitarianism.

**Distinct from generic dev-tool / SaaS sites:** no rounded-everything pastel cards floating on a soft gradient, no cartoon isometric illustrations, no "trusted by" logo soup as the primary proof device. We lead with structure — grids, lines, monospace labels, real UI fragments — over decoration.

**Distinct from generic "AI startup" sites:** no purple→cyan neon gradients, no glowing orbs as the main event, no anthropomorphic AI mascots, no dark-mode-with-blur-everything aesthetic. Meshum's relationship to AI is *governance*, not magic. The visual tone is that of the platform team keeping things sane — calm, orderly, in control — not the hype cycle.

The teal-green primary against cool slate neutrals is the differentiator: it reads as technical and grounded (closer to a terminal accent or a healthy-status green) rather than trendy. Lean into that.

---

## 2. Color usage patterns

Core palette is fixed (see `meshum.css`). This section governs *application*.

### The 80/20 rule, made concrete

At least **80% of any viewport is neutral**: `bg-page`, `bg-surface`, `bg-elevated`, `border`, and the `foreground`/`muted`/`subtle` text ramp. The remaining **~20% (realistically closer to 10%) is chroma** — `primary` / `accent-text`.

Concretely, per section:
- **One** primary-colored focal element max (a CTA, one highlighted metric, one active node in a diagram).
- Body copy is **never** colored. Links and inline emphasis use `accent-text`, sparingly.
- Icons default to `muted`/`subtle`, not primary. Promote an icon to primary only when it is the semantic subject of that block.
- Borders do the structural work that color does on lesser sites. Reach for `border`/`border-subtle` before reaching for a fill.

### The gradient (teal-green → dark slate, bottom-left → top-right)

Reserve for **brand moments only**, per brand guidelines:
- The hero (behind or within it — see motifs).
- The final pre-footer CTA band.
- The brandmark itself.
- Occasionally: one premium/pricing card, or a "control plane" hero visual.

Never use the gradient as a section background repeated down the page, never behind body text, never on buttons as a default. Rule of thumb: **if the gradient appears more than twice on a page, remove one.**

Gradient should be **subtle and dark-anchored** — the slate end dominates, teal-green is the highlight edge. Avoid a 50/50 rainbow sweep.

### Additional semantic tokens (proposed extensions — do not conflict with core)

Add these to `meshum.css` under a clearly-commented "Extensions" block. Values given for both themes.

```css
/* Code / terminal surfaces — deliberately darker than bg-surface in
   BOTH themes so code reads as a distinct, embedded artifact. */
--color-code-bg:        oklch(24% 0.02 220);   /* light + dark: near-slate */
--color-code-foreground: oklch(92% 0.01 165);
--color-code-border:    oklch(30% 0.02 220);

/* Status / semantic (governance context: allow / deny / pending / info) */
--color-success: oklch(62% 0.08 165);   /* == primary; "allowed" == on-brand */
--color-danger:  oklch(58% 0.13 25);     /* muted red-orange; "denied/blocked" */
--color-warning: oklch(72% 0.10 75);     /* amber; "pending / needs review" */
--color-info:    oklch(60% 0.06 240);    /* cool blue; neutral annotation */

/* Diagram / topology strokes */
--color-node-stroke:   var(--color-border);
--color-edge:          oklch(70% 0.03 220 / 0.4);
--color-edge-active:   var(--color-primary);

/* Gradient stops (single source of truth for the brand gradient) */
--gradient-brand: linear-gradient(
  45deg,
  oklch(62% 0.08 165) 0%,     /* teal-green, bottom-left */
  oklch(32% 0.02 220) 70%     /* dark slate, top-right */
);
```

Notes:
- **`success == primary` is intentional**: in a governance product, "allowed / healthy" *is* the brand-positive state. Green already means "go."
- `danger` is desaturated on purpose — this is not an alarm dashboard; a screaming red would break the calm. It should read "blocked," not "error."
- Status colors are for **badges, permission states, and diagram accents** — never for large fills.

### Dark vs light default

**Follow the visitor's system preference (`prefers-color-scheme`), no manual toggle, no forced default.** Ship both themes as first-class — design every component in both from the start, don't retrofit — but let the OS decide which one a visitor sees.

---

## 3. Typography scale

Syne (`font-heading`) for display, Lexend (`font-body`) for everything readable, JetBrains Mono (`font-technical`) for code, labels, and data. Per brand guidelines: display letter-spacing `-2%` at 48px+, line-height 1.1–1.2 display / 1.5–1.6 body / 1.4–1.5 code.

Fluid scale using `clamp()` where noted. `rem` assumes 16px base.

| Role | Font | Size | Weight | Line-height | Letter-spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| **Hero / display** | Syne | `clamp(2.75rem, 5vw, 4.5rem)` | 700 | 1.05 | -0.02em | One per page. |
| **H1 / page title** | Syne | `clamp(2.25rem, 4vw, 3.25rem)` | 700 | 1.1 | -0.02em | |
| **H2 / section** | Syne | `clamp(1.75rem, 3vw, 2.5rem)` | 600 | 1.15 | -0.015em | |
| **H3 / subsection** | Syne | `1.5rem` | 600 | 1.2 | -0.01em | |
| **H4 / card title** | Syne | `1.25rem` | 500 | 1.25 | -0.01em | |
| **Body large / lede** | Lexend | `1.25rem` | 400 | 1.55 | 0 | Hero subhead, section intros. `text-muted` OK here. |
| **Body** | Lexend | `1.0625rem` (17px) | 400 | 1.6 | 0 | Default paragraph. 17px reads more considered than 16. |
| **Body small** | Lexend | `0.9375rem` | 400 | 1.55 | 0 | Captions, footnotes → `text-subtle`. |
| **Eyebrow / kicker** | JetBrains Mono | `0.8125rem` | 500 | 1.4 | 0.08em | UPPERCASE. Section labels — a signature device (see motifs). |
| **Code / inline** | JetBrains Mono | `0.9375rem` | 400 | 1.5 | 0 | |
| **Code block** | JetBrains Mono | `0.875rem` | 400 | 1.5 | 0 | |
| **Label / badge** | JetBrains Mono | `0.75rem` | 500 | 1.3 | 0.04em | Pills, tags, status. |

**Rules:**
- Never set Syne below 1.25rem or above weight 700. Its quirk (the `g`) is charming at display sizes and noisy at body sizes.
- Measure (line length): cap body text at **~68ch** (`max-w-[68ch]` / `max-w-prose`). Ledes can go wider, ~50ch for punch.
- Lexend weights on this site: 300 (rare, large ledes only), 400 (body), 500 (UI/nav), 600 (emphasis). Don't bold body copy with 700.
- The **mono eyebrow above section headings** is the primary typographic signature — it does a lot of "this is a technical product" work cheaply.

---

## 4. Layout & spacing system

### Container strategy

- **Content max-width: `1200px`** (`max-w-[1200px]`), centered, with `px-6` mobile / `px-8` tablet / `px-0` at container edge on desktop.
- **Prose max-width: `68ch`** for any long-form text column.
- **Wide/bleed max-width: `1440px`** for hero visuals, full-width diagrams, and the gradient CTA band. Full-bleed backgrounds (borders, gradient) may extend edge-to-edge, but their *content* stays within `1200px`.
- Establish a `.container` utility, don't hand-roll widths per section.

### Grid

- Base on a **12-column grid**, `gap-6` (24px) desktop, `gap-4` mobile.
- Feature/benefit rows: 12-col split as 7/5 or 6/6 (text + visual). Alternate the side down the page.
- Card groups: 3-up desktop → 2-up tablet → 1-up mobile. For 4 items use 2×2, not a cramped 4-up.

### Spacing scale

Use Tailwind's default (4px base). Standardize on this subset — don't use in-between values:

`4, 8, 12, 16, 24, 32, 48, 64, 96, 128` px → (`1, 2, 3, 4, 6, 8, 12, 16, 24, 32`).

- **In-component** padding: cards `p-6`/`p-8`; buttons `px-5 py-2.5`.
- **Intra-section** rhythm (heading→body→content): `space-y-4` to `space-y-6`.

### Section rhythm (long marketing page)

This is what makes a long page feel composed rather than endless:

- **Vertical section padding: `py-24` desktop (`96px`), `py-16` mobile.** Hero and final CTA get `py-32`.
- **Alternate section backgrounds** to create rhythm without color: `bg-page` → `bg-surface` → `bg-page`. Never two adjacent sections with the same fill *and* no divider.
- **Hairline dividers** (`border-t border-border-subtle`) between same-fill sections. These thin lines are on-brand (structural, precise).
- Every content section: **mono eyebrow → Syne H2 → one-line muted lede → content.** Consistent header block down the whole page.
- Give the hero and the pre-footer CTA the most breathing room; middle sections can be denser.

---

## 5. Signature visual motifs

Concrete, reusable devices tied to the product domain. Aim to establish 3–4 and repeat them — recurrence is what makes a brand feel designed.

### Motif A — The grid/mesh substrate ("mesh" in Meshum)

A faint background lattice that evokes a mesh/network and a technical blueprint.

- Implementation: CSS `background-image` with two `linear-gradient`s forming a grid, or a tiled SVG. Cell size ~`32px`. Color: `border-subtle` at very low opacity (e.g. `oklch(... / 0.04)`).
- Use behind the hero and *occasionally* one mid-page band — not everywhere.
- Optional enhancement: a radial `mask-image` fades the grid out toward edges so it never competes with text.
- This replaces the "blurred gradient orbs" currently in `index.astro`. **Retire the orbs** — they read generic-AI. If any glow remains, it's a single soft primary highlight at the gradient's teal corner, not floating blobs.

```css
.mesh-bg {
  background-image:
    linear-gradient(to right, var(--color-border-subtle) 1px, transparent 1px),
    linear-gradient(to bottom, var(--color-border-subtle) 1px, transparent 1px);
  background-size: 32px 32px;
  -webkit-mask-image: radial-gradient(ellipse at center, black 40%, transparent 85%);
  mask-image: radial-gradient(ellipse at center, black 40%, transparent 85%);
}
```

### Motif B — The permission matrix / tool-access grid

The most product-specific device. Meshum's core is *which tools, which servers, who's allowed*. Represent this literally as a small grid of cells:

- Rows = MCP servers (or roles/teams); columns = tools; cells = state.
- Cell states use the status tokens: `success` (allowed, filled dot or check), `danger` (blocked, hollow/dash), `warning` (pending review).
- Style: monospace row/column labels, hairline `border` grid, generous cell padding. Reads as a real config surface, not an infographic.
- Recurs as: the hero visual, a feature-section illustration, and shrunk into card corners as a texture.

### Motif C — Control-plane topology / node-edge diagram

For "one control plane per org" and distribution concepts.

- A central node (the Meshum control plane — `primary` stroke, `elevated` fill) with edges radiating to leaf nodes (developers, MCP servers, agents — `border` stroke, `surface` fill).
- Edges: thin `edge` strokes; the *active/governed* path highlights in `edge-active` (primary).
- Keep it **orthogonal or gently curved**, laid on the mesh grid — engineered, not organic. Label nodes in mono.
- Nodes are simple rounded-rect chips (`rounded-md`), not glossy spheres.

### Motif D — Mono labels & bracket annotations

A lightweight recurring texture, cheap to apply:

- UPPERCASE mono eyebrows on every section (see typography).
- Bracketed/annotated tags — e.g. `[ self-hosted ]`, `mcp://server/tool`, `v0.0.1`, `AGPL-3.0` — rendered in JetBrains Mono `subtle`.
- Small mono metadata rows under headings (`// governance · telemetry · distribution`).
- This is how we signal "technical product" without illustration. Use it to caption diagrams and label cards.

**Iconography style:** thin-stroke (1.5px) line icons, geometric, consistent grid (Lucide/Phosphor line set). Never filled, never duotone, never gradient-filled. Icon default color `muted`; promote to `primary` only for the one focal icon per block.

---

## 6. Component patterns

### Buttons

- **Primary CTA:** solid `bg-primary`, `text-page` (dark text on teal in light mode — verify contrast; in dark mode use near-black text on teal). `rounded-lg`, `px-5 py-2.5`, `font-body` weight 500. Hover: subtle brightness/lift (see motion). This is the *only* solid-primary element in most viewports.
- **Secondary:** `border border-border`, `bg-transparent`, `text-foreground`. Hover: `bg-surface` / `border` darkens.
- **Ghost / tertiary:** text + optional mono arrow `→`, `text-muted` → `text-foreground` on hover. Good for "Read the docs."
- **Radius consistency:** buttons `rounded-lg` (8px). Don't mix pill buttons with square cards.
- No gradient-filled buttons. No drop shadows on buttons beyond a whisper.

### Cards

- `bg-surface`, `border border-border`, `rounded-xl` (12px), `p-6`/`p-8`.
- Elevation via **border + a very subtle shadow**, not big blurred shadows. In dark mode, elevation reads through the `surface`/`elevated` lightness step, not shadow.
- Hover (if interactive): border shifts to `border` → primary-tinted, or a 1px inset primary top-border appears. Subtle.
- Optional signature: a mono label pinned top-left, or a faint corner fragment of the permission-matrix motif.
- Avoid glassmorphism (backdrop-blur + translucent fills). At most, the sticky nav may use a light backdrop blur.

### Code snippets / terminal blocks

The credibility centerpiece for this audience — invest here.

- `bg-code-bg` (dark in both themes), `text-code-foreground`, `border border-code-border`, `rounded-lg`, `p-4`/`p-5`, `font-technical` 0.875rem, line-height 1.5.
- **Window chrome header:** a top bar with three small dots *or* — more on-brand — a mono filename/label (`~/meshum/policy.yaml`) and a copy button. Prefer the labeled bar over macOS traffic-lights (less cliché).
- Syntax highlighting: restrained. Keywords `primary`, strings `warning`/amber, comments `subtle`, punctuation `muted`. Never a rainbow theme — highlight complements brand (per guidelines).
- For CLI examples: a `$` prompt in `primary`, command in `code-foreground`, output in `subtle`. Optionally show a `meshum` prompt to reinforce product presence.
- These blocks may sit half-overlapping a section edge or float above the mesh grid as a hero visual.

### Badges / pills

- `rounded-md` (not fully rounded — matches the technical, rectangular language), `font-technical` 0.75rem, `px-2 py-0.5`, letter-spacing 0.04em.
- **Status pills:** tinted background at low opacity + solid text/dot — `bg-success/10 text-success`, `bg-danger/10 text-danger`, `bg-warning/10 text-warning`. Include a small leading dot.
- **Meta pills** (`v0.0.1`, `AGPL-3.0`, `self-hosted`): `border border-border`, `text-subtle`, no fill.
- Use pills for the "interfaces still unstable / v0.0.1" honesty signal — it builds trust with this audience.

### Nav

- Slim, `h-16`, sticky, `bg-page/80` with a light `backdrop-blur` and a bottom `border-border-subtle` that appears on scroll.
- Left: brandmark + wordmark. Center/right: 3–5 links in `font-body` 500 `text-muted` → `foreground` on hover. Active link: `text-foreground` with a mono underline or dot.
- Right end: theme toggle + one primary CTA (`Get started` / `Self-host`) + a `GitHub` ghost link with star count.
- Mobile: hamburger → full-height sheet, `bg-elevated`, links stacked large.

### Footer

- `bg-surface` (or `bg-page` with top border), generous `py-16`.
- Multi-column: Product / Docs / Company / Legal (AGPL, commercial license, privacy). Mono column headers.
- Brandmark + one-line positioning ("The AI platform team, productized.").
- Bottom row: copyright, license badges (`AGPL-3.0-or-later`, `commercial license available`), `v0.0.1`, GitHub/social — all mono, `subtle`.
- Optionally seat the footer on the faint mesh grid for closure.

---

## 7. Motion & interaction principles

Astro, mostly static, minimal JS. Motion must be achievable with **CSS + tiny vanilla/IntersectionObserver** — no animation framework.

**Principles:** motion is *functional and calm* — it confirms interaction and guides the eye, never decorates. Everything fast and subtle. This is infrastructure; it shouldn't bounce.

- **Timing:** 150–250ms for hovers, 400–600ms for scroll reveals. Easing `cubic-bezier(0.4, 0, 0.2, 1)` (standard ease-out). No spring/bounce.
- **Hover states:** color/border/opacity transitions and ≤2px translate. Cards: `translate-y-[-2px]` + border shift. Buttons: brightness + ≤1px lift. Links: color + optional underline grow.
- **Scroll reveals:** one lightweight IntersectionObserver adds `.in-view`; elements go `opacity-0 translate-y-2` → `opacity-100 translate-y-0`. Stagger children ~60ms via `transition-delay`. Reveal **once**, don't re-animate on scroll-up.
- **Diagram/topology motion:** a slow, subtle `edge-active` pulse or a dash-offset animation along one edge to imply live governance/telemetry flow — CSS `@keyframes` only, one path, slow (2–3s), respects reduced motion.
- **Page transitions:** Astro `ClientRouter` (already in `Layout.astro`) — a quick cross-fade, nothing elaborate.
- **`prefers-reduced-motion`:** honor it globally — disable reveals, translates, and pulses; keep instant color transitions.
- **No:** parallax, auto-playing carousels, cursor-follow effects, scroll-jacking, typewriter text loops, number counters that spin on load (a single subtle count-up for one hero metric is the *maximum* indulgence).

---

## 8. What to avoid

Explicit anti-patterns. If a mockup contains any of these, it's off-brand:

- **Purple→cyan / neon "AI" gradients.** Meshum is teal-green + slate. No exceptions. (The "purple" reference in the print section of the brand guidelines is a stale leftover — ignore it.)
- **Floating blurred gradient orbs/blobs** as background filler — including the two currently in `index.astro`. Replace with the mesh grid (Motif A).
- **Glassmorphism everywhere** — translucent blurred panels stacked over gradients. Permitted only for the sticky nav, subtly.
- **Consumer-AI tropes:** glowing brains, sparkles/✨, chat-bubble hero mockups, anthropomorphic robots, "magic" shimmer.
- **Generic SaaS illustration:** flat-vector isometric people, blobby spot illustrations, undraw-style scenes, 3D claymorphic icons. Use real UI fragments, diagrams, and code instead.
- **Rainbow syntax highlighting** and multi-hue dashboards — keep to brand + restrained status colors.
- **Over-rounding:** giant `rounded-3xl` pill everything. Our language is rectangular/structural; radius tops out around `rounded-xl` for cards, `rounded-lg` for buttons/code.
- **Big soft drop shadows** for elevation, especially in dark mode — use borders and the surface lightness step.
- **Color fatigue:** more than one primary-colored focal element per viewport, colored body text, primary-filled section backgrounds. Respect 80/20.
- **Logo soup as hero proof** and vague marketing superlatives ("revolutionary," "next-gen AI"). This audience distrusts hype — lead with specifics (tool-level permissions, self-hosted, telemetry, AGPL) and plain language.
- **Overusing the brand gradient** — more than ~twice per page. It's a moment, not a texture.
- **Emoji** in UI chrome or headings.
