import Select from "react-select";
import "./feedbacks-table.scss";
import FeedbacksTopHeader from "./FeedbacksTopHeader/FeedbacksTopHeader";
import { DropdownIndicator } from "../../UsersDashboard/Users/UsersTableCard/DropdownIndicator/DropdownIndicator";
import Spinner from "react-bootstrap/Spinner";
import FeedbacksTableHeaderRow from "./FeedbacksTableHeaderRow/FeedbacksTableHeaderRow";
import FeedbacksTableBody from "./FeedbacksTableBody/FeedbacksTableBody";
import SearchPageTablePagination from "../../UsersDashboard/Users/UsersTableCard/SearchPageTablePagination/SearchPageTablePagination";

const FeedbacksTableCard = ({
  feedbackTableheaderText,
  searchText,
  setSearchText,
  searchKey,
  setSearchKey,
  onBoardingStatus,
  setOnboardingStatus,
  filterOptions,
  feedbacksLoader,
  feedbacksData,
  feedbacksError,
  itemsPerPage,
  count,
  activePage,
  setActivePage,
  feedbackSort,
  setFeedbackSort,
  dateSort,
  setDateSort,
  setSortBy,
}) => {
  const totalPages = Math.ceil(count / itemsPerPage);

  const handleChange = (selectedOption) => {
    if (selectedOption?.value === searchKey) return false;
    setSearchKey(selectedOption?.value);
    setActivePage(0);
    setSearchText("");
  };

  const handleOnboarding = (selectedOption) => {
    setActivePage(0);
    setOnboardingStatus(selectedOption?.value);
  };

  const handleSearchText = (e) => {
    if (e.target.value.trimStart() === searchText) return false;
    if (e.target.value.trim() !== "") {
      let reg = /^[a-zA-Z0-9]+$/;
      if (
        !e.nativeEvent.data ||
        e?.nativeEvent?.data?.match(reg) ||
        e?.nativeEvent.inputType === "deleteContentBackward" ||
        e?.nativeEvent?.data === " " ||
        e.nativeEvent.data === "-"
      ) {
        let regs = /\s+$/;
        let text = regs.test(e.target.value)
          ? e.target.value.replace(/\s+$/, " ")
          : e.target.value;
        if (/[ ]{2,}/.test(text)) return false;
        setSearchText(text);
      }
    } else {
      setSearchText("");
    }
  };

  return (
    <div className="feedbacks-table-card-container-new">
      <div className="feedbacks-table-card-inner-new">
        <FeedbacksTopHeader headerText={"Feedbacks"} count={count} />
        <div className="feedbacks-table-card-body-new">
          <div className="feedback-table-card-top">
            <div className="feedback-table-card-top-left">
              <span className="feedback-table-card-top-left-onboarding">
                Onboarding status
              </span>
              <Select
                options={onBoardingStatus}
                isSearchable={false}
                defaultValue={onBoardingStatus[0]}
                classNamePrefix="filter"
                components={{ DropdownIndicator }}
                onChange={handleOnboarding}
              />
            </div>
            <div className="feedback-table-card-top-right">
              <Select
                options={filterOptions}
                isSearchable={false}
                defaultValue={filterOptions[0]}
                classNamePrefix="filter"
                components={{ DropdownIndicator }}
                onChange={handleChange}
              />
              <input
                className="feedback-table-search-input-field"
                type="text"
                value={searchText}
                placeholder="Search"
                onChange={(e) => handleSearchText(e)}
              />
            </div>
          </div>
          <div className="feedback-table-table-responsive">
            <table className="feedback-table-table">
              <FeedbacksTableHeaderRow
                feedbackTableheaderText={feedbackTableheaderText}
                feedbackSort={feedbackSort}
                setFeedbackSort={setFeedbackSort}
                dateSort={dateSort}
                setDateSort={setDateSort}
                setSortBy={setSortBy}
                setActivePage={setActivePage}
                feedbacksDataLength={feedbacksData?.length}
              />
              {!feedbacksLoader && (
                <FeedbacksTableBody feedbacksData={feedbacksData} />
              )}
            </table>
            {feedbacksLoader && (
              <div className="feedback-table-spinner-container">
                <Spinner
                  animation="border"
                  variant="danger"
                  className="feedback-table-spinner-loader"
                />
              </div>
            )}
            {!feedbacksLoader && count === 0 && !feedbacksError && (
              <div className="feedback-table-spinner-container">
                <span className="no-feedbacks-found-text">
                  No feedbacks found
                </span>
              </div>
            )}
            {!feedbacksLoader && feedbacksError && (
              <div className="feedback-table-spinner-container">
                <span className="no-feedbacks-found-text">
                  {feedbacksError}
                </span>
              </div>
            )}
          </div>
          {feedbacksLoader || count === 0 || feedbacksError ? (
            <div className="feedback-table-empty-bottom"></div>
          ) : (
            <div className="feedback-table-card-bottom">
              <span className="feedback-table-card-bottom-left">
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

export default FeedbacksTableCard;
