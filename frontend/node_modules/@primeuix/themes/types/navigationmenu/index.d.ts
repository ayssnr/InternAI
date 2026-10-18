/**
 *
 * NavigationMenu Design Tokens
 *
 * @module navigationmenu
 *
 */

import type { ColorScheme as CS, DesignTokens, ExtendedCSS, ExtendedTokens } from '..';

/**
 * Design Token Sections
 */
export declare namespace NavigationMenuTokenSections {
    interface Root {
        /**
         * Padding of root
         *
         * @designToken navigationmenu.padding
         */
        padding?: string;
        /**
         * Gap of root
         *
         * @designToken navigationmenu.gap
         */
        gap?: string;
    }

    interface BaseItem {
        /**
         * Padding of base item
         *
         * @designToken navigationmenu.base.item.padding
         */
        padding?: string;
        /**
         * Border radius of base item
         *
         * @designToken navigationmenu.base.item.border.radius
         */
        borderRadius?: string;
        /**
         * Gap of base item
         *
         * @designToken navigationmenu.base.item.gap
         */
        gap?: string;
        /**
         * Font size of base item
         *
         * @designToken navigationmenu.base.item.font.size
         */
        fontSize?: string;
        /**
         * Font weight of base item
         *
         * @designToken navigationmenu.base.item.font.weight
         */
        fontWeight?: string;
        /**
         * Color of base item
         *
         * @designToken navigationmenu.base.item.color
         */
        color?: string;
        /**
         * Focus color of base item
         *
         * @designToken navigationmenu.base.item.focus.color
         */
        focusColor?: string;
        /**
         * Focus background of base item
         *
         * @designToken navigationmenu.base.item.focus.background
         */
        focusBackground?: string;
        /**
         * Active color of base item
         *
         * @designToken navigationmenu.base.item.active.color
         */
        activeColor?: string;
        /**
         * Active background of base item
         *
         * @designToken navigationmenu.base.item.active.background
         */
        activeBackground?: string;
        /**
         * Transition duration of base item
         *
         * @designToken navigationmenu.base.item.transition.duration
         */
        transitionDuration?: string;
    }

    /* Static Sections */
    type ColorScheme = CS<NavigationMenuDesignTokens>;
    type CSS = ExtendedCSS;
    type Extend = ExtendedTokens;
}

/**
 *
 * _NavigationMenu Design Tokens_
 *
 * @group components
 * @module navigationmenu
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
export interface NavigationMenuDesignTokens extends DesignTokens<NavigationMenuDesignTokens> {
    /**
     * Used to pass tokens of the root section
     */
    root?: NavigationMenuTokenSections.Root;
    /**
     * Used to pass tokens of the base item section
     */
    baseItem?: NavigationMenuTokenSections.BaseItem;
}
