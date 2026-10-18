import { TemplateRef } from '@angular/core';
import { PassThrough, PassThroughOption } from 'primeng/api';
import { InputTextPassThrough } from 'primeng/types/inputtext';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link InputMask.pt}
 * @group Interface
 */
interface InputMaskPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLInputElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLInputElement, I>;
    /**
     * Used to pass attributes to the InputText component.
     */
    pcInputText?: InputTextPassThrough;
    /**
     * Used to pass attributes to the clear icon's DOM element.
     */
    clearIcon?: PassThroughOption<HTMLElement, I>;
}
/**
 * Defines valid pass-through options in InputMask.
 * @see {@link InputMaskPassThroughOptions}
 *
 * @template I Type of instance.
 */
type InputMaskPassThrough<I = unknown> = PassThrough<I, InputMaskPassThroughOptions<I>>;
/**
 * Caret positions.
 * @group Types
 */
type Caret = {
    begin: number;
    end: number;
};
/**
 * Defines valid templates in InputMask.
 * @group Templates
 */
interface InputMaskTemplates {
    /**
     * Custom clear icon template.
     */
    clearicon(): TemplateRef<void>;
}

export type { Caret, InputMaskPassThrough, InputMaskPassThroughOptions, InputMaskTemplates };
