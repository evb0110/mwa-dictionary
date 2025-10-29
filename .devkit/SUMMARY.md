# Maalula Arnold Dictionary - Quick Reference

## Project Location

`/Users/evb/WebstormProjects/newsite3`

## Dictionary Access Points

### User Interfaces

1. **Dictionary Search** - `/maalula/dictionaries`
    - Component: DictsSearch.vue
    - Features: Text search, dictionary selection, result pagination

2. **Verb Browser** - `/maalula/rootsandstems`
    - Component: RootsAndStems.vue
    - Features: Stem filtering, character buttons, dual tabs (roots/perfects)

3. **Reference Tables** - `/maalula/tables`
    - Component: Tables.vue
    - Contains: Stems, perfects, noun states, adjective forms

4. **Corpus** - `/maalula/corpus`
    - Component: Corpus.vue (wraps BrowseAndSearch)

5. **PDF Viewer** - `/library/book/:hash`
    - Component: Book.vue + PdfPageViewer.vue
    - Features: Navigation, zoom, fullscreen, page caching

## Arnold Dictionary Metadata

- **Title**: Das Neuwestaramäische. VI. Wörterbuch
- **Author**: Werner Arnold
- **Year**: 2019
- **Pages**: 1035
- **Key**: `arnold`
- **PDF Base URL**: https://evb0110.github.io/static/pdf/Arnold-Woerterbuch/pg_

## Key Files by Category

### Pages (Vue Components)

```
/maalula/
  - Dictionaries.vue (search interface)
  - RootsAndStems.vue (verb browser)
  - Tables.vue (reference tables)
  - Corpus.vue (corpus search)
  - MaalulaRouter.vue (layout)

/library/
  - Book.vue (PDF viewer)
  - BookList.vue (book list)
  - LibraryRouter.vue (layout)
```

### Components

```
corpusSimple/
  - DictsSearch.vue (dictionary search UI)
  - Searcher.vue (search input)
  - SearchResults.vue (results with pagination)
  - CorpusSearch.vue (full corpus interface)

corpusWithTranslation/
  - BrowseAndSearch.vue (combined browse/search)
  - LineCard.vue (result card with Arnold mapping)
  - GrepLine.vue (highlighted line display)

pdf/
  - PdfPageViewer.vue (PDF viewer with pdfjs-dist)
```

### State Management (Pinia)

```
simpleDictStore.ts - Dictionary search state & config
bookStore.ts - PDF metadata & caching
maalulaVerbalStore.ts - Roots/perfects tabs
assetsStore.ts - Asset loading system
simpleCorpusStore.ts - Corpus search state
corpusWithTranslationStore.ts - Corpus with translations
```

### Configuration & Data

```
configs/assets.ts - Asset registry
data/maalulaTables.ts - Reference tables
data/maalulaButtons.ts - Character set
constants/Language.ts - Language enum
router.ts - Route definitions
```

## Data Sources (GitHub Static)

- Dictionary: `maalulaDicts.json`
- Verbal Roots: `maalulaVerbalRoots.json`
- Perfects: `maalulaPerfects.json`
- Corpus: `maalulaCorpus.json`
- PDFs: `pdf/Arnold-Woerterbuch/pg_0001.pdf` to `pg_1035.pdf`

## PDF Viewer Features

- Page navigation (first/prev/next/last)
- Zoom in/out + fit to width/height
- Roman numeral support (for Arnold frontmatter)
- IndexedDB caching with adjacent page prefetch
- Fullscreen mode
- Drag-scroll support

## Dictionary Search Features

- Regex pattern matching
- Multi-dictionary support (Arnold for Maalula)
- Infinite scroll pagination
- Translation language display (German for Arnold)
- Page number extraction and linking to PDF viewer

## Related Languages

- Turoyo: Dictionaries (Ritter, Jastrow)
- Urmi: Dictionary, corpus
- All share same architecture with language-specific assets

## Development Notes

- Framework: Vue 3 + TypeScript
- State: Pinia
- UI: Vuetify
- PDF: pdfjs-dist v4.10.38
- Storage: Browser IndexedDB for PDF caching
