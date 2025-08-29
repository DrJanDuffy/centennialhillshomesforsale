# Git Hooks & Automated Quality Assurance

This document explains the Git hooks setup for the Centennial Hills Homes real estate website, which ensures code quality is maintained automatically.

## 🪝 **Overview**

We use **Lefthook** as our Git hooks manager, which provides:
- Fast, cross-platform hook execution
- Parallel execution for better performance
- Automatic staging of fixed files
- Comprehensive error handling

## 🚀 **Quick Start**

### Install Hooks
```bash
npm run hooks:install
```

### Run Hooks Manually
```bash
# Run all hooks
npm run hooks:run

# Run specific hooks
npm run hooks:run-pre-commit
npm run hooks:run-pre-push
```

### Setup Complete Workflow
```bash
npm run git:setup
```

## 📋 **Hook Types**

### 1. **Pre-commit Hooks**
Run automatically before each commit:

- **Biome Check**: Formats, lints, and applies safe fixes
- **TypeScript Check**: Ensures type safety
- **ESLint Check**: Legacy compatibility (if any remaining)

**Files**: `*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx,json,jsonc}`

### 2. **Pre-push Hooks**
Run automatically before pushing to remote:

- **Biome Full Check**: Comprehensive code quality analysis
- **Build Verification**: Ensures the app builds successfully
- **Performance Analysis**: Bundle and image optimization checks

### 3. **Commit-msg Hooks**
Run after commit message is written:

- **Conventional Commits**: Ensures proper commit message format

### 4. **Post-commit Hooks**
Run after commit is completed:

- **Commit Summary**: Provides feedback on successful commits

### 5. **Post-merge Hooks**
Run after merge operations:

- **Dependencies Update**: Installs new dependencies
- **Quality Check**: Runs full optimization suite

### 6. **Post-checkout Hooks**
Run after switching branches:

- **Dependencies Install**: Ensures branch has correct dependencies
- **Biome Check**: Applies fixes to changed files

## 🔧 **Configuration**

### Lefthook Configuration (`lefthook.yml`)

```yaml
pre-commit:
  parallel: true  # Run hooks in parallel for speed
  commands:
    biome-check:
      glob: "*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx,json,jsonc}"
      run: npx @biomejs/biome check --write --no-errors-on-unmatched --files-ignore-unknown=true --colors=off {staged_files}
      stage_fixed: true  # Automatically stage fixed files
```

### Key Features

- **`parallel: true`**: Hooks run simultaneously for better performance
- **`glob`**: File pattern matching for specific file types
- **`stage_fixed: true`**: Automatically stages files that were fixed by hooks
- **`{staged_files}`**: Lefthook variable for files staged for commit

## 🎯 **Real Estate Specific Workflows**

### Performance Optimization Hook
```bash
npm run hooks:run performance-optimize
```

Runs:
- Bundle analysis
- Image optimization analysis
- Performance monitoring

### Security Audit Hook
```bash
npm run hooks:run security-audit
```

Runs:
- NPM security audit
- Biome security checks
- Vulnerability scanning

## 🚨 **Troubleshooting**

### Hook Fails During Commit

1. **Check Biome Errors**:
   ```bash
   npm run biome:check
   ```

2. **Fix Issues Manually**:
   ```bash
   npm run biome:fix
   ```

3. **Re-run Hooks**:
   ```bash
   npm run hooks:run-pre-commit
   ```

### Hook Not Running

1. **Verify Installation**:
   ```bash
   npm run hooks:install
   ```

2. **Check Git Configuration**:
   ```bash
   git config --list | grep hooks
   ```

3. **Manual Execution**:
   ```bash
   npm run hooks:run
   ```

### Performance Issues

1. **Disable Parallel Execution**:
   Edit `lefthook.yml` and set `parallel: false`

2. **Run Specific Hooks Only**:
   ```bash
   npm run hooks:run-pre-commit
   ```

## 📊 **Monitoring & Reports**

### Hook Execution Logs
Hooks provide detailed feedback on:
- Files processed
- Issues found and fixed
- Performance metrics
- Error details

### Quality Metrics
Track over time:
- Code formatting consistency
- Linting error counts
- Type safety issues
- Performance regressions

## 🔄 **Integration with CI/CD**

### GitHub Actions
Hooks complement our CI/CD pipeline:
- Local hooks catch issues before push
- CI runs comprehensive checks
- Automated deployment after quality gates

### Vercel Deployment
- Hooks ensure code quality before push
- Vercel automatically builds and deploys
- Performance monitoring in production

## 📚 **Best Practices**

### 1. **Always Run Hooks**
Never skip hooks - they're your safety net.

### 2. **Fix Issues Locally**
Use `npm run biome:fix` to resolve issues before committing.

### 3. **Regular Maintenance**
Run `npm run optimize:all` weekly to maintain code quality.

### 4. **Monitor Performance**
Use `npm run performance:monitor` to track performance metrics.

### 5. **Update Dependencies**
Let Renovate handle dependency updates automatically.

## 🆘 **Support**

### Common Commands
```bash
# Install/Update hooks
npm run hooks:install

# Run quality checks
npm run git:quality

# Full optimization
npm run optimize:all

# Performance analysis
npm run performance:monitor
```

### Documentation
- [Lefthook Documentation](https://lefthook.dev/)
- [Biome Documentation](https://biomejs.dev/)
- [Git Hooks Guide](https://git-scm.com/docs/githooks)

### Issues
If you encounter problems:
1. Check the troubleshooting section above
2. Run `npm run hooks:run` for detailed error messages
3. Review the Lefthook configuration in `lefthook.yml`
4. Check Biome configuration in `biome.json`

---

**Remember**: These hooks are your automated code quality team. They work 24/7 to ensure your real estate website maintains the highest standards of code quality and performance! 🏠✨
