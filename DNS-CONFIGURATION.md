# 🌐 DNS Konfiguration für mimicheck.ai

## Status: Domains zu Vercel hinzugefügt ✅

### Landing Page: mimicheck.ai
- ✅ Domain hinzugefügt zu Vercel
- ⏳ DNS muss konfiguriert werden

### Core App: app.mimicheck.ai  
- ✅ Domain hinzugefügt zu Vercel
- ⏳ DNS muss konfiguriert werden

---

## DNS Einstellungen bei deinem Provider (RZONE)

Du nutzt **RZONE** (docks15.rzone.de / shades09.rzone.de) als DNS-Provider.

### Option A: A-Record (Empfohlen)

Gehe zu deinem RZONE DNS-Management und füge hinzu:

#### Für mimicheck.ai:
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

#### Für app.mimicheck.ai:
```
Type: A
Name: app
Value: 76.76.21.21
TTL: 3600
```

### Option B: CNAME-Record (Alternative)

#### Für mimicheck.ai:
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
TTL: 3600
```

#### Für app.mimicheck.ai:
```
Type: CNAME
Name: app
Value: cname.vercel-dns.com
TTL: 3600
```

---

## Verifikation

Nach DNS-Änderung:
1. Warte 5-10 Minuten (DNS-Propagierung)
2. Vercel verifiziert automatisch
3. Du erhältst eine E-Mail bei Erfolg
4. SSL-Zertifikate werden automatisch erstellt

---

## Aktuelle Vercel URLs (funktionieren sofort):

**Landing Page:**
https://mimicheck-landing-moje11opa-bemlerinhos-projects.vercel.app

**Core App:**
https://mimicheck-7rdu6ohho-bemlerinhos-projects.vercel.app

---

## Nach DNS-Konfiguration:

**Landing Page:**
https://mimicheck.ai

**Core App:**
https://app.mimicheck.ai

---

## Prüfen ob DNS funktioniert:

```bash
# Prüfe mimicheck.ai
dig mimicheck.ai

# Prüfe app.mimicheck.ai
dig app.mimicheck.ai
```

Sollte `76.76.21.21` zurückgeben.
