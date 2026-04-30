# API & Data Fetching Rules (STRICT)

## Source of Truth Mapping

- Tables → `src/const/tables.js`
- Fields → `src/const/fields.js`
- Core API → `src/utils/axiosCalls.js`
- Data Wrappers → `src/utils/getData.js`
- Page Data → `src/app/lib/*.js`

---

## Core Rules

### API Type Rules

#### Database (Table-based APIs)

- Use `getDataFromTable()` ONLY for table data
- Tables MUST come from `src/const/tables.js`
- Fields MUST come from `src/const/fields.js`

---

#### Public / External APIs

- Use axios functions from `src/utils/axiosCalls.js`
- Do NOT use `getDataFromTable()` for public APIs
- Do NOT create direct axios calls inside components

---

#### Selection Rule

- If data source = table → use `getDataFromTable`
- If data source = external API → use axios functions
- If unclear → check existing usage or ask

---

### Table Access
- ALWAYS use table constants from `tables.js`
- NEVER hardcode table IDs

### Table Access
- ALWAYS use table constants from `tables.js`
- NEVER hardcode table IDs

---

### Field Selection
- ALWAYS use field constants from `fields.js`
- NEVER manually define field arrays

---

### Data Fetching Pattern

- Use `getDataFromTable()` as base
- Use wrapper functions from `getData.js`
- Page-level data must be in `/app/lib/*`

---

### Parallel Fetching

- Use `Promise.all` for independent API calls
- Do NOT fetch sequentially

---

### Error Handling

- ALL data functions must use try-catch
- ALWAYS return fallback values ([], {})

---

### pageUrl (MANDATORY)

- ALWAYS pass `pageUrl` to all data functions
- Use base URL + route

---

### Architecture Rules

- API calls must NOT be inside UI components
- Keep API logic in `/utils` or `/lib`
- Page data must be aggregated in one function per route

---

### Data Transformation

- Always safely parse JSON (no direct JSON.parse without fallback)
- Normalize API data before returning

---

## Strict Constraints

- ❌ No hardcoded table IDs
- ❌ No manual field arrays
- ❌ No API calls inside components
- ❌ No sequential fetching
- ❌ No missing error handling
- ❌ No missing pageUrl
- ❌ No unprocessed raw API data

---

## Enforcement

- If constant exists → MUST use it
- If wrapper exists → MUST use it
- Do NOT create new API patterns
- Follow existing structure only
- If unclear → check existing `/lib` patterns or ask