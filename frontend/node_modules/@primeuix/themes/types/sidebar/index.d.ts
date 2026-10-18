/**
 *
 * Sidebar Design Tokens
 *
 * @module sidebar
 *
 */

import type { ColorScheme as CS, DesignTokens, ExtendedCSS, ExtendedTokens } from '..';

/**
 * Design Token Sections
 */
export declare namespace SidebarTokenSections {
    interface Root {
        /**
         * Border color of root
         *
         * @designToken sidebar.border.color
         */
        borderColor?: string;
        /**
         * Focus ring of root
         */
        focusRing?: {
            /**
             * Focus ring width of root
             *
             * @designToken sidebar.focus.ring.width
             */
            width?: string;
            /**
             * Focus ring style of root
             *
             * @designToken sidebar.focus.ring.style
             */
            style?: string;
            /**
             * Focus ring color of root
             *
             * @designToken sidebar.focus.ring.color
             */
            color?: string;
            /**
             * Focus ring offset of root
             *
             * @designToken sidebar.focus.ring.offset
             */
            offset?: string;
            /**
             * Focus ring shadow of root
             *
             * @designToken sidebar.focus.ring.shadow
             */
            shadow?: string;
        };
    }

    interface Layout {
        /**
         * Background of layout
         *
         * @designToken sidebar.layout.background
         */
        background?: string;
    }

    interface Header {
        /**
         * Padding of header
         *
         * @designToken sidebar.header.padding
         */
        padding?: string;
        /**
         * Gap of header
         *
         * @designToken sidebar.header.gap
         */
        gap?: string;
    }

    interface Footer {
        /**
         * Padding of footer
         *
         * @designToken sidebar.footer.padding
         */
        padding?: string;
        /**
         * Gap of footer
         *
         * @designToken sidebar.footer.gap
         */
        gap?: string;
    }

    interface Panel {
        /**
         * Background of panel
         *
         * @designToken sidebar.panel.background
         */
        background?: string;
        /**
         * Color of panel
         *
         * @designToken sidebar.panel.color
         */
        color?: string;
        /**
         * Border radius of floating variant panel
         *
         * @designToken sidebar.panel.floating.border.radius
         */
        floatingBorderRadius?: string;
        /**
         * Shadow of floating variant panel
         *
         * @designToken sidebar.panel.floating.shadow
         */
        floatingShadow?: string;
    }

    interface Content {
        /**
         * Gap of content
         *
         * @designToken sidebar.content.gap
         */
        gap?: string;
    }

    interface Aside {
        /**
         * Padding of aside
         *
         * @designToken sidebar.aside.padding
         */
        padding?: string;
    }

    interface Group {
        /**
         * Padding of group
         *
         * @designToken sidebar.group.padding
         */
        padding?: string;
    }

    interface GroupLabel {
        /**
         * Padding of group label
         *
         * @designToken sidebar.group.label.padding
         */
        padding?: string;
        /**
         * Height of group label
         *
         * @designToken sidebar.group.label.height
         */
        height?: string;
        /**
         * Border radius of group label
         *
         * @designToken sidebar.group.label.border.radius
         */
        borderRadius?: string;
        /**
         * Font size of group label
         *
         * @designToken sidebar.group.label.font.size
         */
        fontSize?: string;
        /**
         * Font weight of group label
         *
         * @designToken sidebar.group.label.font.weight
         */
        fontWeight?: string;
        /**
         * Color of group label
         *
         * @designToken sidebar.group.label.color
         */
        color?: string;
    }

    interface GroupAction {
        /**
         * Top of group action
         *
         * @designToken sidebar.group.action.top
         */
        top?: string;
        /**
         * Right of group action
         *
         * @designToken sidebar.group.action.right
         */
        right?: string;
        /**
         * Size of group action
         *
         * @designToken sidebar.group.action.size
         */
        size?: string;
        /**
         * Border radius of group action
         *
         * @designToken sidebar.group.action.border.radius
         */
        borderRadius?: string;
        /**
         * Color of group action
         *
         * @designToken sidebar.group.action.color
         */
        color?: string;
        /**
         * Focus color of group action
         *
         * @designToken sidebar.group.action.focus.color
         */
        focusColor?: string;
        /**
         * Focus background of group action
         *
         * @designToken sidebar.group.action.focus.background
         */
        focusBackground?: string;
        /**
         * Icon of group action
         */
        icon?: {
            /**
             * Icon size of group action
             *
             * @designToken sidebar.group.action.icon.size
             */
            size?: string;
        };
    }

    interface Menu {
        /**
         * Gap of menu
         *
         * @designToken sidebar.menu.gap
         */
        gap?: string;
    }

    interface MenuButton {
        /**
         * Padding of menu button
         *
         * @designToken sidebar.menu.button.padding
         */
        padding?: string;
        /**
         * Gap of menu button
         *
         * @designToken sidebar.menu.button.gap
         */
        gap?: string;
        /**
         * Height of menu button
         *
         * @designToken sidebar.menu.button.height
         */
        height?: string;
        /**
         * Border radius of menu button
         *
         * @designToken sidebar.menu.button.border.radius
         */
        borderRadius?: string;
        /**
         * Font size of menu button
         *
         * @designToken sidebar.menu.button.font.size
         */
        fontSize?: string;
        /**
         * Font weight of menu button
         *
         * @designToken sidebar.menu.button.font.weight
         */
        fontWeight?: string;
        /**
         * Color of menu button
         *
         * @designToken sidebar.menu.button.color
         */
        color?: string;
        /**
         * Focus background of menu button
         *
         * @designToken sidebar.menu.button.focus.background
         */
        focusBackground?: string;
        /**
         * Focus color of menu button
         *
         * @designToken sidebar.menu.button.focus.color
         */
        focusColor?: string;
        /**
         * Active background of menu button
         *
         * @designToken sidebar.menu.button.active.background
         */
        activeBackground?: string;
        /**
         * Active color of menu button
         *
         * @designToken sidebar.menu.button.active.color
         */
        activeColor?: string;
        /**
         * Width of menu button in icon-only collapsible mode
         *
         * @designToken sidebar.menu.button.icon.only.width
         */
        iconOnlyWidth?: string;
        /**
         * Padding end of menu button when it has a sibling menu action
         *
         * @designToken sidebar.menu.button.with.action.padding.end
         */
        withActionPaddingEnd?: string;
        /**
         * Icon of menu button
         */
        icon?: {
            /**
             * Icon color of menu button
             *
             * @designToken sidebar.menu.button.icon.color
             */
            color?: string;
            /**
             * Icon focus color of menu button
             *
             * @designToken sidebar.menu.button.icon.focus.color
             */
            focusColor?: string;
            /**
             * Icon size of menu button
             *
             * @designToken sidebar.menu.button.icon.size
             */
            size?: string;
        };
    }

    interface MenuAction {
        /**
         * Top of menu action
         *
         * @designToken sidebar.menu.action.top
         */
        top?: string;
        /**
         * Right of menu action
         *
         * @designToken sidebar.menu.action.right
         */
        right?: string;
        /**
         * Width of menu action
         *
         * @designToken sidebar.menu.action.width
         */
        width?: string;
        /**
         * Border radius of menu action
         *
         * @designToken sidebar.menu.action.border.radius
         */
        borderRadius?: string;
        /**
         * Color of menu action
         *
         * @designToken sidebar.menu.action.color
         */
        color?: string;
        /**
         * Focus color of menu action
         *
         * @designToken sidebar.menu.action.focus.color
         */
        focusColor?: string;
        /**
         * Focus background of menu action
         *
         * @designToken sidebar.menu.action.focus.background
         */
        focusBackground?: string;
        /**
         * Icon of menu action
         */
        icon?: {
            /**
             * Icon size of menu action
             *
             * @designToken sidebar.menu.action.icon.size
             */
            size?: string;
        };
    }

    interface MenuBadge {
        /**
         * Top of menu badge
         *
         * @designToken sidebar.menu.badge.top
         */
        top?: string;
        /**
         * Right of menu badge
         *
         * @designToken sidebar.menu.badge.right
         */
        right?: string;
        /**
         * Height of menu badge
         *
         * @designToken sidebar.menu.badge.height
         */
        height?: string;
        /**
         * Min width of menu badge
         *
         * @designToken sidebar.menu.badge.min.width
         */
        minWidth?: string;
        /**
         * Border radius of menu badge
         *
         * @designToken sidebar.menu.badge.border.radius
         */
        borderRadius?: string;
        /**
         * Padding of menu badge
         *
         * @designToken sidebar.menu.badge.padding
         */
        padding?: string;
        /**
         * Font size of menu badge
         *
         * @designToken sidebar.menu.badge.font.size
         */
        fontSize?: string;
        /**
         * Font weight of menu badge
         *
         * @designToken sidebar.menu.badge.font.weight
         */
        fontWeight?: string;
        /**
         * Background of menu badge
         *
         * @designToken sidebar.menu.badge.background
         */
        background?: string;
        /**
         * Border color of menu badge
         *
         * @designToken sidebar.menu.badge.border.color
         */
        borderColor?: string;
        /**
         * Color of menu badge
         *
         * @designToken sidebar.menu.badge.color
         */
        color?: string;
    }

    interface MenuSub {
        /**
         * Block padding of menu sub
         *
         * @designToken sidebar.menu.sub.padding.block
         */
        paddingBlock?: string;
        /**
         * Gap of menu sub
         *
         * @designToken sidebar.menu.sub.gap
         */
        gap?: string;
        /**
         * Margin of indented (non-collapsible) menu sub
         *
         * @designToken sidebar.menu.sub.indent.margin
         */
        indentMargin?: string;
        /**
         * Padding of indented (non-collapsible) menu sub
         *
         * @designToken sidebar.menu.sub.indent.padding
         */
        indentPadding?: string;
        /**
         * Left indent of collapsible menu sub
         *
         * @designToken sidebar.menu.sub.collapsible.indent
         */
        collapsibleIndent?: string;
        /**
         * Top margin of collapsible menu sub
         *
         * @designToken sidebar.menu.sub.collapsible.top.margin
         */
        collapsibleTopMargin?: string;
        /**
         * Border radius of collapsible menu sub
         *
         * @designToken sidebar.menu.sub.collapsible.border.radius
         */
        collapsibleBorderRadius?: string;
    }

    interface MenuSubButton {
        /**
         * Padding of menu sub button
         *
         * @designToken sidebar.menu.sub.button.padding
         */
        padding?: string;
        /**
         * Gap of menu sub button
         *
         * @designToken sidebar.menu.sub.button.gap
         */
        gap?: string;
        /**
         * Height of menu sub button
         *
         * @designToken sidebar.menu.sub.button.height
         */
        height?: string;
        /**
         * Border radius of menu sub button
         *
         * @designToken sidebar.menu.sub.button.border.radius
         */
        borderRadius?: string;
        /**
         * Font size of menu sub button
         *
         * @designToken sidebar.menu.sub.button.font.size
         */
        fontSize?: string;
        /**
         * Font weight of menu sub button
         *
         * @designToken sidebar.menu.sub.button.font.weight
         */
        fontWeight?: string;
        /**
         * Color of menu sub button
         *
         * @designToken sidebar.menu.sub.button.color
         */
        color?: string;
        /**
         * Focus background of menu sub button
         *
         * @designToken sidebar.menu.sub.button.focus.background
         */
        focusBackground?: string;
        /**
         * Focus color of menu sub button
         *
         * @designToken sidebar.menu.sub.button.focus.color
         */
        focusColor?: string;
        /**
         * Active background of menu sub button
         *
         * @designToken sidebar.menu.sub.button.active.background
         */
        activeBackground?: string;
        /**
         * Active color of menu sub button
         *
         * @designToken sidebar.menu.sub.button.active.color
         */
        activeColor?: string;
        /**
         * Icon of menu sub button
         */
        icon?: {
            /**
             * Icon color of menu sub button
             *
             * @designToken sidebar.menu.sub.button.icon.color
             */
            color?: string;
            /**
             * Icon focus color of menu sub button
             *
             * @designToken sidebar.menu.sub.button.icon.focus.color
             */
            focusColor?: string;
            /**
             * Icon size of menu sub button
             *
             * @designToken sidebar.menu.sub.button.icon.size
             */
            size?: string;
        };
    }

    interface Main {
        /**
         * Background of main
         *
         * @designToken sidebar.main.background
         */
        background?: string;
        /**
         * Floating background of main
         *
         * @designToken sidebar.main.floating.background
         */
        floatingBackground?: string;
        /**
         * Inset background of main
         *
         * @designToken sidebar.main.inset.background
         */
        insetBackground?: string;
        /**
         * Margin of main
         *
         * @designToken sidebar.main.margin
         */
        margin?: string;
        /**
         * Border radius of main
         *
         * @designToken sidebar.main.border.radius
         */
        borderRadius?: string;
        /**
         * Shadow of main
         *
         * @designToken sidebar.main.shadow
         */
        shadow?: string;
    }

    /* Static Sections */
    type ColorScheme = CS<SidebarDesignTokens>;
    type CSS = ExtendedCSS;
    type Extend = ExtendedTokens;
}

/**
 *
 * _Sidebar Design Tokens_
 *
 * @group components
 * @module sidebar
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
export interface SidebarDesignTokens extends DesignTokens<SidebarDesignTokens> {
    /**
     * Used to pass tokens of the root section
     */
    root?: SidebarTokenSections.Root;
    /**
     * Used to pass tokens of the layout section
     */
    layout?: SidebarTokenSections.Layout;
    /**
     * Used to pass tokens of the header section
     */
    header?: SidebarTokenSections.Header;
    /**
     * Used to pass tokens of the footer section
     */
    footer?: SidebarTokenSections.Footer;
    /**
     * Used to pass tokens of the panel section
     */
    panel?: SidebarTokenSections.Panel;
    /**
     * Used to pass tokens of the content section
     */
    content?: SidebarTokenSections.Content;
    /**
     * Used to pass tokens of the aside section
     */
    aside?: SidebarTokenSections.Aside;
    /**
     * Used to pass tokens of the group section
     */
    group?: SidebarTokenSections.Group;
    /**
     * Used to pass tokens of the group label section
     */
    groupLabel?: SidebarTokenSections.GroupLabel;
    /**
     * Used to pass tokens of the group action section
     */
    groupAction?: SidebarTokenSections.GroupAction;
    /**
     * Used to pass tokens of the menu section
     */
    menu?: SidebarTokenSections.Menu;
    /**
     * Used to pass tokens of the menu button section
     */
    menuButton?: SidebarTokenSections.MenuButton;
    /**
     * Used to pass tokens of the menu action section
     */
    menuAction?: SidebarTokenSections.MenuAction;
    /**
     * Used to pass tokens of the menu badge section
     */
    menuBadge?: SidebarTokenSections.MenuBadge;
    /**
     * Used to pass tokens of the menu sub section
     */
    menuSub?: SidebarTokenSections.MenuSub;
    /**
     * Used to pass tokens of the menu sub button section
     */
    menuSubButton?: SidebarTokenSections.MenuSubButton;
    /**
     * Used to pass tokens of the main section
     */
    main?: SidebarTokenSections.Main;
}
