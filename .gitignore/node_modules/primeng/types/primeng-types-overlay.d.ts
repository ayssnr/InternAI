import { TemplateRef } from '@angular/core';
import { MotionOptions } from '@primeuix/motion';
import { OverlayModeType, PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Custom content template context.
 * @group Interface
 */
interface OverlayContentTemplateContext {
    /**
     * Object containing the overlay mode.
     */
    $implicit: {
        /**
         * Current overlay mode.
         */
        mode: OverlayModeType | string | null;
    };
}
/**
 * Defines valid templates in Overlay.
 * @group Templates
 */
interface OverlayTemplates {
    /**
     * Custom content template.
     * @param {OverlayContentTemplateContext} context - content context.
     */
    content(context: OverlayContentTemplateContext): TemplateRef<OverlayContentTemplateContext>;
}
/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link OverlayProps.pt}
 * @group Interface
 */
interface OverlayPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the content's DOM element.
     */
    content?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass options to the motion component/directive.
     */
    motion?: MotionOptions;
}
/**
 * Defines valid pass-through options in Overlay component.
 * @see {@link OverlayPassThroughOptions}
 *
 * @template I Type of instance.
 */
type OverlayPassThrough<I = unknown> = PassThrough<I, OverlayPassThroughOptions<I>>;

export type { OverlayContentTemplateContext, OverlayPassThrough, OverlayPassThroughOptions, OverlayTemplates };
