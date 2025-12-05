# 🚀 MiMiCheck Deployment Guide

## Übersicht

MiMiCheck besteht aus zwei Vercel-Deployments:
1. **Landing Page** (`mimicheck-landing/`) → `mimicheck.de`
2. **Core App** (Root) → `app.mimicheck.de`

Beide nutzen dieselbe Supabase-Instanz für Auth und Datenbank.

---

## 📋 Voraussetzungen

- [Vercel Account](https://vercel.com)
- [Supabase Projekt](https://supabase.com) (bereits eingerichtet)
- Node.js 18+ / pnpm

---

## 🔧 Schritt 1: Supabase Secrets setzen

Die Backend-Secrets werden in Supabase Edge Functions verwendet:

```bash
# Im Projektverzeichnis ausführen:
npx supabase secrets set OPENAI_API_KEY=sk-proj-...
npx supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
npx supabase secrets set STRIPE_SECRET_KEY=sk_live_...
npx supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## 🌐 Schritt 2: Landing Page deployen

### 2.1 Vercel Projekt erstellen

1. Gehe zu [vercel.com/new](https://vercel.com/new)
2. Importiere das Repository
3. **Root Directory:** `mimicheck-landing`
4. **Framework Preset:** Vite
5. **Build Command:** `pnpm run build`
6. **Output Directory:** `dist/public`

### 2.2 Environment Variables setzen

Im Vercel Dashboard → Settings → Environment Variables:

| Variable | Wert |
|----------|------|
| `VITE_SUPABASE_URL` | `https://yjjauvmjyhlxcoumwqlj.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGci...` (dein Anon Key) |
| `VITE_STRIPE_PUBLISHABLE_KEY` | `pk_live_...` |
| `VITE_APP_URL` | `https://app.mimicheck.de` |
| `VITE_LANDING_URL` | `https://mimicheck.de` |

### 2.3 Domain konfigurieren

1. Settings → Domains
2. Füge `mimicheck.de` hinzu
3. Konfiguriere DNS bei deinem Provider

---

## 🖥️ Schritt 3: Core App deployen

### 3.1 Zweites Vercel Projekt erstellen

1. Gehe zu [vercel.com/new](https://vercel.com/new)
2. Importiere dasselbe Repository
3. **Root Directory:** `.` (Root)
4. **Framework Preset:** Vite
5. **Build Command:** `npm run build`
6. **Output Directory:** `dist`

### 3.2 Environment Variables setzen

| Variable | Wert |
|----------|------|
| `VITE_SUPABASE_URL` | `https://yjjauvmjyhlxcoumwqlj.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGci...` (dein Anon Key) |
| `VITE_STRIPE_PUBLISHABLE_KEY` | `pk_live_...` |
| `VITE_APP_URL` | `https://app.mimicheck.de` |
| `VITE_LANDING_URL` | `https://mimicheck.de` |

### 3.3 Domain konfigurieren

1. Settings → Domains
2. Füge `app.mimicheck.de` hinzu
3. Konfiguriere DNS bei deinem Provider

---

## 🔐 Schritt 4: Supabase Auth konfigurieren

Im Supabase Dashboard → Authentication → URL Configuration:

1. **Site URL:** `https://mimicheck.de`
2. **Redirect URLs:**
   - `https://mimicheck.de/auth`
   - `https://app.mimicheck.de/auth-bridge`
   - `https://app.mimicheck.de/onboarding`

---

## ✅ Schritt 5: Testen

1. Öffne `https://mimicheck.de`
2. Registriere einen Test-User
3. Prüfe Redirect zur Core App
4. Teste Login/Logout Flow

---

## 🔄 Updates deployen

Vercel deployed automatisch bei Push auf `main`:

```bash
git add .
git commit -m "Update"
git push origin main
```

---

## 🐛 Troubleshooting

### Build schlägt fehl
- Prüfe Environment Variables in Vercel
- Prüfe Build-Logs auf fehlende Dependencies

### Auth funktioniert nicht
- Prüfe Redirect URLs in Supabase
- Prüfe VITE_SUPABASE_URL und VITE_SUPABASE_ANON_KEY

### 404 auf Routen
- Prüfe `vercel.json` Rewrites
- SPA-Routing muss alle Routen auf `/index.html` umleiten

---

## 📊 Monitoring

- **Vercel Analytics:** Im Dashboard aktivieren
- **Supabase Logs:** Dashboard → Logs
- **Error Tracking:** Sentry (optional)
