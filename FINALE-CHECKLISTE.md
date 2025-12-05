# ✅ MiMiCheck - Finale Checkliste

**Stand:** 2025-12-04 15:30 UTC

---

## ✅ BEREITS ERLEDIGT:

### Backend & Payments:
- ✅ Supabase Database mit Subscription-Feldern
- ✅ Stripe Premium Plan (€14.99/Monat)
- ✅ Stripe Pro Plan (€29.99/Monat)
- ✅ Stripe Webhooks aktiv
- ✅ Stripe Customer Portal aktiviert (Key: `bpc_1Sad66GX9ckbY2L6SVhWpvFW`)
- ✅ Alle Secrets in Supabase Vault

### Vercel Deployments:
- ✅ Landing Page deployed (`mimicheck-landing`)
- ✅ Core App deployed (`mimicheck`)
- ✅ Environment Variables gesetzt (beide Apps)
- ✅ Deployment Protection deaktiviert
- ✅ Domains zugeordnet:
  - `mimicheck.ai` → Landing Page
  - `app.mimicheck.ai` → Core App

### DNS (STRATO):
- ✅ Root-Domain A-Record: `@ → 76.76.21.21`
- 🔴 Subdomain A-Record fehlt noch: `app → 76.76.21.21`

---

## 🔴 NOCH ZU TUN:

### 1. Subdomain bei STRATO hinzufügen (5 Min)

**Siehe:** `STRATO-SUBDOMAIN-SETUP.md`

**Kurzversion:**
1. Login bei STRATO
2. Gehe zu mimicheck.ai → DNS
3. Füge hinzu:
   ```
   Typ: A
   Name: app
   Wert: 76.76.21.21
   ```
4. Speichern

**Falls nicht möglich:**
- Verwende CNAME: `app → cname.vercel-dns.com`
- Oder stelle auf Vercel Nameserver um

---

### 2. Supabase Auth URLs aktualisieren (2 Min)

**URL:** https://supabase.com/dashboard/project/yjjauvmjyhlxcoumwqlj/auth/url-configuration

**Site URL:**
```
https://mimicheck.ai
```

**Redirect URLs (alle hinzufügen):**
```
https://mimicheck.ai/auth
https://app.mimicheck.ai/auth-bridge
https://app.mimicheck.ai/onboarding
https://app.mimicheck.ai/dashboard
https://mimicheck-landing.vercel.app/auth
https://mimicheck.vercel.app/auth-bridge
http://localhost:3000/auth
http://localhost:8005/auth-bridge
```

---

### 3. Warten auf DNS-Propagierung (5-30 Min)

Nach Subdomain-Hinzufügung bei STRATO:
- Warte 5-30 Minuten
- Prüfe mit: `dig app.mimicheck.ai`

---

### 4. Testen (5 Min)

**Landing Page:**
```
https://mimicheck.ai
```
- Marketing-Seite lädt
- Navigation funktioniert
- "Jetzt starten" Button vorhanden

**Core App:**
```
https://app.mimicheck.ai
```
- Login/Dashboard lädt
- Nach Login: Dashboard mit Features

**Registrierung:**
1. Auf Landing: "Jetzt starten"
2. Registriere dich
3. Magic Link kommt an
4. Klicke Link
5. Redirect zu `app.mimicheck.ai`

**Premium kaufen:**
1. Auf Landing: Pricing
2. "Premium kaufen"
3. Test-Karte: `4242 4242 4242 4242`
4. Nach Payment → `app.mimicheck.ai/dashboard`

---

## 📊 ARCHITEKTUR:

```
┌─────────────────────────────────────┐
│     Landing Page                    │
│     mimicheck.ai                    │
│     (mimicheck-landing Projekt)     │
│                                     │
│  - Marketing                        │
│  - Registrierung                    │
│  - Pricing                          │
│  - "Jetzt starten" Button           │
└──────────────┬──────────────────────┘
               │
               │ Redirect nach Registrierung
               ↓
┌─────────────────────────────────────┐
│     Core App                        │
│     app.mimicheck.ai                │
│     (mimicheck Projekt)             │
│                                     │
│  - Login                            │
│  - Dashboard                        │
│  - Features                         │
│  - "Zurück zur Startseite" Link     │
└─────────────────────────────────────┘
```

**Beide Apps kennen sich:**
- `VITE_APP_URL=https://app.mimicheck.ai`
- `VITE_LANDING_URL=https://mimicheck.ai`

---

## 🔍 DNS PRÜFEN:

```bash
# Root-Domain (sollte funktionieren)
dig mimicheck.ai

# Subdomain (nach Hinzufügen bei STRATO)
dig app.mimicheck.ai
```

**Erwartetes Ergebnis:**
```
;; ANSWER SECTION:
mimicheck.ai.  3600  IN  A  76.76.21.21
app.mimicheck.ai.  3600  IN  A  76.76.21.21
```

---

## 🆘 TROUBLESHOOTING:

### Problem: Subdomain lässt sich nicht bei STRATO hinzufügen

**Lösung 1: CNAME verwenden**
```
Typ: CNAME
Name: app
Wert: cname.vercel-dns.com
```

**Lösung 2: Vercel Nameserver**
Bei STRATO Nameserver ändern zu:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

### Problem: Landing Page zeigt Dashboard

**Ursache:** Domains falsch zugeordnet

**Lösung:** Prüfe in Vercel:
- https://vercel.com/bemlerinhos-projects/mimicheck-landing/settings/domains
  - Sollte `mimicheck.ai` haben
- https://vercel.com/bemlerinhos-projects/mimicheck/settings/domains
  - Sollte `app.mimicheck.ai` haben

### Problem: Redirect funktioniert nicht

**Ursache:** Environment Variables fehlen

**Lösung:** Bereits gesetzt! Falls Problem:
```bash
vercel env ls --scope bemlerinhos-projects
```

---

## 📝 ZUSAMMENFASSUNG:

**Was funktioniert:**
- ✅ Backend komplett
- ✅ Payments komplett
- ✅ Apps deployed
- ✅ Root-Domain DNS gesetzt
- ✅ Domains in Vercel zugeordnet

**Was noch fehlt:**
- 🔴 Subdomain DNS bei STRATO (5 Min)
- 🔴 Supabase Auth URLs (2 Min)
- ⏳ DNS-Propagierung (5-30 Min)

**Dann:** 🚀 **KOMPLETT LIVE!**

---

## 🎯 NÄCHSTER SCHRITT:

**JETZT:** Subdomain bei STRATO hinzufügen

**Siehe:** `STRATO-SUBDOMAIN-SETUP.md` für detaillierte Anleitung

---

**Status:** 🟡 95% FERTIG - Warte auf Subdomain DNS
**Geschätzte Zeit bis Live:** 10-40 Minuten
