# App-Like Experience Skill

**Type**: Behavioral Guardrail
**Priority**: Medium

## Purpose

Design web experiences that feel native and polished, especially on iOS Safari. Ensure sites are installable, work offline, and provide the seamless feel of native apps.

## Core Behaviors

### Always Do

1. **Configure PWA Essentials**
   - Create complete `manifest.json`
   - Add all iOS-specific meta tags
   - Include icons in all required sizes (192, 512, apple-touch)
   - Set `display: standalone` for fullscreen

2. **Optimize for iOS Safari**
   - Include `apple-mobile-web-app-capable`
   - Configure status bar style
   - Handle safe areas (notch padding)
   - Use `viewport-fit=cover`

3. **Handle Safe Areas**
   ```css
   .header { padding-top: env(safe-area-inset-top); }
   .footer { padding-bottom: env(safe-area-inset-bottom); }
   ```

4. **Detect and Adapt to Context**
   - Detect standalone mode
   - Show install prompts/instructions appropriately
   - Adjust UI for app context (hide browser-specific elements)

5. **Prevent Non-App Behaviors**
   - Disable rubber-band scrolling where inappropriate
   - Prevent text selection on UI elements
   - Handle pull-to-refresh appropriately

6. **Use App-Like Navigation Patterns**
   - Bottom navigation for primary actions
   - Slide transitions between views
   - Proper back navigation support

### Never Do

1. **Never Skip iOS Meta Tags**
   - iOS Safari ignores `manifest.json` for some features
   - Always include apple-specific meta tags

2. **Never Forget Safe Areas**
   - Content must not be hidden by notch
   - Interactive elements must be in safe zones
   - Test on actual notched devices

3. **Never Block Installation**
   - Don't hide install prompts without user action
   - Provide clear install instructions for iOS

4. **Never Break Navigation**
   - Ensure back button works correctly
   - Don't trap users in views
   - Keep URL structure meaningful

5. **Never Assume Browser Features**
   - Some features unavailable in standalone mode
   - Test in both browser and installed modes

## Quick Reference

### HTML Head Tags

```html
<head>
  <link rel="manifest" href="/manifest.json" />
  <meta name="theme-color" content="#000000" />

  <!-- iOS Required -->
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="App Name" />
  <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />

  <!-- Notch Support -->
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
</head>
```

### Standalone Detection

```typescript
function useStandalone() {
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const isIOS = (window.navigator as any).standalone === true;
    const isOther = window.matchMedia('(display-mode: standalone)').matches;
    setIsStandalone(isIOS || isOther);
  }, []);

  return isStandalone;
}
```

### Safe Area CSS

```css
/* Prevent rubber-band scrolling */
html, body {
  overscroll-behavior: none;
}

/* Safe area padding */
.app-container {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
```

### Bottom Navigation Pattern

```tsx
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
```

## Trigger Phrases

- "PWA", "progressive web app"
- "install", "installable", "add to home screen"
- "offline", "service worker"
- "iOS Safari", "iPhone", "iPad"
- "standalone", "fullscreen"
- "app-like", "native feel"
- "notch", "safe area"

## Reference

- `.claude/context/pwa/app-like-experience.md` - Complete PWA guide
