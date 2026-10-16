import type { ReactNode } from 'react';
import EnhancedFooter from './EnhancedFooter';
import EnhancedNavigation from './EnhancedNavigation';
import RealScoutScript from './RealScoutScript';
import FacebookPixelScript from './FacebookPixelScript';
import GoogleTagScript from './GoogleTagScript';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <RealScoutScript />
      <FacebookPixelScript />
      <GoogleTagScript />
      <EnhancedNavigation />
      <main className="flex-grow pt-20">{children}</main>
      <EnhancedFooter />
    </div>
  );
}
