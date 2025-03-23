import { ReactNode } from 'react';
import Head from 'next/head';
import Navigation from '../nav';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({ children, title = 'Centennial Hills Homes For Sale', description = 'Find your dream home in Centennial Hills, Las Vegas' }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />
      {children}
    </>
  );
} 