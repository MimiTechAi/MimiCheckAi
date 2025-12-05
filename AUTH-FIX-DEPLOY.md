# Auth Fix - Deployment Anleitung

## Problem
Die App hängt bei "Authentifizierung wird geprüft..." nach dem Login von der Landing Page.

## Ursache
Cross-Domain Session Transfer zwischen `mimicheck.ai` (Landing) und `app.mimicheck.ai` (Dashboard) funktionierte nicht zuverlässig.

## Lösung
Die folgenden Dateien wurden geändert:

### 1. `src/pages/AuthBridge.jsx`
- Session wird jetzt direkt in localStorage geschrieben (schneller & zuverlässiger)
- Zusätzlich wird die Session über Supabase API gesetzt
- Bessere Fehlerbehandlung und Logging

### 2. `src/routes/ProtectedRoute.jsx`
- Prüft jetzt zuerst localStorage direkt (schneller)
- Kann Session aus localStorage wiederherstellen falls Supabase sie nicht findet
- Reduzierte Retry-Anzahl für schnellere Antwort

### 3. `src/api/supabaseEntities.js`
- Timeout für `getUser()` hinzugefügt (verhindert Hängen)
- Schnellerer Fallback wenn keine Session vorhanden

## Deployment

### Main App (app.mimicheck.ai)
```bash
cd /path/to/mimicheck
git add .
git commit -m "fix: Auth session transfer zwischen Landing und App"
git push
```

Vercel deployed automatisch.

### Wichtig: Vercel Environment Variables prüfen
Stelle sicher, dass in beiden Vercel-Projekten diese Variablen gesetzt sind:

**app.mimicheck.ai:**
- `VITE_SUPABASE_URL` = `https://yjjauvmjyhlxcoumwqlj.supabase.co`
- `VITE_SUPABASE_ANON_KEY` = (dein Anon Key)

**mimicheck.ai:**
- `VITE_SUPABASE_URL` = `https://yjjauvmjyhlxcoumwqlj.supabase.co`
- `VITE_SUPABASE_ANON_KEY` = (dein Anon Key)

## Test nach Deployment

1. Öffne https://mimicheck.ai
2. Klicke auf "Anmelden" oder "Jetzt starten"
3. Logge dich ein mit einem bestehenden Account
4. Du solltest automatisch zu https://app.mimicheck.ai/profilseite weitergeleitet werden

## Debugging

Falls es immer noch nicht funktioniert:

1. Öffne Browser DevTools (F12)
2. Gehe zu Console
3. Suche nach Logs die mit 🔐, ✅, ❌ beginnen
4. Prüfe Network Tab für fehlgeschlagene Requests

## Storage Key
Der Storage Key muss in allen Dateien identisch sein:
```
sb-yjjauvmjyhlxcoumwqlj-auth-token
```

Dieser Key basiert auf der Supabase Project Reference.
