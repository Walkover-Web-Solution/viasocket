# Styling Rules (STRICT ENFORCEMENT)

## Source of Truth Mapping

- Colors → `src/scss/_variables.scss`
- Typography → `src/scss/_fonts.scss`
- Spacing → Tailwind utilities + `src/scss/_custom.scss`
- Breakpoints → `tailwind.config.js`

---

## Mandatory Rules

### Colors
- ALWAYS use CSS variables or Tailwind theme
- NEVER hardcode hex/rgb values
- Prefer `var(--variable-name)` or Tailwind classes (e.g., `bg-accent`)

---

### Typography
- ALWAYS use predefined classes from `_fonts.scss`
- NEVER hardcode font sizes (no `text-[20px]`, no inline styles)
- Use classes like `.h1`, `.h2`, `.sub__h1`, etc.

---

### Spacing
- Use Tailwind spacing scale only (`p-`, `m-`, `gap-`)
- Allowed scale: 1,2,3,4,6,8,12,16,20,24
- Do NOT use arbitrary values (`p-[24px]`)

---

### Styling System Rules

- Tailwind = primary styling system
- SCSS = only for complex or reusable styles
- Use `@apply` for Tailwind inside SCSS when needed

---

### Strict Constraints

- ❌ No inline styles (except dynamic values like viewport/grid)
- ❌ No hardcoded colors
- ❌ No hardcoded font sizes
- ❌ No arbitrary Tailwind values
- ❌ No inconsistent spacing
- ❌ No mixing Tailwind + SCSS randomly in same element

---

### Breakpoints

- Use only defined breakpoints from `tailwind.config.js`
- Do NOT use arbitrary media queries

---

## Enforcement

- If a value exists in source files → MUST use it
- Do NOT invent new styles
- Do NOT override system patterns
- If unclear → check source files or ask