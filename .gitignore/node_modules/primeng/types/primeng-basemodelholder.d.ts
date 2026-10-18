import * as _angular_core from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';

declare class BaseModelHolder<PT = any> extends BaseComponent<PT> {
    modelValue: _angular_core.WritableSignal<any>;
    $filled: _angular_core.Signal<boolean>;
    writeModelValue(value: any): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<BaseModelHolder<any>, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<BaseModelHolder<any>, never, never, {}, {}, never, never, true, never>;
}

export { BaseModelHolder };
