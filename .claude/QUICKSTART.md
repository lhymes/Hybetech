# WebLord Quick Start

**Time to first website: ~30 minutes with AI**

---

## Before You Start (Required)

You **must** configure your project details before running any workflows. The AI reads this configuration to work autonomously.

### Step 1: Copy WebLord to Your Project

```bash
# Copy .wlclaude/ to your project as .claude/
cp -r /path/to/weblord/.wlclaude ./my-website/.claude

# Navigate to your project
cd my-website
```

### Step 2: Configure Your Project (Do This First!)

Open `.claude/CLAUDE.md` and fill in **two sections**:

**A) Project Overview** (at the top of the file):
```yaml
Project Name: Acme Corp Website
Project Type: Website
Industry: Technology
Target Audience: B2B enterprise decision makers
Primary Goal: Lead generation
```

**B) Project-Specific Context** (middle of the file):
```yaml
# Design Preferences
Style: Modern minimal
Color Preferences: Blue and white
Typography: Sans-serif
Animation Level: Subtle

# Content Structure
Pages Needed:
  - Home
  - About
  - Services
  - Contact

# Competitors to Analyze
Competitors:
  - competitor1.com
  - competitor2.com
```

> **Why this step is critical**: Without filling in CLAUDE.md, the AI will ask you questions instead of researching autonomously. Fill this in first for the best experience.

### Step 3: Start Claude Code and Build

```bash
# Start Claude Code from your project directory
claude

# Run the discovery workflow
/workflows:discover
```

The AI will now research competitors, analyze trends, and present comprehensive findings using your configuration.

---

## The 6-Phase Flow

| Phase | Command | What Happens |
|-------|---------|--------------|
| 1. Discover | `/workflows:discover` | AI researches competitors, trends, requirements |
| 2. Design | `/workflows:design` | AI generates design system and tokens |
| 3. Architect | `/workflows:architect` | AI selects framework, plans structure |
| 4. Build | `/workflows:build` | AI generates complete website |
| 5. Validate | `/workflows:security` | AI runs security + SEO audits |
| 6. Deploy | `/workflows:deploy` | AI sets up CI/CD + hosting |

Each phase ends with a **checkpoint** where you review and approve before continuing.

---

## What Goes Where

| If you're using... | Fill in this file | Why |
|--------------------|-------------------|-----|
| **Claude Code** | `.claude/CLAUDE.md` | AI reads this automatically when you run workflows |
| **Copy-paste (ChatGPT, etc.)** | `.claude/prompts/01-site-discovery.md` | Replace `[BRACKETS]` directly in the prompt |

> **Do not edit prompt files when using Claude Code.** They are templates for copy-paste users. Claude Code reads your settings from CLAUDE.md.

---

## What AI Delivers

| Phase | Deliverables |
|-------|-------------|
| **Discovery** | Competitor analysis, trend summary, feature recommendations, SEO landscape |
| **Design** | Color palette, typography, spacing scale, component patterns, design tokens |
| **Architecture** | Selected framework, project structure, page/route plan, component architecture |
| **Build** | Complete website code, all pages, component library, SEO config, security headers |
| **Validation** | Security scan report, SEO audit, Lighthouse scores, issues fixed |
| **Deploy** | CI/CD pipeline, hosting config, live URL |

---

## Framework Selection

WebLord picks the best framework for YOUR needs:

| If You Need... | WebLord Chooses |
|----------------|-----------------|
| Blog, docs, marketing site | **Astro** (fastest, 0 JS) |
| User auth, dynamic content | **Next.js** (React power) |
| Interactive + fast | **SvelteKit** (best of both) |
| Single landing page | **Vanilla** (simplest) |

---

## Quick Commands

```bash
/quick:meta           # Optimize meta tags
/quick:image          # Optimize images
/quick:header         # Add security headers
```

---

## Add More Later

```bash
/workflows:page about        # Add About page
/workflows:page contact      # Add Contact page
/workflows:component hero    # Add Hero component
/workflows:seo              # Re-run SEO optimization
```

---

## Philosophy

1. **AI executes, you approve** - You direct, AI implements
2. **Security first** - Every site is secure by default
3. **Quality over speed** - Production-ready, not prototypes
4. **Mobile-first** - Responsive from the start
5. **SEO built-in** - Visibility is not an afterthought

---

**Ready? Run `/workflows:discover` and let's build!**
