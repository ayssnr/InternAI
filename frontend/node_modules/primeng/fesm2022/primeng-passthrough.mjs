/**
 * @todo: Add dynamic params support;
 *
 * Exp;
 * usePassThrough(pt1, pt2, pt3, pt*, { mergeSections: true });
 * usePassThrough(pt1, { mergeSections: true });
 */
const usePassThrough = (pt1 = {}, pt2 = {}, ptOptions) => {
    return {
        _usept: ptOptions,
        originalValue: pt1,
        value: { ...pt1, ...pt2 }
    };
};

/**
 * Generated bundle index. Do not edit.
 */

export { usePassThrough };
//# sourceMappingURL=primeng-passthrough.mjs.map
