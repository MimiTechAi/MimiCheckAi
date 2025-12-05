#!/bin/bash

# MiMiCheck Supabase Secrets Setup
# Dieses Script setzt alle Secrets in Supabase
# SECURITY: Keine echten Keys in diesem Script! Verwende Umgebungsvariablen.

set -e

echo "🔐 Supabase Secrets Setup"
echo "================================"
echo ""

# Farben
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# SECURITY: Keys müssen als Umgebungsvariablen übergeben werden
if [ -z "$STRIPE_SECRET_KEY" ]; then
    echo -e "${RED}❌ STRIPE_SECRET_KEY nicht gesetzt!${NC}"
    echo "Setze die Variable: export STRIPE_SECRET_KEY=sk_live_..."
    exit 1
fi

if [ -z "$STRIPE_WEBHOOK_SECRET" ]; then
    echo -e "${RED}❌ STRIPE_WEBHOOK_SECRET nicht gesetzt!${NC}"
    echo "Setze die Variable: export STRIPE_WEBHOOK_SECRET=whsec_..."
    exit 1
fi

# Price IDs (diese sind nicht geheim, können hardcoded sein)
STRIPE_PREMIUM_PRICE_ID="price_1SacLbGX9ckbY2L6ejmsITKD"
STRIPE_PRO_PRICE_ID="price_1SacN7GX9ckbY2L68BctYrGk"

echo -e "${BLUE}Setting Stripe Secrets...${NC}"
echo ""

# Set secrets using npx supabase
echo "STRIPE_SECRET_KEY..."
npx supabase secrets set STRIPE_SECRET_KEY="$STRIPE_SECRET_KEY" --project-ref yjjauvmjyhlxcoumwqlj

echo "STRIPE_PREMIUM_PRICE_ID..."
npx supabase secrets set STRIPE_PREMIUM_PRICE_ID="$STRIPE_PREMIUM_PRICE_ID" --project-ref yjjauvmjyhlxcoumwqlj

echo "STRIPE_PRO_PRICE_ID..."
npx supabase secrets set STRIPE_PRO_PRICE_ID="$STRIPE_PRO_PRICE_ID" --project-ref yjjauvmjyhlxcoumwqlj

echo "STRIPE_WEBHOOK_SECRET..."
npx supabase secrets set STRIPE_WEBHOOK_SECRET="$STRIPE_WEBHOOK_SECRET" --project-ref yjjauvmjyhlxcoumwqlj

echo ""
echo -e "${GREEN}✅ Alle Secrets gesetzt!${NC}"
echo ""

echo "Überprüfe Secrets:"
npx supabase secrets list --project-ref yjjauvmjyhlxcoumwqlj

echo ""
echo -e "${YELLOW}⚠️  Verwendung:${NC}"
echo "export STRIPE_SECRET_KEY=sk_live_..."
echo "export STRIPE_WEBHOOK_SECRET=whsec_..."
echo "./setup-supabase-secrets.sh"
