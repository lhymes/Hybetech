# Research Tool

Analyze a competitor or reference website.

## Usage

```
/tools:research <url>
```

Examples:
- `/tools:research https://competitor.com`
- `/tools:research https://example.com`

## Steps

### 1. Fetch and Analyze

Use WebFetch to analyze the URL:
- Overall design and visual style
- Navigation structure
- Content organization
- Key features
- User experience patterns

### 2. Technical Analysis

Identify:
- Technology stack (if detectable)
- Performance characteristics
- Mobile responsiveness
- Accessibility features

### 3. Design Patterns

Document:
- Color palette used
- Typography choices
- Layout patterns
- Component styles
- Animation/interaction patterns

### 4. Content Strategy

Analyze:
- Headline patterns
- Content hierarchy
- Call-to-action placement
- Trust signals
- Social proof usage

### 5. Generate Report

Output analysis in structured format:

```markdown
## Research: [URL]

### Overview
[Brief summary]

### Design Analysis
- Style: [Modern/Minimal/Bold/etc.]
- Colors: [Primary colors observed]
- Typography: [Font styles]
- Layout: [Grid patterns]

### Features
- [Feature 1]
- [Feature 2]

### Strengths
- [What works well]

### Weaknesses
- [What could be improved]

### Takeaways
- [What to emulate]
- [What to avoid]
```

## Output

Structured analysis of the target website for use in discovery and design phases.

## Related Commands

- Discovery: `/workflows:discover`
- Design: `/workflows:design`
