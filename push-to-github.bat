@echo off
echo ========================================
echo   Pushing to GitHub...
echo ========================================
echo.

cd /d "%~dp0"

git add -A
git status
git push origin main --force

echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================
    echo   SUCCESS! Pushed to GitHub
    echo ========================================
) else (
    echo ========================================
    echo   FAILED! Check errors above
    echo ========================================
)
echo.
pause
