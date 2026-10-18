/**
 *
 * Gallery Design Tokens
 *
 * @module gallery
 *
 */

import type { ColorScheme as CS, DesignTokens, ExtendedCSS, ExtendedTokens } from '..';

/**
 * Design Token Sections
 */
export declare namespace GalleryTokenSections {
    interface Backdrop {
        /**
         * Background of backdrop
         *
         * @designToken gallery.backdrop.background
         */
        background?: string;
    }

    interface Header {
        /**
         * Padding of header
         *
         * @designToken gallery.header.padding
         */
        padding?: string;
        /**
         * Background of header
         *
         * @designToken gallery.header.background
         */
        background?: string;
    }

    interface Footer {
        /**
         * Padding of footer
         *
         * @designToken gallery.footer.padding
         */
        padding?: string;
        /**
         * Background of footer
         *
         * @designToken gallery.footer.background
         */
        background?: string;
        /**
         * Border color of footer
         *
         * @designToken gallery.footer.border.color
         */
        borderColor?: string;
    }

    interface Item {
        /**
         * Transition duration of item (transform and opacity)
         *
         * @designToken gallery.item.transition.duration
         */
        transitionDuration?: string;
    }

    interface Action {
        /**
         * Size of action (shared by action / next / prev)
         *
         * @designToken gallery.action.size
         */
        size?: string;
        /**
         * Border radius of action
         *
         * @designToken gallery.action.border.radius
         */
        borderRadius?: string;
        /**
         * Color of action
         *
         * @designToken gallery.action.color
         */
        color?: string;
        /**
         * Hover background of action
         *
         * @designToken gallery.action.hover.background
         */
        hoverBackground?: string;
        /**
         * Hover color of action
         *
         * @designToken gallery.action.hover.color
         */
        hoverColor?: string;
        /**
         * Disabled opacity of action
         *
         * @designToken gallery.action.disabled.opacity
         */
        disabledOpacity?: string;
        /**
         * Transition duration of action
         *
         * @designToken gallery.action.transition.duration
         */
        transitionDuration?: string;
        /**
         * Icon of action
         */
        icon?: {
            /**
             * Icon size of action
             *
             * @designToken gallery.action.icon.size
             */
            size?: string;
        };
    }

    interface Navigation {
        /**
         * Background of navigation (next / prev)
         *
         * @designToken gallery.navigation.background
         */
        background?: string;
        /**
         * Size of navigation
         *
         * @designToken gallery.navigation.size
         */
        size?: string;
        /**
         * Border radius of navigation
         *
         * @designToken gallery.navigation.border.radius
         */
        borderRadius?: string;
        /**
         * Color of navigation
         *
         * @designToken gallery.navigation.color
         */
        color?: string;
        /**
         * Hover background of navigation
         *
         * @designToken gallery.navigation.hover.background
         */
        hoverBackground?: string;
        /**
         * Hover color of navigation
         *
         * @designToken gallery.navigation.hover.color
         */
        hoverColor?: string;
        /**
         * Edge offset of navigation
         *
         * @designToken gallery.navigation.offset
         */
        offset?: string;
        /**
         * Transition duration of navigation
         *
         * @designToken gallery.navigation.transition.duration
         */
        transitionDuration?: string;
        /**
         * Icon of navigation
         */
        icon?: {
            /**
             * Icon size of navigation
             *
             * @designToken gallery.navigation.icon.size
             */
            size?: string;
        };
    }

    interface Thumbnail {
        /**
         * Size of thumbnail item
         *
         * @designToken gallery.thumbnail.size
         */
        size?: string;
        /**
         * Padding of thumbnail item
         *
         * @designToken gallery.thumbnail.padding
         */
        padding?: string;
        /**
         * Background of thumbnail item
         *
         * @designToken gallery.thumbnail.background
         */
        background?: string;
        /**
         * Border radius of thumbnail item
         *
         * @designToken gallery.thumbnail.border.radius
         */
        borderRadius?: string;
        /**
         * Border width of thumbnail item (outline width)
         *
         * @designToken gallery.thumbnail.border.width
         */
        borderWidth?: string;
        /**
         * Hover border color of thumbnail item
         *
         * @designToken gallery.thumbnail.hover.border.color
         */
        hoverBorderColor?: string;
        /**
         * Active border color of thumbnail item
         *
         * @designToken gallery.thumbnail.active.border.color
         */
        activeBorderColor?: string;
        /**
         * Active scale of thumbnail item
         *
         * @designToken gallery.thumbnail.active.scale
         */
        activeScale?: string;
        /**
         * Transition duration of thumbnail item
         *
         * @designToken gallery.thumbnail.transition.duration
         */
        transitionDuration?: string;
    }

    interface ThumbnailContent {
        /**
         * Padding of thumbnail content
         *
         * @designToken gallery.thumbnail.content.padding
         */
        padding?: string;
    }

    /* Static Sections */
    type ColorScheme = CS<GalleryDesignTokens>;
    type CSS = ExtendedCSS;
    type Extend = ExtendedTokens;
}

/**
 *
 * _Gallery Design Tokens_
 *
 * @group components
 * @module gallery
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
export interface GalleryDesignTokens extends DesignTokens<GalleryDesignTokens> {
    /**
     * Used to pass tokens of the backdrop section
     */
    backdrop?: GalleryTokenSections.Backdrop;
    /**
     * Used to pass tokens of the header section
     */
    header?: GalleryTokenSections.Header;
    /**
     * Used to pass tokens of the footer section
     */
    footer?: GalleryTokenSections.Footer;
    /**
     * Used to pass tokens of the item section
     */
    item?: GalleryTokenSections.Item;
    /**
     * Used to pass tokens of the action section (shared by action / next / prev base)
     */
    action?: GalleryTokenSections.Action;
    /**
     * Used to pass tokens of the navigation section (next / prev)
     */
    navigation?: GalleryTokenSections.Navigation;
    /**
     * Used to pass tokens of the thumbnail section
     */
    thumbnail?: GalleryTokenSections.Thumbnail;
    /**
     * Used to pass tokens of the thumbnail content section
     */
    thumbnailContent?: GalleryTokenSections.ThumbnailContent;
}
