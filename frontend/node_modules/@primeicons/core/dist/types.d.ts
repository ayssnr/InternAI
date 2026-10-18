interface IconProps {
    /**
     * Size of the icon (width and height)
     */
    size?: number | string;
    /**
     * Color of the icon
     */
    color?: string;
    /**
     * Additional CSS class
     */
    class?: string;
    /**
     * Additional CSS class name
     */
    className?: string;
    /**
     * Additional inline styles
     */
    style?: string | Record<string, string>;
    /**
     * Adds p-icon-spin to the element's class list.
     * p-icon-spin is defined in PrimeUI's stylesheet.
     */
    spin?: boolean;
}
/**
 * SVG element attributes
 */
type IconNodeAttributes = Record<string, string>;
/**
 * Icon node definition: [elementType, attributes]
 * Example: ['path', { d: 'M12 5v14', key: 'abc' }]
 */
type IconNode = [string, IconNodeAttributes];
/**
 * Icon nodes as array
 * Example: [['path', { d: '...' }], ['circle', { cx: '12', cy: '12', r: '10' }]]
 */
type IconNodes = IconNode[];
/**
 * Icon metadata
 */
interface IconMeta {
    tags?: string[];
}
/**
 * SVG element wrapper attributes (camelCase)
 */
interface IconSvgProps {
    xmlns: string;
    width: number;
    height: number;
    viewBox: string;
    fill: string;
}
/**
 * Full icon data with metadata
 */
interface IconData {
    name: string;
    meta?: IconMeta;
    svg: IconSvgProps;
    nodes: IconNodes;
}
/**
 * Icon map entry for framework-specific icon metadata
 * Provides metadata and reference to icon component
 */
interface IconMapEntry {
    /** Kebab-case icon name (e.g., 'check-circle') */
    name: string;
    /** camelCase version (e.g., 'checkCircle') */
    camelName: string;
    /** Component reference or name for the framework (lazy-loaded component) */
    component: any;
    /** Alias for polymorphic 'as' prop usage */
    as: string;
    /** Full import path (e.g., '@primeicons/react/check-circle') */
    from: string;
    /** Search tags for the icon */
    tags?: readonly string[];
}

export type { IconData, IconMapEntry, IconMeta, IconNode, IconNodeAttributes, IconNodes, IconProps, IconSvgProps };
