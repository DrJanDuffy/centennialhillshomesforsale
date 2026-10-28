import type { AppProps } from 'next/app';
import { ThemeProvider } from '../contexts/ThemeContext';
import '../styles/globals.css';

import Script from "next/script";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <>
        {/* Follow Up Boss pixel (Widget Tracker) */}
        <Script id="fub-widget-tracker" strategy="afterInteractive">{`
(function(w,i,d,g,e,t){w["WidgetTrackerObject"]=g;(w[g]=w[g]||function()
{(w[g].q=w[g].q||[]).push(arguments);}),(w[g].ds=1*new Date());(e="script"),
(t=d.createElement(e)),(e=d.getElementsByTagName(e)[0]);t.async=1;t.src=i;
e.parentNode.insertBefore(t,e);})
(window,"https://widgetbe.com/agent",document,"widgetTracker");
window.widgetTracker("create", "WT-XQHVYQWW");
window.widgetTracker("send", "pageview");
        `}</Script>
        <Component {...pageProps} />
      </>
    </ThemeProvider>
  );
}
