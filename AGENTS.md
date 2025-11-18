# Meshum Marketing Website

## Project Overview

**Meshum** — Connect your knowledge. Unblock your teams.

A unified knowledge layer for software organizations. Multi-source knowledge graph with AI team personas orchestrating cross-team workflows. Learn more at [meshum.dev](https://meshum.dev).

## Build/Test/Lint Commands

- **Development**: `bun run dev`
- **Build**: `bun run build`
- **Preview**: `bun run preview`
- **Typecheck**: `bunx tsc --noEmit` (uses strict Astro config)

## Code Style Guidelines

- **Package manager**: Use `bun` (`bun.lock` present)
- **Imports**: Relative imports for local files, absolute from node_modules
- **Types**: Strict TypeScript with explicit interfaces/types, export types with `type` keyword
- **Formatting**: Prettier with Astro and Tailwind plugins, consistent tab indentation
- **File structure**: Pages in `src/pages/`, components in `src/components/`, layouts in `src/layouts/`, utils in `src/lib/`
- **Styling**: Tailwind CSS with Meshum design tokens
- **Props**: Use interface for component props, destructure in function signature

## Meshum Brand Guidelines

### Colors (OKLCH)
- **Primary**: `oklch(62% 0.25 310)` — Purple (`#9F5FFF`)
- **Accent**: `oklch(58% 0.24 200)` — Cyan (`#06B6D4`)
- **Dark BG**: `oklch(15% 0.05 254)` — Dark blue-gray
- **Text**: `oklch(95% 0.01 254)` — Off-white
- **Text Secondary**: `oklch(70% 0.08 254)` — Light gray

### Gradient
Primary-to-Accent: `linear-gradient(135deg, #9F5FFF → #06B6D4)`

### Logo
- File: `logo.svg`
- Style: Minimalist geometric circles with gradient
- Usage: Header, footer, social, favicon

### Typography
- Modern sans-serif (Inter, Poppins preferred)
- Heading: Bold, clear hierarchy
- Body: Clean, readable, professional tone

### Tone & Voice
Direct, clarity-focused, no buzzwords. Speak to real problems (wasted meetings, scattered knowledge). Confident but not arrogant.

## Key Pages (TBD)

- **Home**: Pitch, problem/solution, CTA (Request Demo, See How It Works)
- **Problem**: Detailed breakdown of developer time waste, cross-team friction
- **Solution**: How Meshum solves it (knowledge graph, AI personas, workflows)
- **Features**: Core capabilities, use cases
- **Pricing**: Per-team-per-month model (SaaS)
- **Docs/Blog**: Technical deep-dives, implementation guides

## Framework Notes

- Astro 5.x static site generator
- Zero JavaScript by default (add only where needed)
- Static export for deployment anywhere