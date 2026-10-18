/**
 *
 * Compare Design Tokens
 *
 * @module compare
 *
 */

import type { ColorScheme as CS, DesignTokens, ExtendedCSS, ExtendedTokens } from '..';

/**
 * Design Token Sections
 */
export declare namespace CompareTokenSections {
    interface Root {
        /**
         * Border radius of root
         *
         * @designToken compare.border.radius
         */
        borderRadius?: string;
    }

    interface Handle {
        /**
         * Background of handle (track)
         *
         * @designToken compare.handle.background
         */
        background?: string;
        /**
         * Size of handle (thickness; width when vertical, height when horizontal)
         *
         * @designToken compare.handle.size
         */
        size?: string;
    }

    interface Indicator {
        /**
         * Size of indicator (square width and height)
         *
         * @designToken compare.indicator.size
         */
        size?: string;
        /**
         * Background of indicator
         *
         * @designToken compare.indicator.background
         */
        background?: string;
        /**
         * Border radius of indicator
         *
         * @designToken compare.indicator.border.radius
         */
        borderRadius?: string;
        /**
         * Focus ring of indicator (applied when the handle input is focus-visible)
         */
        focusRing?: {
            /**
             * Focus ring width of indicator
             *
             * @designToken compare.indicator.focus.ring.width
             */
            width?: string;
            /**
             * Focus ring style of indicator
             *
             * @designToken compare.indicator.focus.ring.style
             */
            style?: string;
            /**
             * Focus ring color of indicator
             *
             * @designToken compare.indicator.focus.ring.color
             */
            color?: string;
            /**
             * Focus ring offset of indicator
             *
             * @designToken compare.indicator.focus.ring.offset
             */
            offset?: string;
        };
        /**
         * Icon of indicator
         */
        icon?: {
            /**
             * Icon color of indicator
             *
             * @designToken compare.indicator.icon.color
             */
            color?: string;
            /**
             * Icon size of indicator
             *
             * @designToken compare.indicator.icon.size
             */
            size?: string;
        };
    }

    /* Static Sections */
    type ColorScheme = CS<CompareDesignTokens>;
    type CSS = ExtendedCSS;
    type Extend = ExtendedTokens;
}

/**
 *
 * _Compare Design Tokens_
 *
 * @group components
 * @module compare
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
export interface CompareDesignTokens extends DesignTokens<CompareDesignTokens> {
    /**
     * Used to pass tokens of the root section
     */
    root?: CompareTokenSections.Root;
    /**
     * Used to pass tokens of the handle section
     */
    handle?: CompareTokenSections.Handle;
    /**
     * Used to pass tokens of the indicator section (the square pip centered on the handle)
     */
    indicator?: CompareTokenSections.Indicator;
}
