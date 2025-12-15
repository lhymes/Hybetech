# PWA & App-Like Experience Guide

**Purpose**: Create installable, app-like web experiences
**Updated**: December 2025
**Sources**: MDN, web.dev, Chrome Developers

---

## Overview

Progressive Web Apps (PWAs) provide native app-like experiences on the web:
- Installable to home screen
- Offline functionality
- Push notifications
- Fullscreen mode (no browser chrome)
- App-like navigation

---

## iOS Safari Considerations

### Current Support (iOS 16.4+)

| Feature | iOS Support | Notes |
|---------|-------------|-------|
| Home Screen Install | ✅ Yes | Via Share → Add to Home Screen |
| Standalone Mode | ✅ Yes | display: standalone |
| Push Notifications | ✅ Yes | Requires user permission |
| Service Workers | ✅ Yes | Full support |
| Background Sync | ❌ No | Not supported |
| Install Prompt | ❌ No | Manual only |

### Required Configuration

```html
<!-- index.html / layout head -->
<head>
  <!-- Standard PWA -->
  <link rel="manifest" href="/manifest.json" />
  <meta name="theme-color" content="#000000" />

  <!-- iOS Specific (Required!) -->
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="App Name" />

  <!-- iOS Icons -->
  <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon-180.png" />

  <!-- iOS Splash Screens (for smooth launch) -->
  <link rel="apple-touch-startup-image" href="/splash/apple-splash-2048-2732.jpg"
    media="(device-width: 1024px) and (device-height: 1366px)" />
  <!-- Add more sizes for different devices -->

  <!-- Fullscreen with notch support -->
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
</head>
```

### Status Bar Styles

```html
<!-- default: Gray bar, black text -->
<meta name="apple-mobile-web-app-status-bar-style" content="default" />

<!-- black: Black bar, white text -->
<meta name="apple-mobile-web-app-status-bar-style" content="black" />

<!-- black-translucent: Transparent, content extends under -->
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
```

For `black-translucent`, handle safe areas:

```css
/* Safe area padding for notched devices */
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
```

---

## Web App Manifest

### Complete manifest.json

```json
{
  "name": "My Awesome App",
  "short_name": "MyApp",
  "description": "An amazing progressive web application",
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
  ],
  "screenshots": [
    {
      "src": "/screenshots/desktop.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide"
    },
    {
      "src": "/screenshots/mobile.png",
      "sizes": "750x1334",
      "type": "image/png",
      "form_factor": "narrow"
    }
  ],
  "categories": ["productivity", "utilities"],
  "shortcuts": [
    {
      "name": "New Item",
      "short_name": "New",
      "description": "Create a new item",
      "url": "/new",
      "icons": [{ "src": "/icons/new.png", "sizes": "96x96" }]
    }
  ]
}
```

### Display Modes

| Mode | Browser Chrome | Suitable For |
|------|----------------|--------------|
| `fullscreen` | None | Games, immersive experiences |
| `standalone` | None (recommended) | Most apps |
| `minimal-ui` | Back/Refresh buttons | Content apps |
| `browser` | Full browser | Fallback |

---

## Next.js PWA Setup (Serwist)

### Installation

```bash
npm i @serwist/next && npm i -D serwist
```

### Configuration

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

### Service Worker

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

### TypeScript Config

```json
// tsconfig.json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext", "webworker"],
    "types": ["@serwist/next/typings"]
  }
}
```

---

## Astro PWA Setup

### Installation

```bash
npm i @vite-pwa/astro -D
```

### Configuration

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import AstroPWA from '@vite-pwa/astro';

export default defineConfig({
  integrations: [
    AstroPWA({
      mode: 'production',
      base: '/',
      scope: '/',
      includeAssets: ['favicon.svg'],
      registerType: 'autoUpdate',
      manifest: {
        name: 'My Astro App',
        short_name: 'AstroApp',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        navigateFallback: '/404',
        globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}'],
      },
      devOptions: {
        enabled: true,
        navigateFallbackAllowlist: [/^\//],
      },
      experimental: {
        directoryAndTrailingSlashHandler: true,
      },
    }),
  ],
});
```

---

## Offline Support

### Caching Strategies

```typescript
// Runtime caching configuration
const runtimeCaching = [
  // Cache page navigations
  {
    urlPattern: /^https:\/\/.*\/$/,
    handler: 'NetworkFirst',
    options: {
      cacheName: 'pages',
      expiration: {
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      },
    },
  },
  // Cache images
  {
    urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
    handler: 'CacheFirst',
    options: {
      cacheName: 'images',
      expiration: {
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      },
    },
  },
  // Cache API calls
  {
    urlPattern: /^https:\/\/api\./,
    handler: 'NetworkFirst',
    options: {
      cacheName: 'api',
      expiration: {
        maxEntries: 50,
        maxAgeSeconds: 5 * 60, // 5 minutes
      },
    },
  },
];
```

### Offline Page

```typescript
// app/offline/page.tsx
export default function OfflinePage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">You're Offline</h1>
        <p className="text-gray-600 mb-6">
          Please check your internet connection and try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-white rounded"
        >
          Retry
        </button>
      </div>
    </main>
  );
}
```

---

## Detecting PWA Context

### Standalone Mode Detection

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

// Usage
function App() {
  const isStandalone = useStandalone();

  return (
    <>
      {!isStandalone && <InstallBanner />}
      <main>{/* App content */}</main>
    </>
  );
}
```

### Install Prompt (Android)

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

### iOS Install Instructions

```tsx
// components/IOSInstallInstructions.tsx
import { useState, useEffect } from 'react';

export function IOSInstallInstructions() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const standalone = (window.navigator as any).standalone === true;
    setIsIOS(iOS);
    setIsStandalone(standalone);
  }, []);

  if (!isIOS || isStandalone) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 bg-gray-900 text-white p-4">
      <p className="text-center">
        Install this app: tap{' '}
        <span className="inline-block">
          <ShareIcon className="w-5 h-5" />
        </span>{' '}
        then "Add to Home Screen"
      </p>
    </div>
  );
}
```

---

## App-Like Navigation

### Prevent Scroll Bounce (iOS)

```css
/* Prevent rubber-band scrolling */
html, body {
  overscroll-behavior: none;
}

/* Alternative: lock body, scroll content */
body {
  position: fixed;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.scroll-container {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  height: 100%;
}
```

### Bottom Navigation

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

### Pull-to-Refresh

```css
/* Custom pull-to-refresh */
html {
  overscroll-behavior-y: contain;
}
```

```typescript
// Custom implementation if needed
let startY = 0;

window.addEventListener('touchstart', (e) => {
  startY = e.touches[0].pageY;
});

window.addEventListener('touchmove', (e) => {
  const y = e.touches[0].pageY;
  if (window.scrollY === 0 && y > startY + 50) {
    // Trigger refresh
    window.location.reload();
  }
});
```

---

## Performance Checklist

### Core Requirements

- [ ] manifest.json with all required fields
- [ ] Service worker registered
- [ ] HTTPS enabled
- [ ] All iOS meta tags included
- [ ] Icons for all sizes (192, 512, apple-touch)
- [ ] Splash screens for iOS

### App-Like Feel

- [ ] `display: standalone` in manifest
- [ ] `apple-mobile-web-app-capable` meta tag
- [ ] Safe area padding implemented
- [ ] Offline page configured
- [ ] Install prompt/instructions shown
- [ ] Bottom navigation (if applicable)
- [ ] No rubber-band scrolling on iOS

### Testing

- [ ] Test Add to Home Screen on iOS Safari
- [ ] Test Add to Home Screen on Android Chrome
- [ ] Test offline functionality
- [ ] Test all navigation stays in-app
- [ ] Verify no browser chrome visible
- [ ] Test on devices with notches

---

**Remember**: iOS PWA support has limitations. Always provide clear install instructions since there's no automatic prompt.
