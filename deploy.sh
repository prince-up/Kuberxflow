# Production Deployment Script for KubeFlowX
#!/bin/bash

# KubeFlowX Production Deployment Script
# This script handles the complete production deployment process

set -e  # Exit on any error

echo "🚀 Starting KubeFlowX Production Deployment"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."

    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 16+"
        exit 1
    fi

    # Check npm
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm 7+"
        exit 1
    fi

    # Check Docker
    if ! command -v docker &> /dev/null; then
        print_warning "Docker is not installed. Docker deployment will be skipped."
    fi

    print_success "Prerequisites check completed"
}

# Frontend build process
build_frontend() {
    print_status "Building frontend for production..."

    cd frontend

    # Install dependencies
    print_status "Installing dependencies..."
    npm ci

    # Run tests
    print_status "Running tests..."
    npm run test -- --watchAll=false --passWithNoTests

    # Build for production
    print_status "Creating production build..."
    npm run build

    # Check build size
    BUILD_SIZE=$(du -sh build | cut -f1)
    print_success "Frontend build completed. Size: $BUILD_SIZE"

    cd ..
}

# Backend build process
build_backend() {
    print_status "Building backend..."

    cd backend

    # Install Python dependencies
    if command -v pip &> /dev/null; then
        print_status "Installing Python dependencies..."
        pip install -r requirements.txt
        print_success "Backend dependencies installed"
    else
        print_warning "pip not found. Skipping Python dependencies installation."
    fi

    cd ..
}

# Docker build process
build_docker() {
    if command -v docker &> /dev/null; then
        print_status "Building Docker images..."

        # Build frontend Docker image
        print_status "Building frontend Docker image..."
        docker build -t kuberxflow-frontend:latest -f Dockerfile.frontend .

        # Build backend Docker image
        print_status "Building backend Docker image..."
        docker build -t kuberxflow-backend:latest -f Dockerfile.backend .

        print_success "Docker images built successfully"
    else
        print_warning "Docker not available. Skipping Docker build."
    fi
}

# Performance testing
performance_test() {
    print_status "Running performance tests..."

    cd frontend

    # Install lighthouse if not available
    if ! command -v lighthouse &> /dev/null; then
        print_status "Installing Lighthouse for performance testing..."
        npm install -g lighthouse
    fi

    # Start local server for testing
    print_status "Starting local server for testing..."
    npm run serve &
    SERVER_PID=$!

    # Wait for server to start
    sleep 5

    # Run Lighthouse audit
    print_status "Running Lighthouse performance audit..."
    lighthouse http://localhost:3000 --output=json --output-path=./lighthouse-report.json --quiet || true

    # Kill server
    kill $SERVER_PID 2>/dev/null || true

    print_success "Performance testing completed"

    cd ..
}

# Deployment options
deploy_options() {
    print_status "Available deployment options:"
    echo "1. Vercel (Recommended for frontend)"
    echo "2. Netlify"
    echo "3. AWS S3 + CloudFront"
    echo "4. Docker + Kubernetes"
    echo "5. Local production server"
    echo ""
    read -p "Choose deployment option (1-5): " choice

    case $choice in
        1)
            deploy_vercel
            ;;
        2)
            deploy_netlify
            ;;
        3)
            deploy_aws
            ;;
        4)
            deploy_kubernetes
            ;;
        5)
            deploy_local
            ;;
        *)
            print_error "Invalid choice. Exiting."
            exit 1
            ;;
    esac
}

# Vercel deployment
deploy_vercel() {
    print_status "Deploying to Vercel..."

    if ! command -v vercel &> /dev/null; then
        print_status "Installing Vercel CLI..."
        npm install -g vercel
    fi

    cd frontend
    vercel --prod
    print_success "Deployed to Vercel"
    cd ..
}

# Netlify deployment
deploy_netlify() {
    print_status "Deploying to Netlify..."

    if ! command -v netlify &> /dev/null; then
        print_status "Installing Netlify CLI..."
        npm install -g netlify-cli
    fi

    cd frontend
    netlify deploy --prod --dir=build
    print_success "Deployed to Netlify"
    cd ..
}

# AWS deployment
deploy_aws() {
    print_status "Deploying to AWS S3 + CloudFront..."

    if ! command -v aws &> /dev/null; then
        print_error "AWS CLI is not installed. Please install AWS CLI first."
        exit 1
    fi

    read -p "Enter S3 bucket name: " bucket_name
    read -p "Enter CloudFront distribution ID: " distribution_id

    cd frontend
    aws s3 sync build/ s3://$bucket_name --delete
    aws cloudfront create-invalidation --distribution-id $distribution_id --paths "/*"
    print_success "Deployed to AWS S3 and invalidated CloudFront cache"
    cd ..
}

# Kubernetes deployment
deploy_kubernetes() {
    print_status "Deploying to Kubernetes..."

    if ! command -v kubectl &> /dev/null; then
        print_error "kubectl is not installed. Please install kubectl first."
        exit 1
    fi

    kubectl apply -f k8s/
    print_success "Deployed to Kubernetes"
}

# Local production server
deploy_local() {
    print_status "Setting up local production server..."

    cd frontend

    # Install serve globally if not available
    if ! command -v serve &> /dev/null; then
        print_status "Installing serve for production hosting..."
        npm install -g serve
    fi

    # Start production server
    print_success "Starting production server on http://localhost:3000"
    serve -s build -l 3000

    cd ..
}

# Main deployment process
main() {
    echo "=========================================="
    echo "🚀 KubeFlowX Production Deployment Script"
    echo "=========================================="

    check_prerequisites
    build_frontend
    build_backend
    build_docker
    performance_test

    echo ""
    print_success "Build process completed successfully!"
    echo ""
    print_status "Ready for deployment."
    echo ""

    deploy_options

    echo ""
    print_success "🎉 Deployment completed successfully!"
    print_status "Your KubeFlowX application is now live and production-ready!"
}

# Run main function
main "$@"