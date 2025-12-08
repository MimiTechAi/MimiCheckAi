# 🚀 Figma Quick Start Guide

## ✅ Setup Complete!

Ihr habt erfolgreich die Figma Power installiert und konfiguriert:

- ✅ Figma Power aktiviert
- ✅ Design System Rules erstellt (`.kiro/steering/design-system.md`)
- ✅ Figma Workflow Guide erstellt (`.kiro/steering/figma-workflow.md`)
- ✅ Code Connect Hook eingerichtet (`.kiro/hooks/figma-code-connect.kiro.hook`)

## 🎯 Sofort loslegen (3 Optionen)

### Option 1: Mit bestehendem Figma Design

```
1. Öffne dein Figma Design
2. Kopiere die URL (Format: https://figma.com/design/ABC123/Name?node-id=1-2)
3. Sage zu Kiro:

"Hier ist mein Figma Design: [URL]
Bitte generiere optimierten Code für unsere App."
```

### Option 2: Ohne Figma Design (Verbesserungsvorschläge)

```
Sage zu Kiro:

"Analysiere unsere Landing Page Hero Section und erstelle 
moderne Verbesserungsvorschläge basierend auf Best Practices."
```

### Option 3: Design System Audit

```
Sage zu Kiro:

"Führe einen Design System Audit durch:
1. Analysiere alle Komponenten auf Konsistenz
2. Identifiziere Verbesserungspotenzial
3. Erstelle Prioritätenliste"
```

## 🎨 Verfügbare Figma Tools

### 1. `get_design_context` - Code aus Figma generieren
**Wann nutzen**: Wenn du Figma Design in Code umwandeln willst
**Beispiel**: "Generiere Code für Figma Node: [URL]"

### 2. `get_screenshot` - Screenshot für Vergleich
**Wann nutzen**: Visueller Vergleich Design vs. Implementation
**Beispiel**: "Zeige Screenshot von Figma Node: [URL]"

### 3. `get_variable_defs` - Design Tokens extrahieren
**Wann nutzen**: Farben, Spacing, Typography aus Figma holen
**Beispiel**: "Extrahiere Design Variables aus: [URL]"

### 4. `get_code_connect_map` - Component Mapping prüfen
**Wann nutzen**: Prüfen welche Components bereits gemappt sind
**Beispiel**: "Zeige Code Connect Mapping für: [URL]"

### 5. `get_metadata` - Struktur-Übersicht
**Wann nutzen**: Große Figma Files explorieren
**Beispiel**: "Zeige Struktur von Figma File: [URL]"

## 📋 Typische Workflows

### Workflow 1: Neue Landing Page Section
```
1. Designer erstellt Section in Figma
2. Teilt Figma URL
3. Kiro: "Generiere Code für: [URL]"
4. Review & Anpassung
5. Integration in src/pages/LandingPage.jsx
6. Testing & Deploy
```

### Workflow 2: Component Redesign
```
1. Identifiziere Component (z.B. Button)
2. Designer updated in Figma
3. Kiro: "Update Button Component basierend auf: [URL]"
4. Kiro passt src/components/ui/button.jsx an
5. Visual Regression Test
6. Deploy
```

### Workflow 3: Design System Sync
```
1. Designer ändert Design Tokens in Figma
2. Kiro: "Sync Design Tokens von: [URL]"
3. Kiro updated src/index.css
4. Review Changes
5. Commit & Deploy
```

## 🎯 Quick Wins für MimiTech

### Priorität 1: Landing Page Hero
**Impact**: Hoch (First Impression)
**Aufwand**: Mittel
**Command**: 
```
"Analysiere src/pages/LandingPage.jsx Hero Section.
Erstelle moderne Verbesserungsvorschläge mit:
- Animated Gradient Background
- Trust Indicators
- Optimierte CTAs
- Micro-interactions"
```

### Priorität 2: Dashboard Cards
**Impact**: Hoch (Daily Use)
**Aufwand**: Niedrig
**Command**:
```
"Verbessere Dashboard Cards in src/pages/Dashboard.jsx:
- Modern Card Design
- Hover Effects
- Better Data Visualization
- Loading States"
```

### Priorität 3: Form Inputs
**Impact**: Mittel (User Experience)
**Aufwand**: Niedrig
**Command**:
```
"Optimiere Form Inputs:
- Better Focus States
- Error Handling
- Accessibility
- Validation Feedback"
```

## 🔥 Pro Tips

1. **Immer mit Screenshot vergleichen**
   ```
   Nach Code-Generierung:
   "Zeige Figma Screenshot zum Vergleich"
   ```

2. **Design System Tokens nutzen**
   ```
   Kiro ersetzt automatisch:
   bg-blue-600 → bg-primary
   text-gray-900 → text-foreground
   ```

3. **Responsive von Anfang an**
   ```
   "Generiere Code mit Mobile, Tablet, Desktop Varianten"
   ```

4. **Accessibility nicht vergessen**
   ```
   "Füge ARIA Labels und Keyboard Navigation hinzu"
   ```

## 📊 Success Tracking

### Metrics vor/nach Redesign tracken:
- Conversion Rate
- Bounce Rate
- Time on Page
- User Engagement
- Task Completion Rate

### Tools:
```bash
# Performance
npm run lighthouse

# Accessibility
npm run test

# Visual Regression
npm run test:visual
```

## 🆘 Troubleshooting

### Problem: Figma URL funktioniert nicht
**Lösung**: 
```
URL Format prüfen:
✅ https://figma.com/design/ABC123/Name?node-id=1-2
❌ https://figma.com/file/ABC123
```

### Problem: Generierter Code passt nicht
**Lösung**:
```
"Kiro, passe den Code an unser Design System an:
- Nutze CSS Variables statt hardcoded colors
- Verwende bestehende UI Components
- Füge Framer Motion Animations hinzu"
```

### Problem: Component existiert schon
**Lösung**:
```
"Kiro, update bestehende Component in src/components/ui/[name].jsx
basierend auf Figma Design: [URL]"
```

## 🎓 Weiterführende Ressourcen

- **Design System Rules**: `.kiro/steering/design-system.md`
- **Figma Workflow**: `.kiro/steering/figma-workflow.md`
- **Component Library**: `src/components/ui/`
- **Tailwind Config**: `tailwind.config.js`
- **CSS Variables**: `src/index.css`

## 🚀 Los geht's!

**Dein erster Command**:
```
"Kiro, lass uns mit der Landing Page Hero Section starten.
Analysiere den aktuellen Code und erstelle Verbesserungsvorschläge."
```

Oder mit Figma URL:
```
"Kiro, hier ist mein Figma Design: [URL]
Generiere optimierten React Code mit unserem Design System."
```

**Viel Erfolg! 🎉**
