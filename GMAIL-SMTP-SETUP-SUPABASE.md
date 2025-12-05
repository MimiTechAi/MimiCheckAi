# 📧 Gmail SMTP für Supabase einrichten

**Ziel:** Gmail SMTP Server für Supabase Auth Emails verwenden

---

## 🔴 WICHTIG: App-Passwort erstellen (NICHT dein Gmail-Passwort!)

Du brauchst ein **App-Passwort** von Google, nicht dein normales Gmail-Passwort!

---

## 📍 SCHRITT 1: Google App-Passwort erstellen

### Option A: Direkter Link (empfohlen)
**Gehe zu:** https://myaccount.google.com/apppasswords

### Option B: Manuell navigieren
1. Gehe zu: https://myaccount.google.com
2. Klicke auf "Sicherheit" (links)
3. Scrolle zu "Bei Google anmelden"
4. Klicke auf "Bestätigung in zwei Schritten" (muss aktiviert sein!)
5. Scrolle runter zu "App-Passwörter"
6. Klicke auf "App-Passwörter"

### App-Passwort erstellen:
1. **App auswählen:** "Mail" oder "Andere (Benutzerdefinierter Name)"
2. **Name eingeben:** "Supabase MiMiCheck"
3. **Klicke:** "Erstellen"
4. **WICHTIG:** Kopiere das 16-stellige Passwort (z.B. `abcd efgh ijkl mnop`)
5. **Speichere es sicher!** Du siehst es nur einmal!

---

## 📍 SCHRITT 2: Supabase SMTP konfigurieren

### Gehe zu Supabase Dashboard:
**URL:** https://supabase.com/dashboard/project/yjjauvmjyhlxcoumwqlj/settings/auth

### Scrolle zu "SMTP Settings":

**Aktiviere SMTP:**
- ✅ Enable Custom SMTP

**Trage ein:**

1. **Sender email:**
   ```
   deine-email@gmail.com
   ```
   (Die Gmail-Adresse, von der Emails gesendet werden sollen)

2. **Sender name:**
   ```
   MiMiCheck
   ```
   (Der Name, der als Absender angezeigt wird)

3. **Host:**
   ```
   smtp.gmail.com
   ```

4. **Port number:**
   ```
   587
   ```
   (Für TLS/STARTTLS - empfohlen)
   
   **Alternative:** `465` (für SSL)

5. **Username:**
   ```
   deine-email@gmail.com
   ```
   (Deine vollständige Gmail-Adresse)

6. **Password:**
   ```
   abcd efgh ijkl mnop
   ```
   (Das 16-stellige App-Passwort von Schritt 1 - OHNE Leerzeichen!)
   
   **WICHTIG:** Entferne alle Leerzeichen! Aus `abcd efgh ijkl mnop` wird `abcdefghijklmnop`

7. **Klicke:** "Save"

---

## ✅ SCHRITT 3: Testen

### Test-Email senden:

1. Gehe zu: https://mimicheck.ai/auth
2. Klicke auf "Registrieren"
3. Gib eine Test-Email ein
4. Klicke "Registrieren"
5. **Prüfe dein Email-Postfach** (auch Spam!)

**Erwartung:**
- Email von "MiMiCheck <deine-email@gmail.com>"
- Betreff: "Confirm your signup" oder ähnlich
- Enthält Bestätigungslink

---

## 🐛 TROUBLESHOOTING

### Problem: "Authentication failed"

**Lösung 1:** Prüfe App-Passwort
- Hast du das App-Passwort verwendet (NICHT dein Gmail-Passwort)?
- Hast du alle Leerzeichen entfernt?
- Ist das Passwort korrekt kopiert?

**Lösung 2:** Prüfe 2-Faktor-Authentifizierung
- 2FA muss aktiviert sein für App-Passwörter!
- Gehe zu: https://myaccount.google.com/security
- Aktiviere "Bestätigung in zwei Schritten"

**Lösung 3:** Prüfe Gmail-Einstellungen
- Gehe zu: https://mail.google.com/mail/u/0/#settings/fwdandpop
- Stelle sicher, dass IMAP aktiviert ist

### Problem: "Connection timeout"

**Lösung:** Prüfe Port
- Verwende Port `587` (TLS/STARTTLS)
- Oder Port `465` (SSL)
- NICHT Port `25` (wird oft blockiert)

### Problem: "Emails kommen nicht an"

**Lösung 1:** Prüfe Spam-Ordner
- Emails landen oft im Spam bei neuen Absendern

**Lösung 2:** Prüfe Gmail Limits
- Gmail hat Limits für SMTP:
  - 500 Emails pro Tag (kostenlos)
  - 2000 Emails pro Tag (Google Workspace)

**Lösung 3:** Prüfe Supabase Logs
- Gehe zu: https://supabase.com/dashboard/project/yjjauvmjyhlxcoumwqlj/logs/edge-logs
- Suche nach SMTP-Fehlern

---

## 📊 GMAIL SMTP LIMITS

### Kostenlose Gmail-Accounts:
- **500 Emails pro Tag**
- **100 Empfänger pro Email**
- **500 Empfänger pro Tag**

### Google Workspace:
- **2000 Emails pro Tag**
- **2000 Empfänger pro Tag**

**WICHTIG:** Für Production mit vielen Usern solltest du einen professionellen Email-Service verwenden:
- SendGrid (Supabase empfohlen)
- AWS SES
- Mailgun
- Postmark

---

## 🔐 SICHERHEIT

### Best Practices:

1. **Verwende IMMER App-Passwörter**
   - Niemals dein echtes Gmail-Passwort!

2. **Aktiviere 2-Faktor-Authentifizierung**
   - Erforderlich für App-Passwörter

3. **Lösche ungenutzte App-Passwörter**
   - Gehe zu: https://myaccount.google.com/apppasswords
   - Lösche alte/ungenutzte Passwörter

4. **Überwache Email-Versand**
   - Prüfe regelmäßig Gmail "Gesendet"-Ordner
   - Achte auf ungewöhnliche Aktivität

---

## 📝 ZUSAMMENFASSUNG

### Was du brauchst:
- ✅ Gmail-Account
- ✅ 2-Faktor-Authentifizierung aktiviert
- ✅ App-Passwort erstellt
- ✅ Supabase SMTP konfiguriert

### Links:
- **App-Passwort erstellen:** https://myaccount.google.com/apppasswords
- **Gmail-Sicherheit:** https://myaccount.google.com/security
- **Supabase SMTP Settings:** https://supabase.com/dashboard/project/yjjauvmjyhlxcoumwqlj/settings/auth

---

## ✅ CHECKLISTE:

- [ ] 2-Faktor-Authentifizierung aktiviert
- [ ] App-Passwort erstellt
- [ ] App-Passwort gespeichert
- [ ] Supabase SMTP konfiguriert
- [ ] Host: smtp.gmail.com
- [ ] Port: 587
- [ ] Username: deine-email@gmail.com
- [ ] Password: App-Passwort (ohne Leerzeichen)
- [ ] Gespeichert
- [ ] Test-Email gesendet
- [ ] Test-Email empfangen

---

**MACH DAS JETZT!** 🚀

1. App-Passwort erstellen: https://myaccount.google.com/apppasswords
2. Supabase SMTP konfigurieren: https://supabase.com/dashboard/project/yjjauvmjyhlxcoumwqlj/settings/auth
3. Testen!
