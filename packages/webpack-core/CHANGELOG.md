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

## [1.0.6] - 2026-02-05

### Fixed
- Fixed webpack plugin instance mismatch when used via npm link
- Moved webpack-dev-server and pug-plugin to peerDependencies
- Ensured a single webpack instance is used in consumer templates

## [1.0.7] - 2026-02-05

### Fixed
- Fixed Pug asset resolution in production mode
- Passed webpack resolve.alias to pug-plugin resolver
- Ensured consistent alias behavior between development and production builds

## [1.0.8] - 2026-02-05

### Fixed
- Fix webpack resolve.alias

## [1.0.9] - 2026-02-05

### Fixed
- remove entry from prod config
- fix prod configuration


## [1.1.0] - 2026-02-05

### Fixed
- fix base config for build production

## [1.1.1] - 2026-02-05

### Fixed
- fix pug plugin for template loader
