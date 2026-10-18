# PrimeUIX Styled

Theme runtime for PrimeUI libraries. Resolves `dt('token.path')` references against the active preset, generates CSS variables, and injects component styles into the document. This is the runtime bridge between `@primeuix/themes` (which defines token values) and `@primeuix/styles` (which defines component CSS).

```ts
import { usePreset, definePreset, updatePrimaryPalette } from '@primeuix/styled';
import Aura from '@primeuix/themes/aura';

usePreset(Aura);

// Extend an existing preset at runtime
const custom = definePreset(Aura, {
    semantic: { primary: { 500: '#6366f1' } }
});
usePreset(custom);

// Swap the primary palette
updatePrimaryPalette({ 500: '#6366f1', 600: '#4f46e5' });
```

Theme options control the CSS variable prefix, dark mode selector, CSS layer ordering, and whether variables are emitted globally or per component. The `light-dark()` CSS function is the standard way to express dual-mode values inside token definitions.

## License

Licensed under the [PrimeUI License](https://primeui.dev/licenses) - Copyright (c) [PrimeTek Informatics](https://www.primetek.com.tr)
