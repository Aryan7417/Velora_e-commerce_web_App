---
name: Velora
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daef'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e1e8fd'
  surface-container-highest: '#dce2f7'
  on-surface: '#141b2b'
  on-surface-variant: '#464554'
  inverse-surface: '#293040'
  inverse-on-surface: '#edf0ff'
  outline: '#767586'
  outline-variant: '#c7c4d7'
  surface-tint: '#494bd6'
  primary: '#4648d4'
  on-primary: '#ffffff'
  primary-container: '#6063ee'
  on-primary-container: '#fffbff'
  inverse-primary: '#c0c1ff'
  secondary: '#555f6d'
  on-secondary: '#ffffff'
  secondary-container: '#d6e0f1'
  on-secondary-container: '#596372'
  tertiary: '#904900'
  on-tertiary: '#ffffff'
  tertiary-container: '#b55d00'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#d9e3f4'
  secondary-fixed-dim: '#bdc7d8'
  on-secondary-fixed: '#121c28'
  on-secondary-fixed-variant: '#3e4755'
  tertiary-fixed: '#ffdcc5'
  tertiary-fixed-dim: '#ffb783'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#703700'
  background: '#f9f9ff'
  on-background: '#141b2b'
  surface-variant: '#dce2f7'
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
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
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
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  price-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style
The design system is anchored in a high-clarity **Minimalist** aesthetic tailored for a premium e-commerce experience. The brand personality is dependable, sophisticated, and effortless, prioritizing the product imagery over interface ornamentation. 

By utilizing ample whitespace and a restricted color palette, the system reduces cognitive load for new users, making the shopping journey feel intuitive and calm. The visual language relies on precise alignment and "soft" structural elements to evoke a sense of modern accessibility and professional trust.

## Colors
The color strategy employs a "Content-First" approach. The **Primary Indigo** is used sparingly for call-to-action elements and active states to guide the eye without overwhelming the product photography.

- **Primary Background (#FFFFFF):** Used for the main canvas to ensure maximum contrast and a clean "gallery" feel.
- **Surface/Container (#F9FAFB):** Distinguishes secondary content areas like product cards, search bars, and subtle section backgrounds.
- **Text Hierachy:** Deep Charcoal is reserved for high-priority information (titles, prices), while Slate Gray provides a softer reading experience for descriptions and metadata.
- **Borders:** A consistent, subtle gray is used for structural definition without creating visual noise.

## Typography
This design system utilizes **Inter** exclusively to maintain a systematic, utilitarian, and highly readable interface. The type scale is optimized for legibility at various optical sizes.

Key typographic rules:
- **Tightened Tracking:** Headlines use slight negative letter spacing to feel more cohesive and modern.
- **Weight Contrast:** Bold weights are used for prices and titles to ensure they pop against the white background.
- **Mobile Scaling:** Large display types scale down significantly for mobile devices to prevent awkward line breaks in product titles.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a standard 8pt spatial system. 

- **Mobile:** 4-column grid with 16px margins and 16px gutters. Elements usually span the full width or 2 columns (for product grids).
- **Tablet:** 8-column grid with 24px margins.
- **Desktop:** 12-column grid with a max-width of 1280px. 
- **Vertical Spacing:** Use `48px` or `64px` between major sections to maintain the minimalist "breathable" feel. Small components should use `8px` or `12px` internal padding.

## Elevation & Depth
Depth is conveyed through **Ambient Shadows** and **Tonal Layers**. This design system avoids heavy drop shadows in favor of soft, diffused light sources that make elements appear to float subtly above the surface.

- **Level 0 (Flat):** Main background and divider lines.
- **Level 1 (Subtle):** Product cards and input fields. Shadow: `0px 1px 3px rgba(0,0,0,0.05)`.
- **Level 2 (Hover/Active):** Elevated cards or dropdowns. Shadow: `0px 10px 15px -3px rgba(0,0,0,0.08)`.
- **Level 3 (Modal):** Dialogs and popups. Shadow: `0px 20px 25px -5px rgba(0,0,0,0.1)`.

Always use a neutral tint for shadows to ensure they remain clean and don't muddy the white interface.

## Shapes
The shape language is "Soft," utilizing an 8px base radius for most components. This creates a friendly and approachable feel without the informality of fully rounded pill shapes.

- **Small (4px):** Checkboxes, tags, and small badges.
- **Medium (8px):** Standard buttons, input fields, and product cards.
- **Large (12px):** Modals, featured banners, and bottom sheets.

## Components

### Buttons
- **Primary:** Solid Indigo background with White text. 8px radius. High-contrast and clear.
- **Secondary:** White background with Indigo border and text. Used for less urgent actions like "Add to Wishlist."
- **Ghost:** No background or border. Used for utility actions like "Clear All."

### Input Fields
- **Default:** White background with 1px border (#E5E7EB).
- **Focus State:** 1px Indigo border with a subtle 2px Indigo outer glow (low opacity).
- **Labels:** Always visible, positioned above the field in `body-sm` bold.

### Product Cards
- Use the `background-surface` (#F9FAFB) for the image container to create a subtle frame around product photos.
- 8px border radius on the container.
- Minimal text beneath the image: Title in `body-md` (Deep Charcoal) and Price in `price-lg`.

### Chips & Badges
- Used for categories or status (e.g., "New Arrival").
- Light gray background with Slate Gray text.
- 4px radius for a sharper, more professional look than pill shapes.

### Lists
- Clean, borderless list items separated by a 1px horizontal line (#E5E7EB).
- Ample vertical padding (16px) to ensure touch targets are accessible on mobile.