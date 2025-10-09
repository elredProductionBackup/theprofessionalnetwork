import Spinner from "react-bootstrap/Spinner";
import "./network-requests-table-card.scss";
import NetworkRequestsTopHeader from "./NetworkRequestsTopHeader/NetworkRequestsTopHeader";
import NetworkRequestsTableHeaderRow from "./NetworkRequestsTableHeaderRow/NetworkRequestsTableHeaderRow";
import NetworkRequestsTableBody from "./NetworkRequestsTableBody/NetworkRequestsTableBody";
import SearchPageTablePagination from "../../UsersDashboard/Users/UsersTableCard/SearchPageTablePagination/SearchPageTablePagination";

const NetworkRequestsTableCard = ({
  networkRequestsTableheaderText,
  networkRequestsData,
  networkRequestsError,
  networkRequestsLoader,
  setNetworkStatusPopup,
  setNetworkRequestType,
  count,
  setNetworkRequestRowData,
  itemsPerPage,
  activePage,
  setActivePage,
}) => {
  const totalPages = Math.ceil(count / itemsPerPage);

  return (
    <div className="network-requests-table-card-container-new">
      <div className="network-requests-table-card-inner-new">
        <NetworkRequestsTopHeader
          headerText={"Add to Network Request Details"}
          count={count}
        />
        <div className="network-requests-table-card-body-new">
          <div className="network-requests-table-table-responsive">
            <table className="network-requests-table-table">
              <NetworkRequestsTableHeaderRow
                networkRequestsTableheaderText={networkRequestsTableheaderText}
              />
              {!networkRequestsLoader && (
                <NetworkRequestsTableBody
                  networkRequestsData={networkRequestsData}
                  setNetworkStatusPopup={setNetworkStatusPopup}
                  setNetworkRequestType={setNetworkRequestType}
                  setNetworkRequestRowData={setNetworkRequestRowData}
                />
              )}
            </table>
            {networkRequestsLoader && (
              <div className="network-requests-table-spinner-container">
                <Spinner
                  animation="border"
                  variant="danger"
                  className="network-requests-table-spinner-loader"
                />
              </div>
            )}
            {!networkRequestsLoader && count === 0 && !networkRequestsError && (
              <div className="network-requests-table-spinner-container">
                <span className="no-network-requests-found-text">
                  No network requests found
                </span>
              </div>
            )}
            {!networkRequestsLoader && networkRequestsError && (
              <div className="network-requests-table-spinner-container">
                <span className="no-network-requests-found-text">
                  {networkRequestsError}
                </span>
              </div>
            )}
          </div>
          {networkRequestsLoader || count === 0 || networkRequestsError ? (
            <div className="network-requests-table-empty-bottom"></div>
          ) : (
            <div className="network-requests-table-card-bottom">
              <span className="network-requests-table-card-bottom-left">
                Showing{" "}
                {count > 0
                  ? (activePage + 1) * itemsPerPage - itemsPerPage + 1
                  : 0}{" "}
                to{" "}
                {(activePage + 1) * itemsPerPage > count
                  ? count
                  : (activePage + 1) * itemsPerPage}{" "}
                Out of {count} entries
              </span>
              <SearchPageTablePagination
                pagesCount={totalPages}
                activePage={activePage}
                setActivePage={setActivePage}
                count={count}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NetworkRequestsTableCard;
