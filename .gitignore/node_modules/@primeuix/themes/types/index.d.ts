/**
 *
 * @module themes
 *
 */
import type { ColorScale, Preset as StyledPreset, StyleType, ThemeConfig, TokenSection } from '@primeuix/styled';

import type { AccordionDesignTokens } from './accordion';
import type { AutoCompleteDesignTokens } from './autocomplete';
import type { AvatarDesignTokens } from './avatar';
import type { BadgeDesignTokens } from './badge';
import type { BlockUIDesignTokens } from './blockui';
import type { BreadcrumbDesignTokens } from './breadcrumb';
import type { ButtonDesignTokens } from './button';
import type { CardDesignTokens } from './card';
import type { CarouselDesignTokens } from './carousel';
import type { CascadeSelectDesignTokens } from './cascadeselect';
import type { CheckboxDesignTokens } from './checkbox';
import type { ChipDesignTokens } from './chip';
import type { ColorPickerDesignTokens } from './colorpicker';
import type { CommandMenuDesignTokens } from './commandmenu';
import type { CompareDesignTokens } from './compare';
import type { ConfirmDialogDesignTokens } from './confirmdialog';
import type { ConfirmPopupDesignTokens } from './confirmpopup';
import type { ContextMenuDesignTokens } from './contextmenu';
import type { DataTableDesignTokens } from './datatable';
import type { DataViewDesignTokens } from './dataview';
import type { DatePickerDesignTokens } from './datepicker';
import type { DialogDesignTokens } from './dialog';
import type { DividerDesignTokens } from './divider';
import type { DockDesignTokens } from './dock';
import type { DrawerDesignTokens } from './drawer';
import type { EditorDesignTokens } from './editor';
import type { FieldsetDesignTokens } from './fieldset';
import type { FileUploadDesignTokens } from './fileupload';
import type { FloatLabelDesignTokens } from './floatlabel';
import type { GalleriaDesignTokens } from './galleria';
import type { GalleryDesignTokens } from './gallery';
import type { IconFieldDesignTokens } from './iconfield';
import type { IftaLabelDesignTokens } from './iftalabel';
import type { ImageDesignTokens } from './image';
import type { ImageCompareDesignTokens } from './imagecompare';
import type { InlineMessageDesignTokens } from './inlinemessage';
import type { InplaceDesignTokens } from './inplace';
import type { InputChipsDesignTokens } from './inputchips';
import type { InputColorDesignTokens } from './inputcolor';
import type { InputGroupDesignTokens } from './inputgroup';
import type { InputNumberDesignTokens } from './inputnumber';
import type { InputOtpDesignTokens } from './inputotp';
import type { InputTagsDesignTokens } from './inputtags';
import type { InputTextDesignTokens } from './inputtext';
import type { KnobDesignTokens } from './knob';
import type { LabelDesignTokens } from './label';
import type { ListboxDesignTokens } from './listbox';
import type { MegaMenuDesignTokens } from './megamenu';
import type { MenuDesignTokens } from './menu';
import type { MenubarDesignTokens } from './menubar';
import type { MessageDesignTokens } from './message';
import type { MeterGroupDesignTokens } from './metergroup';
import type { MultiSelectDesignTokens } from './multiselect';
import type { NavigationMenuDesignTokens } from './navigationmenu';
import type { OrderListDesignTokens } from './orderlist';
import type { OrganizationChartDesignTokens } from './organizationchart';
import type { OverlayBadgeDesignTokens } from './overlaybadge';
import type { PaginatorDesignTokens } from './paginator';
import type { PanelDesignTokens } from './panel';
import type { PanelMenuDesignTokens } from './panelmenu';
import type { PasswordDesignTokens } from './password';
import type { PickListDesignTokens } from './picklist';
import type { PopoverDesignTokens } from './popover';
import type { ProgressBarDesignTokens } from './progressbar';
import type { ProgressSpinnerDesignTokens } from './progressspinner';
import type { RadioButtonDesignTokens } from './radiobutton';
import type { RatingDesignTokens } from './rating';
import type { RippleDesignTokens } from './ripple';
import type { ScrollAreaDesignTokens } from './scrollarea';
import type { ScrollPanelDesignTokens } from './scrollpanel';
import type { SelectDesignTokens } from './select';
import type { SelectButtonDesignTokens } from './selectbutton';
import type { SidebarDesignTokens } from './sidebar';
import type { SkeletonDesignTokens } from './skeleton';
import type { SliderDesignTokens } from './slider';
import type { SpeedDialDesignTokens } from './speeddial';
import type { SplitButtonDesignTokens } from './splitbutton';
import type { SplitterDesignTokens } from './splitter';
import type { StepperDesignTokens } from './stepper';
import type { StepsDesignTokens } from './steps';
import type { TabmenuDesignTokens } from './tabmenu';
import type { TabsDesignTokens } from './tabs';
import type { TabViewDesignTokens } from './tabview';
import type { TagDesignTokens } from './tag';
import type { TerminalDesignTokens } from './terminal';
import type { TextareaDesignTokens } from './textarea';
import type { TieredMenuDesignTokens } from './tieredmenu';
import type { TimelineDesignTokens } from './timeline';
import type { ToastDesignTokens } from './toast';
import type { ToggleButtonDesignTokens } from './togglebutton';
import type { ToggleSwitchDesignTokens } from './toggleswitch';
import type { ToolbarDesignTokens } from './toolbar';
import type { TooltipDesignTokens } from './tooltip';
import type { TreeDesignTokens } from './tree';
import type { TreeSelectDesignTokens } from './treeselect';
import type { TreeTableDesignTokens } from './treetable';
import type { VirtualScrollerDesignTokens } from './virtualscroller';

export interface ColorScheme<T> {
    light?: Omit<T, 'colorScheme' | 'extend' | 'css'>;
    dark?: Omit<T, 'colorScheme' | 'extend' | 'css'>;
}

export interface ColorSchemeDesignToken<T> {
    colorScheme?: ColorScheme<T>;
}

export declare type ExtendedCSS = StyleType | undefined;
export declare type ExtendedTokens = Record<string, object | string | number>;

export interface DesignTokens<T> extends ColorSchemeDesignToken<T> {
    css?: ExtendedCSS;
    extend?: ExtendedTokens;
}

export declare type RequiredDesignTokens<T, C = never> = {
    [K in keyof Omit<T, keyof DesignTokens<T>>]-?: DeepRequired<T[K]>;
} & DesignTokens<T> &
    ([C] extends [never] ? object : ColorSchemeDesignToken<C>);

export type PaletteDesignToken = ColorScale;

export interface ComponentsDesignTokens {
    accordion?: AccordionDesignTokens;
    autocomplete?: AutoCompleteDesignTokens;
    avatar?: AvatarDesignTokens;
    badge?: BadgeDesignTokens;
    blockui?: BlockUIDesignTokens;
    breadcrumb?: BreadcrumbDesignTokens;
    button?: ButtonDesignTokens;
    card?: CardDesignTokens;
    carousel?: CarouselDesignTokens;
    cascadeselect?: CascadeSelectDesignTokens;
    checkbox?: CheckboxDesignTokens;
    chip?: ChipDesignTokens;
    colorpicker?: ColorPickerDesignTokens;
    commandmenu?: CommandMenuDesignTokens;
    compare?: CompareDesignTokens;
    confirmdialog?: ConfirmDialogDesignTokens;
    confirmpopup?: ConfirmPopupDesignTokens;
    contextmenu?: ContextMenuDesignTokens;
    datatable?: DataTableDesignTokens;
    dataview?: DataViewDesignTokens;
    datepicker?: DatePickerDesignTokens;
    dialog?: DialogDesignTokens;
    divider?: DividerDesignTokens;
    dock?: DockDesignTokens;
    drawer?: DrawerDesignTokens;
    editor?: EditorDesignTokens;
    fieldset?: FieldsetDesignTokens;
    fileupload?: FileUploadDesignTokens;
    floatlabel?: FloatLabelDesignTokens;
    galleria?: GalleriaDesignTokens;
    gallery?: GalleryDesignTokens;
    iconfield?: IconFieldDesignTokens;
    iftalabel?: IftaLabelDesignTokens;
    image?: ImageDesignTokens;
    imagecompare?: ImageCompareDesignTokens;
    inlinemessage?: InlineMessageDesignTokens;
    inplace?: InplaceDesignTokens;
    inputchips?: InputChipsDesignTokens;
    inputcolor?: InputColorDesignTokens;
    inputgroup?: InputGroupDesignTokens;
    inputnumber?: InputNumberDesignTokens;
    inputotp?: InputOtpDesignTokens;
    inputtags?: InputTagsDesignTokens;
    inputtext?: InputTextDesignTokens;
    knob?: KnobDesignTokens;
    label?: LabelDesignTokens;
    listbox?: ListboxDesignTokens;
    megamenu?: MegaMenuDesignTokens;
    menu?: MenuDesignTokens;
    menubar?: MenubarDesignTokens;
    message?: MessageDesignTokens;
    metergroup?: MeterGroupDesignTokens;
    multiselect?: MultiSelectDesignTokens;
    navigationmenu?: NavigationMenuDesignTokens;
    orderlist?: OrderListDesignTokens;
    organizationchart?: OrganizationChartDesignTokens;
    overlaybadge?: OverlayBadgeDesignTokens;
    paginator?: PaginatorDesignTokens;
    panel?: PanelDesignTokens;
    panelmenu?: PanelMenuDesignTokens;
    password?: PasswordDesignTokens;
    picklist?: PickListDesignTokens;
    popover?: PopoverDesignTokens;
    progressbar?: ProgressBarDesignTokens;
    progressspinner?: ProgressSpinnerDesignTokens;
    radiobutton?: RadioButtonDesignTokens;
    rating?: RatingDesignTokens;
    ripple?: RippleDesignTokens;
    scrollarea?: ScrollAreaDesignTokens;
    scrollpanel?: ScrollPanelDesignTokens;
    select?: SelectDesignTokens;
    selectbutton?: SelectButtonDesignTokens;
    sidebar?: SidebarDesignTokens;
    skeleton?: SkeletonDesignTokens;
    slider?: SliderDesignTokens;
    speeddial?: SpeedDialDesignTokens;
    splitbutton?: SplitButtonDesignTokens;
    splitter?: SplitterDesignTokens;
    stepper?: StepperDesignTokens;
    steps?: StepsDesignTokens;
    tabmenu?: TabmenuDesignTokens;
    tabs?: TabsDesignTokens;
    tabview?: TabViewDesignTokens;
    tag?: TagDesignTokens;
    terminal?: TerminalDesignTokens;
    textarea?: TextareaDesignTokens;
    tieredmenu?: TieredMenuDesignTokens;
    timeline?: TimelineDesignTokens;
    toast?: ToastDesignTokens;
    togglebutton?: ToggleButtonDesignTokens;
    toggleswitch?: ToggleSwitchDesignTokens;
    toolbar?: ToolbarDesignTokens;
    tooltip?: TooltipDesignTokens;
    tree?: TreeDesignTokens;
    treeselect?: TreeSelectDesignTokens;
    treetable?: TreeTableDesignTokens;
    virtualscroller?: VirtualScrollerDesignTokens;
    [key: PropertyKey]: object | undefined;
}

export declare type BaseDesignTokens<T extends Partial<{ primitive: unknown; semantic: unknown }> = object> = {
    primitive?: T extends { primitive?: infer P } ? (unknown extends P ? TokenSection : P) : TokenSection;
    semantic?: T extends { semantic?: infer S } ? (unknown extends S ? TokenSection : S) : TokenSection;
};

export declare type Preset<T extends Partial<{ primitive: unknown; semantic: unknown }> = object> = Omit<StyledPreset, 'primitive' | 'semantic' | 'components'> &
    BaseDesignTokens<T> & {
        components?: ComponentsDesignTokens;
        extend?: ExtendedTokens;
        css?: ExtendedCSS;
    };

/** styled's {@link ThemeConfig} with its `preset` slot refined to this package's {@link Preset}. */
export declare type Theme = Omit<ThemeConfig, 'preset'> & { preset?: Preset };

/**
 * Custom types
 */
export declare type DeepRequired<T> = T extends object ? { [K in keyof T]-?: DeepRequired<T[K]> } : T;
