# 🔧 MCP-Server Setup für Stripe & Supabase

## Was sind MCP-Server?

MCP (Model Context Protocol) Server ermöglichen es mir, direkt mit deinen Stripe- und Supabase-Accounts zu interagieren. Damit kann ich:

- **Stripe:** Produkte, Preise, Subscriptions, Webhooks konfigurieren
- **Supabase:** Datenbank-Schemas, RLS-Policies, Edge Functions deployen

## ✅ Schritt 1: API-Keys besorgen

### Stripe API Key

1. Gehe zu https://dashboard.stripe.com/apikeys
2. Kopiere deinen **Secret Key**:
   - Test Mode: `sk_test_...`
   - Live Mode: `sk_live_...`

### Supabase Keys

1. Gehe zu https://supabase.com/dashboard/project/yjjauvmjyhlxcoumwqlj/settings/api
2. Kopiere:
   - **Project URL:** `https://yjjauvmjyhlxcoumwqlj.supabase.co`
   - **Service Role Key:** Der lange Key unter "service_role" (beginnt mit `eyJ...`)

## ✅ Schritt 2: Keys in MCP-Config eintragen

Öffne die Datei `.kiro/settings/mcp.json` und füge die Keys ein:

```json
{
  "mcpServers": {
    "stripe": {
      "command": "uvx",
      "args": ["mcp-server-stripe"],
      "env": {
        "STRIPE_API_KEY": "sk_test_DEIN_KEY_HIER"
      },
      "disabled": false,
      "autoApprove": []
    },
    "supabase": {
      "command": "uvx",
      "args": ["mcp-server-supabase"],
      "env": {
        "SUPABASE_URL": "https://yjjauvmjyhlxcoumwqlj.supabase.co",
        "SUPABASE_SERVICE_ROLE_KEY": "eyJ_DEIN_SERVICE_ROLE_KEY_HIER"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

## ✅ Schritt 3: MCP-Server neu laden

Nach dem Speichern der Config:
1. Öffne die Command Palette (Cmd+Shift+P)
2. Suche nach "MCP: Reconnect All Servers"
3. Oder starte Kiro neu

## ✅ Schritt 4: Testen

Sage mir einfach: "Teste die MCP-Verbindungen" und ich prüfe, ob alles funktioniert!

## 🔒 Sicherheit

- Die Keys werden nur lokal in `.kiro/settings/mcp.json` gespeichert
- Diese Datei sollte in `.gitignore` sein
- Niemals die Keys committen!

## 📚 Was ich dann für dich tun kann

### Mit Stripe MCP:
- Produkte und Preise erstellen
- Subscription-Pläne konfigurieren
- Webhooks einrichten
- Test-Zahlungen durchführen

### Mit Supabase MCP:
- Datenbank-Tabellen erstellen/ändern
- RLS-Policies konfigurieren
- Edge Functions deployen
- Storage Buckets einrichten
- Auth-Konfiguration anpassen

---

**Bereit?** Füge die Keys in `.kiro/settings/mcp.json` ein und sag mir Bescheid!
