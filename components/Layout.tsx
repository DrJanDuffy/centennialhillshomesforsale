import type { ReactNode } from 'react';
import EnhancedFooter from './EnhancedFooter';
import EnhancedNavigation from './EnhancedNavigation';
import RealScoutScript from './RealScoutScript';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <RealScoutScript />
      <EnhancedNavigation />
      <main className="flex-grow pt-20">{children}</main>
      <EnhancedFooter />
    </div>
  );
}
