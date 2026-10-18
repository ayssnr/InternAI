import { BadgePassThrough } from 'primeng/types/badge';
import { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link OverlayBadgeProps.pt}
 * @group Interface
 */
interface OverlayBadgePassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the Badge component.
     * @see {@link BadgePassThrough}
     */
    pcBadge?: BadgePassThrough;
}
/**
 * Defines valid pass-through options in OverlayBadge.
 * @see {@link OverlayBadgePassThroughOptions}
 *
 * @template I Type of instance.
 */
type OverlayBadgePassThrough<I = unknown> = PassThrough<I, OverlayBadgePassThroughOptions<I>>;

export type { OverlayBadgePassThrough, OverlayBadgePassThroughOptions };
