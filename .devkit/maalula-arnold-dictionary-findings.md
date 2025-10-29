# Maalula Arnold Dictionary - Comprehensive File Inventory

## Overview

The newsite3 project contains a comprehensive implementation of the Maalula Arnold Dictionary system, integrated with a multi-language Aramaic language resource platform. The dictionary is built with Vue 3, TypeScript, and Pinia for state management.

---

## 1. PAGE COMPONENTS

### Dictionary Pages

- **`/Users/evb/WebstormProjects/newsite3/src/pages/maalula/Dictionaries.vue`**
    - Main dictionary search page for Maalula
    - Uses the `DictsSearch` component
    - Route: `/maalula/dictionaries`
    - Metadata: "MWA Dictionaries"

- **`/Users/evb/WebstormProjects/newsite3/src/pages/maalula/RootsAndStems.vue`**
    - Advanced verb search for Maalula verbal roots and stems
    - Features stem filtering (I-IV, variants), regex search
    - Displays matching roots with inflected forms
    - Route: `/maalula/rootsandstems`
    - Metadata: "MWA Verb: Roots, Stems, and Perfects"

- **`/Users/evb/WebstormProjects/newsite3/src/pages/maalula/Tables.vue`**
    - Reference tables for Modern Western Aramaic morphology
    - Tabbed interface for different table types
    - Route: `/maalula/tables`
    - Metadata: "Modern Western Aramaic Tables"

- **`/Users/evb/WebstormProjects/newsite3/src/pages/maalula/Corpus.vue`**
    - Corpus search and browsing
    - Component wrapper for `BrowseAndSearch`
    - Route: `/maalula/corpus`
    - Metadata: "Corpus of Modern Western Aramaic"

- **`/Users/evb/WebstormProjects/newsite3/src/pages/maalula/MaalulaRouter.vue`**
    - Router layout wrapper for all Maalula routes
    - Route: `/maalula`
    - Metadata: "Modern Western Aramaic"

### Library Pages (PDF Viewer)

- **`/Users/evb/WebstormProjects/newsite3/src/pages/library/Book.vue`**
    - PDF viewer page for Arnold dictionary
    - Displays book title and renders `PdfPageViewer` component
    - Route: `/library/book/:hash`
    - Integrates with bookStore for book metadata and page rendering

- **`/Users/evb/WebstormProjects/newsite3/src/pages/library/BookList.vue`**
    - Lists available books/dictionaries
    - Currently contains Arnold dictionary (Das Neuwestaramäische. VI. Wörterbuch)
    - Route: `/library/list`

- **`/Users/evb/WebstormProjects/newsite3/src/pages/library/LibraryRouter.vue`**
    - Router wrapper for library pages
    - Route: `/library`

---

## 2. COMPONENTS

### Dictionary Search Components

- **`/Users/evb/WebstormProjects/newsite3/src/components/corpusSimple/DictsSearch.vue`**
    - Main dictionary search interface for simple corpus searches
    - Supports multiple dictionaries (Arnold for Maalula, Ritter/Jastrow for Turoyo)
    - Features: Searcher input, dictionary selection (OptionsChooser), results display
    - Maps to translation languages (German/Swedish)
    - Renders `SearchResults` component for matches

- **`/Users/evb/WebstormProjects/newsite3/src/components/corpusSimple/Searcher.vue`**
    - Text input and regex search field
    - Keyboard integration for special character input
    - Submit functionality for triggering searches

- **`/Users/evb/WebstormProjects/newsite3/src/components/corpusSimple/SearchResults.vue`**
    - Displays search results with infinite scroll
    - Shows page badges for linked dictionary entries
    - Supports linking to PDF pages in Arnold dictionary
    - Extracts page numbers from dictionary format: `{стр. <number>}`
    - Integrates with `BookStore` for PDF navigation

### PDF Viewer Components

- **`/Users/evb/WebstormProjects/newsite3/src/components/pdf/PdfPageViewer.vue`**
    - Advanced PDF page viewer component
    - Uses `pdfjs-dist` library (v4.10.38)
    - Features:
        - Page navigation (first, previous, next, last)
        - Zoom in/out
        - Fit to width/height
        - Fullscreen mode
        - Page number input (supports Roman numerals for Arnold dictionary)
        - Caching system using IndexedDB
        - Drag-scroll support
        - Loading skeleton during page fetch
    - Renders single PDF page at a time using canvas
    - Pre-caches adjacent pages for smooth navigation
    - Handles page numbering conversion (Arabic/Roman numerals)

### Corpus/Search Components

- **`/Users/evb/WebstormProjects/newsite3/src/components/corpusSimple/CorpusSearch.vue`**
    - Full corpus search interface
    - Wrapper component for searcher and results

- **`/Users/evb/WebstormProjects/newsite3/src/components/corpusWithTranslation/BrowseAndSearch.vue`**
    - Browse and search combined interface
    - Used for Maalula corpus

- **`/Users/evb/WebstormProjects/newsite3/src/components/corpusWithTranslation/LineCard.vue`**
    - Individual result card component
    - Contains Arnold in list of German-translation volumes: `['jastrow', 'ritter', 'arnold', 'lehrbuch', 'luf', 'prym', 'hors', 'talay', 'baxa', 'ubbadin', 'maalula', 'lieder', 'britta']`
    - Hash-based navigation

- **`/Users/evb/WebstormProjects/newsite3/src/components/corpusWithTranslation/GrepLine.vue`**
    - Renders individual search result lines with highlighting
    - Supports translation language display

### Shared Components

- **`/Users/evb/WebstormProjects/newsite3/src/components/OptionsChooser.vue`**
    - Dictionary selection component
    - Used to choose which dictionaries to search (e.g., Arnold)

- **`/Users/evb/WebstormProjects/newsite3/src/components/common/SimpleTable.vue`**
    - Renders reference tables for morphology

- **`/Users/evb/WebstormProjects/newsite3/src/components/common/InfiniteScroll.vue`**
    - Infinite scroll pagination for large result sets

- **`/Users/evb/WebstormProjects/newsite3/src/components/common/GrepMultiline.vue`**
    - Multi-line text rendering with search highlighting

---

## 3. DATA FILES

### Maalula-Specific Data

- **`/Users/evb/WebstormProjects/newsite3/src/data/maalulaTables.ts`**
    - Exported tables:
        - `nwaStems`: Modern Western Aramaic verbal stems (I-IV with variants)
        - `nwaPerfectShapes`: Perfect conjugation forms for each stem
        - `nwaStates`: Indefinite/definite noun state distinctions
        - `nwaStatesNidbeAdjectives`: Adjective state forms
    - Each table includes: title, headers, and data items array
    - Used by Tables.vue component

- **`/Users/evb/WebstormProjects/newsite3/src/data/maalulaButtons.ts`**
    - Character set for Maalula: `ʔ ʕ a á ā b c ć č d ḍ ḏ ḏ̣ e é ē ə f g ǧ ġ h ḥ i í ī k ḳ l ḷ m n o ō p r s š ṣ t ṭ ṯ u ú ū w x y z ž ẓ`
    - Used for character/button-based search interface in RootsAndStems

---

## 4. STATE MANAGEMENT (PINIA STORES)

### Dictionary-Specific Stores

- **`/Users/evb/WebstormProjects/newsite3/src/pinia/simpleDictStore.ts`**
    - Manages dictionary search state
    - Configuration for supported dictionaries:
        ```typescript
        [Language.maalula]: [
            {
                key: 'arnold',
                title: 'Arnold',
                isChosen: true,
                translationLanguage: TranslationLanguage.German,
            },
        ]
        ```
    - State: `searcher`, `initialDicts`, `dictData`, `searcherString`, `chosenDictionaries`, `matchingDictLinesArr`
    - Loads dictionary data from assets (`maalulaDictsJson` or `turoyoDictsJson`)

- **`/Users/evb/WebstormProjects/newsite3/src/pinia/bookStore.ts`**
    - Manages PDF book metadata and caching
    - Book definition for Arnold:
        ```typescript
        {
            title: 'Das Neuwestaramäische. VI. Wörterbuch',
            shortTitle: 'Arnold. NWA Wörterbuch',
            key: 'arnold',
            author: 'Werner Arnold',
            year: 2019,
            linkBase: 'https://evb0110.github.io/static/pdf/Arnold-Woerterbuch/pg_',
            pageCount: 1035,
            getPageNumber: [function],
            getPageString: [function],
        }
        ```
    - Features:
        - Async computed books list with hash generation
        - `getUintPromise()` for fetching PDF pages as Uint8Array
        - Caching using IndexedDB (`bookStore` database)
        - Automatic page number conversion (Arabic ↔ Roman numerals)
        - Pre-fetches adjacent pages
    - Page URL format: `https://evb0110.github.io/static/pdf/Arnold-Woerterbuch/pg_XXXX.pdf`

- **`/Users/evb/WebstormProjects/newsite3/src/pinia/maalulaVerbalStore.ts`**
    - Manages Maalula verbal roots and perfects tabs
    - State: `tab` (0=roots, 1=perfects), `tabData`
    - Asset mapping:
        - Tab 0 → `AssetName.maalulaVerbalRoots`
        - Tab 1 → `AssetName.maalulaPerfects`

### Asset Management

- **`/Users/evb/WebstormProjects/newsite3/src/pinia/assetsStore.ts`**
    - Centralized asset loading system
    - Uses `useGetResource` composable for lazy loading
    - Returns asset metadata + loaded data
    - Assets configuration from `configs/assets.ts`

### Search/Corpus Stores

- **`/Users/evb/WebstormProjects/newsite3/src/pinia/simpleCorpusStore.ts`**
    - Dictionary corpus search state

- **`/Users/evb/WebstormProjects/newsite3/src/pinia/corpusWithTranslationStore.ts`**
    - Corpus search with translation support

---

## 5. ASSET CONFIGURATION

- **`/Users/evb/WebstormProjects/newsite3/src/configs/assets.ts`**
    - Central registry of all assets including dictionary data
    - Asset definitions:
        ```typescript
        [AssetName.maalulaDictsJson]: {
            filename: 'maalulaDicts.json',
        },
        [AssetName.maalulaVerbalRoots]: {
            filename: 'maalulaVerbalRoots.json',
        },
        [AssetName.maalulaPerfects]: {
            filename: 'maalulaPerfects.json',
        },
        [AssetName.maalulaCorpusJson]: {
            filename: 'maalulaCorpus.json',
        },
        ```
    - Asset folder: `https://evb0110.github.io/static/`
    - All data loaded from GitHub static host

---

## 6. ROUTING CONFIGURATION

- **`/Users/evb/WebstormProjects/newsite3/src/router.ts`**
    - Route hierarchy:

        ```
        /maalula (MaalulaRouter)
          ├── /corpus (MaalulaCorpus)
          ├── /rootsandstems (MaalulaRootsAndStems)
          ├── /tables (MaalulaTables)
          ├── /dictionaries (MaalulaDictionaries)
          ├── /masc (MASCBrowser)
          └── /masc/:textId (MASCViewer)

        /library (LibraryRouter)
          ├── /list (BookList)
          └── /book/:hash (Book - PDF viewer)
        ```

---

## 7. MODELS & CLASSES

- **`/Users/evb/WebstormProjects/newsite3/src/models/Stem.ts`**
    - `Stem` class for verb stem selection
    - Properties: `number`, `state` (any/yes/no)
    - Methods: `setOption()`, styling functions
    - Used in RootsAndStems for stem filtering

- **`/Users/evb/WebstormProjects/newsite3/src/models/StemCollection.ts`**
    - Collection of Stem objects for filtering
    - Methods: `setOption()`, regex generation, state management
    - Separates positive/negative filter regex patterns

---

## 8. UTILITIES & COMPOSABLES

- **`/Users/evb/WebstormProjects/newsite3/src/composables/useGetResource.ts`**
    - Lazy-loads assets from remote URLs
    - Returns: `data`, `isLoading`, `error`
    - Used by AssetsStore for all dictionary data

- **`/Users/evb/WebstormProjects/newsite3/src/composables/useSearcher.ts`**
    - Regex search state management
    - Converts search strings to regex patterns

- **`/Users/evb/WebstormProjects/newsite3/src/composables/useLetters.ts`**
    - Character/letter handling utilities
    - Related to Maalula character buttons

- **`/Users/evb/WebstormProjects/newsite3/src/composables/useScale.ts`**
    - PDF zoom level management
    - Used by PdfPageViewer for fit-to-width/height

- **`/Users/evb/WebstormProjects/newsite3/src/composables/useLanguage.ts`**
    - Language context (maalula, turoyo, urmi)

---

## 9. CONSTANTS & LANGUAGE

- **`/Users/evb/WebstormProjects/newsite3/src/constants/Language.ts`**
    - Language enum: `turoyo`, `urmi`, `maalula`

- **`/Users/evb/WebstormProjects/newsite3/src/constants/RouterName.ts`**
    - Route name constants including:
        - `MaalulaRouter`
        - `MaalulaCorpus`
        - `MaalulaRootsAndStems`
        - `MaalulaTables`
        - `MaalulaDictionaries`
        - `Book`
        - `BookList`

---

## 10. DATA SOURCE & HOSTING

- **Dictionary Data Location**: `https://evb0110.github.io/static/maalulaDicts.json`
- **PDF Location**: `https://evb0110.github.io/static/pdf/Arnold-Woerterbuch/pg_XXXX.pdf`
    - XXXX = 4-digit zero-padded page number (1-1035 pages)
- **Verbal Roots**: `https://evb0110.github.io/static/maalulaVerbalRoots.json`
- **Perfects**: `https://evb0110.github.io/static/maalulaPerfects.json`
- **Corpus**: `https://evb0110.github.io/static/maalulaCorpus.json`

---

## 11. KEY FEATURES SUMMARY

### Dictionary Search

- Text-based search with regex support
- Dictionary selection (currently only Arnold for Maalula)
- Infinite scroll result pagination
- Result highlighting with search context
- Translation language indication (German for Arnold)

### PDF Viewer

- Full-featured PDF navigation and zoom
- Page caching with IndexedDB
- Support for Roman numeral page numbering
- Fullscreen capability
- Responsive design with drag-scroll

### Verbal Forms Browser

- Stem-based filtering (8 stem types + variants)
- Character-button based search
- Dual-tab interface (Roots/Stems + Perfects)
- Live result filtering

### Reference Tables

- Morphological reference tables
- Noun states (definite/indefinite)
- Adjective forms
- Tabbed interface for easy switching

---

## 12. DEPENDENCIES

- **PDF Rendering**: `pdfjs-dist` (v4.10.38)
- **State Management**: `pinia`
- **UI Framework**: `vuetify`
- **Router**: `vue-router`
- **Utilities**: `lodash`, `roman-numerals`
- **Storage**: Browser IndexedDB via IDB service

---

## 13. FILE STRUCTURE SUMMARY

```
newsite3/src/
├── pages/
│   ├── maalula/
│   │   ├── Dictionaries.vue
│   │   ├── RootsAndStems.vue
│   │   ├── Tables.vue
│   │   ├── Corpus.vue
│   │   └── MaalulaRouter.vue
│   └── library/
│       ├── Book.vue
│       ├── BookList.vue
│       └── LibraryRouter.vue
├── components/
│   ├── corpusSimple/
│   │   ├── DictsSearch.vue
│   │   ├── Searcher.vue
│   │   ├── SearchResults.vue
│   │   └── CorpusSearch.vue
│   ├── corpusWithTranslation/
│   │   ├── LineCard.vue
│   │   ├── GrepLine.vue
│   │   └── BrowseAndSearch.vue
│   ├── pdf/
│   │   └── PdfPageViewer.vue
│   └── common/
│       ├── SimpleTable.vue
│       ├── InfiniteScroll.vue
│       └── GrepMultiline.vue
├── pinia/
│   ├── simpleDictStore.ts
│   ├── maalulaVerbalStore.ts
│   ├── bookStore.ts
│   ├── assetsStore.ts
│   ├── simpleCorpusStore.ts
│   └── corpusWithTranslationStore.ts
├── data/
│   ├── maalulaTables.ts
│   └── maalulaButtons.ts
├── configs/
│   └── assets.ts
├── constants/
│   ├── Language.ts
│   └── RouterName.ts
├── models/
│   ├── Stem.ts
│   └── StemCollection.ts
├── composables/
│   ├── useGetResource.ts
│   ├── useSearcher.ts
│   ├── useLetters.ts
│   ├── useScale.ts
│   └── useLanguage.ts
└── router.ts
```
