/**
 * Simple object check.
 * @param obj
 * @returns {boolean}
 */
export function isObject(obj: object | boolean): boolean {
  return obj && typeof obj === "object";
}

/**
 * Performs a deep merge of objects and returns new object. Does not modify
 * objects (immutable) and merges arrays via concatenation.
 *
 * @param {...object} objects - Objects to merge
 * @returns {object} New object with merged key/values
 */
export function mergeDeep(...objects: Record<string, object | boolean>[]) {
  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach((key) => {
      const pVal = prev[key];
      const oVal = obj[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal);
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = mergeDeep(
          pVal as Record<string, object>,
          oVal as Record<string, object>,
        );
      } else {
        prev[key] = oVal;
      }
    });

    return prev;
  }, {});
}
