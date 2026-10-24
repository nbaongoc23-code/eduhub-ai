/**
 * Service Worker registration and browser Cache Storage optimization
 */
import { registerSW } from 'virtual:pwa-register';

export function setupServiceWorker() {
  if ('serviceWorker' in navigator) {
    const updateSW = registerSW({
      onNeedRefresh() {
        // Automatically activate new service worker versions seamlessly
        updateSW(true);
      },
      onOfflineReady() {
        console.log('[EduPortal] App cached and ready to run offline or with instant loading.');
      },
      immediate: true,
    });
  }

  // Pre-cache core shell resources into browser Cache Storage
  if (typeof window !== 'undefined' && 'caches' in window) {
    const CORE_CACHE_NAME = 'portal-shell-v1';
    window.addEventListener('load', () => {
      // Use requestIdleCallback if available to avoid blocking initial interactivity
      const runWarmup = async () => {
        try {
          const cache = await caches.open(CORE_CACHE_NAME);
          const urlsToCache = [
            '/',
            '/index.html',
            '/icon.svg',
            '/pwa-192x192.png',
            '/apple-touch-icon.png',
          ];
          await cache.addAll(urlsToCache).catch(() => {});
        } catch (e) {
          // Ignore cache errors in private mode
        }
      };

      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(runWarmup);
      } else {
        setTimeout(runWarmup, 1000);
      }
    });
  }
}
