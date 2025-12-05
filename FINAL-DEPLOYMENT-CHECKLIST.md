# 🚀 Final Deployment Checklist - MiMiCheck Production

## ✅ Was bereits erledigt ist:

### 1. Stripe Setup ✅
- [x] Premium Plan erstellt (€14.99/Monat) - `price_1SacLbGX9ckbY2L6ejmsITKD`
- [x] Pro Plan erstellt (€29.99/Monat) - `price_1SacN7GX9ckbY2L68BctYrGk`
- [x] Frontend Pricing-Seite aktualisiert (keine "unbegrenzt")
- [x] Backend Edge Functions vorbereitet

### 2. Supabase Database ✅
- [x] Subscription-Felder zu `users` Tabelle hinzugefügt
- [x] `user_usage` Tabelle für Usage Tracking erstellt
- [x] RLS Policies konfiguriert
- [x] Usage Limit Functions implementiert
- [x] Webhook Handler aktualisiert

### 3. Code Updates ✅
- [x] Keine hardcodierten API-Keys
- [x] Environment Variables konfiguriert
- [x] Security Headers in vercel.json
- [x] Build erfolgreich getestet

## ⏳ Was noch gemacht werden muss:

### Schritt 1: Supabase Secrets setzen

Gehe zu: https://supabase.com/dashboard/project/yjjauvmjyhlxcoumwqlj/settings/vault

**Setze folgende Secrets (ersetze mit deinen echten Keys!):**

```bash
# Stripe
STRIPE_SECRET_KEY = sk_live_DEIN_KEY_HIER
STRIPE_PREMIUM_PRICE_ID = price_1SacLbGX9ckbY2L6ejmsITKD
STRIPE_PRO_PRICE_ID = price_1SacN7GX9ckbY2L68BctYrGk
STRIPE_WEBHOOK_SECRET = whsec_DEIN_SECRET_HIER

# AI (wenn vorhanden)
OPENAI_API_KEY = sk-proj-DEIN_KEY_HIER
ANTHROPIC_API_KEY = sk-ant-DEIN_KEY_HIER
```

### Schritt 2: Stripe Webhooks konfigurieren

1. Gehe zu: https://dashboard.stripe.com/webhooks
2. Klicke "Add endpoint"
3. **URL:** `https://yjjauvmjyhlxcoumwqlj.supabase.co/functions/v1/stripe-webhook`
4. **Events auswählen:**
   - ✅ `checkout.session.completed`
   - ✅ `customer.subscription.created`
   - ✅ `customer.subscription.updated`
   - ✅ `customer.subscription.deleted`
   - ✅ `invoice.payment_succeeded`
   - ✅ `invoice.payment_failed`
5. Kopiere **Webhook Secret** und setze als `STRIPE_WEBHOOK_SECRET` in Supabase

### Schritt 3: Stripe Customer Portal aktivieren

1. Gehe zu: https://dashboard.stripe.com/settings/billing/portal
2. Klicke **"Activate"** (Live Mode)
3. Aktiviere:
   - ✅ Customers can cancel subscriptions
   - ✅ Customers can update payment methods
   - ✅ Customers can view invoices

### Schritt 4: Vercel Deployment - Landing Page

1. Gehe zu: https://vercel.com/new
2. Importiere Repository
3. **Root Directory:** `mimicheck-landing`
4. **Framework:** Vite
5. **Build Command:** `pnpm run build`
6. **Output Directory:** `dist/public`

**Environment Variables:**
```bash
VITE_SUPABASE_URL = https://yjjauvmjyhlxcoumwqlj.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqamF1dm1qeWhseGNvdW13cWxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0Mzc4NzgsImV4cCI6MjA3ODAxMzg3OH0.A8e7YwJA6VJ0fTJJt8TBVRT4vktVxB1DFL8U5RLTzZg
VITE_STRIPE_PUBLISHABLE_KEY = pk_live_... (finde in Stripe Dashboard)
VITE_APP_URL = https://app.mimicheck.de
VITE_LANDING_URL = https://mimicheck.de
```

7. **Domain:** `mimicheck.de`

### Schritt 5: Vercel Deployment - Core App

1. Gehe zu: https://vercel.com/new
2. Importiere Repository
3. **Root Directory:** `.` (Root)
4. **Framework:** Vite
5. **Build Command:** `npm run build`
6. **Output Directory:** `dist`

**Environment Variables:** (gleiche wie Landing Page)

7. **Domain:** `app.mimicheck.de`

### Schritt 6: Supabase Auth URLs aktualisieren

Gehe zu: https://supabase.com/dashboard/project/yjjauvmjyhlxcoumwqlj/auth/url-configuration

**Site URL:** `https://mimicheck.de`

**Redirect URLs:**
```
https://mimicheck.de/auth
https://app.mimicheck.de/auth-bridge
https://app.mimicheck.de/onboarding
https://app.mimicheck.de/dashboard
```

### Schritt 7: DNS Konfiguration

Bei deinem Domain-Provider (z.B. Namecheap, GoDaddy):

**Für mimicheck.de:**
- Type: `CNAME`
- Name: `@`
- Value: `cname.vercel-dns.com`

**Für app.mimicheck.de:**
- Type: `CNAME`
- Name: `app`
- Value: `cname.vercel-dns.com`

### Schritt 8: Testing

**Test-Szenarien:**

1. **Landing Page:**
   - [ ] Seite lädt korrekt
   - [ ] Auth funktioniert (Login/Register)
   - [ ] Redirect zur Core App nach Login

2. **Core App:**
   - [ ] Dashboard lädt
   - [ ] Protected Routes funktionieren
   - [ ] Logout funktioniert

3. **Stripe Integration:**
   - [ ] Premium Plan kaufen (Test-Karte: 4242 4242 4242 4242)
   - [ ] Subscription Status wird aktualisiert
   - [ ] Customer Portal öffnet
   - [ ] Subscription kündigen funktioniert

4. **Usage Limits:**
   - [ ] Free User: 1 Förderprüfung, 5 KI-Fragen/Tag
   - [ ] Premium User: 50 Förderprüfungen, 100 KI-Fragen/Tag
   - [ ] Limit-Meldung wird angezeigt

5. **Webhooks:**
   - [ ] Checkout Success → User wird Premium
   - [ ] Subscription Cancel → User wird Free
   - [ ] Payment Failed → Status wird aktualisiert

## 📊 Monitoring

### Nach Deployment überwachen:

**Vercel:**
- https://vercel.com/dashboard
- Build-Logs prüfen
- Error-Logs überwachen

**Stripe:**
- https://dashboard.stripe.com
- Erfolgreiche Zahlungen
- Webhook-Events
- Failed Payments

**Supabase:**
- https://supabase.com/dashboard/project/yjjauvmjyhlxcoumwqlj/logs
- Edge Function Logs
- Database Queries
- Auth Events

## 🔒 Sicherheit

- [x] Keine Secrets im Code
- [x] RLS auf allen Tabellen
- [x] Security Headers konfiguriert
- [x] HTTPS erzwungen
- [x] CORS korrekt konfiguriert

## 📝 Wichtige Links

- **Stripe Dashboard:** https://dashboard.stripe.com
- **Supabase Dashboard:** https://supabase.com/dashboard/project/yjjauvmjyhlxcoumwqlj
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Landing Page:** https://mimicheck.de
- **Core App:** https://app.mimicheck.de

---

## 🎯 Nächste Schritte

1. ✅ Supabase Secrets setzen (Schritt 1)
2. ✅ Stripe Webhooks konfigurieren (Schritt 2)
3. ✅ Customer Portal aktivieren (Schritt 3)
4. ✅ Vercel Deployments (Schritte 4-5)
5. ✅ DNS konfigurieren (Schritt 7)
6. ✅ Testing (Schritt 8)

**Sobald Schritte 1-3 erledigt sind, kann ich die Vercel Deployments für dich vorbereiten!**
