#!/bin/bash

# MiMiCheck Vercel Deployment Script
# Dieses Script deployed beide Apps auf Vercel

set -e

echo "🚀 MiMiCheck Vercel Deployment"
echo "================================"
echo ""

# Farben für Output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Environment Variables
SUPABASE_URL="https://yjjauvmjyhlxcoumwqlj.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqamF1dm1qeWhseGNvdW13cWxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0Mzc4NzgsImV4cCI6MjA3ODAxMzg3OH0.A8e7YwJA6VJ0fTJJt8TBVRT4vktVxB1DFL8U5RLTzZg"
STRIPE_PUBLISHABLE_KEY="pk_live_51R9vjAGX9ckbY2L6BgFHxztQnku0spKFYFl51hbp1cjdup24H5VQFuEz7CXNM1OIcGQKcSrEDn3Twqjdc9Q94LTH00UT07A3YN"

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}❌ Vercel CLI nicht gefunden!${NC}"
    echo "Installiere mit: npm install -g vercel"
    exit 1
fi

echo -e "${BLUE}📦 Deployment 1: Landing Page${NC}"
echo "================================"
echo ""

# Deploy Landing Page
cd mimicheck-landing

echo "Setting environment variables..."
vercel env add VITE_SUPABASE_URL production <<< "$SUPABASE_URL" || true
vercel env add VITE_SUPABASE_ANON_KEY production <<< "$SUPABASE_ANON_KEY" || true
vercel env add VITE_STRIPE_PUBLISHABLE_KEY production <<< "$STRIPE_PUBLISHABLE_KEY" || true
vercel env add VITE_APP_URL production <<< "https://app.mimicheck.de" || true
vercel env add VITE_LANDING_URL production <<< "https://mimicheck.de" || true

echo ""
echo "Deploying Landing Page..."
vercel --prod

cd ..

echo ""
echo -e "${GREEN}✅ Landing Page deployed!${NC}"
echo ""

echo -e "${BLUE}📦 Deployment 2: Core App${NC}"
echo "================================"
echo ""

# Deploy Core App
echo "Setting environment variables..."
vercel env add VITE_SUPABASE_URL production <<< "$SUPABASE_URL" || true
vercel env add VITE_SUPABASE_ANON_KEY production <<< "$SUPABASE_ANON_KEY" || true
vercel env add VITE_STRIPE_PUBLISHABLE_KEY production <<< "$STRIPE_PUBLISHABLE_KEY" || true
vercel env add VITE_APP_URL production <<< "https://app.mimicheck.de" || true
vercel env add VITE_LANDING_URL production <<< "https://mimicheck.de" || true

echo ""
echo "Deploying Core App..."
vercel --prod

echo ""
echo -e "${GREEN}✅ Core App deployed!${NC}"
echo ""

echo "================================"
echo -e "${GREEN}🎉 Deployment abgeschlossen!${NC}"
echo "================================"
echo ""
echo "Nächste Schritte:"
echo "1. Domains konfigurieren in Vercel Dashboard"
echo "2. Supabase Auth URLs aktualisieren"
echo "3. Supabase Secrets setzen (siehe STRIPE-WEBHOOK-SECRET.txt)"
echo "4. Stripe Customer Portal aktivieren"
echo ""
echo "Vercel Dashboard: https://vercel.com/dashboard"
