const filterAllowedKeys = <T>(
  obj: Record<string, T>,
  allowedKeys: string[],
): Record<string, T> => {
  return Object.keys(obj).reduce(
    (acc, key) => {
      if (allowedKeys.includes(key)) {
        acc[key] = obj[key];
      }
      return acc;
    },
    {} as Record<string, T>,
  );
};

const filterNotAllowedKeys = <T>(
  obj: Record<string, T>,
  notAlowedKeys: string[],
): Record<string, T> => {
  return Object.keys(obj).reduce(
    (acc, key) => {
      if (!notAlowedKeys.includes(key)) {
        acc[key] = obj[key];
      }
      return acc;
    },
    {} as Record<string, T>,
  );
};

export { filterAllowedKeys, filterNotAllowedKeys };
