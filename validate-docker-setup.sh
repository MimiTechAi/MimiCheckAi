#!/bin/bash
echo "========================================="
echo "Docker Dev Environment Validation"
echo "========================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed"
    exit 1
fi
echo "✅ Docker installed: $(docker --version)"

# Check if Docker Compose is installed
if ! command -v docker compose &> /dev/null; then
    echo "❌ Docker Compose is not installed"
    exit 1
fi
echo "✅ Docker Compose installed: $(docker compose version)"

# Check if docker-compose.dev.yml exists
if [ ! -f docker-compose.dev.yml ]; then
    echo "❌ docker-compose.dev.yml not found"
    exit 1
fi
echo "✅ docker-compose.dev.yml exists"

# Validate docker-compose.dev.yml
if ! docker compose -f docker-compose.dev.yml config --quiet; then
    echo "❌ docker-compose.dev.yml is invalid"
    exit 1
fi
echo "✅ docker-compose.dev.yml is valid"

# Check if Dockerfiles exist
if [ ! -f docker/Dockerfile.core ]; then
    echo "❌ docker/Dockerfile.core not found"
    exit 1
fi
echo "✅ docker/Dockerfile.core exists"

if [ ! -f mimicheck-landing/Dockerfile.dev ]; then
    echo "❌ mimicheck-landing/Dockerfile.dev not found"
    exit 1
fi
echo "✅ mimicheck-landing/Dockerfile.dev exists"

# Check if .dockerignore exists
if [ ! -f .dockerignore ]; then
    echo "❌ .dockerignore not found"
    exit 1
fi
echo "✅ .dockerignore exists"

# Check services
echo ""
echo "Available services:"
docker compose -f docker-compose.dev.yml config --services | while read service; do
    echo "  • $service"
done

echo ""
echo "========================================="
echo "✅ All validation checks passed!"
echo "========================================="
echo ""
echo "To start services:"
echo "  docker compose -f docker-compose.dev.yml up core-app"
echo "  docker compose -f docker-compose.dev.yml up landing-app"
echo ""
