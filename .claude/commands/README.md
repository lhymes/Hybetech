# WebLord Slash Commands

Custom slash commands for WebLord web development workflow.

## Command Categories

### Workflows (`/workflows:*`)

Complete development phases with multi-step processes.

| Command | Purpose |
|---------|---------|
| `/workflows:discover` | Research competitors, trends, gather requirements |
| `/workflows:design` | Generate design system (colors, typography, spacing) |
| `/workflows:architect` | Select optimal framework based on requirements |
| `/workflows:build` | Generate complete website structure |
| `/workflows:page <name>` | Add a new page |
| `/workflows:component <name>` | Create a reusable component |
| `/workflows:seo` | Comprehensive SEO audit and optimization |
| `/workflows:security` | Security audit (OWASP Top 10 2025) |
| `/workflows:performance` | Core Web Vitals optimization |
| `/workflows:deploy` | Set up CI/CD and deploy |
| `/workflows:cms` | Set up headless CMS (Sanity, Contentful, Strapi) |
| `/workflows:pwa` | Configure PWA for app-like experience |
| `/workflows:animations` | Implement modern animations (Motion, GSAP, Lottie) |
| `/workflows:images` | Source and manage stock photos |
| `/workflows:game` | Set up web game framework (Phaser, PixiJS, Three.js) |
| `/workflows:modernize` | Analyze and modernize existing website |

### Tools (`/tools:*`)

Targeted tasks for specific purposes.

| Command | Purpose |
|---------|---------|
| `/tools:research <url>` | Analyze a competitor website |
| `/tools:lighthouse` | Run Lighthouse audit |
| `/tools:scan` | Run security scans |
| `/tools:validate` | Validate HTML, CSS, accessibility |
| `/tools:sitemap` | Generate XML sitemap |
| `/tools:schema` | Generate JSON-LD structured data |

### Quick (`/quick:*`)

Micro-tasks for rapid updates.

| Command | Purpose |
|---------|---------|
| `/quick:meta` | Add/update meta tags |
| `/quick:image` | Optimize images |
| `/quick:header` | Configure security headers |

## Typical Project Flow

### Standard Website
```
1. /workflows:discover    → Research and requirements
2. /workflows:design      → Design system generation
3. /workflows:architect   → Framework selection
4. /workflows:build       → Website generation
5. /workflows:page about  → Add additional pages
6. /workflows:seo         → SEO optimization
7. /workflows:security    → Security audit
8. /workflows:performance → Performance optimization
9. /workflows:deploy      → CI/CD and deployment
```

### Content-Managed Website
```
1-4. Standard flow above
5. /workflows:cms         → Set up Sanity/Contentful/Strapi
6. /workflows:images      → Configure image sourcing
7-9. Standard flow above
```

### App-Like PWA
```
1-4. Standard flow above
5. /workflows:pwa         → Configure PWA and iOS Safari
6. /workflows:animations  → Add engaging animations
7-9. Standard flow above
```

### Web Game
```
1. /workflows:discover    → Research game requirements
2. /workflows:design      → Design system for UI
3. /workflows:game        → Set up Phaser/PixiJS/Three.js
4. /workflows:security    → Security audit
5. /workflows:deploy      → Deploy game
```

### Existing Site Modernization
```
1. /workflows:modernize   → Analyze existing site, create migration plan
2. /workflows:discover    → Research with existing site context
3. /workflows:design      → Preserve brand, update design
4. /workflows:architect   → Plan for content migration
5. /workflows:build       → Build with migration hooks
6. /workflows:security    → Security audit
7. /workflows:deploy      → Deploy with redirects
```

## Usage

Simply type the command in Claude Code CLI:

```
> /workflows:discover
```

Or reference in conversation:

```
"Run /workflows:security to audit the site"
```

## Creating Custom Commands

Add `.md` files to the appropriate directory:
- `workflows/` - Multi-step processes
- `tools/` - Single-purpose utilities
- `quick/` - Rapid micro-tasks

Command file format:
```markdown
# Command Name

Brief description.

## Usage
`/command:name [args]`

## Steps
1. Step one
2. Step two

## Output
What the command produces.
```
