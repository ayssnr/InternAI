/**
 * @todo: Add dynamic params support;
 *
 * Exp;
 * usePassThrough(pt1, pt2, pt3, pt*, { mergeSections: true });
 * usePassThrough(pt1, { mergeSections: true });
 */
declare const usePassThrough: (pt1: {} | undefined, pt2: {} | undefined, ptOptions: any) => {
    _usept: any;
    originalValue: {};
    value: {};
};

export { usePassThrough };
