/**
 *
 * InputTags Design Tokens
 *
 * @module inputtags
 *
 */

import type { ColorScheme as CS, DesignTokens, ExtendedCSS, ExtendedTokens } from '..';

/**
 * Design Token Sections
 */
export declare namespace InputTagsTokenSections {
    interface Root {
        /**
         * Background of root
         *
         * @designToken inputtags.background
         */
        background?: string;
        /**
         * Disabled background of root
         *
         * @designToken inputtags.disabled.background
         */
        disabledBackground?: string;
        /**
         * Filled background of root
         *
         * @designToken inputtags.filled.background
         */
        filledBackground?: string;
        /**
         * Filled hover background of root
         *
         * @designToken inputtags.filled.hover.background
         */
        filledHoverBackground?: string;
        /**
         * Filled focus background of root
         *
         * @designToken inputtags.filled.focus.background
         */
        filledFocusBackground?: string;
        /**
         * Border color of root
         *
         * @designToken inputtags.border.color
         */
        borderColor?: string;
        /**
         * Hover border color of root
         *
         * @designToken inputtags.hover.border.color
         */
        hoverBorderColor?: string;
        /**
         * Focus border color of root
         *
         * @designToken inputtags.focus.border.color
         */
        focusBorderColor?: string;
        /**
         * Invalid border color of root
         *
         * @designToken inputtags.invalid.border.color
         */
        invalidBorderColor?: string;
        /**
         * Color of root
         *
         * @designToken inputtags.color
         */
        color?: string;
        /**
         * Disabled color of root
         *
         * @designToken inputtags.disabled.color
         */
        disabledColor?: string;
        /**
         * Shadow of root
         *
         * @designToken inputtags.shadow
         */
        shadow?: string;
        /**
         * Padding x of root
         *
         * @designToken inputtags.padding.x
         */
        paddingX?: string;
        /**
         * Padding y of root
         *
         * @designToken inputtags.padding.y
         */
        paddingY?: string;
        /**
         * Border radius of root
         *
         * @designToken inputtags.border.radius
         */
        borderRadius?: string;
        /**
         * Focus ring of root
         */
        focusRing?: {
            /**
             * Focus ring width of root
             *
             * @designToken inputtags.focus.ring.width
             */
            width?: string;
            /**
             * Focus ring style of root
             *
             * @designToken inputtags.focus.ring.style
             */
            style?: string;
            /**
             * Focus ring color of root
             *
             * @designToken inputtags.focus.ring.color
             */
            color?: string;
            /**
             * Focus ring offset of root
             *
             * @designToken inputtags.focus.ring.offset
             */
            offset?: string;
            /**
             * Focus ring shadow of root
             *
             * @designToken inputtags.focus.ring.shadow
             */
            shadow?: string;
        };
        /**
         * Transition duration of root
         *
         * @designToken inputtags.transition.duration
         */
        transitionDuration?: string;
        /**
         * Gap of root
         *
         * @designToken inputtags.gap
         */
        gap?: string;
    }

    interface Item {
        /**
         * Border radius of item
         *
         * @designToken inputtags.item.border.radius
         */
        borderRadius?: string;
    }

    /* Static Sections */
    type ColorScheme = CS<InputTagsDesignTokens>;
    type CSS = ExtendedCSS;
    type Extend = ExtendedTokens;
}

/**
 *
 * _InputTags Design Tokens_
 *
 * @group components
 * @module inputtags
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
export interface InputTagsDesignTokens extends DesignTokens<InputTagsDesignTokens> {
    /**
     * Used to pass tokens of the root section
     */
    root?: InputTagsTokenSections.Root;
    /**
     * Used to pass tokens of the item section
     */
    item?: InputTagsTokenSections.Item;
}
