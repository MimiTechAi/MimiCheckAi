# ⚡ QUICK FIX - App funktioniert nicht

## ❌ PROBLEM:

Die Subdomain `app.mimicheck.ai` zeigt auf den **STRATO Server** statt auf **Vercel**.

```
mimicheck.ai → 76.76.21.21 ✅ (Vercel)
app.mimicheck.ai → 217.160.0.161 ❌ (STRATO)
```

---

## ✅ LÖSUNG 1: IP bei STRATO ändern (5 Min)

### Bei STRATO:
1. Login: https://www.strato.de/apps/CustomerService
2. Gehe zu Domains → mimicheck.ai
3. **Suche "app" Subdomain**
4. **Ändere IP** von `217.160.0.161` zu `76.76.21.21`
5. Speichern
6. Warte 5-30 Min

**Siehe Details:** `STRATO-SUBDOMAIN-FIX.md`

---

## ✅ LÖSUNG 2: Vercel Nameserver (EINFACHER!)

### Bei STRATO:
1. Login: https://www.strato.de/apps/CustomerService
2. Gehe zu Domains → mimicheck.ai
3. Klicke "Nameserver ändern"
4. Setze:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
5. Speichern

### Fertig!
- Vercel übernimmt DNS
- Beide Domains funktionieren automatisch
- Keine weiteren Einstellungen

**Empfehlung:** Nimm Lösung 2 - ist einfacher!

---

## ✅ NACH DEM FIX:

Warte 5-30 Minuten, dann teste:

```
https://mimicheck.ai → Landing Page
https://app.mimicheck.ai → Core App
```

Beide sollten laden!

---

## 📊 STATUS:

- ✅ Apps deployed
- ✅ Root-Domain funktioniert
- ❌ Subdomain zeigt auf falschen Server
- 🔧 Muss bei STRATO geändert werden

---

**Empfehlung:** Stelle auf Vercel Nameserver um (Lösung 2) - dann funktioniert alles automatisch!
