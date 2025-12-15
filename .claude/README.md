# WebLord .wlclaude Directory

**Version:** 1.0.0
**For:** WebLord AI-First Web Development Methodology
**Purpose:** Slash commands, agents, skills, and hooks for building production-ready websites

> **Note**: This folder will be renamed to `.claude/` when copied to target web projects.

---

## Quick Start

> **CRITICAL: You must configure CLAUDE.md BEFORE running workflows.**

### Step 1: Copy to Your Project

```bash
# Copy .wlclaude/ to your web project as .claude/
cp -r /path/to/weblord/.wlclaude ./my-website/.claude

# Navigate to your project
cd my-website
```

### Step 2: Configure Your Project (Required)

Open `.claude/CLAUDE.md` and fill in your project details:

```yaml
# Project Overview section - FILL THIS IN
Project Name: Your Business Name
Project Type: Website
Industry: Your Industry
Target Audience: Who you're building for
Primary Goal: What success looks like

# Project-Specific Context section - FILL THIS IN
Style: Modern minimal
Pages Needed:
  - Home
  - About
  - Services
Competitors:
  - competitor1.com
  - competitor2.com
```

> **Why this matters**: The AI reads CLAUDE.md to understand your project. Without this info, it will ask questions instead of researching autonomously.

### Step 3: Start Building

```bash
# Start Claude Code (MUST be from project directory)
claude

# Run the discovery workflow
/workflows:discover
```

### Important: What Goes Where

| File | When to Edit | Who Uses It |
|------|--------------|-------------|
| `CLAUDE.md` | Before starting any workflow | Claude Code users |
| `prompts/*.md` | Only for copy-paste method | ChatGPT, Cursor, etc. |

**Claude Code users**: Edit `CLAUDE.md`, never the prompt files.
**Copy-paste users**: Edit the prompt files directly, replacing `[BRACKETS]`.

---

## The WebLord Development Cycle

```
┌─────────────────────────────────────────────────────────────────┐
│                    WEBLORD WORKFLOW                             │
│                                                                 │
│  Phase 1: DISCOVER ──→ Research competitors, trends, audience  │
│           ↓                                                     │
│  Phase 2: DESIGN ────→ Generate design system, tokens, palette │
│           ↓                                                     │
│  Phase 3: ARCHITECT ─→ Select framework, plan structure        │
│           ↓                                                     │
│  Phase 4: BUILD ─────→ Generate complete website                │
│           ↓                                                     │
│  Phase 5: VALIDATE ──→ Security scan, SEO audit, performance   │
│           ↓                                                     │
│  Phase 6: DEPLOY ────→ CI/CD setup, hosting, go live           │
│                                                                 │
│  ✓ Human approval checkpoint after each phase                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Directory Structure

```
.wlclaude/  (rename to .claude/ when copying to projects)
├── README.md              # This file
├── CLAUDE.md              # Project configuration (customize per project)
├── QUICKSTART.md          # 30-second orientation
├── settings.json          # Hook configuration
│
├── prompts/               # Master prompts (self-executing workflows)
│   ├── 01-site-discovery.md
│   ├── 02-design-system.md
│   ├── 03-architecture-selection.md
│   ├── 04-page-generation.md
│   └── README.md
│
├── context/               # AI knowledge base
│   ├── design/            # Design trends, tokens, typography
│   ├── frameworks/        # Next.js, Astro, SvelteKit patterns
│   ├── security/          # OWASP 2025, headers, auth
│   ├── seo/               # Technical SEO, structured data
│   ├── performance/       # Core Web Vitals, optimization
│   ├── cms/               # Headless CMS (Sanity, Contentful, Strapi)
│   ├── animations/        # Animation libraries (Motion, GSAP, Lottie)
│   ├── pwa/               # PWA and app-like experiences
│   ├── images/            # Stock photo sourcing and APIs
│   ├── games/             # Web game development (Phaser, PixiJS, Three.js)
│   ├── industry/          # Industry-specific patterns
│   └── guardrails/        # Anti-patterns, quality checks
│
├── commands/              # Slash commands
│   ├── workflows/         # Complete development workflows
│   ├── tools/             # Targeted utilities
│   └── quick/             # Micro-task commands
│
├── agents/                # Specialized AI agents
├── skills/                # Behavioral guardrails
├── hooks/                 # Automated quality checks
└── templates/             # Starter templates
```

---

## Command Reference

### Workflow Commands

| Command | Purpose |
|---------|---------|
| `/workflows:discover` | Research competitors, trends, gather requirements |
| `/workflows:design` | Generate design system and tokens |
| `/workflows:architect` | Select framework, plan structure |
| `/workflows:build` | Generate complete website |
| `/workflows:page <name>` | Add a new page |
| `/workflows:component <name>` | Add a new component |
| `/workflows:seo` | SEO audit and optimization |
| `/workflows:security` | OWASP security audit |
| `/workflows:performance` | Core Web Vitals optimization |
| `/workflows:deploy` | CI/CD setup and deployment |
| `/workflows:cms` | Headless CMS integration (Sanity/Contentful/Strapi) |
| `/workflows:pwa` | PWA and app-like experience configuration |
| `/workflows:animations` | Animation implementation (Motion/GSAP/Lottie) |
| `/workflows:images` | Stock photo sourcing and management |
| `/workflows:game` | Web game framework setup (Phaser/PixiJS/Three.js) |
| `/workflows:modernize` | Existing site analysis and migration planning |

### Tool Commands

| Command | Purpose |
|---------|---------|
| `/tools:research <url>` | Analyze a competitor website |
| `/tools:lighthouse` | Run Lighthouse audit |
| `/tools:scan` | Security vulnerability scan |
| `/tools:validate` | HTML/CSS/JS validation |
| `/tools:sitemap` | Generate sitemap |
| `/tools:schema` | Generate structured data |

### Quick Commands

| Command | Purpose |
|---------|---------|
| `/quick:meta` | Optimize meta tags |
| `/quick:image` | Optimize images |
| `/quick:header` | Add security headers |

---

## Dynamic Framework Selection

WebLord evaluates requirements and chooses the optimal framework:

| Framework | Best For |
|-----------|----------|
| **Astro** | Content-heavy sites, blogs, docs (0 JS default) |
| **Next.js** | Dynamic apps, e-commerce, user auth (React ecosystem) |
| **SvelteKit** | Interactive + performance-critical, real-time features |
| **Vanilla** | Single landing pages, maximum simplicity |

---

## Security Standards

Every WebLord website includes:

- **Security Headers**: CSP, HSTS, X-Frame-Options, X-Content-Type-Options
- **HTTPS**: TLS 1.3, HSTS preload ready
- **Input Validation**: Zod schemas, XSS prevention, CSRF protection
- **Dependency Security**: Lock files, vulnerability scanning, SBOM
- **CI/CD Security**: Semgrep, npm audit, gitleaks

---

## Performance Targets

| Metric | Target |
|--------|--------|
| **LCP** | < 2.5s |
| **INP** | < 200ms |
| **CLS** | < 0.1 |
| **Lighthouse** | 90+ all categories |

---

## Behavioral Skills

| Skill | Purpose |
|-------|---------|
| `security-first` | Security is priority #1, never optional |
| `mobile-first` | Design mobile-first, enhance for desktop |
| `performance-aware` | Core Web Vitals are non-negotiable |
| `seo-conscious` | Every page optimized for search |
| `accessible-design` | WCAG 2.1 AA minimum |
| `animation-aware` | Performant, accessible animations with reduced-motion support |
| `content-managed` | CMS-ready content structure, secure API patterns |
| `app-like-experience` | PWA patterns, iOS Safari optimization, native feel |

---

## Complete Setup Checklist

When using WebLord to create a new website project:

- [ ] **Step 1**: Copy `.wlclaude/` to your new project directory
- [ ] **Step 2**: Rename it to `.claude/`
- [ ] **Step 3**: Open `.claude/CLAUDE.md` and fill in:
  - [ ] Project Overview section (name, type, industry, audience, goal)
  - [ ] Design Preferences section (style, colors, typography)
  - [ ] Content Structure section (pages needed, features)
  - [ ] Competitors section (optional but recommended)
- [ ] **Step 4**: Start Claude Code from your project directory
- [ ] **Step 5**: Run `/workflows:discover` to begin

> **Common Mistake**: Running `/workflows:discover` before filling in CLAUDE.md. If you skip Step 3, the AI will ask you questions instead of researching autonomously.

**Philosophy**: AI executes, you approve. Security first. Quality over speed.
