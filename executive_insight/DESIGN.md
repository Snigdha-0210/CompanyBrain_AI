---
name: Executive Insight
colors:
  surface: '#FFFFFF'
  surface-dim: '#e0d8d5'
  surface-bright: '#fff8f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#faf2ee'
  surface-container: '#f4ece8'
  surface-container-high: '#eee7e3'
  surface-container-highest: '#e9e1dd'
  on-surface: '#1e1b19'
  on-surface-variant: '#404941'
  inverse-surface: '#33302d'
  inverse-on-surface: '#f7efeb'
  outline: '#717970'
  outline-variant: '#c0c9be'
  surface-tint: '#2e6a41'
  primary: '#003b1b'
  on-primary: '#ffffff'
  primary-container: '#14532d'
  on-primary-container: '#87c695'
  inverse-primary: '#96d5a3'
  secondary: '#006c4a'
  on-secondary: '#ffffff'
  secondary-container: '#82f5c1'
  on-secondary-container: '#00714e'
  tertiary: '#591d28'
  on-tertiary: '#ffffff'
  tertiary-container: '#75333e'
  on-tertiary-container: '#f79eaa'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b1f2be'
  primary-fixed-dim: '#96d5a3'
  on-primary-fixed: '#00210d'
  on-primary-fixed-variant: '#12512c'
  secondary-fixed: '#85f8c4'
  secondary-fixed-dim: '#68dba9'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#005137'
  tertiary-fixed: '#ffd9dc'
  tertiary-fixed-dim: '#ffb2bb'
  on-tertiary-fixed: '#3c0613'
  on-tertiary-fixed-variant: '#73323d'
  background: '#FCFCFA'
  on-background: '#1e1b19'
  surface-variant: '#e9e1dd'
  text-secondary: '#78716C'
  border: '#E7E5E4'
  success: '#15803D'
  warning: '#CA8A04'
  danger: '#B91C1C'
typography:
  headline-lg:
    fontFamily: Geist
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Geist
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  data-tabular:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
  max-width: 1440px
---

## Brand & Style

This design system is engineered for high-stakes decision-making and rigorous investigation. The brand personality is **authoritative, analytical, and discreet**, catering to executive users who require clarity over clutter. 

The aesthetic follows a **Corporate / Modern** movement with a heavy emphasis on **Minimalism**. It prioritizes high information density without sacrificing legibility. The visual language utilizes ample "analytical whitespace"—space used not just for aesthetics, but to separate complex data streams into digestible insights. The result is a UI that feels like a precision instrument: reliable, fast, and sophisticated.

## Colors

The palette is rooted in a "Forest & Stone" motif. The **Forest Green (#14532D)** primary color provides a sense of stability and institutional growth, distinguishing it from the typical blue-toned SaaS landscape. 

- **Primary & Accent:** Use the Primary Green for main actions and brand identity. The Emerald Accent is reserved for interactive states and secondary highlights.
- **Surface Hierarchy:** The background is a warm, paper-like off-white (`#FCFCFA`) to reduce eye strain during long investigation sessions. Interactive cards and containers use pure white (`#FFFFFF`) to pop against the background.
- **Functional Colors:** Success, Warning, and Danger colors are calibrated for high legibility against white backgrounds, ensuring critical status indicators are unmistakable.

## Typography

The typography system uses **Geist** for its technical precision and modern, Swiss-inspired neutrality. It is optimized for "reading to act" rather than "reading for leisure."

- **Headlines:** Use a slightly tighter letter-spacing and semi-bold weights to convey authority.
- **Data Display:** For tables and numerical dashboards, ensure the `data-tabular` style is used to enable tabular figures, ensuring columns of numbers align perfectly for easy scanning.
- **Labels:** Small labels (`label-sm`) should be used for metadata and eyebrow text, utilizing uppercase and increased tracking for a refined, professional look.

## Layout & Spacing

This design system employs a **Fixed Grid** model for desktop to ensure data visualizations remain within the executive's primary field of view, while utilizing a **Fluid Grid** for mobile viewports.

- **Grid System:** A 12-column grid with 16px gutters. In "Investigation Mode" side panels (typically 4 columns wide) are used for deep-dive context without navigating away from the main list.
- **Density:** Spacing is tight (4px increments) to support high information density. However, significant sections are separated by 32px or 48px to prevent the UI from feeling claustrophobic.
- **Breakpoints:**
  - **Desktop (1024px+):** Full 12-column view with persistent navigation.
  - **Tablet (768px - 1023px):** 8-column view, navigation collapses to a rail.
  - **Mobile (<767px):** Single column, 16px margins, focused task-flow.

## Elevation & Depth

To maintain a clean, professional aesthetic, depth is communicated through **Tonal Layers** and **Low-Contrast Outlines** rather than heavy shadows.

- **Layer 0 (Background):** `#FCFCFA` - The canvas.
- **Layer 1 (Surface):** `#FFFFFF` - Cards and primary containers, using a 1px border of `#E7E5E4`.
- **Layer 2 (Floating):** Used for dropdowns and context menus. These use a very subtle, diffused shadow: `0px 4px 12px rgba(28, 25, 23, 0.08)`.
- **Interactive Depth:** When an element is hovered, the border color shifts from `#E7E5E4` to `#78716C` to indicate interactivity without moving the element in Z-space.

## Shapes

The shape language is **Soft (0.25rem)**. This subtle rounding strikes a balance between the clinical sharpness of legacy enterprise software and the overly "bubbly" feel of consumer apps. 

- **Components:** Standard buttons, inputs, and tags use `0.25rem`. 
- **Containers:** Larger cards and modals use `0.5rem` (`rounded-lg`) to provide a clear frame for content. 
- **Icons:** Use linear, 2px stroke-width icons with slight corner rounding to match the Geist typeface.

## Components

### Buttons & Inputs
- **Primary Button:** Solid `#14532D` with white text. No gradients.
- **Secondary Button:** White background, `#E7E5E4` border, `#1C1917` text.
- **Input Fields:** Flat `#FFFFFF` with `#E7E5E4` borders. On focus, the border changes to `#059669` with a subtle 2px outer glow in the same color at 10% opacity.

### Data Tables
- Header cells use `label-sm` with a light gray background (`#F6F5F4`).
- Rows have a subtle hover state (`#FCFCFA`). 
- Borders are horizontal only to emphasize the row-based flow of data.

### Investigation Progress Indicators
- A sophisticated, thin linear progress bar. 
- Completed segments use Primary Green; active segments pulse subtly; pending segments are light gray.
- Accompanied by "Phase" labels in `label-sm`.

### Professional Chips
- Small, rectangular chips with `0.25rem` rounding. 
- Backgrounds are low-saturation tints of the status color (e.g., a very light green for "Success") with high-contrast text.