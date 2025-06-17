import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import ErrorBoundaryWrapper from '../components/ErrorBoundaryWrapper';
import GlobalErrorHandler from '../utils/globalErrorHandler';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize global error handling
    const globalErrorHandler = GlobalErrorHandler.getInstance();
    globalErrorHandler.initialize();
  }, []);

  return (
    <ErrorBoundaryWrapper>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ErrorBoundaryWrapper>
  );
}