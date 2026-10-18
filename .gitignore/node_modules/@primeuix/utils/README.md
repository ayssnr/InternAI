# PrimeUIX Utils

Low-level utility functions shared across PrimeUI libraries. Covers the DOM, object comparison and transformation, class name merging, event bus, UUID generation, z-index management, and prop merging. Each domain is a separate subpath so bundlers can tree-shake unused areas.

```ts
import { find, addClass, getOffset, getFocusableElements } from '@primeuix/utils/dom';
import { deepMerge, resolveFieldData, isEmpty, toCamelCase } from '@primeuix/utils/object';
import { cn } from '@primeuix/utils/classnames';
import { EventBus } from '@primeuix/utils/eventbus';
import { ZIndex } from '@primeuix/utils/zindex';
```

**DOM** covers element queries, position and offset calculations, CSS class helpers, scroll utilities, hidden element dimension detection, browser detection, and transition/animation presence checks.

**Object** covers deep and shallow equality, deep merge, field resolution by dot-path, type guards (`isArray`, `isDate`, `isEmpty`), array helpers, and string case converters (`toCamelCase`, `toKebabCase`, `toFlatCase`).

**Class names** — `cn()` accepts strings, arrays, and `{ className: boolean }` objects and merges them into a single string.

**EventBus** is a lightweight pub/sub for cross-package communication without framework dependencies.

**ZIndex** is a stacking context tracker that assigns and releases z-index values in the correct order for overlapping overlays.

## License

Licensed under the [PrimeUI License](https://primeui.dev/licenses) - Copyright (c) [PrimeTek Informatics](https://www.primetek.com.tr)
