@echo off
REM UK Business Directory - Windows Quick Start Script

echo.
echo ======================================
echo UK Business Directory - Quick Setup
echo ======================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed. Please install Node.js 16+ from https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js found: 
node --version
echo.

REM Install server dependencies
echo Installing server dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install server dependencies
    pause
    exit /b 1
)
echo ✓ Server dependencies installed
cd ..
echo.

REM Install client dependencies
echo Installing client dependencies...
cd client
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install client dependencies
    pause
    exit /b 1
)
echo ✓ Client dependencies installed
cd ..
echo.

REM Check MongoDB
echo.
echo ======================================
echo IMPORTANT: MongoDB Setup
echo ======================================
echo.
echo The application requires MongoDB running on localhost:27017
echo.
echo Options:
echo   1. Local MongoDB: Install from https://www.mongodb.com/try/download/community
echo   2. MongoDB Atlas: https://www.mongodb.com/cloud/atlas
echo   3. Docker: docker run -p 27017:27017 -d mongo
echo.

REM Ask to seed database
setlocal enabledelayedexpansion
set /p seed="Do you want to seed the database with sample data? (y/n): "
if /i "!seed!"=="y" (
    echo.
    echo Seeding database...
    cd server
    call npm run seed
    if !errorlevel! neq 0 (
        echo WARNING: Database seeding failed. Make sure MongoDB is running.
    )
    cd ..
    echo.
)

echo.
echo ======================================
echo ✓ Setup Complete!
echo ======================================
echo.
echo To start the application:
echo.
echo Terminal 1 - Start Server:
echo   cd server
echo   npm run dev
echo.
echo Terminal 2 - Start Client:
echo   cd client
echo   npm run dev
echo.
echo Then open: http://localhost:5173
echo.
echo For more details, see README.md
echo.
pause
