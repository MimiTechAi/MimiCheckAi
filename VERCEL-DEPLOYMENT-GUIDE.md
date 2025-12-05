# 🚀 Vercel Deployment Guide - MiMiCheck

## Vorbereitung ✅

Alle Konfigurationen sind bereit! Jetzt nur noch deployen.

---

## Deployment 1: Landing Page

### 1. Neues Vercel Projekt erstellen

Gehe zu: https://vercel.com/new

### 2. Repository importieren

- Wähle dein GitHub Repository
- **Root Directory:** `mimicheck-landing`
- **Framework Preset:** Vite
- **Build Command:** `pnpm run build`
- **Output Directory:** `dist/public`

### 3. Environment Variables setzen

Klicke auf "Environment Variables" und füge hinzu:

```bash
VITE_SUPABASE_URL=https://yjjauvmjyhlxcoumwqlj.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqamF1dm1qeWhseGNvdW13cWxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0Mzc4NzgsImV4cCI6MjA3ODAxMzg3OH0.A8e7YwJA6VJ0fTJJt8TBVRT4vktVxB1DFL8U5RLTzZg
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_... (HOLE AUS STRIPE DASHBOARD)
VITE_APP_URL=https://app.mimicheck.de
VITE_LANDING_URL=https://mimicheck.de
```

**Stripe Publishable Key finden:**
1. Gehe zu: https://dashboard.stripe.com/apikeys
2. Kopiere den **Publishable key** (beginnt mit `pk_live_`)

### 4. Deploy starten

Klicke "Deploy" und warte ~2 Minuten.

### 5. Domain konfigurieren

Nach erfolgreichem Deployment:
1. Gehe zu **Settings → Domains**
2. Klicke "Add Domain"
3. Gib ein: `mimicheck.de`
4. Folge den DNS-Anweisungen

---

## Deployment 2: Core App

### 1. Neues Vercel Projekt erstellen

Gehe zu: https://vercel.com/new

### 2. Repository importieren

- Wähle dasselbe GitHub Repository
- **Root Directory:** `.` (Root)
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

### 3. Environment Variables setzen

**GLEICHE wie Landing Page:**

```bash
VITE_SUPABASE_URL=https://yjjauvmjyhlxcoumwqlj.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqamF1dm1qeWhseGNvdW13cWxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0Mzc4NzgsImV4cCI6MjA3ODAxMzg3OH0.A8e7YwJA6VJ0fTJJt8TBVRT4vktVxB1DFL8U5RLTzZg
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_... (GLEICHER WIE OBEN)
VITE_APP_URL=https://app.mimicheck.de
VITE_LANDING_URL=https://mimicheck.de
```

### 4. Deploy starten

Klicke "Deploy" und warte ~2 Minuten.

### 5. Domain konfigurieren

Nach erfolgreichem Deployment:
1. Gehe zu **Settings → Domains**
2. Klicke "Add Domain"
3. Gib ein: `app.mimicheck.de`
4. Folge den DNS-Anweisungen

---

## DNS Konfiguration

Bei deinem Domain-Provider (z.B. Namecheap, GoDaddy):

### Für mimicheck.de:
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

### Für app.mimicheck.de:
```
Type: CNAME
Name: app
Value: cname.vercel-dns.com
```

**Hinweis:** DNS-Änderungen können bis zu 48h dauern (meist nur 5-10 Minuten).

---

## Supabase Auth URLs aktualisieren

Gehe zu: https://supabase.com/dashboard/project/yjjauvmjyhlxcoumwqlj/auth/url-configuration

### Site URL:
```
https://mimicheck.de
```

### Redirect URLs (alle hinzufügen):
```
https://mimicheck.de/auth
https://app.mimicheck.de/auth-bridge
https://app.mimicheck.de/onboarding
https://app.mimicheck.de/dashboard
http://localhost:3000/auth
http://localhost:8005/auth-bridge
```

---

## Supabase Secrets setzen

Gehe zu: https://supabase.com/dashboard/project/yjjauvmjyhlxcoumwqlj/settings/vault

**Setze diese Secrets (ersetze mit deinen echten Keys!):**

```bash
STRIPE_SECRET_KEY=sk_live_DEIN_KEY_HIER
STRIPE_PREMIUM_PRICE_ID=price_1SacLbGX9ckbY2L6ejmsITKD
STRIPE_PRO_PRICE_ID=price_1SacN7GX9ckbY2L68BctYrGk
STRIPE_WEBHOOK_SECRET=whsec_DEIN_SECRET_HIER
```

---

## Stripe Customer Portal aktivieren

1. Gehe zu: https://dashboard.stripe.com/settings/billing/portal
2. Klicke **"Activate"** (Live Mode)
3. Aktiviere:
   - ✅ Customers can cancel subscriptions
   - ✅ Customers can update payment methods
   - ✅ Customers can view invoices
4. Klicke "Save"

---

## Testing Checklist

Nach dem Deployment teste:

### 1. Landing Page (mimicheck.de)
- [ ] Seite lädt
- [ ] Navigation funktioniert
- [ ] Login/Register funktioniert

### 2. Core App (app.mimicheck.de)
- [ ] Dashboard lädt
- [ ] Protected Routes funktionieren
- [ ] Logout funktioniert

### 3. Stripe Integration
- [ ] Pricing-Seite zeigt Pläne
- [ ] Premium kaufen funktioniert (Test-Karte: 4242 4242 4242 4242)
- [ ] Subscription Status wird aktualisiert
- [ ] Customer Portal öffnet
- [ ] Kündigung funktioniert

### 4. Webhooks
- [ ] Prüfe Stripe Dashboard → Webhooks → Events
- [ ] Checkout Success Event wurde empfangen
- [ ] User wurde zu Premium upgegradet

---

## Troubleshooting

### Build schlägt fehl
- Prüfe Environment Variables in Vercel
- Prüfe Build-Logs

### Auth funktioniert nicht
- Prüfe Redirect URLs in Supabase
- Prüfe CORS-Einstellungen

### Webhooks funktionieren nicht
- Prüfe Webhook Secret in Supabase
- Prüfe Edge Function Logs in Supabase

### 404 auf Routen
- Prüfe vercel.json Rewrites
- Stelle sicher, dass SPA-Routing konfiguriert ist

---

## 🎉 Fertig!

Sobald alles deployed ist:
1. Teste mit Test-Karte
2. Überwache Logs
3. Feiere den Launch! 🚀

**Support:**
- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- Stripe Docs: https://stripe.com/docs
