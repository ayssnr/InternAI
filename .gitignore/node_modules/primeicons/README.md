# primeicons

[![npm version](https://badge.fury.io/js/primeicons.svg)](https://badge.fury.io/js/primeicons)
[![npm downloads](https://img.shields.io/npm/dm/primeicons.svg)](https://www.npmjs.com/package/primeicons)
[![Discord Chat](https://img.shields.io/discord/557940238991753223.svg?color=7289da&label=chat&logo=discord)](https://discord.gg/gzKFYnpmCY)

PrimeIcons is the default icon library for [PrimeFaces](https://www.primefaces.org), [PrimeNG](https://primeng.org), [PrimeReact](https://primereact.org), and [PrimeVue](https://primevue.org) UI component libraries.

This package provides 300+ icons as a **CSS font icon library**.

> **Looking for SVG components?** Check out our framework-specific packages:
>
> - [@primeicons/react](https://www.npmjs.com/package/@primeicons/react) - React components
> - [@primeicons/vue](https://www.npmjs.com/package/@primeicons/vue) - Vue 3 components
> - [@primeicons/angular](https://www.npmjs.com/package/@primeicons/angular) - Angular components
> - [@primeicons/svelte](https://www.npmjs.com/package/@primeicons/svelte) - Svelte components
> - [@primeicons/solid](https://www.npmjs.com/package/@primeicons/solid) - Solid.js components
> - [@primeicons/lit](https://www.npmjs.com/package/@primeicons/lit) - Lit web components

## Installation

```bash
npm install primeicons
# or
pnpm add primeicons
# or
yarn add primeicons
```

## Usage

### Import CSS

```css
/* In your main CSS file */
@import 'primeicons/primeicons.css';
```

Or in JavaScript/TypeScript:

```javascript
import 'primeicons/primeicons.css';
```

### Use Icons

```html
<i class="pi pi-check"></i>
<i class="pi pi-times"></i>
<i class="pi pi-search"></i>
<i class="pi pi-user"></i>
```

## Sizing

Use `font-size` to change the icon size:

```html
<i class="pi pi-check" style="font-size: 1rem"></i>
<!-- 16px -->
<i class="pi pi-check" style="font-size: 1.5rem"></i>
<!-- 24px -->
<i class="pi pi-check" style="font-size: 2rem"></i>
<!-- 32px -->
<i class="pi pi-check" style="font-size: 3rem"></i>
<!-- 48px -->
```

## Spinning

Add the `pi-spin` class to create a spinning icon:

```html
<i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i> <i class="pi pi-spin pi-cog" style="font-size: 2rem"></i>
```

## Coloring

Icons inherit the current text color. Use CSS `color` property to customize:

```html
<i class="pi pi-check" style="color: green"></i>
<i class="pi pi-times" style="color: red"></i>
<i class="pi pi-exclamation-triangle" style="color: orange"></i>
```

## What's Included

```
primeicons/
├── fonts/              # Webfont files (woff2, woff, ttf, eot)
├── raw-svg/            # Original SVG source files
├── primeicons.css      # Main CSS file
└── selection.json      # IcoMoon configuration
```

## Icon List

The library includes 300+ icons. View the complete list at [primeicons.dev](https://primeicons.dev).

Common icons include:

- **Navigation**: `pi-arrow-left`, `pi-arrow-right`, `pi-chevron-up`, `pi-chevron-down`
- **Actions**: `pi-search`, `pi-plus`, `pi-minus`, `pi-check`, `pi-times`
- **Objects**: `pi-home`, `pi-user`, `pi-cog`, `pi-file`, `pi-folder`
- **Social**: `pi-facebook`, `pi-twitter`, `pi-github`, `pi-linkedin`
- **Media**: `pi-play`, `pi-pause`, `pi-stop`, `pi-volume-up`

## CDN Usage

You can also use PrimeIcons via CDN:

```html
<link rel="stylesheet" href="https://unpkg.com/primeicons/primeicons.css" />
```

## Framework Integration

### With PrimeNG (Angular)

```typescript
// angular.json
"styles": [
    "node_modules/primeicons/primeicons.css",
    // ...
]
```

### With PrimeReact

```javascript
// App.js or index.js
import 'primeicons/primeicons.css';
```

### With PrimeVue

```javascript
// main.js
import 'primeicons/primeicons.css';
```

## License

Licensed under the [PrimeUI License](https://primeui.dev/licenses) - Copyright (c) [PrimeTek Informatics](https://www.primetek.com.tr)
