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

/**
 * PrimeIcons Core Helpers
 *
 * Shared utility functions for framework-specific icon manifests
 * Used by @primeicons/react, @primeicons/vue, @primeicons/angular, etc.
 */

/**
 * Find icon by name (kebab-case)
 * @param iconMap - Array of IconMapEntry
 * @param name - Icon name in kebab-case
 * @returns IconMapEntry or undefined
 */
declare function getIconByName<T extends readonly IconMapEntry[]>(iconMap: T, name: string): T[number] | undefined;
/**
 * Get all icon names (kebab-case)
 * @param iconMap - Array of IconMapEntry
 * @returns Array of icon names
 */
declare function getIconNames<T extends readonly IconMapEntry[]>(iconMap: T): string[];
/**
 * Get all component names
 * @param iconMap - Array of IconMapEntry
 * @returns Array of component names
 */
declare function getComponentNames<T extends readonly IconMapEntry[]>(iconMap: T): string[];
/**
 * Search icons by partial matching across multiple fields
 * @param iconMap - Array of IconMapEntry
 * @param query - Search query
 * @returns Array of matching IconMapEntry objects
 */
declare function findIcons<T extends readonly IconMapEntry[]>(iconMap: T, query: string): T[number][];
/**
 * Create indexed maps for O(1) lookups
 * @param iconMap - Array of IconMapEntry
 * @returns Object with three lookup maps: byName, byCamel, byComponent
 */
declare function createIconMaps<T extends readonly IconMapEntry[]>(iconMap: T): {
    byName: Record<string, T[number]>;
    byCamel: Record<string, T[number]>;
    byComponent: Record<string, T[number]>;
};
/**
 * Find icons by tag from core manifest
 * @param icons - Array of IconMapEntry (from framework manifest)
 * @param coreManifest - Core manifest with tag data
 * @param tag - Tag to search for
 * @returns Array of matching icons
 */
declare function findIconsByTag<T extends readonly IconMapEntry[]>(icons: T, coreManifest: Array<{
    name: string;
    tags?: string[];
}>, tag: string): T[number][];
/**
 * Type-safe icon lookup by kebab-case name
 * @param iconMap - Array of IconMapEntry
 * @param iconMapByName - Pre-indexed map for O(1) lookup
 * @param name - Icon name in kebab-case
 * @returns IconMapEntry or undefined
 */
declare function getIconFromMap<T extends readonly IconMapEntry[]>(_iconMap: T, // For type inference
iconMapByName: Record<string, T[number]>, name: string): T[number] | undefined;

export { createIconMaps, findIcons, findIconsByTag, getComponentNames, getIconByName, getIconFromMap, getIconNames };
