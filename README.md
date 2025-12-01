# 🏢 Nebenkosten Knacker (MimiCheck) - Monorepo

Dieses Repository enthält das gesamte MimiCheck-Ökosystem, bestehend aus zwei Hauptkomponenten:

## 📂 Projekt-Struktur

### 1. 🚀 [Landing Page & V2 Platform](./mimicheck-landing)
**Pfad:** `/mimicheck-landing`
*   **Tech:** React 19, TypeScript, Tailwind v4, Node.js, tRPC, Drizzle.
*   **Zweck:** Marketing, User Onboarding, Modernes Dashboard.
*   **Status:** Production Ready ✅

### 2. 🧠 [Core App & AI Engine](./src)
**Pfad:** `/src` (Frontend) & `/backend` (Backend)
*   **Tech:** React 18 (JS), Python (FastAPI), OpenAI, PDF Mining.
*   **Zweck:** Die "Maschine" - PDF-Analyse, KI-Auswertung, Formular-Befüllung.
*   **Status:** Functional (No Mocks) ✅

---

## 🛠️ Quick Start

### Landing Page starten
```bash
cd mimicheck-landing
npm install
npm run dev
```

### Core App starten (Full Stack)
```bash
# Backend
cd backend
source venv/bin/activate
python -m uvicorn main_enhanced:app --reload

# Frontend
# (In neuem Terminal)
npm run dev
```

---

## 📚 Dokumentation
*   **[TASKS.md](./TASKS.md):** Aktueller Projekt-Status & Roadmap.
*   **[METHODOLOGY_HANDBOOK.md](./METHODOLOGY_HANDBOOK.md):** TDD, PDCA & SOTA Design Standards.
*   **[EXPERTEN_INVENTUR_BERICHT.md](./EXPERTEN_INVENTUR_BERICHT.md):** Detaillierte Analyse der Architektur.
*   **[docs/reports](./docs/reports):** Technische Detail-Dokumentation (API, Setup).
*   **[docs/archive](./docs/archive):** Archivierte Pläne und Berichte.