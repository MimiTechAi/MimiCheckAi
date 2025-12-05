# ✅ Stripe Setup für MiMiCheck - ABGESCHLOSSEN

## Was wurde gemacht?

### 1. ✅ Stripe Produkte erstellt (Live Mode)

**Premium Plan - Staatshilfen+**
- Preis: €14.99/Monat
- Product ID: `prod_TXhe9aFr3tqmR6`
- Price ID: `price_1SacLbGX9ckbY2L6ejmsITKD`
- Features:
  - 50 Förderprüfungen/Monat
  - 10 Nebenkostenprüfungen/Monat
  - 100 KI-Fragen/Tag
  - PDF-Reports & Musterbriefe
  - Automatische Antragsassistenz
  - Widerspruchs-Wizard

**Pro Plan - Haushalt-Optimierer**
- Preis: €29.99/Monat
- Product ID: `prod_TXhlxm4iPuHzc6`
- Price ID: `price_1SacN7GX9ckbY2L68BctYrGk`
- Features:
  - Alle Premium Features
  - Bis 4 Familienprofile
  - 1 Rechtsberatung/Monat
  - Steueroptimierungs-KI
  - Persönlicher KI-Agent
  - WhatsApp & Telefon-Support

### 2. ✅ Frontend aktualisiert

- `src/pages/Pricing.jsx` - Limits statt "unbegrenzt"
- Price IDs hinzugefügt
- Klare Feature-Beschreibungen

### 3. ✅ Backend vorbereitet

- Edge Function `create-stripe-checkout` ist bereit
- Verwendet Environment Variables für Price IDs
- Customer-Erstellung automatisiert

### 4. ✅ Dokumentation erstellt

- `STRIPE-PRODUCTS-CONFIG.md` - Produkt-Übersicht
- `STRIPE-DEPLOYMENT-CHECKLIST.md` - Deployment-Schritte
- `SUPABASE-SECRETS-SETUP.md` - Secrets-Konfiguration

## Was muss noch gemacht werden?

### Schritt 1: Supabase Secrets setzen

Gehe zu: https://supabase.com/dashboard/project/yjjauvmjyhlxcoumwqlj/settings/vault

Setze folgende Secrets (ersetze mit deinen echten Keys!):
```
STRIPE_SECRET_KEY = sk_live_DEIN_KEY_HIER
STRIPE_PREMIUM_PRICE_ID = price_1SacLbGX9ckbY2L6ejmsITKD
STRIPE_PRO_PRICE_ID = price_1SacN7GX9ckbY2L68BctYrGk
```

### Schritt 2: Stripe Webhooks konfigurieren

1. Gehe zu: https://dashboard.stripe.com/webhooks
2. Klicke "Add endpoint"
3. URL: `https://yjjauvmjyhlxcoumwqlj.supabase.co/functions/v1/stripe-webhook`
4. Events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Kopiere Webhook Secret und setze als `STRIPE_WEBHOOK_SECRET`

### Schritt 3: Customer Portal aktivieren

1. Gehe zu: https://dashboard.stripe.com/settings/billing/portal
2. Klicke "Activate" (Live Mode)
3. Aktiviere:
   - ✅ Subscriptions kündigen
   - ✅ Zahlungsmethoden ändern
   - ✅ Rechnungen herunterladen

### Schritt 4: Vercel Environment Variables

Füge in Vercel hinzu:
```
VITE_STRIPE_PUBLISHABLE_KEY = pk_live_... (dein Publishable Key)
```

Finde den Key hier: https://dashboard.stripe.com/apikeys

### Schritt 5: Usage Limits implementieren

Siehe `STRIPE-DEPLOYMENT-CHECKLIST.md` Schritt 6 für SQL-Schema.

### Schritt 6: Testing

- [ ] Test-Zahlung mit Premium Plan
- [ ] Test-Zahlung mit Pro Plan
- [ ] Subscription upgraden
- [ ] Subscription kündigen
- [ ] Webhook Events prüfen

## Wichtige Links

- **Stripe Dashboard**: https://dashboard.stripe.com
- **Produkte**: https://dashboard.stripe.com/products
- **Webhooks**: https://dashboard.stripe.com/webhooks
- **Customer Portal**: https://dashboard.stripe.com/settings/billing/portal
- **Supabase Secrets**: https://supabase.com/dashboard/project/yjjauvmjyhlxcoumwqlj/settings/vault

## Sicherheit

✅ **Keine "unbegrenzten" Features** - alle Limits klar definiert
✅ **Monatliche Abrechnung** - automatische Verlängerung
✅ **Jederzeit kündbar** - über Customer Portal
✅ **DSGVO-konform** - Stripe ist DSGVO-zertifiziert
✅ **Secrets sicher** - nur in Supabase Vault, nie im Code

## Support

Bei Fragen:
- Stripe Docs: https://stripe.com/docs
- Supabase Docs: https://supabase.com/docs
- MiMiCheck Docs: Siehe `DEPLOYMENT.md`

---

**Status: Bereit für Production nach Schritt 1-4! 🚀**
