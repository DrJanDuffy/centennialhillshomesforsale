import type { AppProps } from 'next/app';
import Navigation from '../components/nav';
import '../styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navigation />
      <Component {...pageProps} />
    </>
  );
} 