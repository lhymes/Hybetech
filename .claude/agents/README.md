# WebLord Agents

Specialized agents for deep, focused work on WebLord projects.

## Available Agents

| Agent | Purpose |
|-------|---------|
| `design-researcher` | Analyze design trends and competitors |
| `security-auditor` | OWASP vulnerability detection |
| `seo-specialist` | SEO optimization and structured data |
| `performance-optimizer` | Core Web Vitals tuning |
| `accessibility-auditor` | WCAG compliance |

## How to Use

Invoke an agent for complex, focused tasks:

```
Use the Task tool with agent: design-researcher
Task: Analyze the design patterns of [competitor URLs]
```

Or reference in conversation:

```
"Launch the security-auditor agent to review authentication"
```

## When to Use Agents

- **design-researcher**: Discovery phase, trend research, competitor analysis
- **security-auditor**: Before deployment, after adding auth, security reviews
- **seo-specialist**: After content is ready, before launch, ongoing optimization
- **performance-optimizer**: Before launch, when Core Web Vitals fail, optimization sprints
- **accessibility-auditor**: After UI completion, before launch, compliance reviews

## Agent vs Command

| Use Case | Choose |
|----------|--------|
| Quick targeted task | `/tools:*` or `/quick:*` command |
| Multi-step workflow | `/workflows:*` command |
| Deep analysis | Agent |
| Comprehensive audit | Agent |
| Ongoing task (during build) | Agent |

## Agent Outputs

All agents produce structured reports that can be:
- Saved to `docs/` directory
- Used to inform next steps
- Shared with stakeholders
- Used for tracking improvements
