import { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link InputTextPassThrough}
 * @group Interface
 */
interface InputTextPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLInputElement, I>;
}
/**
 * Defines valid pass-through options in InputText.
 * @see {@link InputTextPassThroughOptions}
 *
 * @template I Type of instance.
 */
type InputTextPassThrough<I = unknown> = PassThrough<I, InputTextPassThroughOptions<I>>;

export type { InputTextPassThrough, InputTextPassThroughOptions };
