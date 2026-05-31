---
name: Nexus Discovery System
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#45464c'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#76777c'
  outline-variant: '#c6c6cc'
  surface-tint: '#595e6c'
  primary: '#030611'
  on-primary: '#ffffff'
  primary-container: '#1a1f2b'
  on-primary-container: '#828696'
  inverse-primary: '#c2c6d6'
  secondary: '#324cd6'
  on-secondary: '#ffffff'
  secondary-container: '#4e67f0'
  on-secondary-container: '#fffbff'
  tertiary: '#00080d'
  on-tertiary: '#ffffff'
  tertiary-container: '#00232d'
  on-tertiary-container: '#0093b4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dee2f3'
  primary-fixed-dim: '#c2c6d6'
  on-primary-fixed: '#161b27'
  on-primary-fixed-variant: '#424754'
  secondary-fixed: '#dee0ff'
  secondary-fixed-dim: '#bbc3ff'
  on-secondary-fixed: '#000f5c'
  on-secondary-fixed-variant: '#1132c1'
  tertiary-fixed: '#b7eaff'
  tertiary-fixed-dim: '#4cd6ff'
  on-tertiary-fixed: '#001f28'
  on-tertiary-fixed-variant: '#004e60'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display-lg:
    fontFamily: IBM Plex Sans Arabic
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 60px
  headline-lg:
    fontFamily: IBM Plex Sans Arabic
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: IBM Plex Sans Arabic
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Tajawal
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Tajawal
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: IBM Plex Sans Arabic
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  caption:
    fontFamily: Tajawal
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The visual identity of the design system is anchored in the concepts of **precision, connectivity, and technological advancement**. It is designed to position the entity as a leader in communications and IT within the Saudi market. The target audience includes enterprise clients, government sectors, and technology-forward businesses who value stability alongside innovation.

The design style is **Corporate / Modern** with a high-tech edge. It utilizes a structured grid, ample white space to ensure clarity, and a Right-to-Left (RTL) first approach. The aesthetic is clean and professional, using sharp geometry inspired by the logo's "M" form, balanced with subtle depth to create a trustworthy and sophisticated user experience.

## Colors

The palette is derived directly from the corporate identity, emphasizing a professional "Tech-Navy" foundation.

*   **Primary (Navy):** Used for deep backgrounds, primary text, and authoritative UI elements. It represents stability and the "IT" core.
*   **Secondary (Electric Blue):** Extracted from the logo’s vibrant blue. Used for primary actions, active states, and brand-building accents.
*   **Tertiary (Cyan/Tech-Blue):** A high-contrast accent color used for progress indicators, data visualization, and "online" or "active" status markers.
*   **Neutrals:** A range of cool grays (from `#F8F9FA` to `#333C4D`) to manage hierarchy and background layering without introducing visual clutter.

## Typography

This design system utilizes a dual-font strategy to balance technical precision with readability. 

*   **IBM Plex Sans Arabic** is used for headlines, navigation, and UI labels. Its mechanical yet friendly structure communicates the "Communications and IT" aspect of the brand perfectly.
*   **Tajawal** is used for body copy and long-form text. Its humanist qualities ensure high legibility and a comfortable reading experience in RTL layouts.

All typography is optimized for Arabic script, ensuring proper line-height (leading) to prevent glyph clipping, which is common in many standard Western-centric systems.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for desktop to maintain a premium, editorial feel that commands attention. 

*   **Grid:** A 12-column grid system with 24px gutters.
*   **Rhythm:** An 8px base unit governs all spatial relationships. 
*   **Alignment:** Strictly Right-to-Left. Headlines and body text are right-aligned. Navigation flows from Right (Brand/Logo) to Left (Menu/Profile).
*   **Density:** Generous "professional" whitespace is prioritized. Large sections should be separated by `stack-lg` (48px) to allow the technical content to breathe and appear more accessible.

## Elevation & Depth

Visual hierarchy is achieved through a mix of **Tonal Layers** and **Ambient Shadows**.

1.  **Base Surface:** White (`#FFFFFF`) or ultra-light gray (`#F8F9FA`).
2.  **Raised Cards:** Subtle, highly-diffused shadows are used to lift cards from the background (e.g., `box-shadow: 0 4px 20px rgba(26, 31, 43, 0.05)`).
3.  **Interactive States:** On hover, elements slightly increase their shadow spread and may feature a thin 1px border in the Primary or Secondary color to reinforce the "tech" feel.
4.  **Overlays:** Modals and dropdowns use a slightly darker backdrop tint to focus the user's attention, maintaining the professional corporate tone.

## Shapes

The shape language is **Soft (0.25rem / 4px)**. 

While the logo contains sharp, aggressive angles, the UI components use a subtle rounding to improve usability and modern appeal. This creates a "precision-engineered" look—it isn't overly organic or bubbly, but it avoids the harshness of completely sharp corners. 

*   **Small Components (Buttons, Inputs):** 4px radius.
*   **Large Components (Cards, Modals):** 8px or 12px radius.
*   **Icons:** Contained within square or slightly rounded bounding boxes to echo the geometric nature of the corporate mark.

## Components

### Buttons
*   **Primary:** Solid Secondary color (`#5D75FF`) with white text. High contrast, 4px radius.
*   **Secondary:** Outlined with Primary color (`#1A1F2B`). Professional and understated.
*   **Ghost:** Text-only for tertiary actions, using the Primary color with a light gray hover state.

### Input Fields
*   Clean, 1px bordered boxes using a medium-gray (`#D1D5DB`). 
*   Active state uses a 2px Secondary color border. 
*   Labels are always placed above the field, right-aligned.

### Cards
*   White background with the "Soft" elevation shadow. 
*   Often feature a "Tech Accent"—a 4px top border or a small icon in the Tertiary color (`#00D1FF`) to categorize services.

### Chips & Tags
*   Small, low-profile badges with light-tinted backgrounds (e.g., 10% opacity of the Secondary color) used for status or categories.

### Lists
*   Clean dividers (1px, Light Gray). 
*   Bullet points are replaced with geometric "Path" icons (small triangles or squares) inspired by the logo's arrow element.