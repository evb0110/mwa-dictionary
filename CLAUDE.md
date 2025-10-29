# Modern Western Aramaic Dictionary

A web application for searching and accessing Modern Western Aramaic linguistic resources.

---

## 🚨 CRITICAL: Git Commit Attribution Rules 🚨

**ABSOLUTE PROHIBITION - NEVER ADD CLAUDE ATTRIBUTION TO COMMITS:**

- ❌ **NEVER** add "Generated with Claude Code" to commit messages
- ❌ **NEVER** add "Co-Authored-By: Claude" to commit messages
- ❌ **NEVER** include any AI attribution in git commits
- ❌ **NEVER** use emoji robots (🤖) or similar in commit messages

**RATIONALE:**
- Professional git history must not contain AI tool attribution
- Commits represent human authorship and decision-making
- Tool attribution clutters git log and appears unprofessional
- Git history is permanent and public - keep it clean

**ENFORCEMENT:**
- Any commits with Claude attribution MUST be rewritten
- Use `git rebase -i` or `git filter-branch` to clean history
- Force push is acceptable to maintain clean commit history

---

## Tech Stack

- **Framework**: Nuxt 4.2.0 with Vue 3 Composition API + TypeScript
- **UI**: Nuxt UI 4.1.0 with Tailwind CSS
- **State**: Pinia stores
- **PDF Rendering**: pdfjs-dist 5.4.296 (client-side only)
- **Storage**: IndexedDB via idb (client-side only)
- **Package Manager**: pnpm 10.19.0

## Key Features

- Dictionary search with regex-based highlighting
- PDF viewer with zoom, navigation, and drag-to-scroll
- Library browser for reference materials
- Client-side PDF caching with IndexedDB
- Responsive design with monospace pagination controls

## Important Notes

- **SSR Configuration**: Most pages should use SSR wherever possible for better performance and SEO. Exception: PDF viewer pages run client-side only (`/library/book/**` has `ssr: false`) due to browser API requirements
- **IndexedDB**: All IDB operations must check for browser environment
- **PDF.js**: Requires browser APIs (DOMMatrix, Canvas) - client-side only
- **Icon Sizing**: Custom CSS overrides Nuxt UI icon sizes (1.75rem for PDF controls)

## Development

```bash
pnpm install
pnpm dev          # Start dev server
pnpm lint         # Run ESLint
pnpm typecheck    # Run TypeScript checks
```

## Project Structure

```
app/
├── components/     # Vue components
│   ├── PdfPageViewer.vue    # PDF viewer with controls
│   ├── AppHeader.vue        # Shared header component
│   └── DictSearcher.vue     # Dictionary search
├── pages/          # Nuxt pages (file-based routing)
├── stores/         # Pinia stores (assets, books, dictionary)
├── composables/    # Vue composables (useScale, useSearcher)
└── utils/          # Utilities (idb, makeHash, getPadding)
```

## Code Conventions

- **Type Prefixes**: Interfaces use `I` prefix, type aliases use `T` prefix
- **No type assertions**: Use type guards instead of `as` casts
- **Nullish coalescing**: Prefer `??` over `||` (except booleans)
- **No unnecessary async**: Remove `async` if not awaiting
- **Monospace pagination**: PDF controls use system monospace fonts
