# webpack-core

`@razerspine/webpack-core` is the foundation used by all templates.

It provides a **stable, minimal, and production-safe webpack configuration**
focused on template-driven builds.

---

## Design principles

- Webpack is responsible for module resolution
- `pug-plugin` is responsible only for templates
- No implicit JS entry (`./src`) fallback
- No aggressive optimizations by default
- Aliases are resolved by webpack, not by plugins

---

## Responsibilities

### webpack-core
- loaders (scripts, styles, assets)
- resolve.alias
- environment handling
- dev / prod separation

### Templates
- project structure
- aliases
- UI kit integration
- concrete paths

---

## Why no splitChunks by default?

During real-world testing, aggressive chunk splitting caused:
- broken Pug asset resolution
- unexpected entry lookups
- unstable production builds

You can still enable it manually if needed.

---

## Usage example

```js
const { createBaseConfig } = require('@razerspine/webpack-core');

createBaseConfig({
  mode: 'development',
  scripts: 'js',
  styles: 'scss',
  templates: {
    entry: 'src/views/pages'
  },
  resolve: {
    alias: {
      '@images': path.resolve('src/assets/images')
    }
  }
});
```
