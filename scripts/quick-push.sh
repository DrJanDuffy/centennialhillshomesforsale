
#!/bin/bash

# Quick Git Push Script
echo "🚀 Quick Git Push Starting..."

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Not in a git repository!"
    exit 1
fi

# Get commit message from user or use default
if [ "$1" != "" ]; then
    COMMIT_MSG="$1"
else
    COMMIT_MSG="Quick update - $(date '+%Y-%m-%d %H:%M:%S')"
fi

echo "📝 Commit message: $COMMIT_MSG"

# Add all changes
echo "📂 Adding all changes..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "📝 No changes to commit."
    exit 0
fi

# Commit changes
echo "💾 Committing changes..."
git commit -m "$COMMIT_MSG"

# Push to remote
echo "🌐 Pushing to remote..."
git push origin main

echo "✅ Quick push completed successfully!"
