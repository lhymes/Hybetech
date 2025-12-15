# Web Development Anti-Patterns

**Purpose**: Patterns to avoid when building WebLord sites
**Updated**: December 2025

---

## Security Anti-Patterns

### Never Do These

```typescript
// ❌ SQL Injection vulnerability
const query = `SELECT * FROM users WHERE email = '${email}'`;

// ✅ Use parameterized queries
const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
```

```typescript
// ❌ XSS vulnerability
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ Let framework escape, or sanitize
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />
```

```typescript
// ❌ Hardcoded secrets
const apiKey = 'sk-1234567890abcdef';

// ✅ Use environment variables
const apiKey = process.env.API_KEY;
```

```typescript
// ❌ Missing authentication check
export async function GET(request: Request) {
  const data = await getSecretData();
  return Response.json(data);
}

// ✅ Always check authentication
export async function GET(request: Request) {
  const session = await getSession(request);
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }
  const data = await getSecretData();
  return Response.json(data);
}
```

---

## Performance Anti-Patterns

### Images

```typescript
// ❌ No dimensions (causes CLS)
<img src="/photo.jpg" alt="Photo" />

// ✅ Always set dimensions
<img src="/photo.jpg" alt="Photo" width={800} height={600} />
```

```typescript
// ❌ Unoptimized formats
<img src="/photo.png" /> // Large file size

// ✅ Modern formats
<img src="/photo.webp" /> // Much smaller
```

```typescript
// ❌ All images load immediately
<img src="/below-fold.jpg" />

// ✅ Lazy load below-fold images
<img src="/below-fold.jpg" loading="lazy" />
```

### JavaScript

```typescript
// ❌ Large bundle, everything loaded upfront
import HeavyComponent from './HeavyComponent';
import RarelyUsedModal from './RarelyUsedModal';

// ✅ Dynamic imports for non-critical components
const HeavyComponent = dynamic(() => import('./HeavyComponent'));
const Modal = dynamic(() => import('./Modal'), { ssr: false });
```

```typescript
// ❌ Render-blocking script
<script src="/analytics.js"></script>

// ✅ Defer non-critical scripts
<script src="/analytics.js" defer></script>
```

### CSS

```typescript
// ❌ Inline styles (no caching, larger HTML)
<div style={{ backgroundColor: 'blue', padding: '20px' }}>

// ✅ Use utility classes or CSS modules
<div className="bg-blue-500 p-5">
```

```typescript
// ❌ Unused CSS shipped to client
@import 'massive-library.css'; // Contains 90% unused styles

// ✅ Use Tailwind (purged) or CSS-in-JS (scoped)
```

---

## Accessibility Anti-Patterns

```typescript
// ❌ Click handler on non-interactive element
<div onClick={handleClick}>Click me</div>

// ✅ Use button or add proper attributes
<button onClick={handleClick}>Click me</button>
// OR
<div role="button" tabIndex={0} onClick={handleClick} onKeyDown={handleKeyDown}>
```

```typescript
// ❌ Missing alt text
<img src="/chart.png" />

// ✅ Descriptive alt text
<img src="/chart.png" alt="Sales chart showing 50% growth in Q4" />

// ✅ Empty alt for decorative images
<img src="/decoration.svg" alt="" role="presentation" />
```

```typescript
// ❌ Removing focus outline
*:focus {
  outline: none;
}

// ✅ Custom visible focus styles
*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

```typescript
// ❌ Using color alone to convey information
<span className="text-red-500">Error</span>

// ✅ Color + text + icon
<span className="text-red-500">
  <ErrorIcon /> Error: Please enter a valid email
</span>
```

```typescript
// ❌ Poor header/nav contrast (COMMON ISSUE!)
<header className="bg-gray-800">
  <nav className="text-gray-600">Home | About | Contact</nav>  // Invisible!
</header>

// ✅ Ensure text contrasts with background
<header className="bg-gray-800">
  <nav className="text-white">Home | About | Contact</nav>  // Readable
</header>

// ✅ Light header with bold dark colors (not just gray!)
<header className="bg-white">
  <nav className="text-indigo-900">...</nav>  // Bold and accessible
</header>

// ❌ Transparent header over dark hero without protection
<header className="bg-transparent absolute">
  <nav className="text-gray-800">...</nav>  // May be invisible on dark images
</header>

// ✅ Add backdrop or text shadow for transparent headers
<header className="bg-transparent absolute backdrop-blur-sm bg-white/10">
  <nav className="text-white drop-shadow-lg">...</nav>  // Always visible
</header>
```

---

## SEO Anti-Patterns

```html
<!-- ❌ Multiple H1 tags -->
<h1>Welcome</h1>
<h1>Our Services</h1>

<!-- ✅ Single H1, use H2 for sections -->
<h1>Welcome to Company Name</h1>
<h2>Our Services</h2>
```

```html
<!-- ❌ Missing meta description -->
<head>
  <title>Page Title</title>
</head>

<!-- ✅ Complete meta tags -->
<head>
  <title>Page Title | Brand</title>
  <meta name="description" content="Compelling description..." />
</head>
```

```html
<!-- ❌ Using placeholder text -->
<p>Lorem ipsum dolor sit amet...</p>

<!-- ✅ Real, valuable content -->
<p>Detailed information that helps users...</p>
```

---

## UX Anti-Patterns

```typescript
// ❌ Intrusive popup on page load
useEffect(() => {
  showNewsletterPopup();
}, []);

// ✅ Trigger based on user intent
useEffect(() => {
  const handleExitIntent = (e) => {
    if (e.clientY < 0 && !hasShownPopup) {
      showNewsletterPopup();
    }
  };
  document.addEventListener('mouseout', handleExitIntent);
}, []);
```

```typescript
// ❌ Infinite scroll without escape
<InfiniteScroll>
  {items.map(item => <Item key={item.id} />)}
</InfiniteScroll>

// ✅ Provide alternative navigation
<InfiniteScroll>
  {items.map(item => <Item key={item.id} />)}
</InfiniteScroll>
<Footer /> {/* Must be reachable */}
<Pagination /> {/* Alternative */}
```

```typescript
// ❌ Autoplay video with sound
<video autoPlay>

// ✅ Autoplay muted only
<video autoPlay muted playsInline>
```

---

## Code Quality Anti-Patterns

### TypeScript

```typescript
// ❌ Using 'any'
function process(data: any) {
  return data.something;
}

// ✅ Proper types
interface ProcessData {
  something: string;
}
function process(data: ProcessData) {
  return data.something;
}
```

```typescript
// ❌ Ignoring errors
try {
  await riskyOperation();
} catch (e) {
  // Silently swallowed
}

// ✅ Handle errors properly
try {
  await riskyOperation();
} catch (error) {
  console.error('Operation failed:', error);
  showErrorToUser('Something went wrong');
}
```

### File Organization

```typescript
// ❌ Massive file with everything
// components/Page.tsx - 800 lines

// ✅ Split into focused modules
// components/Page/index.tsx - 50 lines
// components/Page/Hero.tsx - 80 lines
// components/Page/Features.tsx - 100 lines
// components/Page/hooks.ts - 60 lines
```

### Component Design

```typescript
// ❌ Prop drilling through many levels
<Parent user={user}>
  <Child user={user}>
    <GrandChild user={user}>
      <DeepChild user={user} />

// ✅ Use context or composition
<UserProvider value={user}>
  <Parent>
    <Child>
      <GrandChild>
        <DeepChild /> {/* Uses useUser() */}
```

---

## Mobile Anti-Patterns

```css
/* ❌ Fixed widths */
.container {
  width: 1200px;
}

/* ✅ Responsive widths */
.container {
  width: 100%;
  max-width: 1200px;
}
```

```css
/* ❌ Small touch targets */
.button {
  padding: 4px 8px;
  font-size: 12px;
}

/* ✅ Touch-friendly targets */
.button {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 24px;
}
```

```css
/* ❌ Hover-only interactions */
.menu {
  display: none;
}
.parent:hover .menu {
  display: block;
}

/* ✅ Touch-friendly interactions */
.menu {
  display: none;
}
.parent:hover .menu,
.parent:focus-within .menu {
  display: block;
}
/* Plus add click/tap handler for mobile */
```

---

## Form Anti-Patterns

```html
<!-- ❌ Placeholder as label -->
<input placeholder="Email" />

<!-- ✅ Proper label -->
<label for="email">Email</label>
<input id="email" placeholder="john@example.com" />
```

```typescript
// ❌ Validation only on submit
<form onSubmit={validate}>

// ✅ Progressive validation
<input
  onBlur={validateField}
  onChange={validateOnChange}
/>
```

```html
<!-- ❌ Cryptic error messages -->
<span class="error">Invalid input</span>

<!-- ✅ Helpful error messages -->
<span class="error">Please enter a valid email address (e.g., john@example.com)</span>
```

---

## Summary

### The Golden Rules

1. **Security First** - Never trust user input
2. **Performance Matters** - Every millisecond counts
3. **Accessibility Always** - Build for everyone
4. **Mobile First** - Start small, scale up
5. **Type Safety** - No `any`, ever
6. **Error Handling** - Always catch and handle
7. **File Size Limits** - Max 600 lines per file

### When You Catch Yourself...

| If you think... | Stop and... |
|-----------------|-------------|
| "I'll add security later" | Add it now |
| "This works on desktop" | Test on mobile first |
| "The alt text isn't important" | It is, add it |
| "I'll optimize later" | Optimize now |
| "One 'any' won't hurt" | Define the type |
| "The error can be swallowed" | Handle it properly |
| "The header looks fine" | Check contrast ratio |

---

**Remember**: The best code is the code that doesn't need fixing later.
