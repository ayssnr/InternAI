import * as _primeuix_utils from '@primeuix/utils';

declare function definePreset<T extends Record<string, unknown>>(base: T, ...presets: Record<string, unknown>[]): T;

declare function updatePreset<T extends Record<string, unknown>>(...presets: Record<string, unknown>[]): T;

/**
 * Internal, runtime-shaped types for `@primeuix/styled`.
 *
 * These intentionally model the *loose* runtime objects (presets are user-authored
 * token trees of arbitrary depth) while still being far stricter than `any`:
 * leaf values are `TokenValue`, containers are `TokenObject`, and indexing yields
 * `unknown` (forcing callers to narrow) rather than silently propagating `any`.
 */
/** Default configuration block held by the `Theme` singleton. */
interface ThemeDefaults {
    variable: {
        prefix: string;
        selector: string;
        excludedKeyRegex: RegExp;
    };
    options: Required<Pick<ThemeOptions, 'prefix'>> & ThemeOptions;
}
/** Side-effect setters threaded through the preset builders. */
interface ThemeSetters {
    layerNames: (layerName: string) => void;
}
/** A single resolution path for a token (one per declared scheme). */
interface TokenPath {
    path: string;
    value: TokenValue;
    scheme: 'light' | 'dark' | 'none';
    computed: ComputedFn;
    tokens: TokenMap;
}
/** Result returned by a token's `computed()` call. */
interface ComputedToken {
    colorScheme: string;
    path: string;
    paths: TokenPathMap;
    value: TokenValue;
}
/** Mutable bag that accumulates token binding metadata during computation. */
interface TokenPathMap {
    name?: string;
    binding?: Record<string, TokenPathMap>;
    [scheme: string]: unknown;
}
/** The `computed` signature shared by token entries and individual paths. */
type ComputedFn = (colorScheme: string, tokenPathMap?: TokenPathMap, stack?: string[]) => ComputedToken | ComputedToken[];
/** A single entry in the flattened token map keyed by dotted token key. */
interface TokenEntry {
    paths: TokenPath[];
    computed: ComputedFn;
}
/** The flattened token map produced by `createTokens`, with an attached value cache. */
type TokenMap = Record<string, TokenEntry> & {
    __cache?: Map<string, TokenValue>;
    __strictCache?: Map<string, TokenValue>;
};
/** A resolved color-scheme selector rule produced by `regex.resolve`. */
interface ColorSchemeRule {
    type: string;
    selector: string;
    matched: boolean;
}
/** Shared option bag passed to the preset/common builders in `ThemeUtils`. */
interface PresetBuilderOptions {
    name?: string;
    theme?: ThemeConfig;
    preset?: Preset | TokenSection;
    options?: ThemeOptions;
    params?: TokenParams;
    props?: Record<string, unknown>;
    selector?: string;
    set?: ThemeSetters;
    defaults: ThemeDefaults;
    isScopedTokenPaths?: boolean;
}
/** CSS + token list produced by the preset builders. */
interface PresetCSSResult {
    css?: string;
    tokens?: string[];
    style?: string;
}

declare function updatePrimaryPalette<T extends object = TokenObject, P extends object = Preset>(palette?: T): P;

declare function updateSurfacePalette<T extends object = TokenObject, P extends object = Preset>(palette?: T): P;

declare function usePreset<T extends Record<string, unknown>>(base: T, ...presets: Record<string, unknown>[]): T;

declare function useTheme<T extends object = ThemeConfig>(theme: T): T;

declare const _default$5: {
    defaults: {
        variable: {
            prefix: string;
            selector: string;
            excludedKeyRegex: RegExp;
        };
        options: {
            prefix: string;
            darkModeSelector: string;
            cssLayer: boolean;
            cssVariables: boolean;
            scoped: boolean;
        };
    };
    _theme: ThemeConfig | undefined;
    _layerNames: Set<string>;
    _loadedStyleNames: Set<string>;
    _loadingStyles: Set<string>;
    _tokens: TokenMap;
    _scopedTokenPaths: Set<string>;
    update(newValues?: {
        theme?: ThemeConfig;
    }): void;
    readonly theme: ThemeConfig | undefined;
    readonly preset: Preset;
    readonly options: ThemeOptions;
    readonly tokens: TokenMap;
    hasScopedTokenPath(path: string): boolean;
    getScopedTokenPaths(): string[];
    addScopedToken(tokens?: Record<string, unknown>): boolean;
    clearScopedTokenPaths(): void;
    getTheme(): ThemeConfig | undefined;
    setTheme(newValue: ThemeConfig): void;
    getPreset(): Preset;
    setPreset(newValue: Preset): void;
    getOptions(): ThemeOptions;
    setOptions(newValue: ThemeOptions): void;
    resetStyleCaches(): void;
    resetCaches(): void;
    getLayerNames(): string[];
    setLayerNames(layerName: string): void;
    clearLayerNames(): void;
    getLoadedStyleNames(): Set<string>;
    isStyleNameLoaded(name: string): boolean;
    setLoadedStyleName(name: string): void;
    deleteLoadedStyleName(name: string): void;
    clearLoadedStyleNames(): void;
    getTokenValue(tokenPath: string): TokenValue;
    getCommon(name?: string, params?: TokenParams): {
        primitive: {
            css: string | undefined;
            tokens: string[] | undefined;
        };
        semantic: {
            css: string | undefined;
            tokens: string[] | undefined;
        };
        global: {
            css: string | undefined;
            tokens: string[] | undefined;
        };
        style: string | undefined;
    };
    getComponent(name?: string, params?: TokenParams): {
        css: string | undefined;
        tokens: string[] | undefined;
        style: string | undefined;
    };
    getDirective(name?: string, params?: TokenParams): {
        css: string | undefined;
        tokens: string[] | undefined;
        style: string | undefined;
    };
    getCustomPreset(name?: string, preset?: Preset, selector?: string, params?: TokenParams): {
        css: string | undefined;
        tokens: string[] | undefined;
        style: string | undefined;
    };
    getLayerOrderCSS(name?: string): string;
    transformCSS(name: string | undefined, css: string, type?: string, mode?: string): string;
    getCommonStyleSheet(name?: string, params?: TokenParams, props?: Record<string, unknown>): string;
    getStyleSheet(name: string, params?: TokenParams, props?: Record<string, unknown>): string;
    onStyleMounted(name: string): void;
    onStyleUpdated(name: string): void;
    onStyleLoaded(event: unknown, { name }: {
        name: string;
    }): void;
};

declare const _default$4: (color1: string, color2: string, weight: number) => string;

declare const _default$3: (color: string) => ColorScale;

declare const _default$2: (color: string, percent: number) => string;

declare const _default$1: (color: string, percent: number) => string;

declare function css(strings: TemplateStringsArray | StyleType, ...exprs: unknown[]): string | undefined;

declare const $dt: (tokenPath: string) => {
    name: string;
    variable: string;
    value: unknown;
};
declare const dt: (tokenPath?: string, fallback?: string | number | Pick<StyleOptions, "dt">, type?: DtType) => string | number | undefined;
declare const dtwt: (theme?: ThemeConfig, tokenPath?: string, fallback?: string | number | Pick<StyleOptions, "dt">, type?: DtType) => string | number | undefined;

interface ThemeBuilder {
    preset(value: Preset): ThemeBuilder;
    options(value: ThemeOptions): ThemeBuilder;
    primaryPalette(primary: TokenObject): ThemeBuilder;
    surfacePalette(surface: TokenObject & {
        light?: TokenObject;
        dark?: TokenObject;
    }): ThemeBuilder;
    define(options?: {
        useDefaultPreset?: boolean;
        useDefaultOptions?: boolean;
    }): ThemeConfig;
    update(options?: {
        mergePresets?: boolean;
        mergeOptions?: boolean;
    }): ThemeConfig;
    use(options?: {
        useDefaultPreset?: boolean;
        useDefaultOptions?: boolean;
    }): ThemeConfig;
}
declare const $t: (theme?: ThemeConfig) => ThemeBuilder;

interface toVariableOptions {
    prefix?: string;
    selector?: string;
    excludedKeyRegex?: RegExp;
}
interface toVariableOutput {
    value: string[];
    tokens: string[];
    declarations: string;
    css: string;
}
declare function export_default(theme: TokenObject, options?: toVariableOptions): toVariableOutput;

declare const ThemeService: _primeuix_utils.EventBusOptions<Record<string, unknown>>;

interface StyleSheetProps {
    attrs?: Record<string, unknown>;
}
interface StyleMeta<E = HTMLStyleElement> {
    name?: string;
    css?: string;
    attrs?: Record<string, unknown>;
    markup?: string;
    element?: E;
}
declare class StyleSheet<E = HTMLStyleElement> {
    _styles: Map<string, StyleMeta<E>>;
    _attrs: Record<string, unknown>;
    constructor({ attrs }?: StyleSheetProps);
    get(key: string): StyleMeta<E> | undefined;
    has(key: string): boolean;
    delete(key: string): void;
    clear(): void;
    add(key: string, css?: string): void;
    update(): void;
    getStyles(): Map<string, StyleMeta<E>>;
    getAllCSS(): string[];
    getAllMarkup(): string[];
    getAllElements(): (E | undefined)[];
    /**
     * Used to create a style element.
     *
     * @param {StyleMeta} meta
     * @returns {HTMLStyleElement | undefined}
     */
    createStyleElement(meta?: StyleMeta): E | undefined;
}

declare const EXPR_REGEX: RegExp;
declare const CALC_REGEX: RegExp;
declare const VAR_REGEX: RegExp;
declare function toTokenKey(str: string): string;
declare function merge(value1: unknown, value2: unknown): void;
declare function toValue(value: unknown): unknown;
declare function toUnit(value: string, variable?: string): string;
declare function toNormalizePrefix(prefix: string): string;
declare function toNormalizeVariable(prefix?: string, variable?: string): string;
declare function getVariableName(prefix?: string, variable?: string): string;
declare function hasOddBraces(str?: string): boolean;
declare function getVariableValue(value: TokenValue, variable?: string, prefix?: string, excludedKeyRegexes?: RegExp[], fallback?: string | number | Pick<StyleOptions, 'dt'>): string | number | undefined;
declare function getComputedValue(obj: Record<string, unknown> | undefined, value: TokenValue): TokenValue;
declare function setProperty(properties: string[], key: string, value?: string): void;
declare function getRule(selector: string, properties: string): string;
declare function evaluateDtExpressions(input: string, fn: (...args: (string | number)[]) => string): string;

declare const _default: {
    regex: {
        rules: {
            class: {
                pattern: RegExp;
                resolve(value: string): {
                    type: string;
                    selector: string;
                    matched: boolean;
                };
            };
            attr: {
                pattern: RegExp;
                resolve(value: string): {
                    type: string;
                    selector: string;
                    matched: boolean;
                };
            };
            media: {
                pattern: RegExp;
                resolve(value: string): {
                    type: string;
                    selector: string;
                    matched: boolean;
                };
            };
            system: {
                pattern: RegExp;
                resolve(value: string): {
                    type: string;
                    selector: string;
                    matched: boolean;
                };
            };
            custom: {
                resolve(value: string): {
                    type: string;
                    selector: string;
                    matched: boolean;
                };
            };
        };
        resolve(value: unknown): ColorSchemeRule[];
    };
    _toVariables(theme: TokenObject, options?: ThemeOptions): toVariableOutput;
    getCommon({ name, theme, params, set, defaults }: PresetBuilderOptions): {
        primitive: {
            css: string | undefined;
            tokens: string[] | undefined;
        };
        semantic: {
            css: string | undefined;
            tokens: string[] | undefined;
        };
        global: {
            css: string | undefined;
            tokens: string[] | undefined;
        };
        style: string | undefined;
    };
    getPreset({ name, preset, options, params, set, defaults, selector, isScopedTokenPaths }: PresetBuilderOptions): {
        css: string | undefined;
        tokens: string[] | undefined;
        style: string | undefined;
    };
    getScopedSelector(name: string, options?: ThemeOptions): string | undefined;
    getPresetC({ name, theme, params, set, defaults }: PresetBuilderOptions): {
        css: string | undefined;
        tokens: string[] | undefined;
        style: string | undefined;
    };
    getPresetD({ name, theme, params, set, defaults }: PresetBuilderOptions): {
        css: string | undefined;
        tokens: string[] | undefined;
        style: string | undefined;
    };
    applyDarkColorScheme(options: ThemeOptions): boolean;
    getColorSchemeOption(options: ThemeOptions, defaults: ThemeDefaults): ColorSchemeRule[];
    getLayerOrder(name: string, options: ThemeOptions | undefined, params: TokenParams, defaults: ThemeDefaults): string;
    getCommonStyleSheet({ name, theme, params, props, set, defaults }: PresetBuilderOptions): string;
    getStyleSheet({ name, theme, params, props, set, defaults }: PresetBuilderOptions): string;
    createTokens(obj: (Preset | TokenObject) | undefined, defaults: ThemeDefaults, parentKey?: string, parentPath?: string, tokens?: TokenMap): TokenMap;
    getTokenValue(tokens: TokenMap, path: string, defaults: ThemeDefaults): TokenValue;
    getSelectorRule(selector1: string, selector2: string | undefined, type: string, css: string, globalSelector?: string): string;
    transformCSS(name: string, css: string, mode?: string, type?: string, options?: ThemeOptions, set?: ThemeSetters, defaults?: ThemeDefaults, selector?: string): string;
};

/**
 * A primitive token leaf — the value a token path ultimately resolves to.
 *
 * These are the raw values authored in a preset (a color string, a numeric size, a boolean flag)
 * or `null`/`undefined` when a token is intentionally empty.
 */
type TokenValue = string | number | boolean | null | undefined;
/**
 * A node in a user-authored token tree: a {@link TokenValue} leaf, a nested {@link TokenObject}, or
 * a typed token interface (`object`) from a preset.
 *
 * @example
 * const surface: TokenObject = { 0: '#ffffff', 100: '#f5f5f5', 900: '#111111' };
 */
type TokenObject = {
    [key: string]: TokenValue | TokenObject | object;
};
/**
 * The value of a {@link Preset} slot (`primitive`, `semantic`, `extend`, or a `components`/
 * `directives` entry): a freeform {@link TokenObject} or a typed token interface from a preset.
 */
type TokenSection = TokenObject | object;
/**
 * Resolution mode for {@link dt}/{@link dtwt}, passed as their `type` argument.
 * - `'variable'` — return the CSS variable reference, e.g. `var(--p-primary-color)`.
 * - `'value'` — return the raw resolved token value from the active preset.
 */
type DtType = 'value' | 'variable';
/**
 * A user-authored preset: the design-token tree consumed by `definePreset`, `Theme.setPreset`
 * and `Theme.getCustomPreset`. Every section is optional and the shape is deliberately open
 * (`[key: string]: unknown`) so presets can be extended freely.
 *
 * @example
 * const MyPreset: Preset = {
 *     primitive: { blue: { 500: '#3b82f6' } },
 *     semantic: { primary: { color: '{blue.500}' } },
 *     components: { button: { root: { background: '{primary.color}' } } }
 * };
 */
interface Preset {
    /**
     * Primitive tokens — the raw, non-semantic scales (color ramps, spacing, radii).
     * These are the lowest layer and are referenced by semantic/component tokens.
     */
    primitive?: TokenSection;
    /**
     * Semantic tokens — meaning-driven tokens (e.g. `primary`, `surface`, `formField`)
     * that usually reference primitives via `{token.path}` syntax.
     */
    semantic?: TokenSection;
    /**
     * Per-component token overrides, keyed by component name (e.g. `button`, `datatable`).
     */
    components?: Record<string, TokenSection | undefined>;
    /**
     * Per-directive token overrides, keyed by directive name (e.g. `tooltip`, `ripple`).
     */
    directives?: Record<string, TokenSection | undefined>;
    /**
     * Extra tokens merged into the tree without belonging to a fixed section —
     * used to add custom token groups a component reads.
     */
    extend?: TokenSection;
    /**
     * Global CSS injected verbatim by the preset. Either a raw string or a function that
     * receives the `dt` helper so token references can be resolved inside the CSS.
     */
    css?: string | ((options: StyleOptions) => string) | undefined;
    [key: string]: unknown;
}
/**
 * The active theme held by the `Theme` singleton: a {@link Preset} plus its resolved
 * {@link ThemeOptions}. Passed to `Theme.setTheme`/`useTheme` and returned by `Theme.getTheme`.
 */
interface ThemeConfig {
    /**
     * The active preset (design-token tree). Absent until a preset is applied.
     */
    preset?: Preset;
    /**
     * The resolved options for this theme (prefix, dark-mode selector, css-layer, etc.).
     */
    options?: ThemeOptions;
    [key: string]: unknown;
}
/**
 * A bag of arbitrary token params threaded into the preset/stylesheet builders
 * (`Theme.getCommon`, `Theme.getStyleSheet`, `Theme.getComponent`). `undefined` when no
 * params are supplied.
 */
type TokenParams = Record<string, unknown> | undefined;
/**
 * Defines the CSS layer type.
 */
interface CSSLayer {
    /**
     * Defines the name of the CSS layer.
     */
    name?: string | undefined;
    /**
     * Defines the order of the CSS layers.
     */
    order?: string | undefined;
}
interface ThemeOptions {
    /**
     * Defines the prefix for the css variables.
     * @default 'p'
     */
    prefix?: string | undefined;
    /**
     * Defines the dark mode selector.
     * @default 'system'
     */
    darkModeSelector?: 'system' | 'none' | (string & {}) | undefined;
    /**
     * Defines whether the CSS layer should be used.
     * @default false
     */
    cssLayer?: boolean | CSSLayer | undefined;
    /**
     * Defines whether the CSS variables should be emitted.
     * - `true` (default): `dt('a.b')` returns `var(--p-a-b)`.
     * - `false`: `dt('a.b')` resolves to the literal value from the preset (light/dark
     *   variants are wrapped in `light-dark(...)` automatically) and component variables are not emitted.
     * @default true
     */
    cssVariables?: boolean | undefined;
    /**
     * When `true`, component-level CSS variables are emitted under the component's own
     * selector (e.g. `[data-styled="button"] { --p-button-... }`) instead of the global `:root,:host`.
     * Primitive and semantic tokens remain global.
     * @default false
     */
    scoped?: boolean | undefined;
}
interface StyleOptions {
    dt: (tokenPath?: string, fallback?: string | number | Pick<StyleOptions, 'dt'>, type?: DtType) => string | number | undefined;
}
declare type StyleType<T = StyleOptions> = string | ((options?: T) => string);
type ColorScale = {
    0?: string;
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
    950?: string;
};

export { $dt, $t, CALC_REGEX, type CSSLayer, type ColorScale, type ColorSchemeRule, type ComputedFn, type ComputedToken, type DtType, EXPR_REGEX, type Preset, type PresetBuilderOptions, type PresetCSSResult, type StyleMeta, type StyleOptions, StyleSheet, type StyleSheetProps, type StyleType, _default$5 as Theme, type ThemeBuilder, type ThemeConfig, type ThemeDefaults, type ThemeOptions, ThemeService, type ThemeSetters, _default as ThemeUtils, type TokenEntry, type TokenMap, type TokenObject, type TokenParams, type TokenPath, type TokenPathMap, type TokenSection, type TokenValue, VAR_REGEX, css, definePreset, dt, dtwt, evaluateDtExpressions, getComputedValue, getRule, getVariableName, getVariableValue, hasOddBraces, merge, _default$4 as mix, _default$3 as palette, setProperty, _default$2 as shade, _default$1 as tint, toNormalizePrefix, toNormalizeVariable, toTokenKey, toUnit, toValue, type toVariableOptions, type toVariableOutput, export_default as toVariables, updatePreset, updatePrimaryPalette, updateSurfacePalette, usePreset, useTheme };
