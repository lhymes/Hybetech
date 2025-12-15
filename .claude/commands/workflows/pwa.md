# PWA & App-Like Experience Workflow

Configure Progressive Web App features for installable, app-like web experiences.

---

## Context Files to Read First

Read these context files before proceeding:
- `.claude/context/pwa/app-like-experience.md` - Complete PWA configuration guide

---

## What This Enables

- Installable to home screen (iOS & Android)
- Fullscreen mode (no browser chrome)
- Offline functionality
- Push notifications (iOS 16.4+)
- App-like navigation patterns

---

## Implementation Steps

### Step 1: HTML Head Configuration

Add to your root layout/document:

```html
<head>
  <!-- Standard PWA -->
  <link rel="manifest" href="/manifest.json" />
  <meta name="theme-color" content="#000000" />

  <!-- iOS Specific (Required!) -->
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="Your App Name" />

  <!-- iOS Icons -->
  <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon-180.png" />

  <!-- Fullscreen with notch support -->
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
</head>
```

### Step 2: Web App Manifest

Create `public/manifest.json`:

```json
{
  "name": "Your App Name",
  "short_name": "AppName",
  "description": "Your app description",
  "start_url": "/?source=pwa",
  "scope": "/",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-maskable-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

### Step 3: Service Worker (Next.js with Serwist)

```bash
npm i @serwist/next && npm i -D serwist
```

```typescript
// next.config.mjs
import withSerwistInit from '@serwist/next';

const withSerwist = withSerwistInit({
  swSrc: 'app/sw.ts',
  swDest: 'public/sw.js',
});

export default withSerwist({
  // Your Next.js config
});
```

```typescript
// app/sw.ts
import { defaultCache } from '@serwist/next/worker';
import { Serwist } from 'serwist';

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
});

serwist.addEventListeners();
```

### Step 3 (Alternative): Service Worker (Astro with vite-pwa)

```bash
npm i @vite-pwa/astro -D
```

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import AstroPWA from '@vite-pwa/astro';

export default defineConfig({
  integrations: [
    AstroPWA({
      mode: 'production',
      registerType: 'autoUpdate',
      manifest: {
        name: 'Your App Name',
        short_name: 'AppName',
        theme_color: '#ffffff',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      workbox: {
        navigateFallback: '/404',
        globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}'],
      },
    }),
  ],
});
```

### Step 4: Safe Area Handling (iOS Notch)

```css
/* Handle notched devices */
.header {
  padding-top: env(safe-area-inset-top);
}

.footer {
  padding-bottom: env(safe-area-inset-bottom);
}

.main {
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}

/* Prevent rubber-band scrolling */
html, body {
  overscroll-behavior: none;
}
```

### Step 5: Standalone Mode Detection

```typescript
// hooks/useStandalone.ts
import { useEffect, useState } from 'react';

export function useStandalone() {
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // iOS Safari
    const isIOSStandalone = (window.navigator as any).standalone === true;
    // Android Chrome / Other browsers
    const isStandaloneMedia = window.matchMedia('(display-mode: standalone)').matches;

    setIsStandalone(isIOSStandalone || isStandaloneMedia);
  }, []);

  return isStandalone;
}
```

### Step 6: Install Prompt (Android)

```typescript
// hooks/useInstallPrompt.ts
import { useEffect, useState } from 'react';

export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const install = async () => {
    if (!deferredPrompt) return false;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    return outcome === 'accepted';
  };

  return { canInstall: !!deferredPrompt, install };
}
```

### Step 7: iOS Install Instructions Component

```tsx
// components/IOSInstallInstructions.tsx
import { useState, useEffect } from 'react';

export function IOSInstallInstructions() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const standalone = (window.navigator as any).standalone === true;
    setIsIOS(iOS);
    setIsStandalone(standalone);
  }, []);

  if (!isIOS || isStandalone || dismissed) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 bg-gray-900 text-white p-4 safe-area-bottom">
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-2 right-2"
      >
        ✕
      </button>
      <p className="text-center">
        Install this app: tap <span className="inline-block">⬆️</span> then "Add to Home Screen"
      </p>
    </div>
  );
}
```

---

## App-Like Navigation Patterns

### Bottom Navigation Bar

```tsx
// components/BottomNav.tsx
export function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 inset-x-0 bg-white border-t"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex justify-around py-2">
        <NavItem href="/" icon={<HomeIcon />} label="Home" />
        <NavItem href="/search" icon={<SearchIcon />} label="Search" />
        <NavItem href="/profile" icon={<UserIcon />} label="Profile" />
      </div>
    </nav>
  );
}
```

---

## Checklist

### Core Requirements
- [ ] manifest.json with all required fields
- [ ] Service worker registered
- [ ] HTTPS enabled
- [ ] All iOS meta tags included
- [ ] Icons: 192x192, 512x512, apple-touch-icon

### App-Like Feel
- [ ] `display: standalone` in manifest
- [ ] `apple-mobile-web-app-capable` meta tag
- [ ] Safe area padding implemented
- [ ] Offline page configured
- [ ] Install prompt/instructions shown
- [ ] No rubber-band scrolling on iOS

### Testing
- [ ] Test Add to Home Screen on iOS Safari
- [ ] Test Add to Home Screen on Android Chrome
- [ ] Test offline functionality
- [ ] Test all navigation stays in-app
- [ ] Verify no browser chrome visible
- [ ] Test on devices with notches

---

**After setup, test on real devices - simulators may not show PWA behavior accurately.**
