import { useEffect, useState } from "react";
import "./search-page-table-pagination.scss";
import {
  assignPageNumbers,
  handleClickPageNumber,
} from "./SearchTablePaginationFunctions/SearchTablePaginationFunctions";

const SearchPageTablePagination = ({
  pagesCount,
  activePage,
  setActivePage,
  count,
}) => {
  const [pageNumbers, setPageNumbers] = useState(null);

  useEffect(() => {
    assignPageNumbers(activePage, pagesCount, setPageNumbers);
  }, [activePage, pagesCount]);

  return (
    <div>
      {count > 10 ? (
        <div className="search-page-table-pagination">
          <div
            onClick={() =>
              setActivePage((prev) => (prev > 0 ? prev - 1 : prev))
            }
            className={`search-page-table-prev ${
              activePage === 0 ? "search-page-table-disabled" : ""
            }`}
          >
            <div className="search-page-table-page-link">Prev</div>
          </div>
          {pageNumbers?.map((item, index) => (
            <div
              key={item + index}
              onClick={() => handleClickPageNumber(item, setActivePage)}
              className={`${
                item === "..."
                  ? "search-page-table-page-dots"
                  : "search-page-table-page-item"
              } ${activePage === item ? "search-page-table-active" : ""}`}
            >
              <div className="search-page-table-page-link">
                {item === "..." ? item : item + 1}
              </div>
            </div>
          ))}
          <div
            onClick={() =>
              setActivePage((prev) =>
                prev <= pagesCount - 2 ? prev + 1 : prev
              )
            }
            className={`search-page-table-next ${
              activePage === pagesCount - 1 ? "search-page-table-disabled" : ""
            }`}
          >
            <div className="search-page-table-page-link">Next</div>
          </div>
        </div>
      ) : (
        <div className="empty-search-table-pagination"></div>
      )}
    </div>
  );
};

export default SearchPageTablePagination;
