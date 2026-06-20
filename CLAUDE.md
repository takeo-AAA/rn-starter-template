# CLAUDE.md

This project uses **`AGENTS.md`** as the single source of truth for AI agent guidance. Read it first.

Claude Code specifics:

- Always run `npm run validate` (type-check + lint + format:check) before finishing — it is the CI gate.
- Named exports only, no `any`, no circular imports, and **screens reach data through hooks** (never import a repository from a screen). These are `error`-level lint rules.
- For common tasks (add a screen / feature / API endpoint / form, review architecture), use the prompt templates in `docs/ai-prompts/`.
- Full ruleset with code shapes: `.cursor/rules/architecture.mdc`.
