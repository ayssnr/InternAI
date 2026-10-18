/**
 *
 * Label Design Tokens
 *
 * @module label
 *
 */

import type { ColorScheme as CS, DesignTokens, ExtendedCSS, ExtendedTokens } from '..';

/**
 * Design Token Sections
 */
export declare namespace LabelTokenSections {
    interface Root {
        /**
         * Gap of root
         *
         * @designToken label.gap
         */
        gap?: string;
        /**
         * Font size of root
         *
         * @designToken label.font.size
         */
        fontSize?: string;
        /**
         * Font weight of root
         *
         * @designToken label.font.weight
         */
        fontWeight?: string;
        /**
         * Text color of root
         *
         * @designToken label.text.color
         */
        textColor?: string;
        /**
         * Disabled opacity of root
         *
         * @designToken label.disabled.opacity
         */
        disabledOpacity?: string;
    }

    /* Static Sections */
    type ColorScheme = CS<LabelDesignTokens>;
    type CSS = ExtendedCSS;
    type Extend = ExtendedTokens;
}

/**
 *
 * _Label Design Tokens_
 *
 * @group components
 * @module label
 * @see
 * --- ---
 * **Compatible Libraries**
 *
 * [![PrimeNG](https://i.postimg.cc/63f7jVST/primeng-icon-24.png)](https://primeng.org/theming/styled)
 * [![PrimeVue](https://i.postimg.cc/cC1vVgyh/primevue-icon-24.png)](https://primevue.org/theming/styled)
 * --- ---
 * **Figma UI Kit**
 *
 * [PrimeNG](https://primeng.org/uikit) | [PrimeVue](https://primevue.org/uikit)
 *
 */
export interface LabelDesignTokens extends DesignTokens<LabelDesignTokens> {
    /**
     * Used to pass tokens of the root section
     */
    root?: LabelTokenSections.Root;
}
