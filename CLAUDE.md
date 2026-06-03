# MWA Dictionary Rules

- Source dictionary data from the sibling `../aramaictexts` project.
- Split entries on page markers such as `{стр. 73}`.
- Treat `++` markers as data issues that may separate entries.
- Guard IndexedDB, PDF.js, and other browser-only APIs behind browser-environment checks.
