#
!/usr/bin / env
node

const { execSync } = require('node:child_process');
const _fs = require('node:fs');
const _path = require('node:path');

// Configuration
const AUTO_COMMIT_MESSAGE = 'Automated commit: Updated project files';
const BRANCH_NAME = 'main';

function runCommand(command, description) {
  try {
    console.log(`🔄 ${description}...`);
    const output = execSync(command, {
      encoding: 'utf8',
      stdio: 'pipe',
    });
    console.log(`✅ ${description} completed`);
    return output;
  } catch (error) {
    console.error(`❌ Error during ${description}:`, error.message);
    throw error;
  }
}

function autoGitPush() {
  try {
    console.log('🚀 Starting automated git push...');

    // Check if there are any changes
    const status = runCommand('git status --porcelain', 'Checking git status');

    if (!status.trim()) {
      console.log('📝 No changes detected. Nothing to commit.');
      return;
    }

    console.log('📋 Changes detected:');
    console.log(status);

    // Add all changes
    runCommand('git add .', 'Adding all changes');

    // Commit with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const commitMessage = `${AUTO_COMMIT_MESSAGE} - ${timestamp}`;
    runCommand(`git commit -m "${commitMessage}"`, 'Committing changes');

    // Push to remote
    runCommand(`git push origin ${BRANCH_NAME}`, 'Pushing to remote repository');

    console.log('🎉 Automated git push completed successfully!');
  } catch (error) {
    console.error('💥 Automated git push failed:', error.message);
    process.exit(1);
  }
}

// Run the automated push
autoGitPush();
