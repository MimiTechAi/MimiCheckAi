# ✅ Stripe Deployment Checklist - MiMiCheck

## 1. Stripe Produkte erstellt ✅

### Premium Plan
- **Produkt:** MiMiCheck - Staatshilfen+ Premium
- **Product ID:** `prod_TXhe9aFr3tqmR6`
- **Price ID:** `price_1SacLbGX9ckbY2L6ejmsITKD`
- **Preis:** €14.99/Monat
- **Limits:**
  - 50 Förderprüfungen/Monat
  - 10 Nebenkostenprüfungen/Monat
  - 100 KI-Fragen/Tag

### Pro Plan
- **Produkt:** MiMiCheck - Haushalt-Optimierer Pro
- **Product ID:** `prod_TXhlxm4iPuHzc6`
- **Price ID:** `price_1SacN7GX9ckbY2L68BctYrGk`
- **Preis:** €29.99/Monat
- **Limits:**
  - Alle Premium Features
  - Bis 4 Familienprofile
  - 1 Rechtsberatung/Monat

## 2. Supabase Secrets setzen ⏳

```bash
# Im Projektverzeichnis ausführen (ersetze mit deinen echten Keys!):
npx supabase secrets set STRIPE_SECRET_KEY=sk_live_DEIN_KEY_HIER

npx supabase secrets set STRIPE_PREMIUM_PRICE_ID=price_1SacLbGX9ckbY2L6ejmsITKD

npx supabase secrets set STRIPE_PRO_PRICE_ID=price_1SacN7GX9ckbY2L68BctYrGk

# Webhook Secret (nach Webhook-Erstellung):
npx supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_DEIN_SECRET_HIER
```

## 3. Frontend Environment Variables ⏳

Füge in Vercel hinzu:

```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...  # Dein Publishable Key
```

## 4. Stripe Webhooks konfigurieren ⏳

### Webhook Endpoint erstellen:
1. Gehe zu https://dashboard.stripe.com/webhooks
2. Klicke auf "Add endpoint"
3. URL: `https://yjjauvmjyhlxcoumwqlj.supabase.co/functions/v1/stripe-webhook`
4. Events auswählen:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

5. Webhook Secret kopieren und als `STRIPE_WEBHOOK_SECRET` setzen

## 5. Customer Portal aktivieren ⏳

1. Gehe zu https://dashboard.stripe.com/settings/billing/portal
2. Klicke auf "Activate" (Live Mode)
3. Konfiguriere:
   - ✅ Kunden können Subscriptions kündigen
   - ✅ Kunden können Zahlungsmethoden ändern
   - ✅ Kunden können Rechnungen herunterladen

## 6. Usage Limits in Supabase implementieren ⏳

### Datenbank-Schema erweitern:

```sql
-- Tabelle für Usage Tracking
CREATE TABLE IF NOT EXISTS user_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  month DATE NOT NULL, -- Erster Tag des Monats
  foerder_checks INT DEFAULT 0,
  nebenkosten_checks INT DEFAULT 0,
  ki_questions_today INT DEFAULT 0,
  last_ki_question_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, month)
);

-- RLS Policies
ALTER TABLE user_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own usage"
  ON user_usage FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own usage"
  ON user_usage FOR UPDATE
  USING (auth.uid() = user_id);

-- Function zum Prüfen der Limits
CREATE OR REPLACE FUNCTION check_usage_limit(
  p_user_id UUID,
  p_check_type TEXT
) RETURNS BOOLEAN AS $$
DECLARE
  v_subscription_tier TEXT;
  v_current_usage INT;
  v_limit INT;
  v_current_month DATE;
BEGIN
  -- Get user's subscription tier
  SELECT subscription_tier INTO v_subscription_tier
  FROM users WHERE id = p_user_id;
  
  -- Set limits based on tier
  IF p_check_type = 'foerder' THEN
    v_limit := CASE 
      WHEN v_subscription_tier = 'premium' THEN 50
      WHEN v_subscription_tier = 'pro' THEN 50
      ELSE 1 -- free tier
    END;
  ELSIF p_check_type = 'nebenkosten' THEN
    v_limit := CASE 
      WHEN v_subscription_tier = 'premium' THEN 10
      WHEN v_subscription_tier = 'pro' THEN 10
      ELSE 1 -- free tier
    END;
  END IF;
  
  -- Get current month
  v_current_month := DATE_TRUNC('month', NOW());
  
  -- Get current usage
  SELECT 
    CASE 
      WHEN p_check_type = 'foerder' THEN foerder_checks
      WHEN p_check_type = 'nebenkosten' THEN nebenkosten_checks
    END INTO v_current_usage
  FROM user_usage
  WHERE user_id = p_user_id AND month = v_current_month;
  
  -- Return true if under limit
  RETURN COALESCE(v_current_usage, 0) < v_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## 7. Frontend Pricing-Seite aktualisiert ✅

- ✅ Limits statt "unbegrenzt"
- ✅ Price IDs hinzugefügt
- ✅ Klare Feature-Beschreibungen

## 8. Testing Checklist ⏳

### Test-Szenarien:
- [ ] Premium Subscription kaufen
- [ ] Pro Subscription kaufen
- [ ] Subscription upgraden (Premium → Pro)
- [ ] Subscription downgraden (Pro → Premium)
- [ ] Subscription kündigen
- [ ] Zahlungsmethode ändern
- [ ] Usage Limits testen
- [ ] Webhook Events prüfen

## 9. Production Readiness ⏳

- [ ] Stripe Live Mode aktiviert
- [ ] Alle Secrets gesetzt
- [ ] Webhooks konfiguriert
- [ ] Customer Portal aktiviert
- [ ] Usage Limits implementiert
- [ ] Error Handling getestet
- [ ] Monitoring eingerichtet

## 10. Monitoring & Analytics

### Stripe Dashboard überwachen:
- Erfolgreiche Zahlungen
- Fehlgeschlagene Zahlungen
- Churn Rate
- MRR (Monthly Recurring Revenue)

### Supabase Logs überwachen:
- Edge Function Errors
- Webhook Failures
- Usage Limit Violations

---

## Nächste Schritte

1. **Supabase Secrets setzen** (siehe Schritt 2)
2. **Webhooks konfigurieren** (siehe Schritt 4)
3. **Customer Portal aktivieren** (siehe Schritt 5)
4. **Usage Limits implementieren** (siehe Schritt 6)
5. **Testing durchführen** (siehe Schritt 8)
