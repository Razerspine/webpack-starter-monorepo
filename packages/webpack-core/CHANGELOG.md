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


## [1.0.4] - 2026-02-04

### Fixed
- Fixed TypeScript typing for webpack-dev-server configuration
- Properly extended webpack Configuration with devServer types


## [1.0.5] - 2026-02-04
### Fixed
- Fixed webpack default entry resolution causing "./src" lookup
- Explicitly disabled webpack entry to support pug-plugin driven builds
- Ensured consistent behavior for development and production modes
