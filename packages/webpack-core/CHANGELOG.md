### Changed
- Updated README.md

## [1.0.2] - 2026-02-04

### Fixed
- **ENV mode**: change option type, fix base config.

## [1.0.3] - 2026-02-04

### Fixed
- Fixed webpack default entry fallback (`./src`) by explicitly setting empty `entry` in base config
- Prevented webpack from resolving non-existing JS entry when using `pug-plugin`
- Stabilized template entry handling via `templatesLoader`

### Internal
- Clarified responsibility between webpack entry and PugPlugin entry
