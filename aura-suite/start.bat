@echo off
cd /d "%~dp0"
set PORT=8080
where py >nul 2>nul && (start "Aura server - close this window to stop" cmd /k py -m http.server %PORT% & goto open)
where python >nul 2>nul && (start "Aura server - close this window to stop" cmd /k python -m http.server %PORT% & goto open)
where npx >nul 2>nul && (start "Aura server - close this window to stop" cmd /k npx --yes serve -l %PORT% . & timeout /t 5 >nul & goto open)
echo No Python or Node.js found. Opening without a server (install and offline mode disabled).
start "" "%~dp0index.html"
exit /b
:open
timeout /t 2 >nul
start "" http://localhost:%PORT%
