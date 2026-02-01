# create-webpack-starter

Create a modern webpack project using ready-to-use templates.

## Usage

```bash
npx create-webpack-starter my-app
```

With options:

```bash
npx create-webpack-starter my-app \
--template pug-scss-ts \
--no-install
```

## Options

| Option              | Description                     |
| ------------------- | ------------------------------- |
| `--template <name>` | Skip prompt and select template |
| `--no-install`      | Skip dependency installation    |
| `--dry-run`         | Show what would be done         |

## Available templates
* pug-less-js
* pug-less-ts
* pug-scss-js
* pug-scss-ts

## Requirement
* Node.js >= 18
* npm/ pnpm/ yarn

## How it works
1. CLI copies the selected template
2. Template files are written to the target directory
3. Dependencies are installed (unless disabled)
4. Project is ready to use
