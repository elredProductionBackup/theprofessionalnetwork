import redCross from "../../../../assets/Images/red-cross-round.png";

const NetworkRequestStatusChangeError = ({ closePopup }) => {
  return (
    <div className="network-requests-action-response-container">
      <img
        src={redCross}
        className="network-requests-action-response-icon-top"
        alt=""
      />
      <div className="network-requests-action-response-text">
        Something went wrong! Please try again later
      </div>
      <span
        onClick={closePopup}
        className="network-requests-action-response-close-btn-red"
      >
        Ok
      </span>
    </div>
  );
};

export default NetworkRequestStatusChangeError;
