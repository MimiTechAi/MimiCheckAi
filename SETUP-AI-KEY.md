# AI Chat Setup - OpenAI API Key

## Problem
Der KI Lotse (AI Chat) benötigt einen OpenAI API Key um zu funktionieren.

## Lösung

### Schritt 1: OpenAI API Key besorgen
1. Gehe zu https://platform.openai.com/api-keys
2. Erstelle einen neuen API Key
3. Kopiere den Key (beginnt mit `sk-...`)

### Schritt 2: Key in Supabase setzen

**Option A: Über Supabase Dashboard**
1. Gehe zu: https://supabase.com/dashboard/project/yjjauvmjyhlxcoumwqlj/settings/vault
2. Klicke "Add new secret"
3. Name: `OPENAI_API_KEY`
4. Value: Dein OpenAI API Key
5. Klicke "Save"

**Option B: Über CLI**
```bash
npx supabase secrets set OPENAI_API_KEY=sk-proj-... --project-ref yjjauvmjyhlxcoumwqlj
```

### Schritt 3: Testen
1. Öffne https://app.mimicheck.ai
2. Klicke auf "KI Lotse" (grüner Button unten links)
3. Schreibe eine Nachricht
4. Die AI sollte antworten

## Bereits deployed
- ✅ `ai-chat` Edge Function deployed
- ✅ Frontend verwendet jetzt Supabase Edge Function statt direktem OpenAI Call
- ✅ Fallback-Nachricht wenn AI nicht verfügbar

## Kosten
- OpenAI GPT-4o: ca. $0.01-0.03 pro Chat-Nachricht
- Empfehlung: Setze ein Spending Limit in OpenAI Dashboard
