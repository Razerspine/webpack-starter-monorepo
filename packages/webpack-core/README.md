# @razerspine/webpack-core


Core webpack configuration and loaders for modern Pug-based projects.

## Designed for

This package is developed as part of the
[Webpack Starter Monorepo](https://github.com/Razerspine/webpack-starter-monorepo).

It provides shared webpack configuration and loaders used by the
starter templates, but can also be used independently in custom setups.

## Features

- Pug templates support
- JS / TS scripts
- SCSS / Less styles
- Environment-aware loaders
- No aliases or UI-kit hardcoded

## Installation
```bash
npm i @razerspine/webpack-core
```

## Usage

```js
const {
  createBaseConfig,
  createDevConfig,
  createProdConfig
} = require('@razerspine/webpack-core');

module.exports = (env, argv) => {
  const mode = argv.mode || 'development';

  return {
    ...createBaseConfig({
      root: process.cwd(),
      env: {
        mode,
        script: 'js',
        style: 'scss'
      },
      templates: {
        entry: 'src/views/pages'
      }
    }),

    ...(mode === 'development'
      ? createDevConfig()
      : createProdConfig())
  };
};
```

## 📄 License
This project is licensed under the ISC License.
