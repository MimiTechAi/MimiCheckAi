# ✅ MiMiCheck - JETZT bei STRATO einrichten!

**Status:** Environment Variables gesetzt ✅
**Nächster Schritt:** Deployment Protection entfernen + DNS konfigurieren

---

## 🎯 WICHTIG ZU VERSTEHEN:

### Du hast ZWEI separate Apps:

1. **Landing Page** (`mimicheck-landing`)
   - Marketing-Website
   - Registrierung
   - Pricing
   - → Domain: `mimicheck.ai`

2. **Core App** (`mimicheck`)
   - Dashboard
   - Features
   - Nach Login
   - → Domain: `app.mimicheck.ai`

**Sie sind GETRENNT, aber arbeiten zusammen:**
- Landing → "Jetzt starten" → Registrierung → Redirect zu Core App
- Core App → "Zurück" → Link zu Landing

---

## 🔧 SCHRITT 1: Deployment Protection entfernen (2 Min)

**Problem:** Beide Apps zeigen 401 Unauthorized

### Landing Page Protection entfernen:
1. Öffne: https://vercel.com/bemlerinhos-projects/mimicheck-landing/settings/deployment-protection
2. Unter "Deployment Protection"
3. Wähle: **"Standard Protection"** (nicht "All Deployments")
4. Klicke "Save"

### Core App Protection entfernen:
1. Öffne: https://vercel.com/bemlerinhos-projects/mimicheck/settings/deployment-protection
2. Unter "Deployment Protection"
3. Wähle: **"Standard Protection"** (nicht "All Deployments")
4. Klicke "Save"

**Wichtig:** Production muss öffentlich sein!

---

## 🌐 SCHRITT 2: DNS bei STRATO konfigurieren (5 Min)

### Login bei STRATO:
1. Gehe zu: https://www.strato.de/apps/CustomerService
2. Login mit deinen Zugangsdaten
3. Gehe zu "Domains"
4. Wähle "mimicheck.ai"
5. Klicke "DNS-Einstellungen" oder "Nameserver"

### A-Records hinzufügen:

**Record 1: Root-Domain (für Landing Page)**
```
Typ: A
Name: @ (oder leer lassen)
Wert: 76.76.21.21
TTL: 3600
```

**Record 2: Subdomain (für Core App)**
```
Typ: A
Name: app
Wert: 76.76.21.21
TTL: 3600
```

### Speichern:
- Klicke "Speichern"
- Warte 5-30 Minuten

---

## 🔗 SCHRITT 3: Domains in Vercel zuordnen (3 Min)

### Landing Page Domain:
1. Gehe zu: https://vercel.com/bemlerinhos-projects/mimicheck-landing/settings/domains
2. Prüfe ob `mimicheck.ai` schon da ist
3. Falls nicht: Klicke "Add Domain" → `mimicheck.ai` → "Add"

### Core App Domain:
1. Gehe zu: https://vercel.com/bemlerinhos-projects/mimicheck/settings/domains
2. Prüfe ob `app.mimicheck.ai` schon da ist
3. Falls nicht: Klicke "Add Domain" → `app.mimicheck.ai` → "Add"

**WICHTIG:** 
- `mimicheck.ai` → `mimicheck-landing` Projekt
- `app.mimicheck.ai` → `mimicheck` Projekt

---

## 🚀 SCHRITT 4: Apps neu deployen (2 Min)

### Core App neu deployen:
```bash
vercel --prod --scope bemlerinhos-projects
```

### Landing Page neu deployen:
```bash
cd mimicheck-landing
vercel --prod --scope bemlerinhos-projects
cd ..
```

---

## ✅ SCHRITT 5: Testen (5 Min)

### Nach DNS-Propagierung (5-30 Min):

**Test 1: Landing Page**
```
https://mimicheck.ai
```
- Sollte Marketing-Seite zeigen
- Navigation funktioniert
- "Jetzt starten" Button vorhanden

**Test 2: Core App**
```
https://app.mimicheck.ai
```
- Sollte Login/Dashboard zeigen
- Nach Login: Dashboard mit Features

**Test 3: Registrierung**
1. Auf Landing: Klicke "Jetzt starten"
2. Registriere dich
3. Magic Link kommt an
4. Klicke Magic Link
5. Du wirst zu `app.mimicheck.ai` weitergeleitet

**Test 4: Premium kaufen**
1. Auf Landing: Gehe zu Pricing
2. Klicke "Premium kaufen"
3. Stripe Checkout öffnet
4. Test-Karte: `4242 4242 4242 4242`
5. Nach Payment → `app.mimicheck.ai/dashboard`

---

## 🔍 DNS prüfen:

```bash
# Prüfe Root-Domain
dig mimicheck.ai

# Prüfe Subdomain
dig app.mimicheck.ai
```

Beide sollten `76.76.21.21` zurückgeben.

---

## 📊 ZUSAMMENFASSUNG:

**Was ich gemacht habe:**
- ✅ Environment Variables für beide Apps gesetzt
- ✅ Beide Apps kennen jetzt die URLs des anderen
- ✅ Supabase, Stripe Keys gesetzt

**Was du machen musst:**
1. 🔴 Deployment Protection entfernen (2 Min)
2. 🔴 DNS bei STRATO konfigurieren (5 Min)
3. 🔴 Domains in Vercel zuordnen (3 Min)
4. 🔴 Apps neu deployen (2 Min)
5. ⏳ Warten auf DNS (5-30 Min)
6. ✅ Testen!

**Gesamtzeit:** ~15 Minuten + Wartezeit

---

## 🆘 HILFE:

### Problem: 401 Unauthorized
→ Deployment Protection noch aktiv (Schritt 1)

### Problem: DNS funktioniert nicht
→ Warte länger (bis zu 48h möglich, meist 5-30 Min)
→ Prüfe STRATO DNS-Einstellungen

### Problem: Landing zeigt Dashboard
→ Domains falsch zugeordnet in Vercel
→ Prüfe Schritt 3

### Problem: Redirect funktioniert nicht
→ Environment Variables fehlen (sollten jetzt gesetzt sein)
→ Apps neu deployen (Schritt 4)

---

## 📞 NÄCHSTE SCHRITTE:

**JETZT:**
1. Öffne Vercel Dashboard
2. Entferne Deployment Protection (Schritt 1)
3. Gehe zu STRATO
4. Konfiguriere DNS (Schritt 2)
5. Prüfe Domains in Vercel (Schritt 3)
6. Deploye Apps neu (Schritt 4)

**DANN:**
- Warte 5-30 Minuten
- Teste beide URLs
- Teste Registrierung
- Teste Premium kaufen

**FERTIG:** 🎉 MiMiCheck ist LIVE!

---

**Status:** 🟡 Warte auf deine Aktionen
**Siehe auch:** `STRATO-DNS-SETUP.md` für Details
