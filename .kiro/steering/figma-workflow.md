---
inclusion: always
---

# Professional Figma Workflow für MimiTech
## Wie Top-Entwicklerteams Figma nutzen

Dieser Guide zeigt, wie ihr Figma systematisch nutzt, um eure Core App und Landing Page zu verbessern.

## 🎯 Phase 1: Design Audit & Analyse

### 1.1 Bestehende UI analysieren
**Ziel**: Inkonsistenzen und Verbesserungspotenzial identifizieren

**Workflow**:
1. Screenshots aller wichtigen Seiten erstellen
2. Design-Inkonsistenzen dokumentieren:
   - Unterschiedliche Button-Styles
   - Inkonsistente Abstände/Spacing
   - Verschiedene Farbvarianten
   - Typografie-Variationen
   - Inkonsistente Komponenten

**Kiro Command**:
```
Analysiere folgende Seiten und erstelle Screenshots:
- Landing Page (Home, Pricing, Features)
- Core App (Dashboard, Profile, Settings)
```

### 1.2 Design System Gaps identifizieren
**Prüfen**:
- [ ] Fehlen wichtige Komponenten-Varianten?
- [ ] Sind alle Farben im Design System definiert?
- [ ] Gibt es undokumentierte Spacing-Werte?
- [ ] Sind Responsive-Breakpoints konsistent?
- [ ] Fehlen Accessibility-States (focus, hover, disabled)?

## 🎨 Phase 2: Figma Design System Setup

### 2.1 Design Tokens aus Figma extrahieren
**Wenn ihr bereits ein Figma-Design habt**:

```
Kiro, extrahiere Design Variables aus Figma:
URL: [FIGMA_URL]
Vergleiche mit unserem aktuellen Design System in src/index.css
```

**Figma Tool**: `get_variable_defs`
- Extrahiert: Colors, Typography, Spacing, Border Radius
- Vergleicht mit bestehendem System
- Identifiziert Diskrepanzen

### 2.2 Component Library Mapping
**Erstellt Mapping zwischen Figma und Code**:

| Figma Component | Code Component | Status |
|----------------|----------------|---------|
| Button/Primary | `@/components/ui/button` | ✅ Mapped |
| Card/Default | `@/components/ui/card` | ✅ Mapped |
| Input/Text | `@/components/ui/input` | ✅ Mapped |
| Modal/Dialog | `@/components/ui/dialog` | ✅ Mapped |

**Kiro Command**:
```
Prüfe Code Connect Mapping für Figma URL: [URL]
Zeige welche Komponenten bereits gemappt sind
```

## 🚀 Phase 3: Systematische UI-Verbesserung

### 3.1 Landing Page Optimierung

**Priority Areas**:
1. **Hero Section**: First Impression optimieren
2. **CTA Buttons**: Conversion-optimiert gestalten
3. **Feature Cards**: Visuell ansprechend & konsistent
4. **Pricing Section**: Klar & vertrauenswürdig
5. **Footer**: Professional & vollständig

**Workflow pro Section**:
```
1. Figma Design für Hero Section öffnen
2. Kiro: "Generiere Code für Figma Node: [NODE_ID]"
3. Review & Anpassung an Design System
4. A/B Testing Setup (optional)
5. Deploy & Monitor
```

### 3.2 Core App Dashboard Redesign
**Focus**: Usability & Datenvisualisierung

**Schritte**:
1. **Dashboard Layout**: 
   - Figma: Grid-System definieren
   - Kiro: Layout-Code generieren
   - Responsive Breakpoints testen

2. **Data Widgets**:
   - Chart-Komponenten aus Figma
   - Recharts Integration
   - Real-time Data Binding

3. **Navigation**:
   - Sidebar/Header Konsistenz
   - Mobile Navigation
   - Breadcrumbs & Context

**Kiro Workflow**:
```
Für jede Dashboard-Komponente:
1. get_screenshot - Visuelles Referenz
2. get_design_context - Code generieren
3. Anpassen an bestehende Patterns
4. Integration testen
```

## 🔄 Phase 4: Iterativer Verbesserungsprozess

### 4.1 Design Review Cycle

**Wöchentlicher Zyklus**:
1. **Montag**: Design Updates in Figma
2. **Dienstag**: Code-Generierung mit Kiro
3. **Mittwoch**: Implementation & Testing
4. **Donnerstag**: Review & Feedback
5. **Freitag**: Deploy & Dokumentation

### 4.2 Continuous Design Sync
**Automatisierung mit Kiro Hook**:
- Bei Component-Änderung → Prüfe Figma Sync
- Bei Figma-Update → Notify Team
- Bei Design-Diskrepanz → Create Issue

## 📋 Phase 5: Konkrete Verbesserungsvorschläge

### 5.1 Landing Page Enhancements

**Hero Section**:
```jsx
// Aktuell: Basis Hero
// Verbesserung: Animated Hero mit 3D Elements

Figma Design → Kiro generiert:
- Gradient Background (GSAP Animation)
- 3D Product Preview (Three.js)
- Animated CTA Buttons (Framer Motion)
- Trust Badges (Social Proof)
```

**Feature Section**:
```jsx
// Aktuell: Statische Cards
// Verbesserung: Interactive Feature Cards

Figma Design → Kiro generiert:
- Hover Effects (Framer Motion)
- Icon Animations (Lucide + GSAP)
- Micro-interactions
- Progressive Disclosure
```

### 5.2 Core App UI Upgrades

**Dashboard**:
```jsx
// Verbesserungen:
1. Modern Card Layouts (Bento Grid)
2. Real-time Charts (Recharts + Animations)
3. Quick Actions (Command Palette)
4. Status Indicators (Live Updates)
```

**Profile Page**:
```jsx
// Verbesserungen:
1. Avatar Upload mit Preview (Drag & Drop)
2. Progress Indicators (Gamification)
3. Achievement Badges
4. Activity Timeline
```

## 🛠️ Phase 6: Praktische Kiro Commands

### 6.1 Design zu Code Workflow

**Schritt 1: Figma URL bereitstellen**
```
User: "Hier ist mein Figma Design: https://figma.com/design/ABC123/MimiTech?node-id=1-2"

Kiro extrahiert automatisch:
- fileKey: ABC123
- nodeId: 1:2
```

**Schritt 2: Design Context abrufen**
```
Kiro: get_design_context(
  fileKey: "ABC123",
  nodeId: "1:2",
  clientLanguages: "javascript,typescript",
  clientFrameworks: "react,vite"
)
```

**Schritt 3: Code Review & Anpassung**
```
Kiro analysiert:
1. Ersetzt generic Tailwind → Design System tokens
2. Identifiziert wiederverwendbare Komponenten
3. Integriert Animations
4. Fügt Accessibility hinzu
5. Optimiert Performance
```

**Schritt 4: Screenshot Vergleich**
```
Kiro: get_screenshot(
  fileKey: "ABC123",
  nodeId: "1:2"
)

→ Visueller Vergleich: Figma vs. Implementation
```

### 6.2 Batch Processing für große Updates

**Mehrere Komponenten gleichzeitig**:
```
Kiro, verarbeite folgende Figma Nodes:
1. Hero Section (node-id: 1-2)
2. Feature Cards (node-id: 3-4)
3. Pricing Table (node-id: 5-6)
4. Footer (node-id: 7-8)

Für jeden:
- Generiere Code
- Passe an Design System an
- Erstelle Component File
- Update Routing
```

## 🎯 Phase 7: Quality Assurance

### 7.1 Design-Code Parity Check

**Automated Checks**:
```bash
# Visual Regression Testing
npm run test:visual

# Accessibility Audit
npm run lighthouse

# Design Token Validation
npm run validate:tokens
```

**Manual Review Checklist**:
- [ ] Spacing matches Figma (8px grid)
- [ ] Colors use CSS variables
- [ ] Typography consistent
- [ ] Responsive breakpoints work
- [ ] Animations smooth (60fps)
- [ ] Accessibility (WCAG AA)
- [ ] Performance (Lighthouse > 90)

### 7.2 Cross-Browser Testing
**Test Matrix**:
- Chrome (Desktop + Mobile)
- Safari (Desktop + iOS)
- Firefox (Desktop)
- Edge (Desktop)

## 📊 Phase 8: Metrics & Optimization

### 8.1 Design Impact Tracking
**Metriken vor/nach Redesign**:
```
Landing Page:
- Conversion Rate
- Bounce Rate
- Time on Page
- CTA Click Rate

Core App:
- User Engagement
- Feature Adoption
- Task Completion Time
- Error Rate
```

### 8.2 Performance Monitoring
```javascript
// Lighthouse CI Integration
{
  "assertions": {
    "performance": ["error", { "minScore": 0.9 }],
    "accessibility": ["error", { "minScore": 0.95 }],
    "best-practices": ["error", { "minScore": 0.9 }]
  }
}
```

## 🚀 Phase 9: Advanced Figma Features

### 9.1 Design Variables Sync

**Workflow**:
```
1. Designer ändert Color Token in Figma
2. Kiro: get_variable_defs → Erkennt Änderung
3. Automatisches Update in src/index.css
4. Git Commit mit Changelog
5. Team Notification
```

**Beispiel**:
```css
/* Vorher */
--primary: oklch(0.5 0.22 260);

/* Figma Update erkannt */
--primary: oklch(0.55 0.24 265); /* Helleres Blau */

/* Kiro erstellt PR mit Beschreibung */
```

### 9.2 Component Variants Management
**Figma Variants → Code Variants**:
```jsx
// Figma: Button mit Variants
// - Size: sm, md, lg
// - Variant: primary, secondary, outline
// - State: default, hover, disabled

// Kiro generiert CVA:
const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border border-input bg-background"
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-9 px-4 text-sm",
        lg: "h-10 px-8 text-base"
      }
    }
  }
);
```

## 🎓 Phase 10: Best Practices (Google DeepMind Style)

### 10.1 Design System as Single Source of Truth
**Prinzip**: Figma ist die Wahrheit, Code folgt

**Implementation**:
1. **Alle** Design-Entscheidungen in Figma
2. Code wird **generiert**, nicht manuell geschrieben
3. Diskrepanzen → Figma anpassen, dann regenerieren
4. Versionierung: Figma Version = Code Version

### 10.2 Atomic Design Methodology

**Hierarchie**:
```
Atoms (Figma Components)
└─ Button, Input, Icon, Label
   └─ Code: src/components/ui/

Molecules (Figma Frames)
└─ Form Field, Search Bar, Card Header
   └─ Code: src/components/core/

Organisms (Figma Sections)
└─ Navigation, Hero, Feature Grid
   └─ Code: src/components/[feature]/

Templates (Figma Pages)
└─ Dashboard Layout, Landing Layout
   └─ Code: src/pages/

Pages (Figma Prototypes)
└─ Home, Dashboard, Profile
   └─ Code: src/pages/[page].jsx
```

### 10.3 Collaboration Workflow
**Team Rollen**:

**Designer**:
1. Erstellt/Updated Designs in Figma
2. Dokumentiert Design Decisions
3. Erstellt Prototypes für User Testing
4. Taggt Komponenten für Code Connect

**Developer (mit Kiro)**:
```
1. Erhält Figma URL vom Designer
2. Kiro: "Generiere Code für [URL]"
3. Review & Integration
4. Feedback an Designer (via Figma Comments)
5. Iteration bis perfekt
```

**QA**:
1. Visual Regression Tests
2. Cross-Browser Testing
3. Accessibility Audit
4. Performance Monitoring

## 📝 Phase 11: Dokumentation & Handoff

### 11.1 Design Specs Export
**Kiro generiert automatisch**:
```markdown
# Component: Hero Section
- Figma: [Link]
- Code: src/components/landing/Hero.jsx
- Props: title, subtitle, ctaText, ctaLink
- Variants: default, centered, with-image
- Responsive: Mobile, Tablet, Desktop
- Animations: Fade-in, Slide-up
```

### 11.2 Style Guide Generation

**Auto-Generated Docs**:
```
Kiro erstellt automatisch:
- Color Palette (mit OKLCH Werten)
- Typography Scale
- Spacing System
- Component Library Overview
- Usage Examples
```

## 🎯 Konkrete Aktionsschritte für MimiTech

### Sofort starten (Heute):

**1. Figma File Setup** (falls noch nicht vorhanden)
```
Option A: Bestehendes Figma File
→ Teile Figma URL mit Kiro
→ Kiro analysiert & extrahiert Design System

Option B: Neues Figma File erstellen
→ Nutze Figma Community Templates
→ Passe an MimiTech Brand an
→ Definiere Design Tokens
```

**2. Erste Component Migration**
```
Kiro Command:
"Analysiere unsere Landing Page Hero Section und 
vergleiche mit Best Practices. Erstelle Verbesserungsvorschläge."

Dann:
"Wenn ich ein Figma Design habe, generiere optimierten Code 
der unser Design System nutzt."
```

**3. Quick Wins identifizieren**
```
Bereiche mit größtem Impact:
✅ Landing Page Hero (First Impression)
✅ CTA Buttons (Conversion)
✅ Dashboard Cards (Daily Use)
✅ Form Inputs (User Experience)
✅ Mobile Navigation (Accessibility)
```

### Diese Woche:

**Tag 1-2: Audit & Planning**
- [ ] Alle Seiten screenshotten
- [ ] Inkonsistenzen dokumentieren
- [ ] Priority List erstellen
- [ ] Figma File vorbereiten

**Tag 3-4: Implementation**
- [ ] Top 3 Components redesignen
- [ ] Mit Kiro Code generieren
- [ ] Testing & Refinement
- [ ] Deploy zu Staging

**Tag 5: Review & Iterate**
- [ ] Team Feedback sammeln
- [ ] Metrics checken
- [ ] Nächste Iteration planen

## 🚀 Beispiel: Landing Page Hero Upgrade

### Aktueller Zustand analysieren:
```
Kiro: "Analysiere src/pages/LandingPage.jsx Hero Section"
```

### Figma Design erstellen:
```
Designer erstellt in Figma:
- Modern Hero Layout
- Animated Gradient Background
- 3D Product Preview
- Optimierte CTAs
- Trust Indicators
```

### Code generieren:
```
User: "Hier ist mein Figma Hero Design: [URL]"

Kiro:
1. Extrahiert fileKey & nodeId
2. Ruft get_design_context auf
3. Generiert React Component
4. Ersetzt generic Tailwind mit Design System
5. Fügt Framer Motion Animations hinzu
6. Integriert mit bestehendem Routing
7. Erstellt responsive Breakpoints
```

### Ergebnis:
```jsx
// src/components/landing/HeroModern.jsx
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Zap } from 'lucide-react';

export const HeroModern = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-background">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                       bg-primary/10 text-primary mb-6"
          >
            <Shield className="h-4 w-4" />
            <span className="text-sm font-medium">
              Vertraut von 10.000+ Nutzern
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-heading font-bold 
                         text-foreground mb-6">
            Deine Anträge.{' '}
            <span className="text-primary">Automatisiert.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Spare Zeit und Nerven mit intelligenter Antragsautomatisierung. 
            KI-gestützt, sicher und DSGVO-konform.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group">
              Jetzt starten
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline">
              <Zap className="mr-2 h-5 w-5" />
              Demo ansehen
            </Button>
          </div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full bg-primary/20 border-2 border-background" />
                ))}
              </div>
              <span>10.000+ aktive Nutzer</span>
            </div>
            <div>⭐⭐⭐⭐⭐ 4.9/5.0</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
```

## 📊 Success Metrics

### Vor Figma Integration:
```
Landing Page:
- Conversion Rate: 2.5%
- Bounce Rate: 65%
- Time on Page: 45s

Core App:
- User Engagement: 3.2/10
- Feature Discovery: 40%
- Task Completion: 75%
```

### Nach Figma Integration (Ziel):
```
Landing Page:
- Conversion Rate: 4.5% (+80%)
- Bounce Rate: 45% (-31%)
- Time on Page: 90s (+100%)

Core App:
- User Engagement: 7.5/10 (+134%)
- Feature Discovery: 75% (+88%)
- Task Completion: 92% (+23%)
```

## 🎓 Pro Tips

### 1. Figma Plugins nutzen
- **Stark**: Accessibility Checker
- **Contrast**: Color Contrast Checker
- **Responsify**: Responsive Design Testing
- **Content Reel**: Realistic Content Generator

### 2. Design Tokens automatisieren
```javascript
// Script: sync-figma-tokens.js
// Läuft täglich via GitHub Actions
// Synct Figma Variables → CSS Variables
```

### 3. Component Library pflegen
```
Regel: Jede neue Figma Component
→ Automatisch Code generieren
→ Storybook Story erstellen
→ Tests schreiben
→ Dokumentieren
```

### 4. Performance im Blick behalten
```
Jedes Figma Design:
- Max 3 Custom Fonts
- Optimierte Images (WebP)
- Lazy Loading für Heavy Components
- Code Splitting
```

## 🎯 Nächste Schritte

**Jetzt sofort**:
1. ✅ Figma Power ist installiert
2. ✅ Design System Rules sind aktiv
3. ✅ Code Connect Hook ist eingerichtet
4. ⏳ Figma URL bereitstellen → Loslegen!

**Kiro Command zum Starten**:
```
"Kiro, ich habe ein Figma Design für [Component/Page Name].
Hier ist die URL: [FIGMA_URL]

Bitte:
1. Analysiere das Design
2. Extrahiere Design Tokens
3. Generiere optimierten React Code
4. Integriere mit unserem Design System
5. Füge Animations hinzu
6. Erstelle responsive Varianten"
```

**Oder ohne Figma URL**:
```
"Kiro, analysiere unsere [Page/Component] und erstelle 
Verbesserungsvorschläge basierend auf modernen UI/UX Best Practices."
```

---

## 🎉 Ready to Rock!

Ihr seid jetzt bereit, Figma wie ein Top-Tier Entwicklerteam zu nutzen!

**Remember**:
- Design System = Single Source of Truth
- Figma → Code (nicht umgekehrt)
- Iterativ verbessern
- Metrics tracken
- User Feedback einbeziehen

**Let's build something beautiful! 🚀**
