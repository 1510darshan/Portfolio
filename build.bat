@echo off
REM Portfolio Production Build Script for Windows

echo Starting production build process...

REM Check if .env files exist
echo Checking environment files...
if not exist ".env" (
    echo Error: .env file not found in root directory
    echo Please copy .env.example to .env and configure it
    exit /b 1
)

if not exist "backend\.env" (
    echo Error: .env file not found in backend directory
    echo Please copy backend\.env.example to backend\.env and configure it
    exit /b 1
)

REM Install root dependencies
echo Installing root dependencies...
call npm install

REM Install backend dependencies
echo Installing backend dependencies...
cd backend
call npm install
cd ..

REM Build frontend
echo Building frontend...
call npm run build

REM Check if build was successful
if exist "build" (
    echo Frontend build successful
) else (
    echo Frontend build failed
    exit /b 1
)

echo.
echo Production build completed successfully!
echo.
echo Next steps:
echo 1. Deploy backend to Vercel or Render
echo 2. Deploy frontend to Vercel or Render
echo 3. Update environment variables on hosting platform
echo 4. Test deployed application
echo.
pause
