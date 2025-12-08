# 🎨 Figma Power - Cheat Sheet

## 🚀 Quick Commands

### Mit Figma URL
```
"Generiere Code für Figma: [URL]"
"Zeige Screenshot von: [URL]"
"Extrahiere Design Tokens aus: [URL]"
"Prüfe Code Connect für: [URL]"
```

### Ohne Figma URL
```
"Analysiere [Component/Page] und erstelle Verbesserungsvorschläge"
"Optimiere [Component] mit modernen UI Patterns"
"Verbessere [Page] Design und UX"
```

## 🛠️ Figma Tools Übersicht

| Tool | Input | Output | Use Case |
|------|-------|--------|----------|
| `get_design_context` | URL | React Code | Design → Code |
| `get_screenshot` | URL | Image | Visual Compare |
| `get_variable_defs` | URL | Design Tokens | Token Sync |
| `get_code_connect_map` | URL | Mapping | Check Links |
| `get_metadata` | URL | Structure | Explore File |

## 📋 URL Format

### Richtig ✅
```
https://figma.com/design/ABC123/ProjectName?node-id=1-2
https://figma.com/design/ABC123/branch/XYZ789/Name
```

### Falsch ❌
```
https://figma.com/file/ABC123
https://figma.com/proto/ABC123
```

## 🎯 Workflow Templates

### Template 1: Neue Component
```
1. "Generiere Code für: [FIGMA_URL]"
2. Review Code
3. "Passe an Design System an"
4. "Füge Animations hinzu"
5. "Erstelle Tests"
6. Deploy
```

### Template 2: Component Update
```
1. "Update [Component] basierend auf: [FIGMA_URL]"
2. "Zeige Diff zum aktuellen Code"
3. Review Changes
4. "Führe Visual Regression Test durch"
5. Deploy
```

### Template 3: Design Audit
```
1. "Analysiere [Page/Component]"
2. "Identifiziere Inkonsistenzen"
3. "Erstelle Verbesserungsvorschläge"
4. "Priorisiere nach Impact"
5. Implementierung planen
```

## 🎨 Design System Mapping

### Farben
```
Figma → Code
Blue 600 → bg-primary
Gray 900 → text-foreground
Gray 200 → border-border
Red 600 → bg-destructive
```

### Spacing
```
Figma → Tailwind
4px → p-1
8px → p-2
16px → p-4
24px → p-6
32px → p-8
```

### Typography
```
Figma → Code
Heading → font-heading
Body → font-sans
Size → text-{sm|base|lg|xl|2xl}
```

## 🔥 Quick Wins

### Landing Page
```
"Optimiere Hero Section:
- Animated Background
- Trust Indicators
- Better CTAs
- Micro-interactions"
```

### Dashboard
```
"Verbessere Dashboard:
- Modern Card Layout
- Data Visualization
- Loading States
- Hover Effects"
```

### Forms
```
"Upgrade Form Inputs:
- Focus States
- Error Handling
- Validation Feedback
- Accessibility"
```

## 💡 Pro Tips

### 1. Immer Screenshot vergleichen
```
Nach Code-Gen:
"Zeige Figma Screenshot zum Vergleich"
```

### 2. Design System nutzen
```
"Ersetze alle hardcoded Werte mit CSS Variables"
```

### 3. Responsive von Anfang an
```
"Generiere Mobile, Tablet, Desktop Varianten"
```

### 4. Accessibility
```
"Füge ARIA Labels und Keyboard Navigation hinzu"
```

### 5. Performance
```
"Optimiere für Lighthouse Score > 90"
```

## 🎯 Component Priorities

### High Impact
- ✅ Landing Page Hero
- ✅ CTA Buttons
- ✅ Dashboard Cards
- ✅ Navigation

### Medium Impact
- ⏳ Form Inputs
- ⏳ Data Tables
- ⏳ Modals/Dialogs
- ⏳ Cards

### Low Impact
- 📋 Footer
- 📋 Breadcrumbs
- 📋 Badges
- 📋 Tooltips

## 📊 Success Metrics

### Track These
```
Before → After
Conversion: 2.5% → 4.5%
Bounce: 65% → 45%
Engagement: 3.2 → 7.5
Discovery: 40% → 75%
```

### Tools
```bash
npm run lighthouse    # Performance
npm run test         # Accessibility
npm run test:visual  # Visual Regression
```

## 🆘 Troubleshooting

### Problem: URL nicht erkannt
```
✅ Lösung: Format prüfen
https://figma.com/design/:fileKey/:name?node-id=:id
```

### Problem: Code passt nicht
```
✅ Lösung: "Passe an Design System an"
```

### Problem: Component existiert
```
✅ Lösung: "Update bestehende Component"
```

### Problem: Zu viel Code
```
✅ Lösung: "Vereinfache und nutze bestehende Components"
```

## 🎓 Keyboard Shortcuts

### In Kiro Chat
```
Cmd/Ctrl + K → Quick Command
Cmd/Ctrl + / → Command Palette
Cmd/Ctrl + Shift + P → Powers Menu
```

### Häufige Commands
```
"figma" → Zeigt Figma Commands
"design" → Design-bezogene Commands
"component" → Component Commands
```

## 📚 Dokumentation

### Steering Files
```
.kiro/steering/design-system.md
.kiro/steering/figma-workflow.md
```

### Docs
```
.kiro/docs/figma-quick-start.md
.kiro/docs/figma-setup-summary.md
.kiro/docs/figma-cheat-sheet.md (diese Datei)
```

### Hooks
```
.kiro/hooks/figma-code-connect.kiro.hook
```

## 🚀 Getting Started

### Option 1: Mit Figma URL
```
"Hier ist mein Figma Design: [URL]
Generiere optimierten Code."
```

### Option 2: Ohne Figma
```
"Analysiere Landing Page Hero und 
erstelle Verbesserungsvorschläge."
```

### Option 3: Design Audit
```
"Führe Design System Audit durch und
identifiziere Quick Wins."
```

---

**Bookmark diese Seite für schnellen Zugriff! 🔖**
