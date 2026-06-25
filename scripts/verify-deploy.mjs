#!/usr/bin/env node
/**
 * Post-deploy verification loop — polls production until HTTP 2xx/3xx or timeout.
 * Used in CI after `vercel deploy --prebuilt --prod`.
 */
const url = process.env.PRODUCTION_URL || 'https://www.centennialhillshomesforsale.com';
const maxAttempts = Number(process.env.VERIFY_MAX_ATTEMPTS || 12);
const delayMs = Number(process.env.VERIFY_DELAY_MS || 10_000);

async function check() {
  const res = await fetch(url, {
    redirect: 'follow',
    headers: { 'User-Agent': 'centennial-hills-deploy-verify/1.0' },
  });
  return res.status;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log(`Verifying ${url} (up to ${maxAttempts} attempts, ${delayMs}ms apart)`);

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const status = await check();
      console.log(`  attempt ${attempt}/${maxAttempts}: HTTP ${status}`);
      if (status >= 200 && status < 400) {
        console.log(`✓ Production URL healthy: ${url}`);
        process.exit(0);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.log(`  attempt ${attempt}/${maxAttempts}: ${message}`);
    }

    if (attempt < maxAttempts) {
      await sleep(delayMs);
    }
  }

  console.error(`✗ ${url} did not return 2xx/3xx after ${maxAttempts} attempts`);
  process.exit(1);
}

main();
