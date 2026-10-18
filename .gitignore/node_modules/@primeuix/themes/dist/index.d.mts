import { Preset, PaletteDesignToken, Theme } from '@primeuix/themes/types';
export { BaseDesignTokens, ColorScheme, ColorSchemeDesignToken, ComponentsDesignTokens, DeepRequired, DesignTokens, ExtendedCSS, ExtendedTokens, PaletteDesignToken, Preset, RequiredDesignTokens } from '@primeuix/themes/types';
export * from '@primeuix/styled';

type PresetBase<P> = P extends Preset<infer T> ? T : object;
declare const definePreset: <P extends Preset>(base: P, ...extensions: Preset<PresetBase<P>>[]) => Preset<PresetBase<P>>;
declare const updatePreset: (...presets: Preset[]) => Record<string, unknown>;
declare const updatePrimaryPalette: (palette?: PaletteDesignToken) => Preset;
declare const updateSurfacePalette: (palette?: PaletteDesignToken) => Preset;
declare const usePreset: <P extends Preset>(base: P, ...presets: Preset<PresetBase<P>>[]) => P;
declare const useTheme: (theme: Theme) => Theme;

export { definePreset, updatePreset, updatePrimaryPalette, updateSurfacePalette, usePreset, useTheme };
