import feedbackIcon from "../../../../assets/Icons/feedback2.svg";

const FeedbacksTopHeader = ({ headerText, count }) => {
  return (
    <div className="feedbacks-table-card-header-new">
      <div className="feedbacks-table-card-title-left">
        <span className="feedbacks-table-card-title-left-img">
          <img src={feedbackIcon} alt="" />
        </span>
        <span className="feedbacks-table-card-title-left-text">
          {headerText}
        </span>
      </div>
      <div className="feedbacks-table-card-title-right">{count}</div>
    </div>
  );
};

export default FeedbacksTopHeader;
