# GitHub Auto-Sync Setup Guide

## ✅ What's Been Configured

Your Git repository has been initialized and configured with:
- **Remote Repository**: `https://github.com/PV2705/SofiyaPortfolio.git`
- **Branch**: `main`
- **User**: PV2705 (pradeeppradeepg143@gmail.com)
- **Authentication**: Personal Access Token (embedded in remote URL)

## 🚀 First-Time Setup (REQUIRED)

Before the auto-sync can work, you need to:

### 1. Create the GitHub Repository
1. Go to https://github.com/new
2. Repository name: `SofiyaPortfolio`
3. Owner: `PV2705`
4. Choose Public or Private
5. **DO NOT** check "Initialize with README"
6. Click "Create repository"

### 2. Push Initial Code
After creating the repository, run:
```powershell
.\sync-to-github.ps1
```

This will push all your code to GitHub for the first time.

## 🔄 Auto-Sync Options

### Option 1: Manual Sync (On-Demand)
Run this whenever you want to push changes:
```powershell
.\sync-to-github.ps1
```

### Option 2: Automatic Sync (Continuous)
Run this to start the auto-sync watcher:
```powershell
.\auto-sync-watcher.ps1
```

This will:
- Check for changes every 30 seconds
- Automatically commit and push when changes are detected
- Run in the background until you stop it (Ctrl+C)

### Option 3: Git Hook (Pre-Commit Auto-Sync)
For automatic sync on every save, you can use a file watcher extension in VS Code/Qoder.

## 📝 How It Works

1. **Detect Changes**: Scripts check `git status` for modified files
2. **Stage Files**: `git add .` stages all changes
3. **Commit**: Creates commit with timestamp
4. **Push**: Pushes to `origin main` automatically

## 🔧 Customization

### Change Sync Interval
Edit `auto-sync-watcher.ps1` and modify:
```powershell
$syncInterval = 30 # Change to desired seconds
```

### Exclude Files from Sync
Edit `.gitignore` to exclude files/folders:
```
# Add files you don't want to sync
*.log
temp/
```

## ⚠️ Important Notes

- **Personal Access Token**: Your PAT is embedded in the remote URL. Keep it secure!
- **Rate Limits**: GitHub has API rate limits. Avoid syncing too frequently (< 30s recommended)
- **Conflicts**: If you edit files on GitHub directly, you may get merge conflicts
- **Large Files**: Git has a 100MB file limit. Use Git LFS for larger assets

## 🛠️ Troubleshooting

### Push Fails with "Repository not found"
- Make sure you created the repository on GitHub
- Verify the repository name matches: `PV2705/SofiyaPortfolio`

### Authentication Errors
- Your PAT might be expired. Generate a new one at: https://github.com/settings/tokens
- Update remote with new token:
  ```powershell
  git remote set-url origin https://YOUR_NEW_TOKEN@github.com/PV2705/SofiyaPortfolio.git
  ```

### "Nothing to commit" Messages
- This is normal - it means no files have changed
- The watcher will only push when actual changes are detected

## 📊 Monitoring

Check sync status anytime:
```powershell
git status
git log --oneline -5  # Show last 5 commits
git remote -v         # Verify remote configuration
```

## 🎯 Recommended Workflow

1. Start the auto-sync watcher in a terminal:
   ```powershell
   .\auto-sync-watcher.ps1
   ```
2. Keep it running while you develop
3. Make changes to your portfolio in Qoder
4. Changes will automatically sync to GitHub every 30 seconds
5. Stop the watcher when done (Ctrl+C)

---

**Need Help?** Check the commit history on GitHub to verify syncs are working:
https://github.com/PV2705/SofiyaPortfolio/commits/main
