# webpack-starter-monorepo

Monorepo for `create-webpack-starter` CLI and official webpack starter templates.

## Packages

```text
packages/
├─ create-webpack-starter    # CLI — npx create-webpack-starter
└─ templates                 # Official project templates
   ├─ pug-less-js
   ├─ pug-less-ts
   ├─ pug-scss-js
   └─ pug-scss-ts
```

## Philosophy

This repository follows a strict separation of responsibilities.

### CLI responsibilities

- user interaction (prompts, flags)
- template selection
- file copying
- dependency installation

### Template responsibilities

- fully standalone projects
- production-ready setup
- editable after generation
- no runtime dependency on the CLI

No hidden magic.  
No runtime coupling.  
Generated projects are yours forever.

## Development

This repository uses npm workspaces.

Install all workspace dependencies:
```bash
npm install
```

Build all packages:

```bash
npm run build
```

Local CLI testing:

```bash
npm run dev:cli
```

End users should use

```bash
npx create-webpack-starter
```
