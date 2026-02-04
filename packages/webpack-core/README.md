# @razerspine/webpack-core

Core webpack configuration and loaders used by Razerspine templates.

## Features

- Pug templates support
- JS / TS scripts
- SCSS / Less styles
- Environment-aware loaders
- No aliases or UI-kit hardcoded

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
