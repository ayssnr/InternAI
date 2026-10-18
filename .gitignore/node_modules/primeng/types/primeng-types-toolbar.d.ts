import { TemplateRef } from '@angular/core';
import { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link Toolbar.pt}
 * @group Interface
 */
interface ToolbarPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the start's DOM element.
     */
    start?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the center's DOM element.
     */
    center?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the right's DOM element.
     */
    end?: PassThroughOption<HTMLDivElement, I>;
}
/**
 * Defines valid pass-through options in Toolbar component.
 * @see {@link ToolbarPassThroughOptions}
 *
 * @template I Type of instance.
 */
type ToolbarPassThrough<I = unknown> = PassThrough<I, ToolbarPassThroughOptions<I>>;
/**
 * Defines valid templates in Toolbar.
 * @group Templates
 */
interface ToolbarTemplates {
    /**
     * Custom start template.
     */
    start(): TemplateRef<void>;
    /**
     * Custom end template.
     */
    end(): TemplateRef<void>;
    /**
     * Custom center template.
     */
    center(): TemplateRef<void>;
}

export type { ToolbarPassThrough, ToolbarPassThroughOptions, ToolbarTemplates };
