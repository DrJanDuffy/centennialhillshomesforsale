# Auto-Merge Quick Reference 🚀

## 🎯 Quick Start

### Enable Auto-Merge on a PR
1. **Create/Open PR** → Look for "Enable auto-merge" button
2. **Click Enable** → Choose merge method (squash recommended)
3. **Add Message** → Commit message and description
4. **Confirm** → Auto-merge is now active

### Auto-Merge Requirements ✅
- [ ] All status checks pass
- [ ] At least 1 review approved
- [ ] No merge conflicts
- [ ] Branch up to date with base

## 🔧 Status Check Names

**Required for Main/Develop:**
- `Code Quality & Performance`
- `Vercel Deployment Pipeline`

**Required for Feature Branches:**
- `Code Quality & Performance`

## 📋 Branch Protection Rules

| Branch | Reviews | Status Checks | Auto-Merge |
|--------|---------|---------------|------------|
| `main` | 1+ | All Required | ✅ Enabled |
| `develop` | 1+ | All Required | ✅ Enabled |
| `feature/*` | 1+ | Quality Only | ✅ Enabled |

## 🚨 Common Issues

### Auto-Merge Not Available?
- Check branch protection rules
- Verify required status checks
- Ensure PR meets all requirements

### Auto-Merge Disabled?
- New commits pushed
- Base branch changed
- Protection rules modified

### Status Checks Failing?
- Fix linting errors
- Resolve build issues
- Check GitHub Actions logs

## 💡 Pro Tips

1. **Enable Early**: Turn on auto-merge as soon as PR is ready
2. **Monitor Status**: Watch for failing checks in real-time
3. **Quick Fixes**: Push fixes to auto-merge enabled PRs
4. **Team Sync**: Coordinate reviews to enable auto-merge faster

## 🔄 Workflow

```
PR Created → Quality Checks → Review → Auto-Merge Enabled → All Checks Pass → Auto-Merged → Production Deploy
```

## 📞 Need Help?

- **GitHub Actions**: Check workflow logs
- **Status Checks**: Review failing checks
- **Branch Protection**: Verify repository settings
- **Documentation**: See `AUTO-MERGE-SETUP-GUIDE.md`

---

**Remember**: Auto-merge only works when all requirements are met. Keep your PRs clean and up-to-date! 🎉
