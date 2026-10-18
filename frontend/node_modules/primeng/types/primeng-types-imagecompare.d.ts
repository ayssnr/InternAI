import { TemplateRef } from '@angular/core';
import { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link ImageCompare.pt}
 * @group Interface
 */
interface ImageComparePassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the slider's DOM element.
     */
    slider?: PassThroughOption<HTMLInputElement, I>;
}
/**
 * Defines valid pass-through options in ImageCompare.
 * @see {@link ImageComparePassThroughOptions}
 *
 * @template I Type of instance.
 */
type ImageComparePassThrough<I = unknown> = PassThrough<I, ImageComparePassThroughOptions<I>>;
/**
 * Defines valid templates in ImageCompare.
 * @group Templates
 */
interface ImageCompareTemplates {
    /**
     * Custom left side template.
     */
    left(): TemplateRef<void>;
    /**
     * Custom right side template.
     */
    right(): TemplateRef<void>;
}

export type { ImageComparePassThrough, ImageComparePassThroughOptions, ImageCompareTemplates };
