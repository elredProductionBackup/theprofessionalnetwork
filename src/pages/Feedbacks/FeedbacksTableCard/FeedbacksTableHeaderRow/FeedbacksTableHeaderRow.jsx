import dropdownIcon from "../../../../assets/Icons/gridicons_dropdown.png";

const FeedbacksTableHeaderRow = ({
  feedbackTableheaderText,
  feedbackSort,
  setFeedbackSort,
  dateSort,
  setDateSort,
  setSortBy,
  setActivePage,
  feedbacksDataLength,
}) => {
  const feedbackSortHandler = () => {
    setSortBy("rating");
    setDateSort("");
    setActivePage(0);
    setFeedbackSort((prev) => (prev === "" || prev === "des" ? "asc" : "des"));
  };

  const dateSortHandler = () => {
    setSortBy("date");
    setFeedbackSort("");
    setActivePage(0);
    setDateSort((prev) => (prev === "" || prev === "des" ? "asc" : "des"));
  };

  return (
    <thead className="feedback-table-table-head">
      <tr className="feedback-table-table-head-row-new">
        <th className="feedback-table-table-text-header-new feedback-table-header-first">
          {feedbackTableheaderText?.headerOne}
        </th>
        <th className="feedback-table-table-text-header-new feedback-table-header-second">
          {feedbackTableheaderText?.headerTwo}
        </th>
        <th className="feedback-table-table-text-header-new feedback-table-header-third">
          {feedbackTableheaderText?.headerThree}
        </th>
        <th className="feedback-table-table-text-header-new feedback-table-header-fourth">
          {feedbackTableheaderText?.headerFour}
          {feedbacksDataLength ? (
            <img
              src={dropdownIcon}
              alt=""
              className={
                feedbackSort === "asc"
                  ? "feedback-table-header-sort-icon-rotated"
                  : "feedback-table-header-sort-icon"
              }
              onClick={feedbackSortHandler}
            />
          ) : (
            <span className="feedback-table-header-no-sort-icon" />
          )}
        </th>
        <th className="feedback-table-table-text-header-new feedback-table-header-fifth">
          {feedbackTableheaderText?.headerFive}
          {feedbacksDataLength ? (
            <img
              src={dropdownIcon}
              alt=""
              className={
                dateSort === "asc"
                  ? "feedback-table-header-sort-icon-rotated"
                  : "feedback-table-header-sort-icon"
              }
              onClick={dateSortHandler}
            />
          ) : (
            <span className="feedback-table-header-no-sort-icon" />
          )}
        </th>
        <th className="feedback-table-table-text-header-new feedback-table-header-sixth">
          {feedbackTableheaderText?.headerSix}
        </th>
        <th className="feedback-table-table-text-header-new feedback-table-header-seventh">
          {feedbackTableheaderText?.headerSeven}
        </th>
      </tr>
    </thead>
  );
};

export default FeedbacksTableHeaderRow;
