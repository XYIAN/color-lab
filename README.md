# Color Lab 🎨

**Version 1.0.0** - A comprehensive design system for creating, customizing, and saving stunning gradients, glassmorphic effects, and PrimeReact components.

[![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![PrimeReact](https://img.shields.io/badge/PrimeReact-10.9.6-blue)](https://primereact.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-38B2AC)](https://tailwindcss.com/)

## ✨ Features

### 🎨 **Gradient Builder**

- **Live Preview**: Real-time gradient visualization
- **Multiple Directions**: Linear and radial gradients
- **Color Controls**: Up to 5 colors with color pickers and hex input
- **Angle Control**: Precise angle adjustment for linear gradients
- **Quick Palette**: Predefined color selection
- **CSS Export**: Generated CSS code for easy implementation
- **Save System**: Store your favorite gradients locally

### 🔮 **Glassmorphism Effects**

- **Blur Control**: Adjustable backdrop blur (0-50px)
- **Opacity Settings**: Fine-tuned transparency control
- **Real-time Preview**: See effects instantly
- **CSS Generation**: Export glassmorphism styles
- **Save & Share**: Store custom glass effects

### 🧩 **Component Customization System** _(NEW in 1.0.0)_

- **12 Component Types**: Card, Carousel, Accordion, Panel, Fieldset, TabView, DataTable, Chart, Button, Input, Dropdown, Slider
- **Real-time Preview**: Live component updates as you customize
- **Comprehensive Controls**:
  - **Colors**: Background, text, border, primary colors
  - **Typography**: Font family, size, weight, line height
  - **Spacing**: Padding, margin, border radius
  - **Effects**: Shadow, opacity, blur, animations
  - **Layout**: Width, height, max dimensions
  - **Content**: Title and description editing
- **Sticky Customization Panel**: Always-visible controls
- **CSS Export**: Generated styles for each component
- **Save & Restore**: Component library with localStorage

### 🎭 **Advanced UI Features**

- **Responsive Design**: Mobile-first approach
- **Dark/Light Themes**: Seamless theme switching
- **Smooth Animations**: CSS animations and transitions
- **Interactive Elements**: Hover effects and micro-interactions
- **Accessibility**: Keyboard navigation and screen reader support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/color-lab.git
cd color-lab

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📱 Pages & Features

### 🏠 **Home Page** (`/`)

- **Gradient Builder**: Create stunning color transitions
- **Glassmorphism Preview**: Design modern glass effects
- **Interactive Quick Start**: Click to navigate to sections
- **Recently Saved**: View your latest creations
- **Smooth Scrolling**: Enhanced navigation experience

### 🧩 **Components Lab** (`/components`) _(NEW)_

- **Component Selector**: Choose from 12 PrimeReact components
- **Real-time Customization**: Live preview with instant updates
- **Advanced Controls**: Comprehensive styling options
- **Save System**: Build your component library
- **CSS Export**: Get production-ready styles

### 💾 **Saved Items** (`/saved`)

- **Gradient Gallery**: Browse saved gradients
- **Glass Effects**: View saved glassmorphism styles
- **Component Library**: Access saved components
- **Filter & Sort**: Organize your creations
- **Delete Options**: Manage your collection

### ℹ️ **About** (`/about`)

- **App Information**: Learn about Color Lab
- **Usage Instructions**: How to use the app
- **Feature Overview**: Complete feature list
- **Tech Stack**: Technologies used
- **Social Links**: Connect with the community

## 🛠 Tech Stack

### Core Framework

- **[Next.js 15.3.5](https://nextjs.org/)** - React framework with App Router
- **[React 19.0.0](https://reactjs.org/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type safety

### Styling & UI

- **[Tailwind CSS 3.4.0](https://tailwindcss.com/)** - Utility-first CSS framework
- **[PrimeReact 10.9.6](https://primereact.org/)** - UI component library
- **[PrimeIcons 7.0.0](https://primereact.org/icons)** - Icon library
- **[PrimeFlex 4.0.0](https://primereact.org/primeflex)** - CSS utility library

### Theming & State

- **[next-themes 0.4.6](https://github.com/pacocoursey/next-themes)** - Theme management
- **[React Hook Form 7.60.0](https://react-hook-form.com/)** - Form handling
- **[Zod 3.25.74](https://zod.dev/)** - Schema validation

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Sass](https://sass-lang.com/)** - CSS preprocessing

## 🎨 Design System

### Color Palette

- **Primary**: Modern blue tones with gradient variations
- **Secondary**: Complementary colors for accents
- **Background**: Cosmic gradients with animated effects
- **Text**: High contrast for accessibility

### Typography

- **Font Family**: Inter (primary), system fonts (fallback)
- **Font Weights**: 100-800 with proper hierarchy
- **Line Heights**: Optimized for readability

### Spacing & Layout

- **Grid System**: Responsive grid with Tailwind CSS
- **Spacing Scale**: Consistent spacing using Tailwind utilities
- **Border Radius**: Modern rounded corners
- **Shadows**: Layered shadow system for depth

### Animations

- **Transitions**: Smooth 200ms transitions
- **Hover Effects**: Interactive feedback
- **Loading States**: Skeleton screens and spinners
- **Micro-interactions**: Subtle animations for UX

## 📁 Project Structure

```
color-lab/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── components/         # Components page
│   │   ├── saved/             # Saved items page
│   │   ├── about/             # About page
│   │   ├── globals.css        # Global styles
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── common/            # Shared components
│   │   ├── components/        # Component customization
│   │   ├── home/              # Home page components
│   │   ├── layout/            # Layout components
│   │   └── inputs/            # Input components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility libraries
│   │   └── providers/         # Context providers
│   ├── types/                 # TypeScript type definitions
│   ├── utils/                 # Utility functions
│   └── constants/             # App constants
├── public/                    # Static assets
├── styles/                    # SCSS styles
└── docs/                      # Documentation
```

## 🎯 Key Features

### **Gradient Builder**

```typescript
// Example gradient configuration
const gradient = {
  colors: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
  direction: 'linear',
  angle: 45,
};
```

### **Glassmorphism Effects**

```css
/* Generated CSS */
backdrop-filter: blur(10px);
background-color: rgba(255, 255, 255, 0.1);
border: 1px solid rgba(255, 255, 255, 0.2);
```

### **Component Customization**

```typescript
// Component configuration
const componentConfig = {
  type: 'card',
  styles: {
    backgroundColor: '#ffffff',
    textColor: '#000000',
    borderRadius: '12px',
    shadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
};
```

## 🔧 Configuration

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_APP_NAME=Color Lab
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### Tailwind Configuration

```typescript
// tailwind.config.ts
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        // ... more color definitions
      },
    },
  },
};
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build the project
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=out
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use Prettier for code formatting
- Write meaningful commit messages
- Test on multiple devices and browsers
- Ensure accessibility compliance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[PrimeReact](https://primereact.org/)** for the excellent UI component library
- **[Tailwind CSS](https://tailwindcss.com/)** for the utility-first CSS framework
- **[Next.js](https://nextjs.org/)** for the amazing React framework
- **[Vercel](https://vercel.com/)** for the deployment platform

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/color-lab/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/color-lab/discussions)
- **Email**: support@colorlab.com

---

**Made with ❤️ by the Color Lab Team**

_Version 1.0.0 - Complete Design System Release_
