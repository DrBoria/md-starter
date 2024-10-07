const getNotDisplayedDefaultValues = (
  excludeArray: string[],
  defaultValues?: Record<string, unknown>,
) => {
  if (!defaultValues) return {};
  const notDisplayedValues = Object.assign({}, defaultValues);

  excludeArray.forEach((field) => {
    if (field in notDisplayedValues) {
      delete notDisplayedValues[field];
    }
  });

  return notDisplayedValues;
};

export { getNotDisplayedDefaultValues };
