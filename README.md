# 🏢 MiMiCheck - Nebenkosten Knacker

KI-gestützte Analyse von Nebenkostenabrechnungen und Förderanträgen.

## 🚀 Quick Start

### Option 1: Docker Dev (Empfohlen)

Mit Docker kannst du beide Apps ohne manuelle Setup-Schritte starten:

```bash
# 1. Environment Dateien vorbereiten
cp .env.example .env
cp mimicheck-landing/.env.example mimicheck-landing/.env

# 2. Core App starten (Port 8005)
docker compose -f docker-compose.dev.yml up core-app

# 3. Landing Page starten (Port 3000)
docker compose -f docker-compose.dev.yml up landing-app

# Beide Apps gleichzeitig starten
docker compose -f docker-compose.dev.yml up core-app landing-app
```

**Features:**
- ✅ Automatische Dependency-Installation
- ✅ Hot Reload für Live-Entwicklung
- ✅ Isolierte Umgebung
- ✅ Keine lokale Node.js-Installation nötig

**URLs:**
- Core App: http://localhost:8005
- Landing Page: http://localhost:3000

### Option 2: Lokale Installation

#### 1. Environment einrichten

```bash
# .env Datei erstellen (siehe .env.example)
cp .env.example .env
# Fülle die Supabase-Credentials aus
```

#### 2. Landing Page starten

```bash
cd mimicheck-landing
pnpm install
pnpm run dev
# → http://localhost:3000
```

#### 3. Core App starten

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

## 🐳 Docker Dev Environment

### Voraussetzungen

- Docker Desktop oder Docker Engine installiert
- Docker Compose v2.0+

### Struktur

```
docker/
  └── Dockerfile.core          # Core Vite App Container
mimicheck-landing/
  └── Dockerfile.dev            # Landing Page Container
docker-compose.dev.yml          # Orchestrierung
.dockerignore                   # Build-Optimierung
```

### Befehle

```bash
# Services einzeln starten
docker compose -f docker-compose.dev.yml up core-app
docker compose -f docker-compose.dev.yml up landing-app

# Beide Services starten
docker compose -f docker-compose.dev.yml up

# Im Hintergrund starten
docker compose -f docker-compose.dev.yml up -d

# Logs anzeigen
docker compose -f docker-compose.dev.yml logs -f core-app
docker compose -f docker-compose.dev.yml logs -f landing-app

# Services stoppen
docker compose -f docker-compose.dev.yml down

# Mit vollständigem Neuaufbau
docker compose -f docker-compose.dev.yml up --build
```

### Environment-Dateien

Stelle sicher, dass folgende Dateien existieren:
- `.env` (Core App)
- `.env.development` (optional, Core App)
- `mimicheck-landing/.env` (Landing Page)

Die Docker-Container mounten diese Dateien automatisch.

### Troubleshooting

**Port bereits belegt:**
```bash
# Core App Port ändern (standard: 8005)
# Landing Page Port ändern (standard: 3000)
# Bearbeite docker-compose.dev.yml und ändere die ports
```

**Hot Reload funktioniert nicht:**
- `CHOKIDAR_USEPOLLING=true` ist bereits gesetzt
- Überprüfe, ob die Volume-Mounts korrekt sind

**Dependencies veraltet:**
```bash
# Container neu bauen
docker compose -f docker-compose.dev.yml build --no-cache
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
