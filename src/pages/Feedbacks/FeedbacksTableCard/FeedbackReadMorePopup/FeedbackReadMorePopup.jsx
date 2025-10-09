import "./feedback-read-more-popup.scss";
import CrossIcon from "../../../../assets/Icons/popup-cross-icon.svg";

const FeedbackReadMorePopup = ({ setFeedbackPopup, feedbackPopupData }) => {
  const handlePopupClick = (e) => {
    e.stopPropagation();
  };

  const closePopup = () => {
    setFeedbackPopup(false);
  };

  return (
    <span className="read-more-popup-overlay" onClick={closePopup}>
      <span className="read-more-popup-body" onClick={handlePopupClick}>
        <span className="read-more-popup-header-container">
          <span className="read-more-popup-header-name-screen-name">
            <span className="read-more-popup-name">
              {feedbackPopupData?.name || "Anonymous"}
            </span>
            <span className="read-more-popup-screen-name">
              {feedbackPopupData?.screenName}
            </span>
          </span>
          <span className="read-more-popup-cross-container">
            <img
              onClick={closePopup}
              src={CrossIcon}
              alt=""
              className="read-more-popup-cross"
            />
          </span>
        </span>
        <span className="read-more-popup-feedback-text-section">
          <span className="read-more-popup-feedback-text">
            {feedbackPopupData?.feedback}
          </span>
        </span>
      </span>
    </span>
  );
};

export default FeedbackReadMorePopup;
