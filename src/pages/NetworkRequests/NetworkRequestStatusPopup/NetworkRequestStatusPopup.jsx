import "./network-request-status-popup.scss";
import AddToGroupConfirmation from "./AddToGroupConfirmation/AddToGroupConfirmation";
import RejectConfirmation from "./RejectConfirmation/RejectConfirmation";

const NetworkRequestStatuspopup = ({
  setNetworkStatusPopup,
  networkRequestType,
  networkRequestRowData,
  networkRequestsData,
  setNetworkRequestsData,
}) => {
  const closePopup = () => {
    setNetworkStatusPopup(false);
  };

  return (
    <div className="network-request-status-popup-overlay">
      <div className="network-request-status-popup-body">
        {networkRequestType === "addToGroup" && (
          <AddToGroupConfirmation
            closePopup={closePopup}
            networkRequestRowData={networkRequestRowData}
            networkRequestsData={networkRequestsData}
            setNetworkRequestsData={setNetworkRequestsData}
          />
        )}
        {networkRequestType === "rejected" && (
          <RejectConfirmation
            closePopup={closePopup}
            networkRequestRowData={networkRequestRowData}
            networkRequestsData={networkRequestsData}
            setNetworkRequestsData={setNetworkRequestsData}
          />
        )}
      </div>
    </div>
  );
};

export default NetworkRequestStatuspopup;
