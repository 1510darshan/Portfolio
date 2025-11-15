#!/bin/bash

# Portfolio Production Build Script

echo "🚀 Starting production build process..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env files exist
echo -e "${BLUE}Checking environment files...${NC}"
if [ ! -f ".env" ]; then
    echo -e "${RED}Error: .env file not found in root directory${NC}"
    echo "Please copy .env.example to .env and configure it"
    exit 1
fi

if [ ! -f "backend/.env" ]; then
    echo -e "${RED}Error: .env file not found in backend directory${NC}"
    echo "Please copy backend/.env.example to backend/.env and configure it"
    exit 1
fi

# Install root dependencies
echo -e "${BLUE}Installing root dependencies...${NC}"
npm install

# Install backend dependencies
echo -e "${BLUE}Installing backend dependencies...${NC}"
cd backend
npm install
cd ..

# Run tests (if available)
echo -e "${BLUE}Running tests...${NC}"
npm test -- --passWithNoTests

# Build frontend
echo -e "${BLUE}Building frontend...${NC}"
npm run build

# Check if build was successful
if [ -d "build" ]; then
    echo -e "${GREEN}✅ Frontend build successful${NC}"
else
    echo -e "${RED}❌ Frontend build failed${NC}"
    exit 1
fi

# Test backend startup
echo -e "${BLUE}Testing backend startup...${NC}"
cd backend
timeout 10s npm start &
BACKEND_PID=$!
sleep 5

# Check if backend is running
if ps -p $BACKEND_PID > /dev/null; then
    echo -e "${GREEN}✅ Backend starts successfully${NC}"
    kill $BACKEND_PID
else
    echo -e "${RED}❌ Backend failed to start${NC}"
    exit 1
fi
cd ..

echo -e "${GREEN}🎉 Production build completed successfully!${NC}"
echo -e "${BLUE}Next steps:${NC}"
echo "1. Deploy backend to Vercel or Render"
echo "2. Deploy frontend to Vercel or Render"
echo "3. Update environment variables on hosting platform"
echo "4. Test deployed application"
