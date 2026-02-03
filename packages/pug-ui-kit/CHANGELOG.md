## [1.0.1] - 2026-02-03

### Changed
- **dataTable**: Refactored the `dataTable` mixin to improve configuration consistency.
- **dataTable**: The `options` parameter now accepts an `actions` array to define row actions (links/buttons) dynamically.

### Removed
- **dataTable**: Removed support for the Pug `block` (slot) content for rendering actions. The `showActions` boolean option has also been removed.

### Migration Guide
If you were using the block content for actions:
```pug
// Old version (v1.0.0)
+dataTable(items, cols, { showActions: true })
  a(href=`/edit/${item.id}`) Edit
```
You should now update to:

```pug
// New version (v1.0.1)
+dataTable(items, cols, {
  actions: [
    { label: 'Edit', url: (item) => `/edit/${item.id}` }
  ]
})
```
