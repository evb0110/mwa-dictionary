# Maalula Arnold Dictionary - Exploration Results

This directory contains comprehensive documentation of all code related to the Maalula Arnold dictionary implementation in the newsite3 project.

## Documentation Files

### 1. **SUMMARY.md** (Quick Reference)

Start here for a quick overview. Contains:

- Dictionary access points and user interfaces
- Arnold dictionary metadata
- Key files organized by category
- Feature summary
- Development stack

### 2. **maalula-arnold-dictionary-findings.md** (Comprehensive Guide)

Detailed technical documentation including:

- Complete section-by-section breakdown
- All page components with descriptions
- All component descriptions and responsibilities
- Data file contents and purposes
- Pinia store explanations
- Configuration details
- Routing hierarchy
- Models and classes
- Utilities and composables
- Constants
- Data sources and hosting
- Key features summary
- Dependencies
- Full file structure diagram

### 3. **FILES_WITH_ABSOLUTE_PATHS.md** (Complete File Listing)

Easy reference with all absolute file paths:

- Pages (Vue components)
- Components (by category)
- State management stores
- Data and configuration files
- Constants and language files
- Models and classes
- Composables and utilities
- External data sources
- Entry points and key configuration

## Project Overview

**Location**: `/Users/evb/WebstormProjects/newsite3`

**Framework**: Vue 3 + TypeScript

**State Management**: Pinia

**UI Framework**: Vuetify

**PDF Library**: pdfjs-dist (v4.10.38)

## Key Components

### Dictionary Search System

- Text-based search with regex support
- Multi-dictionary support (Arnold is only dictionary for Maalula)
- Infinite scroll pagination
- Result highlighting with context
- Translation language display (German for Arnold)

### PDF Viewer

- Comprehensive PDF navigation and zoom
- Page caching with IndexedDB
- Support for Roman numeral page numbering
- Fullscreen capability
- Responsive design

### Verbal Forms Browser

- Stem-based filtering (I-IV + variants)
- Character-button interface
- Dual-tab view (Roots and Perfects)
- Live result filtering

### Reference Tables

- Morphological reference data
- Noun states and adjective forms
- Tabbed interface

## Arnold Dictionary Details

- **Full Title**: Das Neuwestaramäische. VI. Wörterbuch
- **Author**: Werner Arnold
- **Year**: 2019
- **Pages**: 1035
- **Key**: `arnold`
- **PDF Base**: https://evb0110.github.io/static/pdf/Arnold-Woerterbuch/pg_XXXX.pdf

## Data Sources

All data hosted on GitHub static: `https://evb0110.github.io/static/`

- Dictionary entries: `maalulaDicts.json`
- Verbal roots: `maalulaVerbalRoots.json`
- Perfects: `maalulaPerfects.json`
- Corpus: `maalulaCorpus.json`
- PDFs: Individual pages (pg_0001.pdf through pg_1035.pdf)

## Main Routes

1. `/maalula/dictionaries` - Dictionary search interface
2. `/maalula/rootsandstems` - Verb roots and stems browser
3. `/maalula/tables` - Reference tables
4. `/maalula/corpus` - Corpus search
5. `/library/list` - Book/dictionary list
6. `/library/book/:hash` - PDF viewer

## Architecture

The implementation uses a modular architecture:

- **Pages**: Top-level route components
- **Components**: Reusable UI components
- **Pinia Stores**: Centralized state management
- **Composables**: Shared logic and utilities
- **Models**: Data classes (Stem, StemCollection)
- **Data**: Static data files and tables
- **Config**: Asset and route configuration
- **Constants**: Enums and constants

## Related Languages

The same architecture is used for:

- **Turoyo**: Ritter, Jastrow dictionaries
- **Urmi**: Dictionary and corpus
- **Maalula**: Arnold dictionary (primary focus)

## To Explore Further

1. Start with `SUMMARY.md` for quick orientation
2. Refer to `FILES_WITH_ABSOLUTE_PATHS.md` for file locations
3. Consult `maalula-arnold-dictionary-findings.md` for detailed information
4. Open files directly from the absolute paths provided

All paths are absolute and ready to use with your IDE or file editor.
