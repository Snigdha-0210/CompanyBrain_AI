---
name: InsightOS
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#434655'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#515f74'
  on-secondary: '#ffffff'
  secondary-container: '#d5e3fc'
  on-secondary-container: '#57657a'
  tertiary: '#005a82'
  on-tertiary: '#ffffff'
  tertiary-container: '#0074a6'
  on-tertiary-container: '#e4f2ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#d5e3fc'
  secondary-fixed-dim: '#b9c7df'
  on-secondary-fixed: '#0d1c2e'
  on-secondary-fixed-variant: '#3a485b'
  tertiary-fixed: '#c9e6ff'
  tertiary-fixed-dim: '#89ceff'
  on-tertiary-fixed: '#001e2f'
  on-tertiary-fixed-variant: '#004c6e'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  code:
    fontFamily: monospace
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 0.25rem
  sm: 0.5rem
  md: 1rem
  lg: 1.5rem
  xl: 2rem
  gutter: 1.5rem
  margin: 2rem
  max-width: 1440px
---

## Brand & Style

The design system is engineered for high-stakes enterprise environments where clarity, precision, and trust are paramount. It adopts a **Minimalist-Modern** aesthetic that prioritizes information density without sacrificing visual breathing room. 

The personality is executive yet accessible—drawing inspiration from the systematic rigor of Linear and the approachable utility of Notion. The UI evokes a sense of "quiet intelligence," using subtle refinements rather than loud visual effects to guide the user. Every element serves a functional purpose, utilizing intentional whitespace and a disciplined color application to reduce cognitive load for power users.

## Colors

The color palette is anchored in a professional "Enterprise Blue" primary, supported by a sophisticated range of slate grays for text and structural elements. 

- **Background & Surface:** Use `#F8FAFC` for the application canvas to create a soft contrast against `#FFFFFF` component surfaces. This separation helps define hierarchy without heavy shadows.
- **Functional Colors:** Success, Warning, and Danger colors are calibrated for high legibility on light backgrounds, ensuring critical status indicators are immediately recognizable.
- **Accents:** Use the Info blue (`#0EA5E9`) sparingly for non-interactive data visualizations or subtle highlights to distinguish from primary action states.

## Typography

This design system utilizes a dual-font strategy to balance technical precision with readability. **Geist** is employed for headings and labels to provide a sharp, modern, and slightly technical feel. **Inter** handles the body copy, ensuring maximum legibility for long-form data and complex interfaces.

- **Scale:** Typographic hierarchy is tight. Avoid massive jumps in size; use weight (Medium/SemiBold) to denote importance within high-density views.
- **Tracking:** Apply slight negative letter-spacing to Geist headings (`-0.01em` to `-0.02em`) to enhance the "premium" feel.
- **Case:** Labels (`label-sm`) can occasionally use uppercase with 5% letter spacing for tertiary metadata or section headers in sidebars.

## Layout & Spacing

The layout follows a **Fixed-Fluid hybrid** model. While the dashboard containers can stretch to accommodate data-heavy tables, the primary content remains centered with a max-width of 1440px to maintain line-length readability.

- **Grid:** A 12-column grid is standard for marketing and top-level dashboard layouts. For internal application views (SaaS), use a sidebar-and-stage model where the sidebar is fixed (240px - 280px) and the main stage is fluid.
- **Rhythm:** Use a 4px baseline grid. Padding within components should be generous enough to prevent visual clutter but tight enough to maintain high information density (e.g., 8px or 12px for list items).
- **Mobile:** On small screens, margins compress to 16px and the 12-column grid collapses to a single column.

## Elevation & Depth

Hierarchy in this design system is achieved through **Tonal Layering** and **Subtle Outlines** rather than heavy shadows.

- **Level 0 (Canvas):** `#F8FAFC` - The base background.
- **Level 1 (Surfaces):** `#FFFFFF` with a 1px border of `#E2E8F0`. This is the standard for cards and main content areas.
- **Level 2 (Popovers/Modals):** `#FFFFFF` with a subtle, diffused shadow: `0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)`.
- **Level 3 (Overlays):** For critical dialogs, use a semi-transparent backdrop blur (4px) with a slightly darker overlay to pull focus.

Avoid "floating" elements. Most surfaces should feel anchored to the grid via clean, light borders.

## Shapes

The shape language is **Soft (0.25rem)**. This provides a professional, geometric look that feels precise but more modern than sharp corners.

- **Standard Elements:** Buttons, inputs, and small cards use 4px (`0.25rem`) corner radius.
- **Large Containers:** Modals and large dashboard cards use 8px (`0.5rem`).
- **Interactive States:** Hover states for list items or navigation links should use the same 4px radius to create a "boxed" highlight effect.

## Components

### Buttons
- **Primary:** Solid `#2563EB` with white text. 4px radius. 
- **Secondary:** White surface, `#E2E8F0` border, `#0F172A` text.
- **Tertiary/Ghost:** No background or border; uses primary color text.
- **Sizing:** Standard height is 36px for high density; 44px for primary call-to-actions.

### Input Fields
- White background, 1px `#E2E8F0` border. On focus, use a 1px `#2563EB` border with a subtle 2px blue glow (ring).
- Placeholder text uses `#94A3B8`.

### Cards
- Use for grouping related data. 1px `#E2E8F0` border, no shadow unless the card is interactive/hoverable.
- Header sections within cards should have a subtle bottom border.

### Data Tables
- Row height: 40px (Compact) or 52px (Standard).
- Header row: Background `#F8FAFC`, uppercase `label-sm` text, bottom border.
- Hover state: Row background changes to `#F1F5F9`.

### Chips / Badges
- Small, 2px radius or pill-shaped.
- Use low-saturation backgrounds (e.g., light green background with dark green text for success).

### Navigation
- Sidebar: Use `#F8FAFC` or `#FFFFFF`. Active states indicated by a subtle background shift to `#F1F5F9` and a 2px vertical blue line on the left edge.