# Logo and Icon Assets

This folder contains the SVG logo and icon files used in the application.

## Icon Library

The following icons are available as React components:

### Social Media Icons

- `instagram.svg` - Instagram icon
- `linkedin.svg` - LinkedIn icon
- `twitter.svg` - Twitter icon
- `facebook.svg` - Facebook icon

### Contact Icons

- `location.svg` - Location/map pin icon
- `phone.svg` - Phone icon
- `email.svg` - Email icon

## How to Replace the Logo

1. **Save your SVG file** as `logo.svg` in this folder
2. **Replace the existing** `logo.svg` file with your own
3. The logo will automatically appear in the header

## Requirements for your SVG file:

- **File name**: Must be named `logo.svg`
- **File format**: SVG format only
- **Recommended dimensions**: 40x40px (will be scaled automatically)
- **Colors**: Use your brand colors or they'll inherit from CSS classes

## Current Logo

The current `logo.svg` is a sample construction-themed logo with:

- Orange building structure (`#F4A261`)
- Navy blue roof (`#1D3557`)
- White windows (`#F8F9FA`)
- Beige accents (`#E9C46A`)

## Icon Usage

Icons are imported as React components throughout the application:

```tsx
import { ReactComponent as Logo } from "../assets/logos/logo.svg";
import { ReactComponent as InstagramIcon } from "../assets/logos/instagram.svg";
import { ReactComponent as LocationIcon } from "../assets/logos/location.svg";

// Usage
<Logo className="h-12 w-12" />
<InstagramIcon className="h-5 w-5" />
<LocationIcon className="w-full h-full" />
```

## Technical Details

- The logo is imported as a React component in `Header.tsx`
- CSS classes `h-10 w-10` control the size (40x40px)
- The logo will scale responsively on different screen sizes
- Icons inherit text color by default unless specific colors are defined in the SVG

## Troubleshooting

If your logo doesn't appear:

1. Make sure the file is named exactly `logo.svg`
2. Check that it's a valid SVG file
3. Restart the development server (`npm start`)
4. Clear browser cache and refresh
