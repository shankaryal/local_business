#!/usr/bin/env pwsh

# UK Business Directory - PowerShell Setup Script

Write-Host ""
Write-Host "======================================"
Write-Host "UK Business Directory - Quick Setup"
Write-Host "======================================" -ForegroundColor Green
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ ERROR: Node.js is not installed. Please install Node.js 16+ from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Install server dependencies
Write-Host "Installing server dependencies..." -ForegroundColor Yellow
Push-Location server
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ ERROR: Failed to install server dependencies" -ForegroundColor Red
    Pop-Location
    exit 1
}
Write-Host "✓ Server dependencies installed" -ForegroundColor Green
Pop-Location

Write-Host ""

# Install client dependencies
Write-Host "Installing client dependencies..." -ForegroundColor Yellow
Push-Location client
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ ERROR: Failed to install client dependencies" -ForegroundColor Red
    Pop-Location
    exit 1
}
Write-Host "✓ Client dependencies installed" -ForegroundColor Green
Pop-Location

Write-Host ""
Write-Host "======================================"
Write-Host "IMPORTANT: MongoDB Setup" -ForegroundColor Yellow
Write-Host "======================================" -ForegroundColor Yellow
Write-Host ""
Write-Host "The application requires MongoDB running on localhost:27017"
Write-Host ""
Write-Host "Options:"
Write-Host "  1. Local MongoDB: Install from https://www.mongodb.com/try/download/community"
Write-Host "  2. MongoDB Atlas: https://www.mongodb.com/cloud/atlas"
Write-Host "  3. Docker: docker run -p 27017:27017 -d mongo"
Write-Host ""

# Ask to seed database
$seed = Read-Host "Do you want to seed the database with sample data? (y/n)"
if ($seed -eq 'y' -or $seed -eq 'Y') {
    Write-Host ""
    Write-Host "Seeding database..." -ForegroundColor Yellow
    Push-Location server
    npm run seed
    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠ WARNING: Database seeding failed. Make sure MongoDB is running." -ForegroundColor Yellow
    }
    Pop-Location
    Write-Host ""
}

Write-Host ""
Write-Host "======================================"
Write-Host "✓ Setup Complete!" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green
Write-Host ""
Write-Host "To start the application:"
Write-Host ""
Write-Host "Terminal 1 - Start Server:" -ForegroundColor Cyan
Write-Host "  cd server"
Write-Host "  npm run dev"
Write-Host ""
Write-Host "Terminal 2 - Start Client:" -ForegroundColor Cyan
Write-Host "  cd client"
Write-Host "  npm run dev"
Write-Host ""
Write-Host "Then open: " -NoNewline
Write-Host "http://localhost:5173" -ForegroundColor Blue
Write-Host ""
Write-Host "For more details, see README.md" -ForegroundColor Cyan
Write-Host ""

Read-Host "Press Enter to exit"
