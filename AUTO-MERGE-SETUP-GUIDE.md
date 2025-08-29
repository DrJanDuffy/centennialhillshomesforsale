# Auto-Merge Setup Guide for Centennial Hills Homes

This guide will help you set up and configure auto-merge for your Next.js real estate website repository.

## 🚀 What is Auto-Merge?

Auto-merge automatically merges pull requests when all requirements are met:
- ✅ All required status checks pass
- ✅ Required reviews are completed
- ✅ No merge conflicts
- ✅ Branch is up to date

## 📋 Prerequisites

Before enabling auto-merge, ensure you have:

1. **Repository Access**: Write permissions to the repository
2. **Branch Protection**: Rules configured for main/develop branches
3. **Required Status Checks**: CI/CD workflows that report status
4. **Review Requirements**: At least one approving review required

## 🔧 Setup Steps

### Step 1: Enable Auto-Merge in Repository Settings

1. Go to your repository on GitHub
2. Click **Settings** → **General**
3. Scroll down to **Pull Requests** section
4. Check **Allow auto-merge**
5. Select **Squash and merge** as default merge method
6. Check **Automatically delete head branches**

### Step 2: Configure Branch Protection Rules

#### Main Branch Protection
1. Go to **Settings** → **Branches**
2. Click **Add rule** for `main` branch
3. Configure the following:
   - ✅ **Require a pull request before merging**
   - ✅ **Require approvals**: Set to 1
   - ✅ **Dismiss stale reviews when new commits are pushed**
   - ✅ **Require review from code owners** (if applicable)
   - ✅ **Require status checks to pass before merging**
   - ✅ **Require branches to be up to date before merging**
   - ✅ **Require conversation resolution before merging**

#### Required Status Checks
Add these status checks:
- `Code Quality & Performance`
- `Vercel Deployment Pipeline`

#### Develop Branch Protection
Apply the same rules to the `develop` branch.

### Step 3: Verify GitHub Actions Workflows

Ensure these workflows are running and reporting status:
- ✅ `Code Quality & Performance`
- ✅ `Vercel Deployment Pipeline`
- ✅ `Auto-Merge Pull Requests`

## 🎯 How to Use Auto-Merge

### For Developers

1. **Create a Pull Request**:
   ```bash
   git checkout -b feature/new-feature
   # Make changes
   git push origin feature/new-feature
   # Create PR on GitHub
   ```

2. **Enable Auto-Merge**:
   - In your PR, click **Enable auto-merge**
   - Choose merge method (squash recommended)
   - Add commit message and description
   - Click **Confirm auto-merge**

3. **Auto-Merge Conditions**:
   - PR will merge automatically when:
     - All status checks pass ✅
     - At least 1 review approved ✅
     - No conflicts ✅
     - Branch up to date ✅

### For Maintainers

1. **Review PRs**: Provide timely reviews to enable auto-merge
2. **Monitor Status**: Check that all required checks are passing
3. **Resolve Issues**: Address any failing checks or conflicts

## 🔒 Security Considerations

### Branch Protection Rules
- **Never allow force pushes** to protected branches
- **Require pull request reviews** for all changes
- **Enforce status checks** before merging
- **Dismiss stale reviews** on new commits

### Auto-Merge Safety
- Auto-merge is disabled if new changes are pushed
- Maintainers can disable auto-merge at any time
- Failed auto-merge attempts are logged and reported

## 📊 Monitoring and Notifications

### Auto-Merge Status
- Check PR status in the merge box
- Monitor GitHub Actions for auto-merge workflow
- Review auto-merge logs for any issues

### Notifications
- Auto-merge success/failure comments on PRs
- GitHub Actions workflow notifications
- Email notifications for repository events

## 🚨 Troubleshooting

### Common Issues

1. **Auto-Merge Not Available**:
   - Check if branch protection is configured
   - Verify required status checks are set
   - Ensure PR meets all requirements

2. **Auto-Merge Disabled**:
   - New commits were pushed
   - Base branch was changed
   - Branch protection rules were modified

3. **Status Checks Failing**:
   - Review GitHub Actions logs
   - Fix linting/type errors
   - Resolve build failures

### Debugging Steps

1. Check PR status in the merge box
2. Review required status checks
3. Verify branch protection rules
4. Check GitHub Actions workflow runs
5. Review auto-merge workflow logs

## 📈 Best Practices

### Development Workflow
1. **Use feature branches** for all changes
2. **Keep PRs small** and focused
3. **Enable auto-merge** early in development
4. **Monitor status checks** regularly

### Code Quality
1. **Fix linting errors** before enabling auto-merge
2. **Ensure tests pass** locally
3. **Review code** before requesting reviews
4. **Resolve conflicts** promptly

### Team Collaboration
1. **Provide timely reviews** to enable auto-merge
2. **Communicate changes** in PR descriptions
3. **Use PR templates** for consistency
4. **Monitor auto-merge status** as a team

## 🔄 Workflow Integration

### With Your Current Setup
Your existing workflows are already configured to support auto-merge:

- **Code Quality & Performance**: Provides required status checks
- **Vercel Deployment Pipeline**: Ensures deployment readiness
- **Auto-Merge Pull Requests**: Handles automatic merging

### Deployment Flow
1. PR created → Preview deployment starts
2. Quality checks run → Status reported
3. Review completed → Auto-merge enabled
4. All checks pass → PR auto-merged
5. Production deployment triggered

## 📚 Additional Resources

- [GitHub Auto-Merge Documentation](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/automatically-merging-a-pull-request)
- [Branch Protection Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/managing-a-branch-protection-rule)
- [Required Status Checks](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/troubleshooting-required-status-checks)

## 🎉 Success Metrics

Track these metrics to measure auto-merge effectiveness:

- **Auto-merge success rate**: % of PRs that auto-merge successfully
- **Time to merge**: Average time from PR creation to merge
- **Manual intervention**: % of PRs requiring manual merge
- **Failed auto-merge**: % of auto-merge attempts that fail

---

**Need Help?** Check the GitHub Actions logs or contact your repository maintainers for assistance with auto-merge configuration.
