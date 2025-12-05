# 🌐 STRATO Subdomain Setup für app.mimicheck.ai

## ✅ Was bereits gemacht ist:

1. ✅ Root-Domain `mimicheck.ai` → A-Record `76.76.21.21` (Landing Page)
2. ✅ Domains in Vercel zugeordnet:
   - `mimicheck.ai` → `mimicheck-landing` Projekt
   - `app.mimicheck.ai` → `mimicheck` Projekt

## 🔴 Was noch fehlt:

**Subdomain `app.mimicheck.ai` bei STRATO einrichten**

---

## 📋 ANLEITUNG: Subdomain bei STRATO hinzufügen

### Option 1: Subdomain als A-Record (Empfohlen)

1. **Login bei STRATO:**
   - https://www.strato.de/apps/CustomerService
   - Login mit deinen Zugangsdaten

2. **Zur Domain-Verwaltung:**
   - Klicke auf "Domains"
   - Wähle "mimicheck.ai"
   - Klicke auf "DNS" Tab

3. **Neuen A-Record hinzufügen:**
   
   **Wenn du "Subdomain hinzufügen" oder "Neuer Record" siehst:**
   ```
   Typ: A
   Name: app
   Wert: 76.76.21.21
   TTL: 3600 (oder Standard)
   ```

   **Oder wenn du "Hostname" Feld siehst:**
   ```
   Hostname: app.mimicheck.ai
   Typ: A
   Wert: 76.76.21.21
   TTL: 3600
   ```

4. **Speichern:**
   - Klicke "Speichern" oder "Hinzufügen"
   - Warte 5-30 Minuten

---

### Option 2: Subdomain als CNAME (Alternative)

**Falls A-Record nicht funktioniert:**

```
Typ: CNAME
Name: app
Wert: cname.vercel-dns.com
TTL: 3600
```

---

### Option 3: Subdomain-Verwaltung (Falls separate Sektion)

Manche STRATO-Pakete haben eine separate "Subdomain-Verwaltung":

1. Gehe zu "Domains" → "Subdomain-Verwaltung"
2. Klicke "Neue Subdomain"
3. Gib ein: `app`
4. Wähle "Externe Weiterleitung" oder "A-Record"
5. Ziel: `76.76.21.21`
6. Speichern

---

## 🔍 Prüfen ob es funktioniert:

### Nach 5-30 Minuten:

```bash
# Prüfe Root-Domain
dig mimicheck.ai

# Prüfe Subdomain
dig app.mimicheck.ai
```

**Beide sollten zurückgeben:**
```
;; ANSWER SECTION:
mimicheck.ai.  3600  IN  A  76.76.21.21
app.mimicheck.ai.  3600  IN  A  76.76.21.21
```

---

## 🌐 URLs testen:

### Landing Page:
```
https://mimicheck.ai
```
- Sollte Marketing-Seite zeigen
- "Jetzt starten" Button
- Pricing-Seite

### Core App:
```
https://app.mimicheck.ai
```
- Sollte Login/Dashboard zeigen
- Nach Login: Dashboard mit Features

---

## 🆘 Falls Subdomain nicht möglich bei STRATO:

### Alternative: Vercel Nameserver verwenden

**Wenn STRATO keine Subdomains erlaubt:**

1. **Bei STRATO:**
   - Gehe zu Domain-Verwaltung
   - Wähle "Nameserver ändern"
   - Setze auf:
     ```
     ns1.vercel-dns.com
     ns2.vercel-dns.com
     ```

2. **Bei Vercel:**
   - Vercel übernimmt dann die komplette DNS-Verwaltung
   - Beide Domains funktionieren automatisch

**Vorteil:** Einfacher, alles bei Vercel
**Nachteil:** STRATO DNS-Verwaltung nicht mehr nutzbar

---

## 📊 Aktueller Status:

- ✅ `mimicheck.ai` → Vercel zugeordnet (Landing Page)
- ✅ `app.mimicheck.ai` → Vercel zugeordnet (Core App)
- ✅ Root-Domain A-Record bei STRATO gesetzt
- 🔴 Subdomain A-Record bei STRATO fehlt noch

---

## 🎯 Nächste Schritte:

1. **JETZT:** Subdomain bei STRATO hinzufügen (siehe oben)
2. **WARTEN:** 5-30 Minuten für DNS-Propagierung
3. **TESTEN:** Beide URLs öffnen
4. **FERTIG:** 🎉

---

**Wenn du Probleme hast, die Subdomain bei STRATO hinzuzufügen, sag mir Bescheid!**
Dann können wir auf Vercel Nameserver umstellen.
