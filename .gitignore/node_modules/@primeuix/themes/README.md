# PrimeUIX Themes

Design token presets for PrimeUI libraries. Ships four built-in presets (Aura, Lara, Material, Nora), each covering ~91 components with a full typed token tree. Tokens reference each other using `{token.path}` syntax and the runtime resolves chains so consumers always get flat CSS variable values.

```ts
import { usePreset, definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

// Use a preset as-is
usePreset(Aura);

// Extend it
const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50:  '{violet.50}',
            500: '{violet.500}',
            950: '{violet.950}'
        }
    },
    components: {
        button: {
            root: { borderRadius: '2rem' }
        }
    }
});
usePreset(MyPreset);
```

Individual component token files can be imported directly from subpaths (`@primeuix/themes/aura/button`) for tighter tree-shaking or tooling integrations. Token metadata (paths, descriptions) is published separately under the `./tokens` subpath and is generated from JSDoc annotations on the type definitions.

## License

Licensed under the [PrimeUI License](https://primeui.dev/licenses) - Copyright (c) [PrimeTek Informatics](https://www.primetek.com.tr)
