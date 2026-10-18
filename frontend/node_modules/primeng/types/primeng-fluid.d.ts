import { FluidPassThrough } from 'primeng/types/fluid';
export * from 'primeng/types/fluid';
import { BaseComponent } from 'primeng/basecomponent';
import * as i1 from 'primeng/bind';
import { Bind } from 'primeng/bind';
import { BaseStyle } from 'primeng/base';
import * as i0 from '@angular/core';

/**
 *
 * Fluid is a layout component to make descendant components span full width of their container.
 *
 * [Live Demo](https://www.primeng.org/fluid/)
 *
 * @module fluidstyle
 *
 */
declare enum FluidClasses {
    /**
     * Class name of the root element
     */
    root = "p-fluid"
}
declare class FluidStyle extends BaseStyle {
    name: string;
    classes: {
        root: string;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<FluidStyle, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FluidStyle>;
}
interface FluidStyle extends BaseStyle {
}

/**
 * Fluid is a layout component to make descendant components span full width of their container.
 * @group Components
 */
declare class Fluid extends BaseComponent<FluidPassThrough> {
    componentName: string;
    $pcFluid: Fluid | undefined;
    bindDirectiveInstance: Bind;
    onAfterViewChecked(): void;
    _componentStyle: FluidStyle;
    static ɵfac: i0.ɵɵFactoryDeclaration<Fluid, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Fluid, "p-fluid", never, {}, {}, never, ["*"], true, [{ directive: typeof i1.Bind; inputs: {}; outputs: {}; }]>;
}
declare class FluidModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<FluidModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<FluidModule, never, [typeof Fluid], [typeof Fluid]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<FluidModule>;
}

export { Fluid, FluidClasses, FluidModule, FluidStyle };
