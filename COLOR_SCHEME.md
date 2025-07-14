# CHHIKARA CONSTRUCTIONS Color Scheme

## Overview

The website now uses a professional Navy Blue primary color with warm Orange and Beige accents, creating a sophisticated and trustworthy aesthetic perfect for a construction company. The palette includes neutral colors for balance and readability.

## Color Palette

### Primary Colors (Navy Blue)

- **primary-50**: `#f0f4f8` - Very light navy (subtle backgrounds, highlights)
- **primary-100**: `#d9e2ec` - Light navy (card backgrounds, light sections)
- **primary-200**: `#bcccdc` - Lighter navy (borders, dividers)
- **primary-300**: `#9fb3c8` - Light navy (secondary text, icons)
- **primary-400**: `#829ab1` - Medium light navy (disabled states)
- **primary-500**: `#648299` - Medium navy (intermediate elements)
- **primary-600**: `#1D3557` - **Base Navy Blue** (main brand color - buttons, headers)
- **primary-700**: `#152a42` - Darker navy (hover states, active elements)
- **primary-800**: `#0f1f31` - Dark navy (strong emphasis)
- **primary-900**: `#0d1b2a` - Very dark navy (headers, dark themes)

### Accent Colors

#### Orange Accent

- **accent-orange-50**: `#fef7f0` - Very light orange
- **accent-orange-100**: `#feecdc` - Light orange
- **accent-orange-200**: `#fcd9bd` - Lighter orange
- **accent-orange-300**: `#fac49e` - Light orange
- **accent-orange-400**: `#f7ae80` - Medium light orange
- **accent-orange-500**: `#F4A261` - **Base Orange** (call-to-action, highlights)
- **accent-orange-600**: `#ef8f3d` - Darker orange
- **accent-orange-700**: `#e67e22` - Dark orange
- **accent-orange-800**: `#d35400` - Very dark orange
- **accent-orange-900**: `#a04000` - Darkest orange

#### Beige Accent

- **accent-beige-50**: `#fdfbf7` - Very light beige
- **accent-beige-100**: `#faf6eb` - Light beige
- **accent-beige-200**: `#f5ecd3` - Lighter beige
- **accent-beige-300**: `#f0e1bb` - Light beige
- **accent-beige-400**: `#ebd7a3` - Medium light beige
- **accent-beige-500**: `#E9C46A` - **Base Beige** (secondary accents, warmth)
- **accent-beige-600**: `#e5b84d` - Darker beige
- **accent-beige-700**: `#dfa730` - Dark beige
- **accent-beige-800**: `#c69314` - Very dark beige
- **accent-beige-900**: `#8a6509` - Darkest beige

### Neutral Colors

- **neutral-50**: `#F8F9FA` - **Base White** (backgrounds, cards)
- **neutral-100**: `#f1f3f4` - Very light gray
- **neutral-200**: `#e8eaed` - Light gray (borders)
- **neutral-300**: `#dadce0` - Medium light gray
- **neutral-400**: `#bdc1c6` - Medium gray (secondary text)
- **neutral-500**: `#9aa0a6` - Gray (icons, less important text)
- **neutral-600**: `#80868b` - Dark gray
- **neutral-700**: `#5f6368` - Darker gray
- **neutral-800**: `#3c4043` - Very dark gray
- **neutral-900**: `#2F2F2F` - **Base Charcoal** (footer, dark sections)

## Usage Guidelines

### Primary Elements

- **Main navigation**: `bg-primary-600` with `text-white`
- **Primary buttons**: `bg-primary-600` with `hover:bg-primary-700`
- **Headers and titles**: `text-primary-600` or `text-primary-700`

### Accent Elements

- **Call-to-action buttons**: `bg-accent-orange-500` with `hover:bg-accent-orange-600`
- **Highlights and badges**: `bg-accent-beige-500` with `text-primary-700`
- **Important notifications**: `text-accent-orange-600`

### Text Hierarchy

- **Primary headings**: `text-primary-600` or `text-primary-700`
- **Secondary headings**: `text-primary-500`
- **Body text**: `text-neutral-700` or `text-neutral-800`
- **Secondary text**: `text-neutral-500` or `text-neutral-600`
- **Text on dark backgrounds**: `text-neutral-50` or `text-neutral-100`

### Backgrounds

- **Main background**: `bg-neutral-50` (white)
- **Section backgrounds**: `bg-primary-50` (very light navy)
- **Card backgrounds**: `bg-white` with `border-neutral-200`
- **Dark sections**: `bg-neutral-900` (charcoal)
- **Footer**: `bg-neutral-900` with appropriate text colors

### Borders and Dividers

- **Light borders**: `border-neutral-200`
- **Medium borders**: `border-neutral-300`
- **Emphasis borders**: `border-primary-300`
- **Dark borders**: `border-neutral-700`

## Updated Components

### Footer

- **Background**: `bg-neutral-900` (charcoal)
- **Company name**: `text-white`
- **Description text**: `text-neutral-300`
- **Navigation links**: `text-neutral-400` with `hover:text-accent-beige-500`
- **Social media icons**: `text-accent-orange-500` with `hover:text-accent-orange-400`
- **Contact info**: `text-neutral-400`
- **Copyright**: `text-neutral-400` with `border-neutral-700`

### Automatic Updates

All existing components using `primary-*` classes will automatically use the new navy blue color scheme. Components using other color classes may need individual updates.

## Custom CSS Classes

Additional utility classes available in `src/styles/colors.css`:

### Direct Color Classes

- `.text-navy` / `.bg-navy`: Direct navy blue (`#1D3557`)
- `.text-orange` / `.bg-orange`: Direct orange (`#F4A261`)
- `.text-beige` / `.bg-beige`: Direct beige (`#E9C46A`)
- `.text-charcoal` / `.bg-charcoal`: Direct charcoal (`#2F2F2F`)

### Gradient Classes

- `.bg-gradient-navy`: Navy to dark navy gradient
- `.bg-gradient-warm`: Orange to beige gradient
- `.bg-gradient-navy-orange`: Navy to orange gradient
- `.bg-gradient-hero`: Multi-stop navy to orange hero gradient

## Browser Elements

### Scrollbar

- **Track**: `#F8F9FA` (neutral-50)
- **Thumb**: `#1D3557` (primary-600)
- **Thumb hover**: `#F4A261` (accent-orange-500)

## Technical Implementation

The color scheme is defined in:

1. **`tailwind.config.js`** - Complete color palette with all variations
2. **`src/styles/colors.css`** - Custom utilities and gradients
3. **`src/index.css`** - Global styles including scrollbar
4. **Components** - Footer updated to showcase new color usage

## Color Accessibility

This color palette provides excellent contrast ratios:

- Navy blue on white: High contrast for text
- Orange accent: Strong visibility for CTAs
- Beige accent: Warm complement without overwhelming
- Neutral grays: Proper text hierarchy

The combination creates a professional, trustworthy appearance suitable for a construction company while maintaining modern design standards.
