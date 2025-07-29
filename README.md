# Alrwda - Islamic Electric Clock Market

A modern Next.js showcase website for "Alrwda" - an Islamic electric clock market. This project showcases Islamic electric clocks with a focus on providing information about the business, not selling products online.

## Features

- 🕌 **Islamic Design**: Beautiful Islamic-themed design with appropriate colors (deep greens, golds)
- 🌍 **Internationalization**: Full support for English and Arabic languages with RTL layout
- 🌙 **Dark Theme**: Default dark theme with smooth light/dark mode toggle
- 📱 **Responsive Design**: Mobile-first responsive design
- ⚡ **Modern Stack**: Built with Next.js 14+ App Router, TypeScript, and Tailwind CSS
- 🔍 **SEO Optimized**: Comprehensive SEO with Next.js metadata API
- 🚀 **Performance**: Server components and optimized loading

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Internationalization**: next-intl
- **Theme**: next-themes
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Inter (English) & Cairo (Arabic)
- **Package Manager**: pnpm

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # Locale-specific pages
│   │   ├── layout.tsx     # Locale layout with font selection
│   │   ├── page.tsx       # Home page
│   │   ├── products/      # Products showcase
│   │   ├── contact/       # Contact information
│   │   └── support/       # Technical support
│   ├── globals.css        # Global styles with Islamic theme
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/               # Reusable UI components
│   ├── header.tsx        # Navigation header
│   ├── footer.tsx        # Site footer
│   ├── theme-provider.tsx # Theme context
│   └── language-switcher.tsx # Language toggle
├── i18n/
│   ├── routing.ts        # Internationalization routing
│   └── request.ts        # Message loading
├── lib/
│   └── utils.ts          # Utility functions
└── messages/
    ├── en.json           # English translations
    └── ar.json           # Arabic translations
```

## Getting Started

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Run the development server**:
   ```bash
   pnpm dev
   ```

3. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server  
- `pnpm lint` - Run ESLint

## Pages

- **Home** (`/`): Hero section, about the market, featured products showcase
- **Products** (`/products`): Gallery of Islamic clocks with categories and descriptions
- **Contact** (`/contact`): Contact information, location, business hours
- **Technical Support** (`/support`): Support information, guides, FAQ

## Language Support

The website supports both English and Arabic languages:

- **English**: Uses Inter font, LTR layout
- **Arabic**: Uses Cairo font, RTL layout
- Language switcher available in the header
- All content is properly translated

## Theme System

- **Default**: Dark theme for Islamic aesthetic
- **Toggle**: Smooth transition between light and dark modes
- **Islamic Colors**: Deep greens and golds throughout the design
- **Responsive**: Theme adapts to all screen sizes

## Customization

### Adding New Languages

1. Add locale to `src/i18n/routing.ts`
2. Create message file in `messages/[locale].json`
3. Update font configuration in `src/app/[locale]/layout.tsx`

### Modifying Colors

Update the Islamic color variables in `src/app/globals.css`:

```css
--islamic-green-600: 142 76% 36%;
--islamic-gold-600: 32 95% 44%;
```

### Adding New Pages

1. Create page component in `src/app/[locale]/[page]/page.tsx`
2. Add translations to message files
3. Update navigation in `src/components/header.tsx`

## Design Philosophy

This project follows Islamic design principles:

- **Respectful Colors**: Deep greens representing nature and peace, golds for elegance
- **Clean Layout**: Minimalist design focusing on content
- **Cultural Sensitivity**: All content appropriate for Islamic market
- **Accessibility**: Proper RTL support and high contrast ratios

## Deployment

The project is optimized for deployment on Vercel, Netlify, or any platform supporting Next.js.

```bash
pnpm build
```

## License

This project is for educational and showcase purposes.

---

**Alrwda** - Your trusted source for premium Islamic electric clocks.
