# @primeicons/core

Core utilities, types, and icon data for the PrimeIcons library.

## Installation

```bash
npm install @primeicons/core
# or
pnpm add @primeicons/core
# or
yarn add @primeicons/core
```

## Usage

### Types

```typescript
import type { IconData, IconProps, IconSvgProps, IconNode, IconNodes } from '@primeicons/core';
```

### Icon Data

```typescript
// Import specific icon data
import { search } from '@primeicons/core/icons/search';
import { home } from '@primeicons/core/icons/home';

// Import all icons
import * as icons from '@primeicons/core/icons';
```

### Icon Metadata & Manifest

Icon metadata (including tags and component references) is now centralized in the `@primeicons/metadata` package. Each framework package re-exports this data for convenience:

```typescript
// For React
import { ICON_MAP, findIcons } from '@primeicons/metadata/react';

// For Vue
import { ICON_MAP, findIcons } from '@primeicons/metadata/vue';

// For Angular
import { ICON_MAP, findIcons } from '@primeicons/metadata/angular';

// And so on for other frameworks...
```

See the framework-specific packages for detailed usage.

## Metadata & Manifest

Icon metadata has been centralized in the `@primeicons/metadata` package. This includes:

- **Icon names** (kebab-case and camelCase)
- **Component references** (lazy-loaded, framework-specific)
- **Searchable tags** (from `selection.json`)
- **Import paths** for each framework

Each framework package re-exports the metadata for its ecosystem, so you can access it through:

```typescript
import { ICON_MAP, ICON_MAP_BY_NAME, findIcons } from '@primeicons/metadata/react';
import { ICON_MAP, ICON_MAP_BY_NAME, findIcons } from '@primeicons/metadata/vue';
import { ICON_MAP, ICON_MAP_BY_NAME, findIcons } from '@primeicons/metadata/angular';
// ... and so on
```

## API Reference

### Types

#### `IconProps`

Common properties for icon components:

```typescript
interface IconProps {
    size?: number | string; // Icon size (width & height)
    color?: string; // Icon color
    class?: string; // CSS class
    className?: string; // CSS class (React style)
    style?: string | Record<string, string>; // Inline styles
}
```

#### `IconSvgProps`

SVG wrapper defaults parsed from original SVG files:

```typescript
interface IconSvgProps {
    xmlns: string; // SVG namespace
    width: number; // Default width (e.g., 24)
    height: number; // Default height (e.g., 24)
    viewBox: string; // ViewBox (e.g., '0 0 24 24')
    fill: string; // Fill value (e.g., 'none')
}
```

#### `IconData`

Structure of icon data:

```typescript
interface IconData {
    name: string; // Icon name (kebab-case)
    meta?: IconMeta; // Optional metadata
    svg: IconSvgProps; // SVG wrapper defaults
    nodes: IconNodes; // SVG child elements
}
```

#### `IconNode`

SVG element definition:

```typescript
type IconNode = [string, IconNodeAttributes];
// Example: ['path', { d: 'M12 5v14', fill: 'currentColor' }]
```

### Manifest Structure

The metadata is organized with the following structure:

```typescript
interface IconMapEntry {
    name: string; // kebab-case icon name
    camelName: string; // camelCase version
    as: string; // PascalCase component name
    component: () => any; // Lazy-loaded component reference
    from: string; // Import path
    tags: string[]; // Searchable tags from selection.json
}
```

### Metadata API

All framework packages export:

```typescript
// Import the metadata
import {
    ICON_MAP, // Array of all icons with metadata
    ICON_MAP_BY_NAME, // Indexed by kebab-case name
    ICON_MAP_BY_COMPONENT, // Indexed by component name
    ICON_MAP_BY_CAMEL, // Indexed by camelCase name
    TOTAL_ICONS, // Total icon count
    PACKAGE_INFO, // Package metadata
    getIconNames, // Get all kebab-case names
    getComponentNames, // Get all component names
    findIcons // Search icons by query
} from '@primeicons/{framework}/manifest';
```

See individual framework packages for detailed examples.

## Icon List

The library includes 300+ icons. View the complete list at [primeicons.dev](https://primeicons.dev).

## License

Licensed under the [PrimeUI License](https://primeui.dev/licenses) - Copyright (c) [PrimeTek Informatics](https://www.primetek.com.tr)
