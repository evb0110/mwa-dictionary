# Maalula Arnold Dictionary - Complete File Listing with Absolute Paths

## Pages (Vue Components)

### Maalula Module Pages

- `/Users/evb/WebstormProjects/newsite3/src/pages/maalula/Dictionaries.vue` - Main dictionary search interface
- `/Users/evb/WebstormProjects/newsite3/src/pages/maalula/RootsAndStems.vue` - Verbal roots and stems browser with stem filtering
- `/Users/evb/WebstormProjects/newsite3/src/pages/maalula/Tables.vue` - Reference tables (stems, perfects, states, adjectives)
- `/Users/evb/WebstormProjects/newsite3/src/pages/maalula/Corpus.vue` - Corpus search and browsing interface
- `/Users/evb/WebstormProjects/newsite3/src/pages/maalula/MaalulaRouter.vue` - Router layout wrapper for Maalula routes

### Library Module Pages (PDF Viewer)

- `/Users/evb/WebstormProjects/newsite3/src/pages/library/Book.vue` - PDF viewer page for Arnold dictionary
- `/Users/evb/WebstormProjects/newsite3/src/pages/library/BookList.vue` - List of available books/dictionaries
- `/Users/evb/WebstormProjects/newsite3/src/pages/library/LibraryRouter.vue` - Router layout wrapper for library routes

---

## Components

### Dictionary Search Components

- `/Users/evb/WebstormProjects/newsite3/src/components/corpusSimple/DictsSearch.vue` - Main dictionary search component
- `/Users/evb/WebstormProjects/newsite3/src/components/corpusSimple/Searcher.vue` - Search input field with keyboard support
- `/Users/evb/WebstormProjects/newsite3/src/components/corpusSimple/SearchResults.vue` - Search results display with infinite scroll
- `/Users/evb/WebstormProjects/newsite3/src/components/corpusSimple/CorpusSearch.vue` - Full corpus search interface

### Corpus with Translation Components

- `/Users/evb/WebstormProjects/newsite3/src/components/corpusWithTranslation/BrowseAndSearch.vue` - Combined browse and search interface
- `/Users/evb/WebstormProjects/newsite3/src/components/corpusWithTranslation/LineCard.vue` - Individual result card (contains Arnold mapping)
- `/Users/evb/WebstormProjects/newsite3/src/components/corpusWithTranslation/GrepLine.vue` - Highlighted line display component
- `/Users/evb/WebstormProjects/newsite3/src/components/corpusWithTranslation/Search.vue` - Search interface for corpus
- `/Users/evb/WebstormProjects/newsite3/src/components/corpusWithTranslation/Browse.vue` - Browse interface for corpus
- `/Users/evb/WebstormProjects/newsite3/src/components/corpusWithTranslation/Results.vue` - Results display for corpus

### PDF Viewer Component

- `/Users/evb/WebstormProjects/newsite3/src/components/pdf/PdfPageViewer.vue` - Advanced PDF page viewer (uses pdfjs-dist)

### Shared Components

- `/Users/evb/WebstormProjects/newsite3/src/components/OptionsChooser.vue` - Dictionary/option selection component
- `/Users/evb/WebstormProjects/newsite3/src/components/common/SimpleTable.vue` - Table rendering component
- `/Users/evb/WebstormProjects/newsite3/src/components/common/InfiniteScroll.vue` - Infinite scroll pagination
- `/Users/evb/WebstormProjects/newsite3/src/components/common/GrepMultiline.vue` - Multi-line text with highlighting

---

## State Management (Pinia Stores)

- `/Users/evb/WebstormProjects/newsite3/src/pinia/simpleDictStore.ts` - Dictionary search state management
- `/Users/evb/WebstormProjects/newsite3/src/pinia/bookStore.ts` - PDF book metadata and caching (Arnold definition here)
- `/Users/evb/WebstormProjects/newsite3/src/pinia/maalulaVerbalStore.ts` - Maalula verb roots/perfects state
- `/Users/evb/WebstormProjects/newsite3/src/pinia/assetsStore.ts` - Centralized asset loading system
- `/Users/evb/WebstormProjects/newsite3/src/pinia/simpleCorpusStore.ts` - Simple corpus search state
- `/Users/evb/WebstormProjects/newsite3/src/pinia/corpusWithTranslationStore.ts` - Corpus with translation support
- `/Users/evb/WebstormProjects/newsite3/src/pinia/simpleCorpusStore.ts` - Corpus data and search state

---

## Data & Configuration Files

### Maalula Data

- `/Users/evb/WebstormProjects/newsite3/src/data/maalulaTables.ts` - Reference tables (stems, perfects, states, adjectives)
- `/Users/evb/WebstormProjects/newsite3/src/data/maalulaButtons.ts` - Maalula character set for button interface

### Configuration

- `/Users/evb/WebstormProjects/newsite3/src/configs/assets.ts` - Asset registry and definitions
- `/Users/evb/WebstormProjects/newsite3/src/router.ts` - Route definitions and hierarchy

---

## Constants & Language

- `/Users/evb/WebstormProjects/newsite3/src/constants/Language.ts` - Language enum (maalula, turoyo, urmi)
- `/Users/evb/WebstormProjects/newsite3/src/constants/RouterName.ts` - Route name constants

---

## Models & Classes

- `/Users/evb/WebstormProjects/newsite3/src/models/Stem.ts` - Stem class for verb filtering
- `/Users/evb/WebstormProjects/newsite3/src/models/StemCollection.ts` - Collection of Stem objects

---

## Composables/Utilities

- `/Users/evb/WebstormProjects/newsite3/src/composables/useGetResource.ts` - Asset loading composable
- `/Users/evb/WebstormProjects/newsite3/src/composables/useSearcher.ts` - Regex search composable
- `/Users/evb/WebstormProjects/newsite3/src/composables/useLetters.ts` - Character handling utilities
- `/Users/evb/WebstormProjects/newsite3/src/composables/useScale.ts` - PDF zoom level management
- `/Users/evb/WebstormProjects/newsite3/src/composables/useLanguage.ts` - Language context composable

---

## External Data Sources

All hosted on: `https://evb0110.github.io/static/`

### Dictionary Data

- `maalulaDicts.json` - Arnold dictionary entries

### Verbal Forms Data

- `maalulaVerbalRoots.json` - Verbal roots for roots/stems page
- `maalulaPerfects.json` - Perfect forms

### Corpus Data

- `maalulaCorpus.json` - Text corpus

### PDF Files

- `pdf/Arnold-Woerterbuch/pg_0001.pdf` through `pg_1035.pdf` - Individual PDF pages

---

## Entry Points for Arnold Dictionary

### Public Routes

1. `/maalula/dictionaries` - Dictionary search
2. `/maalula/rootsandstems` - Verb browser
3. `/maalula/tables` - Reference tables
4. `/maalula/corpus` - Corpus search
5. `/library/list` - Book list
6. `/library/book/:hash` - PDF viewer

### Store Access

- `useSimpleDictStore()` - For dictionary search
- `useBookStore()` - For PDF metadata and caching
- `useMaalulaVerbalStore()` - For verbal forms

### Key Configuration

- Arnold dictionary key: `'arnold'`
- Language: `Language.maalula`
- Asset name: `AssetName.maalulaDictsJson`
- PDF base URL: `https://evb0110.github.io/static/pdf/Arnold-Woerterbuch/pg_`
- PDF pages: 1035
