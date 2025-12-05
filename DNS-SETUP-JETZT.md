# 🌐 DNS Setup - JETZT MACHEN!

## Schritt-für-Schritt Anleitung

### 1. Gehe zu RZONE DNS-Management

Dein DNS-Provider: **RZONE**
- Nameserver: docks15.rzone.de / shades09.rzone.de

Login bei deinem RZONE Account.

---

### 2. Füge A-Records hinzu

#### Record 1: mimicheck.ai (Landing Page)

```
Type: A
Name: @ (oder leer lassen für Root-Domain)
Value: 76.76.21.21
TTL: 3600 (oder 1 Stunde)
```

#### Record 2: app.mimicheck.ai (Core App)

```
Type: A
Name: app
Value: 76.76.21.21
TTL: 3600 (oder 1 Stunde)
```

---

### 3. Speichern & Warten

- Klicke "Speichern" oder "Save"
- Warte 5-10 Minuten für DNS-Propagierung
- Vercel verifiziert automatisch
- SSL-Zertifikate werden automatisch erstellt

---

### 4. Prüfen ob es funktioniert

Öffne Terminal und führe aus:

```bash
# Prüfe mimicheck.ai
dig mimicheck.ai

# Prüfe app.mimicheck.ai
dig app.mimicheck.ai
```

**Erwartetes Ergebnis:**
```
;; ANSWER SECTION:
mimicheck.ai.  3600  IN  A  76.76.21.21
```

---

### 5. Vercel prüfen

Gehe zu:
- https://vercel.com/bemlerinhos-projects/mimicheck-landing/settings/domains
- https://vercel.com/bemlerinhos-projects/mimicheck/settings/domains

**Status sollte sein:**
- ✅ Valid Configuration
- 🔒 SSL Certificate: Active

---

## Alternative: CNAME Records (falls A-Records nicht funktionieren)

#### Record 1: mimicheck.ai
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
TTL: 3600
```

#### Record 2: app.mimicheck.ai
```
Type: CNAME
Name: app
Value: cname.vercel-dns.com
TTL: 3600
```

---

## Nach DNS-Setup:

### Teste die URLs:

1. **Landing Page:** https://mimicheck.ai
2. **Core App:** https://app.mimicheck.ai

Beide sollten laden und SSL-Zertifikat haben (🔒 im Browser).

---

## Nächste Schritte nach DNS:

1. ✅ DNS konfiguriert
2. ⏳ Supabase Auth URLs aktualisieren (siehe BETA-LAUNCH-READY.md)
3. ⏳ Stripe Customer Portal aktivieren (siehe BETA-LAUNCH-READY.md)

---

**Fragen?**
- Vercel Docs: https://vercel.com/docs/projects/domains
- RZONE Support: Kontaktiere deinen Provider

**Status:** 🔴 WARTE AUF DNS-KONFIGURATION
