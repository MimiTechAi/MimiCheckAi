#!/bin/bash

# Configuration
FUNCTION_URL="http://127.0.0.1:54321/functions/v1/create-stripe-checkout"
# Note: In a real scenario, we would need a valid JWT. For now, we simulate what we have.
# If you have a valid JWT, set it here or pass it as an argument.
JWT_TOKEN="${1:-INVALID_TOKEN}"

echo "Testing create-stripe-checkout with token: ${JWT_TOKEN:0:10}..."

curl -i -X POST "${FUNCTION_URL}" \
  -H "Authorization: Bearer ${JWT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "planId": "premium",
    "successUrl": "http://localhost:5173/success",
    "cancelUrl": "http://localhost:5173/cancel"
  }'

echo -e "\n\nDone."
