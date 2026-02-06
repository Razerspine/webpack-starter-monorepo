# Changelog

## [0.2.3] - 2026-02-06

### Added
- Explicit mono-repo metadata for npm publishing (`repository.directory`, `homepage`, `bugs`)

### Changed
- Updated documentation links to use absolute GitHub URLs for mono-repo compatibility
- Improved README navigation reliability on npm registry

### Notes
- This release stabilizes documentation visibility for mono-repo setups
- No functional changes to CLI behavior


## [0.2.2] - 2026-02-06

### Fixed 
- **Documentation links** in `README.md` now resolve correctly on npm and GitHub; paths updated.

### Notes
- Republished package as **0.2.2**.

## [0.2.1] - 2026-02-06

### Added
- Documentation section to README
- Initial `docs/` directory with usage and templates overview

### Changed
- Included `docs`, `README.md`, `LICENSE`, and `CHANGELOG.md` in npm package


## [0.2.0] - 2026-02-06

### Added
- Initial public release of `create-webpack-starter`
- Interactive CLI for creating webpack projects
- Support for Pug templates
- SCSS / Less styles
- JavaScript and TypeScript variants
- Automatic dependency installation

### Notes
- Designed to work with `@razerspine/webpack-core`
- Requires Node.js >= 18
