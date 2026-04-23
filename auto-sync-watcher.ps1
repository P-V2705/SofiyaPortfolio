# Auto-sync file watcher for GitHub
# This script watches for file changes and automatically commits/pushes to GitHub

$watchPath = "c:\Users\prade\OneDrive\Desktop\portfolio sofiya"
$excludePatterns = @('node_modules', '.git', 'dist', 'dist-ssr')
$lastSyncTime = Get-Date
$syncInterval = 30 # Sync every 30 seconds if changes detected

Write-Host "🔍 Starting auto-sync watcher..." -ForegroundColor Cyan
Write-Host "📁 Watching: $watchPath" -ForegroundColor Cyan
Write-Host "⏱️  Sync interval: ${syncInterval}s" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

function Sync-Changes {
    $changes = git status --porcelain
    if ($changes) {
        Write-Host "📝 Changes detected at $(Get-Date -Format 'HH:mm:ss')" -ForegroundColor Yellow
        
        git add .
        
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        git commit -m "Auto-sync: $timestamp"
        
        Write-Host "⬆️ Pushing to GitHub..." -ForegroundColor Yellow
        git push origin main 2>&1 | Out-Null
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Synced successfully!" -ForegroundColor Green
        } else {
            Write-Host "⚠️ Push failed (will retry next sync)" -ForegroundColor Red
        }
        Write-Host ""
    }
}

# Initial sync
Sync-Changes

# Watch loop
while ($true) {
    Start-Sleep -Seconds $syncInterval
    Sync-Changes
}
