---
name: InsightOS
colors:
  surface: '#11131a'
  surface-dim: '#11131a'
  surface-bright: '#373941'
  surface-container-lowest: '#0b0e15'
  surface-container-low: '#191b22'
  surface-container: '#1d1f27'
  surface-container-high: '#272a31'
  surface-container-highest: '#32353c'
  on-surface: '#e1e2ec'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#e1e2ec'
  inverse-on-surface: '#2e3038'
  outline: '#8c909f'
  outline-variant: '#424753'
  surface-tint: '#afc6ff'
  primary: '#afc6ff'
  on-primary: '#002d6c'
  primary-container: '#528dff'
  on-primary-container: '#00275f'
  inverse-primary: '#0059c6'
  secondary: '#bfc5e4'
  on-secondary: '#292f47'
  secondary-container: '#414861'
  on-secondary-container: '#b1b7d5'
  tertiary: '#ffb77b'
  on-tertiary: '#4d2700'
  tertiary-container: '#d87802'
  on-tertiary-container: '#432100'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d9e2ff'
  primary-fixed-dim: '#afc6ff'
  on-primary-fixed: '#001a43'
  on-primary-fixed-variant: '#004398'
  secondary-fixed: '#dce1ff'
  secondary-fixed-dim: '#bfc5e4'
  on-secondary-fixed: '#131a31'
  on-secondary-fixed-variant: '#3f465f'
  tertiary-fixed: '#ffdcc2'
  tertiary-fixed-dim: '#ffb77b'
  on-tertiary-fixed: '#2e1500'
  on-tertiary-fixed-variant: '#6d3a00'
  background: '#11131a'
  on-background: '#e1e2ec'
  surface-variant: '#32353c'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-padding: 24px
  gutter: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style
The design system is engineered for executive-level clarity and high-performance knowledge work. It sits at the intersection of deep-tech utility and premium craftsmanship, evoking a sense of "ambient intelligence."

The aesthetic is **Modern Enterprise**, leaning heavily into **Glassmorphism** and **Minimalism**. It prioritizes high-density information without visual clutter, utilizing a "Layered Intelligence" metaphor where AI-driven insights appear on elevated, translucent surfaces. The emotional response should be one of absolute control, precision, and sophisticated foresight. Every interaction is designed to feel buttery-smooth, intentional, and high-fidelity, mirroring the quality of the insights the engine provides.

## Colors
The palette is rooted in a deep, cinematic "Midnight" space. The primary blue is a high-vibrancy "Digital Cobalt" used sparingly for action intent and AI status indicators. 

- **Backgrounds:** Use `#0B1020` for the base canvas.
- **Surfaces:** Use `#151C33` for primary containers.
- **Glass Surfaces:** Use white with 4-8% opacity combined with a 20px backdrop blur to create depth over the background.
- **Accents:** Use semantic colors (`success`, `warning`, `danger`) with high saturation but reduced brightness when used in large areas to maintain the dark-mode ocular comfort.

## Typography
The system uses **Inter** for its neutral, highly legible Swiss-inspired characteristics. It provides a stable foundation for complex data. 

To introduce a "technical" edge, **JetBrains Mono** is used for small labels, metadata, and AI status indicators. This monospaced secondary font reinforces the engine's precision. 

Tighten letter-spacing on larger headlines to create a more compact, premium editorial feel. Use `text-secondary` color for body-sm and labels to establish a clear information hierarchy.

## Layout & Spacing
The design system employs a **Fluid Grid** with a 4px base unit. 

- **Desktop:** 12-column grid, 24px margins, 16px gutters. Large dashboard views may use a "Wide" layout where margins expand to 40px.
- **Tablet:** 8-column grid, 24px margins.
- **Mobile:** 4-column grid, 16px margins.

Use generous "stack" spacing between distinct modules to allow the glassmorphic effects to breathe. Components should lean on internal padding (typically 16px or 20px) to maintain a spacious, executive feel even in data-heavy views.

## Elevation & Depth
Depth is not communicated through heavy shadows, but through **Tonal Layering** and **Subtle Luster**.

1.  **Level 0 (Base):** `#0B1020` - The infinite void.
2.  **Level 1 (Cards):** `#151C33` with a 1px stroke of `white` at 8% opacity.
3.  **Level 2 (Glass Overlays):** Semi-transparent surfaces with `backdrop-filter: blur(20px)`.
4.  **Shadows:** Use extremely soft, large-spread shadows (0 20px 40px rgba(0,0,0,0.4)) only on floating modals or menus. 

Each elevated element should have a "top-light" effect: a subtle 1px inner border on the top edge with higher opacity to simulate a light source from above.

## Shapes
The shape language is **Rounded**, using an 8px (`0.5rem`) base radius for standard components like buttons and inputs. 

Large containers and cards use `rounded-xl` (24px) to create a soft, modern frame for the data within. Smaller elements like tags or "AI chips" may use a fully pill-shaped radius to distinguish them as interactive tokens.

## Components

- **AI-Insight Cards:** Feature a subtle gradient border (Primary Blue to Transparent) and a slight inner glow. Text should be prioritized with high-contrast `text-primary`.
- **Buttons:** 
    - *Primary:* Solid Primary Blue with white text. No gradient. 
    - *Secondary:* Ghost style with 1px border at 15% white opacity. 
    - *Glass:* Blurred background with white text.
- **Input Fields:** Darker than the surface color, with a 1px border that glows Primary Blue on focus. Use JetBrains Mono for placeholder text.
- **Charts:** Use a custom-tuned palette for data viz: Cobalt, Emerald, Violet, and Slate. Lines should be 2px thick with "area" charts using a 10% opacity fill.
- **Data Tables:** Remove all vertical borders. Horizontal borders should be 1px at 5% white opacity. Header rows use `label-sm` in all-caps.
- **Status Indicators:** Small, glowing dots (css `box-shadow` with spread) next to text labels to indicate real-time AI processing.