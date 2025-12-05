# 💳 Stripe Products Configuration - MiMiCheck

## Erstellte Produkte (Live Mode)

### 1. Staatshilfen+ Premium (€14.99/Monat)
- **Product ID:** `prod_TXhe9aFr3tqmR6`
- **Price ID:** `price_1SacLbGX9ckbY2L6ejmsITKD`
- **Preis:** €14.99/Monat
- **Features:**
  - 50 Förderprüfungen/Monat
  - 10 Nebenkostenprüfungen/Monat
  - Priority KI-Assistent (100 Fragen/Tag)
  - PDF-Reports & Musterbriefe
  - Automatische Antragsassistenz
  - Widerspruchs-Wizard

### 2. Haushalt-Optimierer Pro (€29.99/Monat)
- **Product ID:** `prod_TXhlxm4iPuHzc6`
- **Price ID:** `price_1SacN7GX9ckbY2L68BctYrGk`
- **Preis:** €29.99/Monat
- **Features:**
  - Alle Premium Features
  - Familienmitglieder verwalten (bis 4 Profile)
  - Rechtliche Erstberatung (1x/Monat)
  - Steueroptimierungs-KI
  - Persönlicher KI-Agent für komplexe Fälle
  - WhatsApp & Telefon-Support

## Integration in Code

### Backend (Supabase Edge Function)

```typescript
// supabase/functions/create-checkout-session/index.ts

const STRIPE_PRICE_IDS = {
  premium: 'price_1SacLbGX9ckbY2L6ejmsITKD',
  pro: 'price_1SacN7GX9ckbY2L68BctYrGk'
};

// Usage:
const priceId = STRIPE_PRICE_IDS[planId];
```

### Frontend (Environment Variables)

```bash
# .env
VITE_STRIPE_PRICE_PREMIUM=price_1SacLbGX9ckbY2L6ejmsITKD
VITE_STRIPE_PRICE_PRO=price_1SacN7GX9ckbY2L68BctYrGk
```

## Nächste Schritte

1. ✅ Produkte erstellt
2. ✅ Preise konfiguriert (monatlich, recurring)
3. ⏳ Backend Edge Function aktualisieren
4. ⏳ Frontend Pricing-Seite aktualisieren
5. ⏳ Webhooks konfigurieren
6. ⏳ Customer Portal aktivieren
7. ⏳ Usage Limits implementieren (Supabase)

## Wichtige Hinweise

- **Keine "unbegrenzten" Features** - alle Limits sind klar definiert
- **Monatliche Abrechnung** - automatische Verlängerung
- **Jederzeit kündbar** - über Stripe Customer Portal
- **DSGVO-konform** - Stripe ist DSGVO-zertifiziert

## Stripe Dashboard Links

- [Produkte verwalten](https://dashboard.stripe.com/products)
- [Preise verwalten](https://dashboard.stripe.com/prices)
- [Subscriptions](https://dashboard.stripe.com/subscriptions)
- [Webhooks](https://dashboard.stripe.com/webhooks)
- [Customer Portal](https://dashboard.stripe.com/settings/billing/portal)
