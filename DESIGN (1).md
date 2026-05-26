---
name: Architectural Blueprint
colors:
  surface: '#f3faff'
  surface-dim: '#d0dce2'
  surface-bright: '#f3faff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eaf5fc'
  surface-container: '#e4f0f6'
  surface-container-high: '#deeaf0'
  surface-container-highest: '#d8e4eb'
  on-surface: '#121d22'
  on-surface-variant: '#3f4849'
  inverse-surface: '#273237'
  inverse-on-surface: '#e7f3f9'
  outline: '#707979'
  outline-variant: '#bfc8c8'
  surface-tint: '#296769'
  primary: '#004547'
  on-primary: '#ffffff'
  primary-container: '#1c5d5f'
  on-primary-container: '#97d4d5'
  inverse-primary: '#95d1d3'
  secondary: '#21695a'
  on-secondary: '#ffffff'
  secondary-container: '#a7eeda'
  on-secondary-container: '#266e5e'
  tertiary: '#233e66'
  on-tertiary: '#ffffff'
  tertiary-container: '#3c557f'
  on-tertiary-container: '#b1cafb'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b0edef'
  primary-fixed-dim: '#95d1d3'
  on-primary-fixed: '#002021'
  on-primary-fixed-variant: '#044f51'
  secondary-fixed: '#aaf0dd'
  secondary-fixed-dim: '#8ed4c1'
  on-secondary-fixed: '#00201a'
  on-secondary-fixed-variant: '#005143'
  tertiary-fixed: '#d6e3ff'
  tertiary-fixed-dim: '#aec7f8'
  on-tertiary-fixed: '#001b3d'
  on-tertiary-fixed-variant: '#2d4770'
  background: '#f3faff'
  on-background: '#121d22'
  surface-variant: '#d8e4eb'
  canvas-ice: '#f2f8f7'
  polar-white: '#ffffff'
  inkwell-black: '#000000'
  cloud-frost: '#e4f0f1'
  misty-teal: '#cae1e2'
  deep-teal: '#0e4749'
  berry-blush: '#d6aec1'
  deep-berry: '#662344'
  sky-blue: '#a2cbcd'
typography:
  display-lg:
    fontFamily: Merriweather
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.16'
  display-md:
    fontFamily: Merriweather
    fontSize: 50px
    fontWeight: '400'
    lineHeight: '1.20'
  headline-lg:
    fontFamily: Merriweather
    fontSize: 44px
    fontWeight: '500'
    lineHeight: '1.32'
  headline-md:
    fontFamily: Merriweather
    fontSize: 30px
    fontWeight: '500'
    lineHeight: '1.33'
  headline-lg-mobile:
    fontFamily: Merriweather
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.33'
  title-lg:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.40'
    letterSpacing: -0.01em
  title-md:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '700'
    lineHeight: '1.40'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.56'
  body-md:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.50'
  body-sm:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.43'
  label-lg:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.43'
  label-md:
    fontFamily: Montserrat
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1.38'
  label-sm:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.33'
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

# User Interviews — Style Reference
> Teal-accented architectural blueprint on pristine parchment.

**Theme:** light

User Interviews employs a crisp, clear, and confident interface, building on a foundation of clean neutrals and a distinctive teal accent. Layouts are spacious, prioritizing readability and direct interaction. Typography balances approachability with clarity, while a preference for rounded, organic shapes softens the overall structure, creating a friendly yet authoritative digital workspace. Interactive elements are clearly defined through color and shape, maintaining a focus on user flow.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Canvas Ice | `#f2f8f7` | `--color-canvas-ice` | Primary page background — a soft, cool neutral that feels expansive |
| Polar White | `#ffffff` | `--color-polar-white` | Card backgrounds, elevated UI elements, text on dark backgrounds |
| Inkwell Black | `#000000` | `--color-inkwell-black` | Primary text, core iconography, borders for ghost buttons and outlines |
| Slate Gray | `#283338` | `--color-slate-gray` | Primary headings on light backgrounds, strong emphasis text |
| Cloud Frost | `#e4f0f1` | `--color-cloud-frost` | Subtle surface differentiation for cards or sections, button backgrounds |
| Misty Teal | `#cae1e2` | `--color-misty-teal` | Light border for outline buttons, subtle text accents |
| Oceanic Teal | `#1c5d5f` | `--color-oceanic-teal` | Teal action color for filled buttons, selected navigation states, and focused conversion moments |
| Deep Teal | `#0e4749` | `--color-deep-teal` | Outlined button borders, active navigation link borders |
| Emerald Green | `#156152` | `--color-emerald-green` | Secondary action buttons, subtle brand accents — a complementary, slightly softer active state |
| Berry Blush | `#d6aec1` | `--color-berry-blush` | Outlined button borders for secondary actions or tags, decorative accents. A soft counterpoint to the dominant teal |
| Deep Berry | `#662344` | `--color-deep-berry` | Decorative background fills for visual sections or emphasis |
| Sky Blue | `#a2cbcd` | `--color-sky-blue` | Outline button borders for informational tags or categories |
| Deep Sapphire | `#16325a` | `--color-deep-sapphire` | Tertiary action buttons, particularly on darker backgrounds or for specialized features |

## Tokens — Typography

### sofia-pro — Primary UI text, body copy, navigation, buttons, and form labels. Its geometric yet friendly presence ensures clarity across functional elements. Note the slight negative letter-spacing on larger sizes at -0.01em for improved visual density. · `--font-sofia-pro`
- **Substitute:** Montserrat, Lato
- **Weights:** 400, 500, 700
- **Sizes:** 12px, 13px, 14px, 16px, 18px, 19px, 20px, 22px, 24px
- **Line height:** 1.00, 1.27, 1.33, 1.38, 1.40, 1.43, 1.44, 1.46, 1.50, 1.53, 1.56, 1.71, 2.00
- **Letter spacing:** -0.0100em, -0.0090em, 0.0430em
- **Role:** Primary UI text, body copy, navigation, buttons, and form labels.

### p22-mackinac-pro — Primary headings. This serif font provides a distinct, authoritative voice for main titles and section headers. · `--font-p22-mackinac-pro`
- **Substitute:** Merriweather, Playfair Display
- **Weights:** 400, 500
- **Sizes:** 30px, 44px, 50px, 64px
- **Line height:** 1.16, 1.20, 1.32, 1.33

## Tokens — Spacing & Shapes

**Base unit:** 8px
**Density:** comfortable

### Border Radius
- **tags:** 100px
- **forms:** 88px
- **pills:** 1000px
- **buttons:** 48px
- **largeElements:** 88px

## Components (Key)
- **Primary Button:** Oceanic Teal (#1c5d5f) background, Polar White (#ffffff) text, 48px radius.
- **Secondary Button:** Emerald Green (#156152) background, Polar White (#ffffff) text.
- **Info Banner:** Cloud Frost (#e4f0f1) background, Inkwell Black text.
- **Card:** Polar White background, 88px radius.
