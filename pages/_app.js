import { Analytics } from '@vercel/analytics/react';
import Navigation from '../components/nav';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navigation />
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp; 