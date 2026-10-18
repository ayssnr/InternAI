/**
 *
 * CommandMenu Design Tokens
 *
 * @module commandmenu
 *
 */

import type { ColorScheme as CS, DesignTokens, ExtendedCSS, ExtendedTokens } from '..';

/**
 * Design Token Sections
 */
export declare namespace CommandMenuTokenSections {
    interface Root {
        /**
         * Background of root
         *
         * @designToken commandmenu.background
         */
        background?: string;
        /**
         * Border color of root
         *
         * @designToken commandmenu.border.color
         */
        borderColor?: string;
        /**
         * Border radius of root
         *
         * @designToken commandmenu.border.radius
         */
        borderRadius?: string;
        /**
         * Height of root
         *
         * @designToken commandmenu.height
         */
        height?: string;
    }

    interface Header {
        /**
         * Padding of header
         *
         * @designToken commandmenu.header.padding
         */
        padding?: string;
        /**
         * Background of header
         *
         * @designToken commandmenu.header.background
         */
        background?: string;
        /**
         * Border color of header
         *
         * @designToken commandmenu.header.border.color
         */
        borderColor?: string;
    }

    interface Input {
        /**
         * Padding of input
         *
         * @designToken commandmenu.input.padding
         */
        padding?: string;
        /**
         * Font size of input
         *
         * @designToken commandmenu.input.font.size
         */
        fontSize?: string;
        /**
         * Font weight of input
         *
         * @designToken commandmenu.input.font.weight
         */
        fontWeight?: string;
        /**
         * Color of input
         *
         * @designToken commandmenu.input.color
         */
        color?: string;
        /**
         * Placeholder color of input
         *
         * @designToken commandmenu.input.placeholder.color
         */
        placeholderColor?: string;
    }

    interface List {
        /**
         * Padding of list
         *
         * @designToken commandmenu.list.padding
         */
        padding?: string;
    }

    interface Empty {
        /**
         * Padding of empty
         *
         * @designToken commandmenu.empty.padding
         */
        padding?: string;
        /**
         * Color of empty
         *
         * @designToken commandmenu.empty.color
         */
        color?: string;
    }

    interface Footer {
        /**
         * Padding of footer
         *
         * @designToken commandmenu.footer.padding
         */
        padding?: string;
        /**
         * Background of footer
         *
         * @designToken commandmenu.footer.background
         */
        background?: string;
        /**
         * Border color of footer
         *
         * @designToken commandmenu.footer.border.color
         */
        borderColor?: string;
    }

    /* Static Sections */
    type ColorScheme = CS<CommandMenuDesignTokens>;
    type CSS = ExtendedCSS;
    type Extend = ExtendedTokens;
}

/**
 *
 * _CommandMenu Design Tokens_
 *
 * @group components
 * @module commandmenu
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
export interface CommandMenuDesignTokens extends DesignTokens<CommandMenuDesignTokens> {
    /**
     * Used to pass tokens of the root section
     */
    root?: CommandMenuTokenSections.Root;
    /**
     * Used to pass tokens of the header section
     */
    header?: CommandMenuTokenSections.Header;
    /**
     * Used to pass tokens of the input section
     */
    input?: CommandMenuTokenSections.Input;
    /**
     * Used to pass tokens of the list section
     */
    list?: CommandMenuTokenSections.List;
    /**
     * Used to pass tokens of the empty section
     */
    empty?: CommandMenuTokenSections.Empty;
    /**
     * Used to pass tokens of the footer section
     */
    footer?: CommandMenuTokenSections.Footer;
}
