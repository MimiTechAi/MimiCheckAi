#!/bin/bash

# Setup Vercel Environment Variables für beide Apps

echo "🔧 Setting up Environment Variables für Core App (mimicheck)..."

# Core App Environment Variables
vercel env add VITE_SUPABASE_URL production --scope bemlerinhos-projects <<< "https://yjjauvmjyhlxcoumwqlj.supabase.co"
vercel env add VITE_SUPABASE_ANON_KEY production --scope bemlerinhos-projects <<< "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqamF1dm1qeWhseGNvdW13cWxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0Mzc4NzgsImV4cCI6MjA3ODAxMzg3OH0.A8e7YwJA6VJ0fTJJt8TBVRT4vktVxB1DFL8U5RLTzZg"
vercel env add VITE_STRIPE_PUBLISHABLE_KEY production --scope bemlerinhos-projects <<< "pk_live_51R9vjAGX9ckbY2L6BgFHxztQnku0spKFYFl51hbp1cjdup24H5VQFuEz7CXNM1OIcGQKcSrEDn3Twqjdc9Q94LTH00UT07A3YN"
vercel env add VITE_APP_URL production --scope bemlerinhos-projects <<< "https://app.mimicheck.ai"
vercel env add VITE_LANDING_URL production --scope bemlerinhos-projects <<< "https://mimicheck.ai"

echo "✅ Core App Environment Variables gesetzt!"
echo ""
echo "🔧 Setting up Environment Variables für Landing Page (mimicheck-landing)..."

# Wechsle zu Landing Page Verzeichnis
cd mimicheck-landing

vercel env add VITE_SUPABASE_URL production --scope bemlerinhos-projects <<< "https://yjjauvmjyhlxcoumwqlj.supabase.co"
vercel env add VITE_SUPABASE_ANON_KEY production --scope bemlerinhos-projects <<< "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqamF1dm1qeWhseGNvdW13cWxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0Mzc4NzgsImV4cCI6MjA3ODAxMzg3OH0.A8e7YwJA6VJ0fTJJt8TBVRT4vktVxB1DFL8U5RLTzZg"
vercel env add VITE_STRIPE_PUBLISHABLE_KEY production --scope bemlerinhos-projects <<< "pk_live_51R9vjAGX9ckbY2L6BgFHxztQnku0spKFYFl51hbp1cjdup24H5VQFuEz7CXNM1OIcGQKcSrEDn3Twqjdc9Q94LTH00UT07A3YN"
vercel env add VITE_APP_URL production --scope bemlerinhos-projects <<< "https://app.mimicheck.ai"
vercel env add VITE_LANDING_URL production --scope bemlerinhos-projects <<< "https://mimicheck.ai"

cd ..

echo "✅ Landing Page Environment Variables gesetzt!"
echo ""
echo "🎉 Alle Environment Variables sind gesetzt!"
echo ""
echo "📋 Nächste Schritte:"
echo "1. Deployment Protection in Vercel entfernen"
echo "2. DNS bei STRATO konfigurieren"
echo "3. Apps neu deployen"
