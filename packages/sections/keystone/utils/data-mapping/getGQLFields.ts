const getGQLFields = <T extends Record<string, unknown>>(obj: T): string[] => {
  const excludeFields = ["id", "created_at", "__typename"];
  const returnData = Object.getOwnPropertyNames(obj).filter(
    (property) => !excludeFields.includes(property),
  );

  return returnData;
};

export { getGQLFields };
