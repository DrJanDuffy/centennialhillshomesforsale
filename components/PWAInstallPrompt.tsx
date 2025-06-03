
import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowInstallButton(false);
    }
    
    setDeferredPrompt(null);
  };

  if (!showInstallButton) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-4 rounded-lg shadow-lg max-w-sm">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <h3 className="font-semibold text-sm">Install App</h3>
          <p className="text-xs opacity-90">Get quick access to Centennial Hills homes</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowInstallButton(false)}
            className="text-xs px-2 py-1 rounded opacity-75 hover:opacity-100"
          >
            Later
          </button>
          <button
            onClick={handleInstallClick}
            className="text-xs px-3 py-1 bg-white text-blue-600 rounded font-medium hover:bg-gray-100"
          >
            Install
          </button>
        </div>
      </div>
    </div>
  );
}
