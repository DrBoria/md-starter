---
trigger: always_on
---

## REFACTORING RULES
When renaming symbols, moving files, or deleting code:
1. NO TEXT REGEX/SEARCH-REPLACE.
2. MUST generate and run a temporary Node.js script using the `ts-morph` library to perform AST-based transformations. Ensure all references and imports are updated automatically.
3. Run `ts-prune` after changes to detect dead code.
4. Assume `ts-morph` and `ts-prune` are globally installed (`require` them directly).
