export const assignPageNumbers = (activePage, pagesCount, setPageNumbers) => {
  const allPages = [...Array(Number(pagesCount)).keys()];
  if (pagesCount <= 6) {
    setPageNumbers(allPages);
    return false;
  }
  if (activePage <= 4) {
    setPageNumbers([0, 1, 2, 3, 4, "...", allPages?.length - 1]);
    return false;
  }
  if (
    activePage === allPages?.length - 1 ||
    activePage === allPages?.length - 2 ||
    activePage === allPages?.length - 3 ||
    activePage === allPages?.length - 4 ||
    activePage === allPages?.length - 5
  ) {
    setPageNumbers([
      0,
      "...",
      allPages?.length - 5,
      allPages?.length - 4,
      allPages?.length - 3,
      allPages?.length - 2,
      allPages?.length - 1,
    ]);
  } else
    setPageNumbers([
      0,
      "...",
      activePage - 1,
      activePage,
      activePage + 1,
      "...",
      allPages?.length - 1,
    ]);
};

export const handleClickPageNumber = (pageNumber, setActivePage) => {
  if (pageNumber === "...") return false;
  setActivePage(pageNumber);
};
