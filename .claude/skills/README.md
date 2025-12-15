# WebLord Behavioral Skills

Behavioral guardrails that guide AI development behavior across all WebLord projects.

## What Are Skills?

Skills are always-active behavioral patterns that ensure consistent quality across all WebLord development. Unlike commands (invoked explicitly) or agents (launched for deep work), skills are passive guardrails that influence every interaction.

## Available Skills

| Skill | Priority | Purpose |
|-------|----------|---------|
| `security-first` | Critical | OWASP compliance, secure defaults |
| `mobile-first` | High | Mobile-primary design, touch-friendly |
| `performance-aware` | High | Core Web Vitals, optimization |
| `seo-conscious` | High | Search visibility, meta tags |
| `accessible-design` | High | WCAG compliance, inclusive design |
| `animation-aware` | Medium | Smooth, performant, accessible animations |
| `content-managed` | Medium | CMS-ready content, structured data |
| `app-like-experience` | Medium | PWA patterns, native app feel |

## How Skills Work

Skills activate automatically based on trigger phrases and contexts:

**Security-First triggers**: "user input", "form data", "API endpoint", "authentication"

**Mobile-First triggers**: "navigation", "button", "layout", "image"

**Performance-Aware triggers**: "image", "component", "bundle", "animation"

**SEO-Conscious triggers**: "page", "title", "link", "URL"

**Accessible-Design triggers**: "button", "image", "form", "color", "focus"

## Skill Structure

Each skill contains:

```
skills/
└── [skill-name]/
    └── SKILL.md
        ├── Purpose
        ├── Core Behaviors (Always Do / Never Do)
        ├── Quick Reference
        ├── Trigger Phrases
        └── Reference to context files
```

## Skill Priority

When skills conflict, priority order applies:

1. **Security-First** (Critical) - Security wins
2. **Accessible-Design** (High) - Accessibility over convenience
3. **Performance-Aware** (High) - Performance matters
4. **Mobile-First** (High) - Mobile is primary
5. **SEO-Conscious** (High) - SEO built-in

## Examples

### Security vs Convenience
User wants inline `onclick` handler → Security skill recommends proper event handling

### Performance vs Features
User wants 50 third-party scripts → Performance skill recommends trimming

### Accessibility vs Aesthetics
Designer wants to hide focus outlines → Accessibility skill requires visible alternatives

## Adding Custom Skills

Create a new skill directory with `SKILL.md`:

```markdown
# [Skill Name] Skill

**Type**: Behavioral Guardrail
**Priority**: [Critical/High/Medium/Low]

## Purpose
[Why this skill exists]

## Core Behaviors
### Always Do
[Required behaviors]

### Never Do
[Prohibited behaviors]

## Trigger Phrases
[When to activate]

## Reference
[Context file links]
```
