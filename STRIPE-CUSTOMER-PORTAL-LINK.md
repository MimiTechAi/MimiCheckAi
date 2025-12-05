# Stripe Customer Portal - Login Link

## ✅ Portal ist aktiviert!

**Customer Portal Login Link:**
https://billing.stripe.com/p/login/cNi6oH51D7ZXeOK4pd4gg00

---

## Wie funktioniert das?

### 1. User klickt auf "Abo verwalten"
- Im User Menu Dropdown (Layout.jsx)
- Auf der Pricing Page (Pricing.jsx)
- Im Dashboard (für Premium/Pro User)

### 2. Frontend ruft Edge Function auf
```javascript
const response = await createCustomerPortalSession({
    returnUrl: `${window.location.origin}${createPageUrl('Pricing')}`
});
```

### 3. Edge Function erstellt Portal Session
```typescript
const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
})
```

### 4. User wird zu Stripe Portal weitergeleitet
```javascript
window.location.href = data.portalUrl;
```

### 5. User landet auf Stripe Portal
- URL: https://billing.stripe.com/p/session/...
- Kann Abo kündigen, Zahlungsmethode ändern, Rechnungen herunterladen

### 6. Nach Fertig klicken
- User wird zurück zu `returnUrl` geleitet
- In unserem Fall: Pricing Page

---

## Was User im Portal machen können

✅ **Abo kündigen**
- Sofortige Kündigung oder zum Periodenende
- Bestätigung per Email

✅ **Zahlungsmethode ändern**
- Neue Kreditkarte hinzufügen
- Alte Karte entfernen
- Standard-Zahlungsmethode festlegen

✅ **Rechnungen herunterladen**
- Alle bisherigen Rechnungen als PDF
- Automatisch per Email bei jeder Zahlung

✅ **Abo upgraden/downgraden**
- Von Premium zu Pro wechseln
- Von Pro zu Premium downgraden
- Sofortige Änderung oder zum Periodenende

✅ **Zahlungshistorie**
- Alle bisherigen Zahlungen
- Status (erfolgreich, fehlgeschlagen, ausstehend)
- Datum und Betrag

---

## Konfiguration in Stripe Dashboard

**Portal Settings:**
https://dashboard.stripe.com/settings/billing/portal

**Aktivierte Features:**
- ✅ Customer can update payment methods
- ✅ Customer can update billing information
- ✅ Customer can view invoices
- ✅ Customer can cancel subscriptions
- ✅ Customer can switch plans

**Branding:**
- Logo: MiMiCheck Logo (optional)
- Farben: Emerald/Teal Theme (optional)
- Custom Domain: billing.mimicheck.de (optional, später)

---

## Test-Anleitung

### Als Free User:
1. Gehe zu Pricing Page
2. Klicke auf "Premium" oder "Pro"
3. Werde zu Stripe Checkout weitergeleitet
4. Zahle mit Test-Karte: `4242 4242 4242 4242`
5. Nach erfolgreicher Zahlung: Zurück zum Dashboard

### Als Premium/Pro User:
1. Klicke auf User Menu → "Abo verwalten"
2. Werde zu Stripe Portal weitergeleitet
3. Teste Features:
   - Zahlungsmethode ändern
   - Rechnungen herunterladen
   - Abo kündigen (NICHT in Production!)
4. Klicke "Zurück zu MiMiCheck"
5. Lande auf Pricing Page

---

## Troubleshooting

### Fehler: "No subscription found"
**Problem:** User hat keine `stripe_customer_id` in Metadata
**Lösung:** User muss erst upgraden (Checkout durchlaufen)

### Fehler: "STRIPE_CUSTOMER_PORTAL_NOT_CONFIGURED"
**Problem:** Portal ist nicht aktiviert in Stripe Dashboard
**Lösung:** Gehe zu https://dashboard.stripe.com/settings/billing/portal und aktiviere

### Fehler: 401 Unauthorized
**Problem:** Auth Token wird nicht korrekt weitergegeben
**Lösung:** 
- User muss eingeloggt sein
- Session muss gültig sein
- `src/api/functions.js` prüft Session vor Function Call

---

## Production Checklist

- ✅ Edge Function `create-portal-session` deployed
- ✅ Frontend Integration in Layout.jsx
- ✅ Frontend Integration in Pricing.jsx
- ✅ Error Handling implementiert
- ✅ Stripe Portal aktiviert
- ✅ Portal Login Link: https://billing.stripe.com/p/login/cNi6oH51D7ZXeOK4pd4gg00
- ⏳ Test mit echtem User durchführen
- ⏳ Branding im Portal anpassen (optional)
- ⏳ Custom Domain einrichten (optional, später)

---

## Nächste Schritte

1. **Teste den kompletten Flow:**
   - Als Free User upgraden
   - Als Premium User Portal öffnen
   - Zahlungsmethode ändern testen
   - Rechnung herunterladen testen

2. **Prüfe Webhook Events:**
   - `customer.subscription.deleted` - Bei Kündigung
   - `customer.subscription.updated` - Bei Plan-Wechsel
   - `invoice.payment_succeeded` - Bei erfolgreicher Zahlung

3. **Optional: Branding anpassen:**
   - Logo hochladen
   - Farben anpassen
   - Custom Domain einrichten

---

**Status:** ✅ PRODUCTION READY
**Deployed:** 2025-12-05 14:32 UTC
**Frontend:** https://mimicheck.vercel.app
**Portal:** https://billing.stripe.com/p/login/cNi6oH51D7ZXeOK4pd4gg00
