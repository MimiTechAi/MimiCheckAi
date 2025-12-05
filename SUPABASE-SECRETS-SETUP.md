# 🔐 Supabase Secrets Setup - MiMiCheck

## Secrets im Supabase Dashboard setzen

Da `npx supabase secrets` Login erfordert, setze die Secrets direkt im Dashboard:

### 1. Gehe zum Supabase Dashboard
https://supabase.com/dashboard/project/yjjauvmjyhlxcoumwqlj/settings/vault

### 2. Setze folgende Secrets:

#### Stripe Secrets (REQUIRED für Payments)

| Secret Name | Wert | Beschreibung |
|-------------|------|--------------|
| `STRIPE_SECRET_KEY` | `sk_live_...` | Stripe Live Secret Key (von Stripe Dashboard) |
| `STRIPE_PREMIUM_PRICE_ID` | `price_1SacLbGX9ckbY2L6ejmsITKD` | Premium Plan Price ID (€14.99/Monat) |
| `STRIPE_PRO_PRICE_ID` | `price_1SacN7GX9ckbY2L68BctYrGk` | Pro Plan Price ID (€29.99/Monat) |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | Webhook Secret (nach Webhook-Erstellung) |

#### AI Secrets (REQUIRED für AI-Features)

| Secret Name | Wert | Wo zu finden |
|-------------|------|--------------|
| `OPENAI_API_KEY` | `sk-proj-...` | https://platform.openai.com/api-keys |
| `ANTHROPIC_API_KEY` | `sk-ant-...` | https://console.anthropic.com/settings/keys |

## Alternative: Via Supabase CLI (wenn eingeloggt)

```bash
# Stripe Secrets (ersetze mit deinen echten Keys!)
npx supabase secrets set STRIPE_SECRET_KEY=sk_live_DEIN_KEY_HIER

npx supabase secrets set STRIPE_PREMIUM_PRICE_ID=price_1SacLbGX9ckbY2L6ejmsITKD

npx supabase secrets set STRIPE_PRO_PRICE_ID=price_1SacN7GX9ckbY2L68BctYrGk

# AI Secrets (wenn vorhanden)
npx supabase secrets set OPENAI_API_KEY=sk-proj-DEIN_KEY_HIER
npx supabase secrets set ANTHROPIC_API_KEY=sk-ant-DEIN_KEY_HIER
```

## Secrets überprüfen

```bash
npx supabase secrets list
```

## Wichtig: Secrets vs Environment Variables

### Secrets (Supabase Vault)
- Für **Backend** (Edge Functions)
- Sicher verschlüsselt
- Nicht im Code sichtbar
- Beispiele: API Keys, Webhook Secrets

### Environment Variables (Vercel)
- Für **Frontend** (React App)
- Nur PUBLIC Keys!
- Beispiele: `VITE_SUPABASE_URL`, `VITE_STRIPE_PUBLISHABLE_KEY`

## Nächste Schritte

1. ✅ Stripe Produkte erstellt
2. ✅ Frontend aktualisiert
3. ⏳ **Secrets im Supabase Dashboard setzen** ← DU BIST HIER
4. ⏳ Webhooks konfigurieren
5. ⏳ Customer Portal aktivieren
6. ⏳ Testing

---

**Sobald die Secrets gesetzt sind, sind die Edge Functions bereit für Production!**
