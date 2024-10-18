const withPagination = (array: any, elementsPerPage: number, currentPage: number) => {
  // Show limited count of orders
  return array.slice(currentPage * elementsPerPage, (currentPage + 1) * elementsPerPage);
};

export { withPagination };
