/* eslint-disable */
const filterAllowedKeys = (
  obj: Record<string, any>,
  allowedKeys: string[],
): Record<string, any> => {
  return Object.keys(obj).reduce(
    (acc, key) => {
      if (allowedKeys.includes(key)) {
        acc[key] = obj[key];
      }
      return acc;
    },
    {} as Record<string, any>,
  );
};

const filterNotAllowedKeys = (
  obj: Record<string, any>,
  notAlowedKeys: string[],
): Record<string, any> => {
  return Object.keys(obj).reduce(
    (acc, key) => {
      if (!notAlowedKeys.includes(key)) {
        acc[key] = obj[key];
      }
      return acc;
    },
    {} as Record<string, any>,
  );
};

export { filterAllowedKeys, filterNotAllowedKeys };
