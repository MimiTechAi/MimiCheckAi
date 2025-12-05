# 🎯 MiMiCheck - Was du JETZT tun musst

## ✅ Was ich gemacht habe:

1. ✅ Alte Domain-Zuordnung entfernt
2. ✅ `mimicheck.ai` → Landing Page zugeordnet
3. ✅ `app.mimicheck.ai` → Core App zugeordnet
4. ✅ Environment Variables gesetzt
5. ✅ Deployment Protection deaktiviert
6. ✅ Stripe Customer Portal Key gespeichert

---

## 🔴 Was DU jetzt machen musst:

### SCHRITT 1: Subdomain bei STRATO (5 Min)

**Du hast bereits:**
- ✅ Root-Domain: `@ → 76.76.21.21`

**Du brauchst noch:**
- 🔴 Subdomain: `app → 76.76.21.21`

**Wie:**
1. Login bei STRATO: https://www.strato.de/apps/CustomerService
2. Gehe zu mimicheck.ai → DNS Tab
3. Füge neuen A-Record hinzu:
   ```
   Typ: A
   Name: app
   Wert: 76.76.21.21
   ```
4. Speichern

**Falls "app" nicht geht:**
- Versuche: `app.mimicheck.ai` als vollständigen Hostname
- Oder verwende CNAME: `app → cname.vercel-dns.com`

**Siehe Details:** `STRATO-SUBDOMAIN-SETUP.md`

---

### SCHRITT 2: Supabase Auth URLs (2 Min)

**URL:** https://supabase.com/dashboard/project/yjjauvmjyhlxcoumwqlj/auth/url-configuration

**Site URL:**
```
https://mimicheck.ai
```

**Redirect URLs (kopiere alle):**
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

### SCHRITT 3: Warten (5-30 Min)

Nach Subdomain-Hinzufügung:
- DNS braucht Zeit zum Propagieren
- Meist 5-10 Minuten
- Kann bis zu 30 Minuten dauern

**Prüfen:**
```bash
dig app.mimicheck.ai
```

Sollte `76.76.21.21` zurückgeben.

---

### SCHRITT 4: Testen

**Landing Page:**
```
https://mimicheck.ai
```

**Core App:**
```
https://app.mimicheck.ai
```

**Registrierung testen:**
1. Auf Landing: "Jetzt starten"
2. Registriere dich
3. Magic Link kommt an
4. Klicke Link → Sollte zu `app.mimicheck.ai` gehen

**Premium kaufen testen:**
1. Pricing-Seite
2. "Premium kaufen"
3. Test-Karte: `4242 4242 4242 4242`
4. Nach Payment → Dashboard

---

## 📋 QUICK CHECKLIST:

- [ ] Subdomain bei STRATO hinzugefügt
- [ ] Supabase Auth URLs aktualisiert
- [ ] 5-30 Min gewartet
- [ ] `dig app.mimicheck.ai` zeigt `76.76.21.21`
- [ ] Landing Page öffnet (mimicheck.ai)
- [ ] Core App öffnet (app.mimicheck.ai)
- [ ] Registrierung funktioniert
- [ ] Redirect funktioniert
- [ ] Premium kaufen funktioniert

---

## 🆘 WENN PROBLEME:

**Subdomain lässt sich nicht hinzufügen?**
→ Siehe `STRATO-SUBDOMAIN-SETUP.md` für Alternativen

**DNS funktioniert nicht?**
→ Warte länger (bis zu 48h möglich)
→ Prüfe STRATO Einstellungen nochmal

**Landing zeigt Dashboard?**
→ Domains falsch zugeordnet (sollte jetzt richtig sein)

**Redirect funktioniert nicht?**
→ Supabase Auth URLs aktualisieren (Schritt 2)

---

## 📚 DOKUMENTE:

- `FINALE-CHECKLISTE.md` - Komplette Übersicht
- `STRATO-SUBDOMAIN-SETUP.md` - Subdomain Details
- `STRIPE-CUSTOMER-PORTAL-KEY.txt` - Customer Portal Key

---

## 🎉 DANN BIST DU FERTIG!

Nach diesen Schritten ist MiMiCheck **KOMPLETT LIVE**! 🚀

---

**Geschätzte Zeit:** 10-40 Minuten (inkl. Wartezeit)
**Schwierigkeit:** Einfach
**Status:** 🟡 95% FERTIG
