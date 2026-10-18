import { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Custom passthrough(pt) options.
 * @see {@link Motion.pt}
 * @group Interface
 */
interface MotionPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
}
/**
 * Defines valid pass-through options in Motion component.
 * @see {@link MotionPassThroughOptions}
 *
 * @template I Type of instance.
 */
type MotionPassThrough<I = unknown> = PassThrough<I, MotionPassThroughOptions<I>>;

export type { MotionPassThrough, MotionPassThroughOptions };
