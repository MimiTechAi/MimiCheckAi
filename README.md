# 🏢 MiMiCheck - Nebenkosten Knacker

KI-gestützte Analyse von Nebenkostenabrechnungen und Förderanträgen.

## 🚀 Quick Start

### 1. Environment einrichten

```bash
# .env Datei erstellen (siehe .env.example)
cp .env.example .env
# Fülle die Supabase-Credentials aus
```

### 2. Landing Page starten

```bash
cd mimicheck-landing
pnpm install
pnpm run dev
# → http://localhost:3000
```

### 3. Core App starten

```bash
npm install
npm run dev
# → http://localhost:8005
```

## 📂 Projekt-Struktur

| Komponente | Pfad | Tech | Beschreibung |
|------------|------|------|--------------|
| **Landing Page** | `/mimicheck-landing` | React 19, TypeScript, Tailwind v4 | Marketing, Auth, Onboarding |
| **Core App** | `/src` | React 18, JavaScript, Vite | Dashboard, Features, AI-Assistent |
| **Backend** | `/backend` | Python, FastAPI | PDF-Analyse, AI-Integration |
| **Supabase** | `/supabase` | Edge Functions, PostgreSQL | Auth, DB, Storage |

## 🌐 Deployment

Siehe **[DEPLOYMENT.md](./DEPLOYMENT.md)** für die vollständige Anleitung.

### Kurzfassung

1. **Supabase Secrets setzen** (OpenAI, Stripe, etc.)
2. **Landing Page auf Vercel** deployen (Root: `mimicheck-landing`)
3. **Core App auf Vercel** deployen (Root: `.`)
4. **Domains konfigurieren** (mimicheck.de, app.mimicheck.de)

## 🔧 Environment Variables

### Frontend (.env)

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
VITE_APP_URL=https://app.mimicheck.de
VITE_LANDING_URL=https://mimicheck.de
```

### Backend (Supabase Secrets)

```bash
npx supabase secrets set OPENAI_API_KEY=sk-proj-...
npx supabase secrets set STRIPE_SECRET_KEY=sk_live_...
```

## 📚 Dokumentation

| Dokument | Beschreibung |
|----------|--------------|
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Vercel Deployment Anleitung |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Technische Architektur |
| [TASKS.md](./TASKS.md) | Projekt-Status & Roadmap |
| [docs/reports](./docs/reports) | Technische Detail-Dokumentation |

## 🧪 Tests

```bash
# Unit Tests
npm run test:run

# Build testen
npm run build
```

## 📄 Lizenz

Proprietär - MiMiTech AI
