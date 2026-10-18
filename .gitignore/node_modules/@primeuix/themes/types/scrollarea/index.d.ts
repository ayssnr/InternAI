/**
 *
 * ScrollArea Design Tokens
 *
 * @module scrollarea
 *
 */

import type { ColorScheme as CS, DesignTokens, ExtendedCSS, ExtendedTokens } from '..';

/**
 * Design Token Sections
 */
export declare namespace ScrollAreaTokenSections {
    interface Root {
        /**
         * Background of root
         *
         * @designToken scrollarea.background
         */
        background?: string;
        /**
         * Border color of root
         *
         * @designToken scrollarea.border.color
         */
        borderColor?: string;
        /**
         * Border radius of root
         *
         * @designToken scrollarea.border.radius
         */
        borderRadius?: string;
        /**
         * Focus ring of root
         */
        focusRing?: {
            /**
             * Focus ring width of root
             *
             * @designToken scrollarea.focus.ring.width
             */
            width?: string;
            /**
             * Focus ring style of root
             *
             * @designToken scrollarea.focus.ring.style
             */
            style?: string;
            /**
             * Focus ring color of root
             *
             * @designToken scrollarea.focus.ring.color
             */
            color?: string;
            /**
             * Focus ring offset of root
             *
             * @designToken scrollarea.focus.ring.offset
             */
            offset?: string;
            /**
             * Focus ring shadow of root
             *
             * @designToken scrollarea.focus.ring.shadow
             */
            shadow?: string;
        };
    }

    interface Viewport {
        /**
         * Padding of viewport
         *
         * @designToken scrollarea.viewport.padding
         */
        padding?: string;
    }

    interface Scrollbar {
        /**
         * Background of scrollbar
         *
         * @designToken scrollarea.scrollbar.background
         */
        background?: string;
        /**
         * Margin of scrollbar
         *
         * @designToken scrollarea.scrollbar.margin
         */
        margin?: string;
        /**
         * Size of scrollbar (track thickness)
         *
         * @designToken scrollarea.scrollbar.size
         */
        size?: string;
        /**
         * Transition duration of scrollbar
         *
         * @designToken scrollarea.scrollbar.transition.duration
         */
        transitionDuration?: string;
    }

    interface Handle {
        /**
         * Background of handle
         *
         * @designToken scrollarea.handle.background
         */
        background?: string;
    }

    interface Mask {
        /**
         * Fade size of mask gradient
         *
         * @designToken scrollarea.mask.fade.size
         */
        fadeSize?: string;
    }

    /* Static Sections */
    type ColorScheme = CS<ScrollAreaDesignTokens>;
    type CSS = ExtendedCSS;
    type Extend = ExtendedTokens;
}

/**
 *
 * _ScrollArea Design Tokens_
 *
 * @group components
 * @module scrollarea
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
export interface ScrollAreaDesignTokens extends DesignTokens<ScrollAreaDesignTokens> {
    /**
     * Used to pass tokens of the root section
     */
    root?: ScrollAreaTokenSections.Root;
    /**
     * Used to pass tokens of the viewport section
     */
    viewport?: ScrollAreaTokenSections.Viewport;
    /**
     * Used to pass tokens of the scrollbar section
     */
    scrollbar?: ScrollAreaTokenSections.Scrollbar;
    /**
     * Used to pass tokens of the handle section
     */
    handle?: ScrollAreaTokenSections.Handle;
    /**
     * Used to pass tokens of the mask section
     */
    mask?: ScrollAreaTokenSections.Mask;
}
