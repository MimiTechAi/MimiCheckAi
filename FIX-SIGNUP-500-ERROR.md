# 🔧 Fix: 500 Error bei Signup

**Problem:** Signup schlägt fehl mit 500 Error, keine Registrierungs-Email

**Root Cause:** Der `handle_new_user` Trigger ist auf der falschen Tabelle (`public.users` statt `auth.users`)

---

## 🔴 PROBLEM:

Der Trigger `on_auth_user_created` lauscht auf `public.users` INSERT, aber Supabase erstellt User in `auth.users`.

Das führt zu:
- 500 Error bei Signup
- Keine Email wird versendet
- User wird nicht erstellt

---

## ✅ LÖSUNG:

Wir müssen den Trigger auf `auth.users` setzen und die Function anpassen.

### Schritt 1: Alten Trigger löschen

```sql
DROP TRIGGER IF EXISTS on_auth_user_created ON public.users;
```

### Schritt 2: Neue Function erstellen (korrigiert)

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Erstelle User-Eintrag in public.users
  INSERT INTO public.users (auth_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name', NEW.email)
  )
  ON CONFLICT (auth_id) DO NOTHING;
  
  -- Erstelle user_usage Eintrag
  INSERT INTO public.user_usage (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN NEW;
END;
$$;
```

### Schritt 3: Neuen Trigger auf auth.users erstellen

```sql
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

---

## 🚀 AUSFÜHREN:

Ich führe das jetzt aus...
