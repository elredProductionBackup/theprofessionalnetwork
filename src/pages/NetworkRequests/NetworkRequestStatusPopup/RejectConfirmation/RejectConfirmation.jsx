import { useState } from "react";
import redThumbsDown from "../../../../assets/Images/red-thumbs-down-round.png";
import NetworkRequestStatusChangeError from "../NetworkRequestStatusChangeError/NetworkRequestStatusChangeError";
import Spinner from "react-bootstrap/Spinner";
import { API } from "../../../../helpers/apiEndpoints";
import { axiosInstanceHeader } from "../../../../helpers/axiosInstance";
import { updateNetworkRequestsData } from "../networkRequestsFunctions";

const RejectConfirmation = ({
  closePopup,
  networkRequestRowData,
  networkRequestsData,
  setNetworkRequestsData,
}) => {
  const [addStatus, setAddStatus] = useState("");
  const [actionLoader, setActionLoader] = useState(false);
  const [apiResponseError, setApiResponseError] = useState(false);

  const networkRejectRequest = (data) => {
    setApiResponseError(false);
    setActionLoader(true);
    axiosInstanceHeader
      .put(`${API.PUT_ADD_NETWORK_REQUESTS}`, data)
      .then((res) => {
        setAddStatus(res?.data?.result?.[0]?.actionStatus);
        setActionLoader(false);
        updateNetworkRequestsData(
          data._id,
          networkRequestsData,
          setNetworkRequestsData,
          "rejected"
        );
      })
      .catch((err) => {
        console.log(err, "error");
        setApiResponseError(true);
        setActionLoader(false);
      });
  };

  const handleReject = () => {
    if (actionLoader) return false;
    setActionLoader(true);
    const data = { _id: networkRequestRowData.id, actionStatus: "rejected" };
    networkRejectRequest(data);
  };

  const handleClosePopup = () => {
    if (actionLoader) return false;
    closePopup();
  };

  if (addStatus === "" && !apiResponseError) {
    return (
      <div className="network-requests-confirm-action-container">
        <div className="network-requests-confirm-action-text-top">
          Are you sure you want to reject <span className="network-requests-confirm-action-name">{networkRequestRowData?.name}</span>'s request?
        </div>
        <div className="network-requests-confirm-action-btn-group">
          <span
            className={
              actionLoader
                ? "network-requests-confirm-action-btn-reject cursor-default"
                : "network-requests-confirm-action-btn-reject cursor-pointer"
            }
            onClick={handleReject}
          >
            {actionLoader ? (
              <Spinner
                animation="border"
                variant="light"
                className="network-requests-confirm-action-btn-spinner-loader"
              />
            ) : (
              "Reject"
            )}
          </span>
          <span
            className={
              actionLoader
                ? "network-requests-confirm-action-btn-cancel cursor-default"
                : "network-requests-confirm-action-btn-cancel cursor-pointer"
            }
            onClick={handleClosePopup}
          >
            Cancel
          </span>
        </div>
      </div>
    );
  }

  if (addStatus === "rejected" && !apiResponseError) {
    return (
      <div className="network-requests-action-response-container">
        <img
          src={redThumbsDown}
          className="network-requests-action-response-icon-top"
          alt=""
        />
        <div className="network-requests-action-response-text">
        <span className="network-requests-action-response-name">{networkRequestRowData?.name}</span>'s request to join the Group has been
          rejected
        </div>
        <span
          onClick={closePopup}
          className="network-requests-action-response-close-btn-red"
        >
          Ok
        </span>
      </div>
    );
  }

  if (addStatus === "" && apiResponseError) {
    return <NetworkRequestStatusChangeError closePopup={closePopup} />;
  }
};

export default RejectConfirmation;
