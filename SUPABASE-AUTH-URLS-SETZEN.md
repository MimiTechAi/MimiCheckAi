# 🔐 Supabase Auth URLs - JETZT SETZEN!

## 📍 Gehe zu:

https://supabase.com/dashboard/project/yjjauvmjyhlxcoumwqlj/auth/url-configuration

---

## ✅ SETZE DIESE WERTE:

### 1. Site URL:
```
https://mimicheck.ai
```

### 2. Redirect URLs (ALLE hinzufügen - eine pro Zeile):

**WICHTIG:** Jede URL muss in einer eigenen Zeile stehen!

```
https://mimicheck.ai/auth
https://app.mimicheck.ai/auth-bridge
https://app.mimicheck.ai/profilseite
https://app.mimicheck.ai/onboarding
https://mimicheck-landing.vercel.app/auth
https://mimicheck.vercel.app/auth-bridge
http://localhost:3000/auth
http://localhost:8005/auth-bridge
```

---

## 🎯 WARUM WICHTIG:

Ohne diese URLs kann Supabase nicht zur Core App weiterleiten nach dem Login!

Die URLs müssen EXAKT so eingetragen werden - keine Tippfehler, keine zusätzlichen Leerzeichen!

---

## 📝 WIE EINTRAGEN:

1. **Site URL:** Einfach `https://mimicheck.ai` in das Feld eintragen
2. **Redirect URLs:** 
   - Klicke auf "Add URL" für jede URL
   - Oder füge alle URLs in das Textfeld ein (eine pro Zeile)
   - Klicke "Save"

---

## ✅ NACH DEM SETZEN:

Teste den kompletten Flow:

1. **Öffne:** https://mimicheck.ai/auth
2. **Registriere dich** mit neuer E-Mail
3. **Klicke "Registrieren"**
4. **Sollte automatisch weiterleiten** zu `app.mimicheck.ai/auth-bridge`
5. **Dann automatisch** zu `/profilseite`

**KEIN 404 mehr!** ✅

---

## 🐛 WENN ES NICHT FUNKTIONIERT:

1. **Öffne Browser Console (F12)**
2. **Suche nach Logs:**
   - `🌉 AuthBridge LOADED` - AuthBridge wurde geladen
   - `🎫 Received tokens` - Tokens wurden empfangen
   - `✅ Supabase setSession SUCCESS` - Session wurde gesetzt
   - `🚀 Redirecting to /profilseite` - Redirect erfolgt

3. **Wenn Fehler:**
   - Prüfe ob alle Redirect URLs korrekt eingetragen sind
   - Prüfe ob Site URL korrekt ist
   - Warte 1-2 Minuten (Supabase braucht Zeit zum Aktualisieren)
   - Versuche erneut

---

**MACH DAS JETZT!** 🚀
