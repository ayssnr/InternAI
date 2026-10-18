import { TemplateRef } from '@angular/core';
import { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link BlockUI.pt}
 * @group Interface
 */
interface BlockUIPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
}
/**
 * Defines valid pass-through options in BlockUI component.
 * @see {@link BlockUIPassThroughOptions}
 *
 * @template I Type of instance.
 */
type BlockUIPassThrough<I = unknown> = PassThrough<I, BlockUIPassThroughOptions<I>>;
/**
 * Defines valid templates in BlockUI.
 * @group Templates
 */
interface BlockUITemplates {
    /**
     * Custom template of content.
     */
    content(): TemplateRef<any>;
}

export type { BlockUIPassThrough, BlockUIPassThroughOptions, BlockUITemplates };
