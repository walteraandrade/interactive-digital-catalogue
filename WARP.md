# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is an **Interactive Dental Catalog** - a single-page React application that transforms static dental implant PDFs into clickable, mobile-first interfaces. Users can click product variations directly on catalog images, add items to a shopping cart, and complete orders via WhatsApp integration.

### Technology Stack
- **Framework**: Vite + React 18
- **State Management**: Zustand (lightweight, 2.9KB)
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Deployment**: Static hosting (Vercel/Netlify ready)

## Development Commands

### Essential Commands
```bash
# Initial setup
npm create vite@latest interactive-dental-catalog --template react
cd interactive-dental-catalog
npm install

# Install project dependencies
npm install zustand clsx react-hot-toast
npm install -D tailwindcss postcss autoprefixer @tailwindcss/forms @tailwindcss/aspect-ratio

# Initialize Tailwind CSS
npx tailwindcss init -p

# Development server
npm run dev

# Production build
npm run build
npm run preview

# Bundle analysis (after installing analyzer)
npm install -D rollup-plugin-visualizer
npm run build -- --mode analyze

# Performance testing
npx lighthouse http://localhost:5173 --view
```

### Project Structure Setup
```bash
# Create complete folder structure
mkdir -p src/{components/{layout,product,cart,ui},stores,data,utils,hooks,assets/images,styles}

# Create component files
touch src/components/layout/{Header,Navigation,MobileOverlay}.jsx
touch src/components/product/{InteractiveCatalog,Hotspot,ProductImage}.jsx
touch src/components/cart/{CartSidebar,CartItem,WhatsAppButton}.jsx
touch src/components/ui/{Button,Toast,LoadingSpinner}.jsx

# Create data and utility files
touch src/stores/cartStore.js
touch src/data/{products,hotspots}.js
touch src/utils/{whatsapp,constants,helpers}.js
touch src/hooks/useResponsive.js
touch src/styles/globals.css
```

### Image Optimization Commands
```bash
# Convert PDF to high-res image (requires ImageMagick)
convert -density 300 product-catalog.pdf[0] -quality 90 product-catalog.jpg

# Optimize images for web
convert product-catalog.jpg -quality 85 -strip optimized-catalog.jpg

# Create WebP version
cwebp -q 85 optimized-catalog.jpg -o catalog.webp
```

### Testing Commands
```bash
# Test on different devices (using Chrome DevTools)
# Mobile: 320px - 480px
# Tablet: 768px - 1024px  
# Desktop: 1024px+

# Run accessibility tests
npx lighthouse http://localhost:5173 --only-categories=accessibility --view
```

## Architecture Overview

### Core Architecture Pattern
The app follows a **component-based architecture** with **client-side state management** - no backend required.

#### Key Architectural Decisions:
1. **Single-page application** - No routing needed, all interactions happen on one page
2. **Static images with responsive hotspots** - Better performance than PDF rendering
3. **Mobile-first design** - Touch-friendly hotspot icons for mobile users
4. **Pure client-side** - No server dependencies, easy deployment

### Component Architecture

```
App (Main Container)
├── Header (Navigation, Cart Toggle)
├── InteractiveCatalog (Main Product Display)
│   ├── ProductImage (Catalog Image)
│   └── Hotspot[] (Clickable Areas)
│       └── Uses cartStore.addItem()
├── CartSidebar (Shopping Cart)
│   ├── CartItem[] (Individual Items)
│   └── WhatsAppButton (Order Completion)
└── Toast Notifications (User Feedback)
```

### State Management Architecture
- **Zustand Store** (`cartStore.js`) - Centralized cart state with persistence
- **LocalStorage Integration** - Cart persists across browser sessions
- **No global state pollution** - Only cart state is global, everything else is local component state

### Data Flow
1. **Product Data** → `src/data/products.js` (Product catalog definitions)
2. **Hotspot Configuration** → `src/data/hotspots.js` (Clickable area coordinates)
3. **User Interaction** → Hotspot click → Add to cart → Update Zustand store
4. **Order Completion** → Cart data → WhatsApp message formatting → External WhatsApp app

### Critical File Structure
```
src/
├── stores/cartStore.js          # Global cart state (Zustand)
├── data/
│   ├── products.js              # Product catalog definitions
│   └── hotspots.js              # Hotspot coordinate mappings
├── components/product/
│   ├── InteractiveCatalog.jsx   # Main product display component
│   └── Hotspot.jsx              # Individual clickable area
├── utils/
│   ├── whatsapp.js              # WhatsApp integration logic
│   └── constants.js             # App configuration (phone number, etc.)
└── assets/images/               # Product catalog images
```

## Development Workflow

### Adding New Products (Critical Process)
1. **Prepare Images**: Convert PDF to optimized JPG (2400px width recommended)
2. **Update Product Data**: Add product definition to `src/data/products.js`
3. **Map Hotspots**: Configure clickable areas in `src/data/hotspots.js`
4. **Test Responsiveness**: Verify hotspots work on all device sizes

### Hotspot Positioning (Most Critical)
The **hotspot positioning is the most critical aspect** - requires precise coordinate mapping:

```javascript
// Example hotspot configuration
{
  code: 'PRODUCT_CODE',
  position: { 
    top: '65%',     // Y coordinate as percentage
    left: '15%',    // X coordinate as percentage  
    width: '20%',   // Clickable area width
    height: '3%'    // Clickable area height
  }
}
```

#### Hotspot Development Tips:
- Use browser DevTools to position hotspots
- Add temporary red borders in development: `.hotspot { border: 2px solid red !important; }`
- Test on actual mobile devices, not just browser DevTools
- Ensure minimum 44px touch targets on mobile

### WhatsApp Integration Setup
Update phone number in `src/utils/constants.js`:
```javascript
export const WHATSAPP_NUMBER = "5511999999999"; // Country + Area + Number
```

### Environment Configuration
```bash
# Create .env file for local development
VITE_APP_NAME=Interactive Dental Catalog
VITE_WHATSAPP_NUMBER=5511999999999
VITE_COMPANY_NAME=Your Dental Company
```

## Performance Targets
- Bundle size: < 500KB
- First load: < 3 seconds on 3G
- Lighthouse score: 95+ across all metrics
- Mobile interaction: < 1 second response

## Development Best Practices

### Code Style Guidelines
- **No code comments** - Write self-documenting code with clear variable and function names
- **Kebab-case file names** - Use kebab-case for all file names (e.g., `cart-store.ts`, `interactive-catalog.tsx`)
- **No development server execution** - Always ask the user to run development commands and provide results

### Mobile-First Development
- Always test hotspots on actual mobile devices
- Use touch-friendly minimum sizes (44px × 44px)
- Ensure hover states work properly on touch devices
- Test WhatsApp integration on mobile browsers

### State Management Guidelines
- Keep cart state in Zustand store
- Use local component state for UI interactions
- Persist only essential data (cart items)
- Handle rehydration errors gracefully

### Image Optimization
- Convert catalog PDFs to optimized JPG images
- Target 2400px width for high-DPI displays
- Use WebP format where supported
- Implement lazy loading for performance

### Testing Strategy
Before any deployment, verify:
- [ ] All hotspots clickable on desktop and mobile
- [ ] Cart functionality (add/remove/update)  
- [ ] WhatsApp message formatting
- [ ] Image loading across all devices
- [ ] Performance metrics meet targets

## Common Issues & Solutions

### Hotspots Not Working on Mobile
- Increase hotspot minimum size to 44px × 44px
- Add `touch-action: manipulation` CSS property
- Remove hover-dependent interactions
- Test on actual devices, not just emulators

### Images Not Loading  
- Check file paths (case-sensitive)
- Verify image formats and optimization
- Add fallback images and error handling
- Ensure proper asset bundling in Vite

### WhatsApp Integration Issues
- Verify phone number format (no spaces/dashes)
- Check message URL encoding
- Test popup blocker handling
- Provide clipboard fallback for failed opens

## Deployment

The application builds to static files and can be deployed to any static hosting:

```bash
# Build for production
npm run build

# Deploy to Vercel (recommended)
npm install -g vercel
vercel

# Deploy to Netlify
npm install -g netlify-cli
netlify deploy --prod --dir=dist

# Upload dist/ folder to any static host
```

## Notes for Future Development

- **Hotspot positioning is critical** - spend extra time ensuring precision across screen sizes
- **Mobile optimization is essential** - most users will access on phones
- **Performance matters** - dental professionals value efficiency
- **Simple workflow is key** - from catalog to WhatsApp in 2 clicks
- **No backend complexity** - maintain the simplicity of static deployment

This project prioritizes performance, mobile experience, and maintainability over complex features.
