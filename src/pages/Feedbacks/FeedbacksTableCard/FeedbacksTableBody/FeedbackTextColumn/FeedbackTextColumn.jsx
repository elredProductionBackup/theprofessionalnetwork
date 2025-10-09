import RightArrowBlueIcon from "../../../../../assets/Icons/blue-icon-right-arrow.png";

const FeedbackTextColumn = ({
  item,
  setFeedbackPopupData,
  setFeedbackPopup,
  shouldShowReadMore,
}) => {
  const handleReadMore = (e, feedback) => {
    e.stopPropagation();
    setFeedbackPopupData(feedback);
    setFeedbackPopup(true);
  };

  return (
    <>
      <span
        className={
          shouldShowReadMore ? "" : "feedback-table-table-data-feedback-text"
        }
      >
        {item?.feedback}
      </span>
      {shouldShowReadMore && (
        <span className="feedback-table-read-more-container">
          <span
            className="feedback-table-read-more-text"
            onClick={(e) => handleReadMore(e, item)}
          >
            <img
              src={RightArrowBlueIcon}
              alt=""
              className="feedback-table-read-more-icon"
            />
            Read more
          </span>
        </span>
      )}
    </>
  );
};

export default FeedbackTextColumn;
