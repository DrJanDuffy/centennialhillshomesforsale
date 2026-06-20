import Script from 'next/script';

import { REALSCOUT_SCRIPT_URL } from '@/lib/realscout-config';

/** Load RealScout web components once per page load (portfolio pattern). */
export default function RealScoutScript() {
  return (
    <Script
      id="realscout-web-components"
      src={REALSCOUT_SCRIPT_URL}
      strategy="afterInteractive"
      type="module"
    />
  );
}
