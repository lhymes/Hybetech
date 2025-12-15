# Site Discovery Workflow

Execute the complete discovery phase for a WebLord project.

## Steps

### 1. Validate Project Setup

Verify the `.wlclaude/` folder is properly configured:
- Check CLAUDE.md exists and has project overview filled in
- Verify settings.json is present
- Confirm context files are accessible

### 2. Gather Requirements

If not already captured in CLAUDE.md, gather:
- Project type (website, web app, e-commerce, etc.)
- Industry/vertical
- Target audience
- Primary goals
- Required features
- Competitor URLs

### 3. Competitor Analysis

For each competitor URL provided:
1. Analyze using WebFetch tool
2. Document:
   - Design patterns and visual style
   - Navigation structure
   - Key features and functionality
   - Content organization
   - Technology used (if detectable)
   - What works well (to emulate)
   - What doesn't work (to avoid)

### 4. Industry Trend Research

Using WebSearch, research:
- Current design trends for the industry
- Successful websites in the space
- User expectations and conventions
- Emerging patterns to consider

### 5. Technical Requirements

Based on gathered information, determine:
- Content management needs (static vs CMS)
- Authentication requirements
- E-commerce capabilities
- Real-time features needed
- Third-party integrations
- Performance requirements
- SEO importance level

### 6. Create Discovery Report

Write to `docs/discovery-report.md`:

```markdown
# Discovery Report: [Project Name]

## Project Overview
[Summary from CLAUDE.md]

## Competitor Analysis

### [Competitor 1]
- URL:
- Strengths:
- Weaknesses:
- Key Features:
- Design Notes:

### [Competitor 2]
[Same structure]

## Industry Trends
[Current relevant trends]

## Technical Requirements
- Framework Recommendation: [Based on needs]
- Key Features Needed:
- Integrations Required:
- Performance Targets:

## Design Direction
- Style Recommendation:
- Color Direction:
- Typography Direction:

## Next Steps
1. Run `/workflows:design` to create design system
2. Run `/workflows:architect` to select framework
```

### 7. Update CLAUDE.md

Update the project-specific sections of CLAUDE.md with gathered information.

## Output

At completion, you should have:
- Comprehensive discovery report in `docs/discovery-report.md`
- Updated CLAUDE.md with project specifics
- Clear direction for design and architecture phases

## Related Commands

- Next: `/workflows:design`
- Reference: Master prompt `01-site-discovery.md`
