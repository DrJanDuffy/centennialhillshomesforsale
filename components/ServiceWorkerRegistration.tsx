import { useEffect, useState } from 'react';

interface ServiceWorkerRegistrationProps {
  onUpdate?: () => void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export default function ServiceWorkerRegistration({
  onUpdate,
  onSuccess,
  onError,
}: ServiceWorkerRegistrationProps) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    // Check online/offline status
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    setIsOffline(!navigator.onLine);

    // Register service worker
    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        });

        setIsRegistered(true);
        onSuccess?.();

        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setIsUpdateAvailable(true);
                onUpdate?.();
              }
            });
          }
        });

        // Handle service worker updates
        let refreshing = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          if (!refreshing) {
            refreshing = true;
            window.location.reload();
          }
        });

        // Handle service worker messages
        navigator.serviceWorker.addEventListener('message', (event) => {
          if (event.data && event.data.type === 'SKIP_WAITING') {
            registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
          }
        });
      } catch (error) {
        console.error('Service Worker registration failed:', error);
        onError?.(error as Error);
      }
    };

    registerServiceWorker();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [onUpdate, onSuccess, onError]);

  // Handle service worker update
  const handleUpdate = async () => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
    }
  };

  // Handle service worker unregister
  const handleUnregister = async () => {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        await registration.unregister();
        setIsRegistered(false);
        window.location.reload();
      }
    }
  };

  // Don't render anything if service worker is not supported
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return null;
  }

  return (
    <div className="service-worker-status">
      {/* Offline indicator */}
      {isOffline && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-white text-center py-2 z-50">
          <span className="text-sm font-medium">
            📡 You are currently offline. Some features may be limited.
          </span>
        </div>
      )}

      {/* Service Worker status */}
      {isRegistered && (
        <div className="fixed bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 z-50">
          <div className="flex items-center gap-2 text-sm">
            <div
              className={`w-2 h-2 rounded-full ${isOffline ? 'bg-yellow-500' : 'bg-green-500'}`}
            />
            <span className="text-gray-700">{isOffline ? 'Offline Mode' : 'PWA Ready'}</span>
          </div>

          {isUpdateAvailable && (
            <button
              onClick={handleUpdate}
              className="mt-2 w-full bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700 transition-colors"
            >
              🔄 Update Available
            </button>
          )}

          <button
            onClick={handleUnregister}
            className="mt-1 w-full bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded hover:bg-gray-300 transition-colors"
          >
            🗑️ Unregister
          </button>
        </div>
      )}

      {/* Installation prompt for PWA */}
      {isRegistered && !isOffline && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 z-50 max-w-xs">
          <div className="text-sm text-gray-700 mb-2">
            <strong>Install App</strong>
            <p className="text-xs text-gray-500 mt-1">
              Add this app to your home screen for quick access
            </p>
          </div>
          <button
            onClick={() => {
              // Trigger PWA install prompt
              const event = new Event('beforeinstallprompt');
              window.dispatchEvent(event);
            }}
            className="w-full bg-blue-600 text-white text-xs px-3 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            📱 Install
          </button>
        </div>
      )}
    </div>
  );
}

// Hook for using service worker status
export function useServiceWorker() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    setIsOffline(!navigator.onLine);

    // Check if service worker is already registered
    navigator.serviceWorker.getRegistration().then((registration) => {
      if (registration) {
        setIsRegistered(true);

        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setIsUpdateAvailable(true);
              }
            });
          }
        });
      }
    });

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return {
    isRegistered,
    isUpdateAvailable,
    isOffline,
  };
}
