/**
 * Simple object check.
 * @param obj
 * @returns {boolean}
 */
export function isObject(obj: unknown): boolean {
  return obj !== null && typeof obj === 'object';
}

/**
 * Performs a deep merge of objects and returns new object. Does not modify
 * objects (immutable) and merges arrays via concatenation.
 *
 * @param {...object} objects - Objects to merge
 * @returns {object} New object with merged key/values
 */
export function mergeDeep(...objects: Record<string, unknown>[]) {
  return objects.reduce((prev: Record<string, unknown>, obj: Record<string, unknown>) => {
    if (!obj) {
      return prev;
    }

    Object.keys(obj).forEach((key) => {
      const pVal = prev[key];
      const oVal = obj[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal);
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = mergeDeep(
          pVal as Record<string, unknown>,
          oVal as Record<string, unknown>,
        );
      } else {
        prev[key] = oVal;
      }
    });

    return prev;
  }, {});
}
