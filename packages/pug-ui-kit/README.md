# @razerspine/pug-ui-kit

A professional, full-featured UI Kit for Pug (Jade) templates, including flexible mixins and complete styling support (SCSS/LESS).
Designed to work seamlessly with the [Webpack Starter Monorepo](https://github.com/Razerspine/webpack-starter-monorepo)

## 📦 Installation

This package is automatically included in templates generated via the CLI. To install it manually:

```bash
npm install @razerspine/pug-ui-kit
```

## 🛠 Webpack Configuration

### 1. Webpack (Pug Mixins)

To avoid complex relative paths, use the includePaths provided by the package:

```js
const uiKit = require('@razerspine/pug-ui-kit');

module.exports = {
  // ...
  resolve: {
    alias: {
      // Points to the directory containing all .pug mixins
      'pug-ui-kit': uiKit.paths.mixins,
    },
  },
};
```

### 2. Styles (SCSS/LESS)
The package provides full styling for all components.

#### For SCSS:

```scss
// In your main.scss
@use "@razerspine/pug-ui-kit/scss/ui-kit" as *;
```

#### For LESS:

```less
// In your main.less
@import "@razerspine/pug-ui-kit/less/ui-kit";
```

## 🚀 Usage

#### Button

```pug
include ~pug-ui-kit/btn.pug

+btn('Save', 'primary', 'small', { type: 'submit' })
```

#### Data Table (New in v1.1.0)

```pug
include ~pug-ui-kit/data-table.pug

- const data = [{id: 1, name: 'Alice'}, {id: 2, name: 'Bob'}];

+dataTable(users, ['id', 'name'], {
  showIndex: true,
  labels: { name: 'Full Name' },
  actions: [
    { 
      label: 'Edit', 
      class: 'btn-edit', 
      url: (item) => `/users/edit/${item.id}` 
    }
  ]
})
```

#### Form Input

```pug
include ~pug-ui-kit/form-input.pug

+formInput('text', 'name', 'Name', 'Enter your name', 'name')
```

#### Form Textarea

```pug
include ~pug-ui-kit/form-textarea.pug

+formTextarea('message', 'Message', 'Type your message...', 'message')
```

#### Input Checkbox

```pug
include ~pug-ui-kit/input-checkbox.pug

+inputCheckbox('agree', 'I agree to all terms')
```

#### Input Radio

```pug
include ~pug-ui-kit/input-radio.pug

.form-group
  .input-group
    span.form-label.w-100 Communication method
    +inputRadio('contact-email', 'Email', 'contact', 'email')
    +inputRadio('contact-phone', 'Phone', 'contact', 'phone')
```

#### Single Select

```pug
include ~pug-ui-kit/single-select.pug

+singleSelect('topic', 'Topic', [
  {value:'support', text:'Support'},
  {value:'feedback', text:'Feedback'},
  {value:'other', text:'Other'}
])
```

## 📂 Package Structure

* mixins/ - reusable Pug components. 
* scss/ - complete SCSS kit (Settings, Components, Themes, Layout). 
* less/ - complete LESS version for alternative workflows. 
* index.js - path resolution helper.

## 🧱 Components Included

* btn.pug
* data-table.pug
* form-input.pug
* form-textarea.pug
* input-checkbox.pug
* input-radio.pug
* single-select.pug

## 📄 License
This project is licensed under the ISC License.
