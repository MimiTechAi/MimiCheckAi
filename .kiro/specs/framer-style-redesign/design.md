# Design Document: Framer-Style MimiCheck AI Landing Page

## Overview

Dieses Design-Dokument beschreibt die technische Architektur und Implementierung für das komplette Redesign der MimiCheck AI Landing Page im Stil der XTRACT Framer-Referenzseite. Das Ziel ist eine weltklasse, award-winning Landing Page mit Premium-Animationen, dunklem Theme und professionellen UI-Mockups.

### Design Philosophy
- **Dark-First**: Tiefschwarzer Hintergrund (#0a0a0a) mit violetten/emerald Akzenten
- **Motion-Rich**: Framer Motion für alle Animationen (60fps)
- **Component-Based**: Wiederverwendbare React-Komponenten
- **Performance-First**: Lazy Loading, optimierte Assets, GPU-beschleunigte Animationen

## Architecture

```
mimicheck-landing/client/src/
├── pages/
│   └── LandingFramer.tsx          # Neue Hauptseite
├── components/
│   └── framer/                     # Neue Framer-Style Komponenten
│       ├── FramerNavbar.tsx        # Premium Navigation
│       ├── FramerHero.tsx          # Hero mit Glow-Orb
│       ├── GlowOrb.tsx             # Animierter Glow-Effekt
│       ├── TrustMarquee.tsx        # Logo-Marquee
│       ├── ServicesSection.tsx     # Services Übersicht
│       ├── FeatureSection.tsx      # Feature mit UI-Mockup
│       ├── ProcessSection.tsx      # 3-Schritte Prozess
│       ├── UIMockup.tsx            # Dashboard Mockup Komponente
│       └── FramerFooter.tsx        # Premium Footer
└── styles/
    └── framer-theme.css            # Zusätzliche CSS Animationen
```

## Components and Interfaces

### 1. FramerNavbar Component

```typescript
interface FramerNavbarProps {
  logo: string;
  menuItems: MenuItem[];
  ctaText: string;
  ctaHref: string;
}

interface MenuItem {
  label: string;
  href: string;
}
```

**Verhalten:**
- Transparent bei scroll position 0
- Solid dark background bei scroll > 50px
- Sticky positioning
- Mobile hamburger menu unter 768px

### 2. FramerHero Component

```typescript
interface FramerHeroProps {
  badge: {
    label: string;  // "Neu"
    text: string;   // "Automatische Förder-Erkennung"
  };
  headline: string;
  subtitle: string;
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
}
```

**Animationen:**
- GlowOrb: Pulsierender violetter Orb mit blur(100px)
- Floating Particles: 20-30 kleine Punkte mit random float animation
- Text Reveal: Staggered fade-up für Headline/Subtitle
- Button Hover: Scale + Glow effect

### 3. GlowOrb Component

```typescript
interface GlowOrbProps {
  size?: number;        // Default: 400px
  color?: string;       // Default: violet-500
  pulseSpeed?: number;  // Default: 4s
  blur?: number;        // Default: 100px
}
```

**CSS Animation:**
```css
@keyframes glow-pulse {
  0%, 100% { 
    transform: scale(1); 
    opacity: 0.6; 
  }
  50% { 
    transform: scale(1.1); 
    opacity: 0.8; 
  }
}
```

### 4. TrustMarquee Component

```typescript
interface TrustMarqueeProps {
  title: string;        // "Über 50+ Unternehmen vertrauen uns"
  logos: TrustLogo[];
  speed?: number;       // Default: 30s
}

interface TrustLogo {
  name: string;
  src: string;
}
```

**Implementierung:**
- Doppelte Logo-Liste für seamless loop
- CSS animation: translateX(-50%) über duration
- Grayscale filter mit hover:grayscale(0)

### 5. FeatureSection Component

```typescript
interface FeatureSectionProps {
  badge: string;           // z.B. "Förder-Analyse"
  headline: string;
  description: string;
  tags: string[];          // z.B. ["Wohngeld", "BAföG", "Elterngeld"]
  mockupPosition: 'left' | 'right';
  mockupType: 'task-list' | 'chat' | 'form-fill';
}
```

**Layout:**
- Grid: 2 Spalten (1:1 ratio)
- Gap: 64px
- Mockup: 500px max-width
- Responsive: Stack auf mobile

### 6. UIMockup Component

```typescript
interface UIMockupProps {
  type: 'task-list' | 'chat' | 'form-fill' | 'analysis' | 'schedule';
  data?: MockupData;
}

interface TaskListMockup {
  tabs: string[];
  tasks: {
    icon: string;
    title: string;
    subtitle: string;
    status: 'pending' | 'done' | 'progress';
  }[];
}
```

**Styling:**
- Background: slate-900/80
- Border: slate-700/50 mit hover:violet-500/30
- Border-radius: 16px
- Subtle inner shadow

### 7. ProcessSection Component

```typescript
interface ProcessSectionProps {
  badge: string;
  headline: string;
  subtitle: string;
  steps: ProcessStep[];
}

interface ProcessStep {
  number: string;      // "Step 1"
  title: string;
  description: string;
  visualization: 'upload' | 'analysis' | 'submit';
}
```

## Data Models

### Color Palette (CSS Variables)

```css
:root {
  /* Primary Colors */
  --framer-bg: #0a0a0a;
  --framer-bg-card: #111111;
  --framer-bg-elevated: #1a1a1a;
  
  /* Accent Colors */
  --framer-violet: #8b5cf6;
  --framer-violet-glow: rgba(139, 92, 246, 0.4);
  --framer-emerald: #10b981;
  --framer-emerald-glow: rgba(16, 185, 129, 0.3);
  
  /* Text Colors */
  --framer-text-primary: #ffffff;
  --framer-text-secondary: #a1a1aa;
  --framer-text-muted: #71717a;
  
  /* Border Colors */
  --framer-border: rgba(255, 255, 255, 0.1);
  --framer-border-hover: rgba(139, 92, 246, 0.3);
}
```

### Feature Data

```typescript
const features: FeatureSectionProps[] = [
  {
    badge: "Förder-Analyse",
    headline: "Automatisiere repetitive Aufgaben",
    description: "Wir helfen dir, interne Abläufe zu optimieren durch automatisierte Förder-Suche, Dokumenten-Analyse und Antrags-Workflows.",
    tags: ["Wohngeld", "BAföG", "100+ Förderungen"],
    mockupPosition: "left",
    mockupType: "task-list"
  },
  {
    badge: "KI-Assistent",
    headline: "Delegiere tägliche Aufgaben",
    description: "Von der Dokumenten-Analyse bis zur Antrags-Vorbereitung - unser KI-Assistent arbeitet rund um die Uhr für dich.",
    tags: ["Zusammenfassungen", "Analyse", "Vieles mehr"],
    mockupPosition: "right",
    mockupType: "chat"
  },
  {
    badge: "Auto-Anträge",
    headline: "Baue smartere Systeme",
    description: "Ob du bei Null startest oder ein bestehendes System verbesserst - wir entwickeln maßgeschneiderte Lösungen für deine Förderanträge.",
    tags: ["Auto-Fill", "PDF-Export", "Einreichung"],
    mockupPosition: "left",
    mockupType: "form-fill"
  }
];
```

### Process Steps Data

```typescript
const processSteps: ProcessStep[] = [
  {
    number: "Step 1",
    title: "Smart Analysieren",
    description: "Wir analysieren deine Situation und identifizieren passende Förderungen.",
    visualization: "analysis"
  },
  {
    number: "Step 2", 
    title: "KI-Entwicklung",
    description: "Unser Team erstellt intelligente Automatisierungen für deine Anträge.",
    visualization: "upload"
  },
  {
    number: "Step 3",
    title: "Integration & Support",
    description: "Wir begleiten dich bei der Einreichung und stehen für Fragen bereit.",
    visualization: "submit"
  }
];
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Feature Section Completeness
*For any* feature section rendered on the page, the section SHALL contain a badge element, a headline element, a description element, and at least one tag pill button.
**Validates: Requirements 5.1, 5.5, 5.6**

### Property 2: Process Steps Completeness
*For any* process step rendered in the Process Section, the step SHALL contain a step number label, a title, a description, and a visualization element.
**Validates: Requirements 6.5, 6.6, 6.7**

### Property 3: Navigation Menu Items
*For any* navigation menu, all menu items SHALL be rendered as clickable links with the correct href attributes.
**Validates: Requirements 7.1, 7.2, 7.3**

## Error Handling

### Animation Fallbacks
- Wenn `prefers-reduced-motion: reduce` aktiv ist, werden alle Animationen deaktiviert
- Fallback zu statischen Elementen bei Animation-Fehlern
- GlowOrb zeigt statischen Gradient wenn WebGL nicht verfügbar

### Image Loading
- Lazy loading für alle Bilder unterhalb des Folds
- Placeholder/Skeleton während des Ladens
- Fallback-Icons wenn Bilder nicht laden

### Responsive Breakpoints
```typescript
const breakpoints = {
  mobile: 0,      // < 768px
  tablet: 768,    // 768px - 1023px
  desktop: 1024,  // 1024px - 1279px
  wide: 1280      // >= 1280px
};
```

## Testing Strategy

### Unit Testing Framework
- **Framework**: Vitest (bereits im Projekt konfiguriert)
- **Testing Library**: @testing-library/react für Component Tests

### Property-Based Testing
- **Framework**: fast-check für Property-Based Tests
- **Minimum Iterations**: 100 pro Property

### Test Categories

1. **Component Render Tests**
   - Alle Komponenten rendern ohne Fehler
   - Korrekte Props werden angezeigt
   - Accessibility attributes sind vorhanden

2. **Property-Based Tests**
   - Feature: framer-style-redesign, Property 1: Feature Section Completeness
   - Feature: framer-style-redesign, Property 2: Process Steps Completeness
   - Feature: framer-style-redesign, Property 3: Navigation Menu Items

3. **Integration Tests**
   - Page lädt vollständig
   - Navigation funktioniert
   - Scroll-Animationen triggern korrekt

### Visual Regression (Optional)
- Playwright für Screenshot-Vergleiche
- Storybook für isolierte Component-Tests
