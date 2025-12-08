---
inclusion: always
---

# Figma Design System Integration Rules

This document defines how to integrate Figma designs into the MimiTech codebase using the Figma MCP power.

## 1. Token Definitions

### Color System
Colors are defined using CSS custom properties with OKLCH color space in `src/index.css`:

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.235 0.015 65);
  --primary: oklch(0.5 0.22 260);        /* Blue 700 */
  --secondary: oklch(0.98 0.001 286.375);
  --muted: oklch(0.967 0.001 286.375);
  --accent: oklch(0.967 0.001 286.375);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.92 0.004 286.32);
  --ring: oklch(0.623 0.214 259.815);
  
  /* Chart colors */
  --chart-1: oklch(0.696 0.17 162.48);   /* Emerald 500 */
  --chart-2: oklch(0.527 0.154 183.129); /* Teal 600 */
  --chart-3: oklch(0.446 0.13 203.43);   /* Cyan 700 */
  --chart-4: oklch(0.401 0.123 216.05);  /* Blue 700 */
  --chart-5: oklch(0.367 0.119 236.46);  /* Indigo 700 */
}
```

**Tailwind Integration**: Colors are mapped in `tailwind.config.js`:
```javascript
colors: {
  background: 'var(--background)',
  foreground: 'var(--foreground)',
  primary: {
    DEFAULT: 'var(--primary)',
    foreground: 'var(--primary-foreground)'
  },
  // ... etc
}
```

### Typography
- **Primary Font**: `Inter` (sans-serif)
- **Heading Font**: `Space Grotesk`
- Defined in `tailwind.config.js`:
```javascript
fontFamily: {
  sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
  heading: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif']
}
```

### Spacing & Border Radius
- **Border Radius**: Uses CSS variable `--radius: 0.65rem`
- Tailwind extends: `lg: var(--radius)`, `md: calc(var(--radius) - 2px)`, `sm: calc(var(--radius) - 4px)`

## 2. Component Library

### Location
- **UI Components**: `src/components/ui/` (shadcn/ui based)
- **Feature Components**: `src/components/[feature-name]/`
- **Core Components**: `src/components/core/`

### Component Architecture
- **Framework**: React 18 with JSX (not TSX)
- **Styling**: Tailwind CSS with CSS Variables
- **Component Composition**: Radix UI primitives
- **Variant System**: `class-variance-authority` (CVA)

### Example Component Pattern
```jsx
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: { default: "...", outline: "..." },
      size: { default: "...", sm: "...", lg: "..." }
    },
    defaultVariants: { variant: "default", size: "default" }
  }
);

export const Component = ({ variant, size, className, ...props }) => {
  return (
    <div className={cn(componentVariants({ variant, size, className }))} {...props} />
  );
};
```

### Available UI Components
Complete shadcn/ui library including: Button, Card, Dialog, Input, Select, Tabs, Toast, Accordion, Alert, Avatar, Badge, Calendar, Carousel, Chart, Checkbox, Command, Dropdown Menu, Form, Hover Card, Label, Menubar, Navigation Menu, Popover, Progress, Radio Group, Scroll Area, Separator, Sheet, Sidebar, Skeleton, Slider, Switch, Table, Textarea, Tooltip, Toggle

## 3. Frameworks & Libraries

### Core Stack
- **UI Framework**: React 18.2
- **Routing**: React Router DOM v7.2
- **Build Tool**: Vite 6.1
- **Styling**: Tailwind CSS 3.4 + PostCSS
- **Component Library**: Radix UI + shadcn/ui
- **Animations**: Framer Motion 12.4 + GSAP 3.13
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Backend**: Supabase (Auth + Database)

### Styling Libraries
- `tailwindcss` - Utility-first CSS
- `tailwindcss-animate` - Animation utilities
- `tailwind-merge` - Merge Tailwind classes
- `clsx` - Conditional class names
- `class-variance-authority` - Variant management

## 4. Asset Management

### Public Assets
- **Location**: `public/` directory
- **Reference**: Direct path `/asset-name.ext`

### Image Optimization
- Vite handles asset optimization during build
- Use `import` for assets in components for hash-based caching

### CDN
- Vercel deployment handles CDN automatically
- No manual CDN configuration needed

## 5. Icon System

### Icon Library
- **Primary**: Lucide React (`lucide-react`)
- **Usage**: Import individual icons
```jsx
import { ChevronRight, User, Settings } from 'lucide-react';

<ChevronRight className="h-4 w-4" />
```

### Icon Sizing
- Use Tailwind size utilities: `h-4 w-4`, `h-5 w-5`, `h-6 w-6`
- Icons inherit color from parent text color

## 6. Styling Approach

### CSS Methodology
- **Primary**: Tailwind utility classes
- **Component Variants**: CVA (class-variance-authority)
- **Class Merging**: `cn()` utility from `@/lib/utils`
- **Global Styles**: `src/index.css` with `@layer` directives

### Utility Function
```javascript
// src/lib/utils.js
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
```

### Responsive Design
- Mobile-first approach
- Tailwind breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Custom media queries via `useMediaQuery` hook

### Dark Mode
- Implemented via `next-themes`
- CSS variables switch in `.dark` class
- Toggle available in UI

## 7. Project Structure

```
src/
├── api/              # API clients (Supabase, external services)
├── components/
│   ├── ui/          # shadcn/ui components
│   ├── core/        # Core reusable components
│   ├── [feature]/   # Feature-specific components
│   └── ...
├── hooks/           # Custom React hooks
├── lib/             # Utilities and helpers
├── pages/           # Page components
├── routes/          # Route configuration
├── services/        # Business logic services
├── utils/           # Utility functions
└── i18n/            # Internationalization
```

### Path Aliases
Configured in `vite.config.js`:
```javascript
resolve: {
  alias: {
    "@": "/src",
  }
}
```

## 8. Figma Integration Guidelines

### When Converting Figma Designs to Code

1. **Extract Design Tokens First**
   - Use `get_variable_defs` to extract Figma variables
   - Map to existing CSS custom properties in `src/index.css`
   - Update `tailwind.config.js` if new tokens needed

2. **Component Mapping**
   - Check if component exists in `src/components/ui/`
   - Reuse existing components instead of creating new ones
   - Use CVA for variant management

3. **Replace Tailwind with Design System**
   - Figma MCP outputs generic Tailwind classes
   - Replace with project's CSS variables:
     - `bg-blue-600` → `bg-primary`
     - `text-gray-900` → `text-foreground`
     - `border-gray-200` → `border-border`

4. **Maintain Visual Parity**
   - Use `get_screenshot` to compare implementation
   - Adjust spacing/sizing minimally to match design
   - Validate against Figma screenshot

5. **Code Connect Integration**
   - Use `get_code_connect_map` to check existing mappings
   - Link new components to Figma nodes
   - Document component-to-design relationships

6. **Respect Existing Patterns**
   - Follow React Router DOM v7 routing patterns
   - Use React Hook Form + Zod for forms
   - Integrate with Supabase for data fetching
   - Apply Framer Motion for animations

### Code Generation Workflow

1. Get Figma URL from user (format: `https://figma.com/design/:fileKey/:fileName?node-id=:nodeId`)
2. Extract `fileKey` and `nodeId` from URL
3. Call `get_design_context` with extracted parameters
4. Review generated code and adapt to project patterns
5. Replace generic Tailwind with design system tokens
6. Integrate with existing components and routing
7. Validate visual parity with `get_screenshot`

### Example Conversion

**Figma MCP Output:**
```jsx
<button className="bg-blue-600 text-white px-4 py-2 rounded-md">
  Click me
</button>
```

**Adapted to Design System:**
```jsx
import { Button } from "@/components/ui/button";

<Button variant="default" size="default">
  Click me
</Button>
```

## 9. Quality Standards

- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Lighthouse score > 90
- **Testing**: Vitest + Testing Library
- **Type Safety**: Zod schemas for validation
- **Code Quality**: ESLint + Prettier
- **Security**: Supabase RLS policies

## 10. Development Commands

```bash
npm run dev          # Start dev server (port 8005)
npm run build        # Production build
npm run preview      # Preview production build
npm run test         # Run tests
npm run lint         # Lint code
```
