# Auto-commit and push all changes to GitHub
Write-Host "🔄 Syncing changes to GitHub..." -ForegroundColor Cyan

# Check if there are changes
$changes = git status --porcelain
if ($changes) {
    Write-Host "📝 Changes detected, committing..." -ForegroundColor Yellow
    
    # Add all changes
    git add .
    
    # Commit with timestamp
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    git commit -m "Auto-sync: $timestamp"
    
    # Push to GitHub
    Write-Host "⬆️ Pushing to GitHub..." -ForegroundColor Yellow
    git push origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Successfully synced to GitHub!" -ForegroundColor Green
    } else {
        Write-Host "❌ Push failed. Please check your connection." -ForegroundColor Red
    }
} else {
    Write-Host "✓ No changes to sync" -ForegroundColor Green
}
