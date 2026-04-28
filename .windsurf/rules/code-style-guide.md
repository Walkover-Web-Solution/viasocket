---
trigger: model_decision
description: when making new component or styling or adding new api, always check the code-style-guide.md file for the rules.
---

# AI Instructions (MASTER CONTROL)

## Priority Order (STRICT)

1. code-style-guide.md (global rules)
2. Docs/API.md (data fetching)
3. Docs/COMPONENTS.md (pages & components)
4. Docs/STYLING.md (styling system)

If conflict occurs:
- Follow higher priority file
- Never merge conflicting patterns

---

## Mandatory Workflow

Before ANY implementation:

1. Identify task type:
   - Page creation
   - Component creation
   - Styling
   - Data fetching

2. Read relevant files:

- For pages/components → COMPONENTS.md
- For API/data → API.md
- For styling → STYLING.md

3. Apply rules from `code-style-guide.md`

---

## Decision Rules

### Page Creation

- MUST follow COMPONENTS.md
- MUST use `get[Page]PageData()`
- MUST include:
  - metadata
  - navbar
  - footer

---

### Component Creation

- Decide:
  - Server (default)
  - Client (only if needed)

- Follow naming + structure rules

---

### Styling

- MUST follow STYLING.md
- Use existing variables/configs
- Do NOT invent styles

---

### Data Fetching

- Identify API type:
  - Table → use `getDataFromTable`
  - Public API → use axios functions

- MUST follow API.md

---

## Global Constraints

- Do NOT invent new patterns
- Do NOT bypass existing structure
- Do NOT mix systems incorrectly
- Reuse existing functions and components

---

## Failure Handling

- If unclear → check relevant doc file
- If still unclear → ask instead of guessing
- If docs conflict → follow priority order

---

## Goal

Generate code that:
- matches existing architecture
- follows all rules
- does not introduce new patterns