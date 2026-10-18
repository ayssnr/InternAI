/**
 *
 * InputColor Design Tokens
 *
 * @module inputcolor
 *
 */

import type { ColorScheme as CS, DesignTokens, ExtendedCSS, ExtendedTokens } from '..';

/**
 * Design Token Sections
 */
export declare namespace InputColorTokenSections {
    interface Root {
        /**
         * Shared inset border color (area background, slider track, swatch background)
         *
         * @designToken inputcolor.border.color
         */
        borderColor?: string;
    }

    interface Area {
        /**
         * Border radius of area
         *
         * @designToken inputcolor.area.border.radius
         */
        borderRadius?: string;
    }

    interface Slider {
        /**
         * Border radius of slider
         *
         * @designToken inputcolor.slider.border.radius
         */
        borderRadius?: string;
        /**
         * Size of slider (horizontal height / vertical width)
         *
         * @designToken inputcolor.slider.size
         */
        size?: string;
    }

    interface Handle {
        /**
         * Size of handle (area and slider)
         *
         * @designToken inputcolor.handle.size
         */
        size?: string;
        /**
         * Border color of handle
         *
         * @designToken inputcolor.handle.border.color
         */
        borderColor?: string;
        /**
         * Border width of handle
         *
         * @designToken inputcolor.handle.border.width
         */
        borderWidth?: string;
        /**
         * Shadow of handle
         *
         * @designToken inputcolor.handle.shadow
         */
        shadow?: string;
        /**
         * Transition duration of handle
         *
         * @designToken inputcolor.handle.transition.duration
         */
        transitionDuration?: string;
        /**
         * Focus ring of handle
         */
        focusRing?: {
            /**
             * Focus ring border width of handle
             *
             * @designToken inputcolor.handle.focus.ring.border.width
             */
            borderWidth?: string;
            /**
             * Focus ring border color of handle
             *
             * @designToken inputcolor.handle.focus.ring.border.color
             */
            borderColor?: string;
            /**
             * Focus ring outline width of handle
             *
             * @designToken inputcolor.handle.focus.ring.outline.width
             */
            outlineWidth?: string;
            /**
             * Focus ring outline color of handle
             *
             * @designToken inputcolor.handle.focus.ring.outline.color
             */
            outlineColor?: string;
            /**
             * Focus ring outline offset of handle
             *
             * @designToken inputcolor.handle.focus.ring.outline.offset
             */
            outlineOffset?: string;
        };
    }

    interface TransparencyGrid {
        /**
         * Color of transparency grid (checker pattern)
         *
         * @designToken inputcolor.transparency.grid.color
         */
        color?: string;
        /**
         * Background of transparency grid (checker base)
         *
         * @designToken inputcolor.transparency.grid.background
         */
        background?: string;
        /**
         * Tile size of transparency grid
         *
         * @designToken inputcolor.transparency.grid.tile.size
         */
        tileSize?: string;
    }

    interface Swatch {
        /**
         * Size of swatch
         *
         * @designToken inputcolor.swatch.size
         */
        size?: string;
        /**
         * Border radius of swatch
         *
         * @designToken inputcolor.swatch.border.radius
         */
        borderRadius?: string;
    }

    /* Static Sections */
    type ColorScheme = CS<InputColorDesignTokens>;
    type CSS = ExtendedCSS;
    type Extend = ExtendedTokens;
}

/**
 *
 * _InputColor Design Tokens_
 *
 * @group components
 * @module inputcolor
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
export interface InputColorDesignTokens extends DesignTokens<InputColorDesignTokens> {
    /**
     * Used to pass tokens of the root section
     */
    root?: InputColorTokenSections.Root;
    /**
     * Used to pass tokens of the area section
     */
    area?: InputColorTokenSections.Area;
    /**
     * Used to pass tokens of the slider section
     */
    slider?: InputColorTokenSections.Slider;
    /**
     * Used to pass tokens of the handle section (shared by area-handle and slider-handle)
     */
    handle?: InputColorTokenSections.Handle;
    /**
     * Used to pass tokens of the transparency grid section
     */
    transparencyGrid?: InputColorTokenSections.TransparencyGrid;
    /**
     * Used to pass tokens of the swatch section
     */
    swatch?: InputColorTokenSections.Swatch;
}
