# Modern Western Aramaic Dictionary

A web application for searching and accessing Modern Western Aramaic linguistic resources, providing an intuitive interface for dictionary search and reference material browsing.

## Features

### Dictionary Search
- Fast, client-side search with regex-based query matching
- Smart highlighting of search results
- Virtual keyboard for Maalula script input
- Support for complex search patterns

### PDF Library Browser
- Interactive PDF viewer with zoom controls
- Drag-to-scroll navigation
- Page-by-page rendering with monospace pagination controls
- Client-side caching via IndexedDB for offline access
- Reference materials and linguistic resources

### Performance
- Server-side rendering (SSR) for fast initial load and SEO
- Client-side caching reduces bandwidth and improves performance
- Optimized PDF rendering with canvas-based display
- Responsive design for desktop and mobile devices

## Tech Stack

- **Framework**: Nuxt 4.2.0 with Vue 3 Composition API
- **Language**: TypeScript with strict type safety
- **UI**: Nuxt UI 4.1.0 + Tailwind CSS
- **State Management**: Pinia stores
- **PDF Rendering**: pdfjs-dist 5.4.296
- **Storage**: IndexedDB via idb library
- **Package Manager**: pnpm 10.19.0

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- pnpm 10.19.0 or higher

### Installation

```bash
pnpm install
```

### Development

Start the development server at `http://localhost:3000`:

```bash
pnpm dev
```

### Build

Build the application for production:

```bash
pnpm build
```

Preview production build locally:

```bash
pnpm preview
```

### Code Quality

Run linting and type checks:

```bash
pnpm lint         # ESLint with auto-fix
pnpm typecheck    # TypeScript type checking
pnpm format       # Prettier formatting
```

## Project Structure

```
app/
├── components/          # Vue components
│   ├── AppHeader.vue           # Shared header navigation
│   ├── DictSearcher.vue        # Dictionary search interface
│   ├── DictSearchInput.vue     # Search input with keyboard
│   ├── MaalulaKeyboard.vue     # Virtual keyboard for Maalula script
│   ├── SearchResults.vue       # Search results display
│   ├── GrepLine.vue            # Highlighted result line
│   └── PdfPageViewer.vue       # PDF viewer with controls
│
├── pages/               # File-based routing
│   ├── index.vue               # Dictionary search page
│   ├── library/
│   │   ├── index.vue           # Library browser
│   │   └── book/[hash].vue     # PDF viewer (SSR disabled)
│
├── stores/              # Pinia state management
│   └── simpleDict.ts           # Dictionary data store
│
├── composables/         # Vue composables
│   ├── useSearcher.ts          # Search logic
│   ├── useScale.ts             # PDF zoom controls
│   └── usePdfCache.ts          # IndexedDB caching
│
├── utils/               # Utility functions
│   ├── idb.ts                  # IndexedDB helpers
│   ├── pageNumbers.ts          # PDF page utilities
│   └── getPadding.ts           # Layout utilities
│
├── data/                # Static data
│   ├── assets.ts               # Dictionary assets metadata
│   ├── books.ts                # Library reference materials
│   └── maalulaButtons.ts       # Keyboard layout
│
└── types/               # TypeScript types
    └── index.ts                # Shared type definitions
```

## Technical Details

### Server-Side Rendering (SSR)

- Most pages use SSR for optimal performance and SEO
- Exception: PDF viewer (`/library/book/**`) runs client-side only due to browser API requirements (Canvas, DOMMatrix)

### IndexedDB Caching

- All IndexedDB operations include browser environment checks
- PDF documents are cached for offline access
- Automatic cache management to optimize storage

### Type Safety

- Interfaces prefixed with `I` (e.g., `IBook`, `IAsset`)
- Type aliases prefixed with `T` (e.g., `TStatus`)
- Strict TypeScript configuration with no type assertions
- Runtime type guards for data validation

### PDF Rendering

- pdfjs-dist for high-quality PDF rendering
- Canvas-based page rendering
- Zoom levels: 0.5x to 2.0x
- Lazy loading for performance

## Code Conventions

- **Type Safety**: No `any` types, no type assertions (`as`), use type guards
- **Nullish Coalescing**: Prefer `??` over `||` for null/undefined checks
- **Async/Await**: Remove `async` keyword if not awaiting anything
- **Code Comments**: Self-documenting code preferred over comments
- **Formatting**: Prettier + ESLint for consistent code style

## License

Private project - All rights reserved

## Contributing

This is a private project. For questions or issues, contact the project maintainer.
