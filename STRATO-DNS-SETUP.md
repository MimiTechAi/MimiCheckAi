# 🌐 DNS Setup für mimicheck.ai bei STRATO

**Dein DNS-Provider:** STRATO
**Domain:** mimicheck.ai

---

## 📋 WICHTIG: Zwei separate Apps!

Du hast **ZWEI** separate Vercel-Projekte:

1. **Landing Page** (`mimicheck-landing`) → `mimicheck.ai`
2. **Core App** (`mimicheck`) → `app.mimicheck.ai`

Diese müssen **getrennt** bleiben, aber zusammenarbeiten:
- Landing Page = Marketing, Registrierung, Pricing
- Core App = Dashboard, Features nach Login

---

## 🔧 SCHRITT 1: Vercel Protection entfernen

**Problem:** Beide Deployments zeigen 401 (Unauthorized)

**Lösung:**

### Für Landing Page:
1. Gehe zu: https://vercel.com/bemlerinhos-projects/mimicheck-landing/settings/deployment-protection
2. Unter "Deployment Protection"
3. Wähle: **"Standard Protection"** oder **"Only Preview Deployments"**
4. Klicke "Save"

### Für Core App:
1. Gehe zu: https://vercel.com/bemlerinhos-projects/mimicheck/settings/deployment-protection
2. Unter "Deployment Protection"
3. Wähle: **"Standard Protection"** oder **"Only Preview Deployments"**
4. Klicke "Save"

**Wichtig:** Production Deployments müssen öffentlich sein!

---

## 🌐 SCHRITT 2: DNS bei STRATO konfigurieren

### Login bei STRATO:
1. Gehe zu: https://www.strato.de/apps/CustomerService
2. Login mit deinen Zugangsdaten
3. Gehe zu "Domains" → "Domain-Verwaltung"
4. Wähle "mimicheck.ai"

### DNS-Einstellungen öffnen:
1. Klicke auf "DNS-Einstellungen" oder "Nameserver"
2. Wähle "Eigene Nameserver" oder "DNS-Records bearbeiten"

### A-Records hinzufügen:

#### Record 1: Root-Domain (mimicheck.ai → Landing Page)
```
Typ: A
Name: @ (oder leer lassen)
Wert: 76.76.21.21
TTL: 3600 (oder Standard)
```

#### Record 2: Subdomain (app.mimicheck.ai → Core App)
```
Typ: A
Name: app
Wert: 76.76.21.21
TTL: 3600 (oder Standard)
```

### Speichern:
1. Klicke "Speichern" oder "Änderungen übernehmen"
2. Warte 5-30 Minuten für DNS-Propagierung

---

## 🔍 SCHRITT 3: Vercel Domains prüfen

### Landing Page Domain:
1. Gehe zu: https://vercel.com/bemlerinhos-projects/mimicheck-landing/settings/domains
2. Klicke "Add Domain"
3. Gib ein: `mimicheck.ai`
4. Klicke "Add"
5. Vercel zeigt DNS-Anweisungen (sollten mit oben übereinstimmen)

### Core App Domain:
1. Gehe zu: https://vercel.com/bemlerinhos-projects/mimicheck/settings/domains
2. Klicke "Add Domain"
3. Gib ein: `app.mimicheck.ai`
4. Klicke "Add"
5. Vercel zeigt DNS-Anweisungen

**Wichtig:** Beide Domains müssen zu **unterschiedlichen** Projekten zeigen!

---

## ✅ SCHRITT 4: Verifizierung

### DNS prüfen (nach 5-30 Min):
```bash
# Prüfe Root-Domain
dig mimicheck.ai

# Prüfe Subdomain
dig app.mimicheck.ai
```

Beide sollten `76.76.21.21` zurückgeben.

### Vercel Status prüfen:
1. Landing: https://vercel.com/bemlerinhos-projects/mimicheck-landing/settings/domains
2. Core App: https://vercel.com/bemlerinhos-projects/mimicheck/settings/domains

**Status sollte sein:**
- ✅ Valid Configuration
- 🔒 SSL Certificate: Active

### URLs testen:
1. **Landing Page:** https://mimicheck.ai
   - Sollte Marketing-Seite zeigen
   - "Jetzt starten" Button
   - Pricing-Seite

2. **Core App:** https://app.mimicheck.ai
   - Sollte Login/Dashboard zeigen
   - Nach Login: Dashboard mit Features

---

## 🔗 WIE DIE APPS ZUSAMMENARBEITEN:

### Landing Page (mimicheck.ai):
- Marketing-Inhalte
- "Jetzt starten" → Registrierung
- Nach Registrierung → **Redirect zu app.mimicheck.ai**

### Core App (app.mimicheck.ai):
- Login-Seite
- Dashboard (nach Login)
- Alle Features
- "Zurück zur Startseite" → **Link zu mimicheck.ai**

### Environment Variables:
Beide Apps haben:
```bash
VITE_APP_URL=https://app.mimicheck.ai
VITE_LANDING_URL=https://mimicheck.ai
```

So wissen sie, wo die andere App ist!

---

## 🧪 TESTING:

### Test 1: Landing Page
1. Öffne: https://mimicheck.ai
2. Klicke "Jetzt starten"
3. Registriere dich
4. Du solltest zu `app.mimicheck.ai` weitergeleitet werden

### Test 2: Core App
1. Öffne: https://app.mimicheck.ai
2. Login mit deinem Account
3. Dashboard sollte laden
4. Klicke "Zurück zur Startseite"
5. Du solltest zu `mimicheck.ai` weitergeleitet werden

### Test 3: Premium kaufen
1. Auf Landing: Gehe zu Pricing
2. Klicke "Premium kaufen"
3. Stripe Checkout öffnet
4. Test-Karte: 4242 4242 4242 4242
5. Nach Payment → Redirect zu `app.mimicheck.ai/dashboard`

---

## 🆘 TROUBLESHOOTING:

### Problem: 401 Unauthorized
**Lösung:** Deployment Protection in Vercel deaktivieren (siehe Schritt 1)

### Problem: DNS funktioniert nicht
**Lösung:** 
- Prüfe STRATO DNS-Einstellungen
- Warte länger (bis zu 48h, meist 5-30 Min)
- Prüfe mit `dig mimicheck.ai`

### Problem: SSL-Fehler
**Lösung:**
- Warte auf Vercel SSL-Zertifikat (automatisch nach DNS)
- Kann bis zu 1 Stunde dauern

### Problem: Landing Page zeigt Dashboard
**Lösung:**
- Falsche Domain-Zuordnung in Vercel
- Prüfe welches Projekt welche Domain hat
- `mimicheck.ai` → `mimicheck-landing` Projekt
- `app.mimicheck.ai` → `mimicheck` Projekt

### Problem: Redirect funktioniert nicht
**Lösung:**
- Prüfe Environment Variables in beiden Apps
- `VITE_APP_URL` und `VITE_LANDING_URL` müssen korrekt sein

---

## 📊 ZUSAMMENFASSUNG:

**Zwei Apps:**
1. Landing Page → `mimicheck.ai` (Marketing)
2. Core App → `app.mimicheck.ai` (Dashboard)

**DNS bei STRATO:**
- `@` → `76.76.21.21` (Landing)
- `app` → `76.76.21.21` (Core App)

**Vercel:**
- Deployment Protection: AUS
- Domains richtig zugeordnet
- Environment Variables gesetzt

**Zusammenarbeit:**
- Landing → Registrierung → Redirect zu Core App
- Core App → "Zurück" → Link zu Landing
- Beide kennen die URLs des anderen

---

**Nächste Schritte:**
1. ✅ Deployment Protection entfernen
2. ✅ DNS bei STRATO konfigurieren
3. ✅ Domains in Vercel hinzufügen
4. ⏳ Warten auf DNS-Propagierung
5. ✅ Testen!

**Status:** 🟡 Warte auf Deployment Protection Entfernung
