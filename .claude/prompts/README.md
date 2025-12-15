# WebLord Master Prompts

These are self-executing workflow prompts that guide AI through complete web development phases.

---

## Important: Which File Do I Edit?

| If you're using... | Edit this file | Leave alone |
|--------------------|----------------|-------------|
| **Claude Code** | `.claude/CLAUDE.md` | These prompt files |
| **Copy-paste (ChatGPT, Cursor, etc.)** | These prompt files | CLAUDE.md |

### Claude Code Users

**Do NOT edit these prompt files.** Instead:
1. Open `.claude/CLAUDE.md`
2. Fill in your project details (name, industry, audience, pages, etc.)
3. Run `/workflows:discover`
4. The AI reads CLAUDE.md automatically and uses your settings

### Copy-Paste Users

Edit the prompt files directly:
1. Open the appropriate prompt file (e.g., `01-site-discovery.md`)
2. Find the `[BRACKETS]` and replace them with your actual values
3. Copy the entire prompt to your AI tool
4. AI executes autonomously

---

## How to Use

### With Claude Code (Recommended)

```bash
# 1. First, fill in .claude/CLAUDE.md with your project details!

# 2. Start Claude Code from your project
claude

# 3. Run workflows via slash commands
/workflows:discover      # → 01-site-discovery.md
/workflows:design        # → 02-design-system.md
/workflows:architect     # → 03-architecture-selection.md
/workflows:build         # → 04-page-generation.md
```

### Copy-Paste Method (Any AI)

1. Open the appropriate prompt file
2. Fill in bracketed `[SECTIONS]` with your project details
3. Copy the entire prompt to your AI tool
4. AI executes autonomously with approval checkpoints

---

## Prompt Index

| # | Prompt | Purpose | Duration |
|---|--------|---------|----------|
| 01 | site-discovery.md | Research competitors, trends, requirements | 5-10 min |
| 02 | design-system.md | Generate design tokens, colors, typography | 5-10 min |
| 03 | architecture-selection.md | Select framework, plan structure | 3-5 min |
| 04 | page-generation.md | Generate complete website code | 10-15 min |

---

## The WebLord Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  01-site-discovery.md                                          │
│  ├── Competitive analysis                                       │
│  ├── Design trend research                                      │
│  ├── SEO landscape analysis                                     │
│  ├── Feature requirements                                       │
│  └── Security requirements                                      │
│                                                                 │
│  ↓ [USER APPROVES]                                              │
│                                                                 │
│  02-design-system.md                                           │
│  ├── Color palette generation                                   │
│  ├── Typography system                                          │
│  ├── Spacing scale                                              │
│  ├── Component patterns                                         │
│  └── Animation tokens                                           │
│                                                                 │
│  ↓ [USER APPROVES]                                              │
│                                                                 │
│  03-architecture-selection.md                                  │
│  ├── Framework evaluation                                       │
│  ├── Technology selection                                       │
│  ├── Project structure                                          │
│  ├── Security architecture                                      │
│  └── Performance strategy                                       │
│                                                                 │
│  ↓ [USER APPROVES]                                              │
│                                                                 │
│  04-page-generation.md                                         │
│  ├── Project initialization                                     │
│  ├── Component generation                                       │
│  ├── Page generation                                            │
│  ├── Form handling                                              │
│  ├── SEO implementation                                         │
│  └── Security implementation                                    │
│                                                                 │
│  ↓ [USER REVIEWS]                                               │
│                                                                 │
│  → /workflows:security (validation)                             │
│  → /workflows:seo (optimization)                                │
│  → /workflows:deploy (launch)                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Quality Standards Applied

Every prompt enforces:

- **Security First**: OWASP 2025 compliance
- **Mobile First**: Responsive from 320px
- **Performance**: Core Web Vitals targets
- **SEO**: Complete optimization
- **Accessibility**: WCAG 2.1 AA minimum
- **Code Quality**: TypeScript strict, no `any`

---

## Context Files Referenced

Prompts automatically reference knowledge base files in `.claude/context/`:

- `design/` - Design trends, tokens, typography
- `frameworks/` - Next.js, Astro, SvelteKit patterns
- `security/` - OWASP, headers, authentication
- `seo/` - Technical SEO, structured data
- `performance/` - Core Web Vitals, optimization
- `guardrails/` - Anti-patterns, quality checks

---

## Adding New Prompts

Create new prompts following this structure:

```markdown
# Master Prompt: [Purpose]

**Purpose**: [What it accomplishes]
**Usage**: [When to use it]
**Philosophy**: [Core principle]

---

## INPUTS

[What the prompt needs from previous phases]

---

## AUTONOMOUS EXECUTION INSTRUCTIONS

[Detailed steps for AI to execute]

### PHASE 1: [Name]
[Steps]

### PHASE 2: [Name]
[Steps]

---

## DELIVERABLE

[What to present to user]

---

## CHECKPOINT

[Approval questions]

---

## CONTEXT FILES TO CONSULT

[List of context files to reference]

---

Begin now.
```

---

**Philosophy**: AI executes, you approve. Security first. Quality over speed.
