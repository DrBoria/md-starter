type TSortOrder = "asc" | "desc";

type TOrderBy = Record<string, TSortOrder>;

const getNextSortOrder = (name: string, currentSort?: TOrderBy): TSortOrder => {
  if (currentSort?.[name]) {
    return currentSort[name] === "asc" ? "desc" : "asc";
  }
  return "asc";
};

export { TSortOrder, TOrderBy, getNextSortOrder };
