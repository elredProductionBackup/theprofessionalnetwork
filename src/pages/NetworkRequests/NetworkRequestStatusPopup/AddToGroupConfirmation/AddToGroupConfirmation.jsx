import { useState } from "react";
import greenThumbsUp from "../../../../assets/Images/green-thumbs-up-round.png";
import NetworkRequestStatusChangeError from "../NetworkRequestStatusChangeError/NetworkRequestStatusChangeError";
import Spinner from "react-bootstrap/Spinner";
import { axiosInstanceHeader } from "../../../../helpers/axiosInstance";
import { API } from "../../../../helpers/apiEndpoints";
import { updateNetworkRequestsData } from "../networkRequestsFunctions";

const AddToGroupConfirmation = ({
  closePopup,
  networkRequestRowData,
  networkRequestsData,
  setNetworkRequestsData,
}) => {
  const [addStatus, setAddStatus] = useState("");
  const [actionLoader, setActionLoader] = useState(false);
  const [apiResponseError, setApiResponseError] = useState(false);

  const networkAddRequest = (data) => {
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
          "addToGroup"
        );
      })
      .catch((err) => {
        console.log(err, "error");
        setApiResponseError(true);
        setActionLoader(false);
      });
  };

  const handleAddToGroup = () => {
    if (actionLoader) return false;
    setActionLoader(true);
    const data = { _id: networkRequestRowData.id, actionStatus: "addToGroup" };
    networkAddRequest(data);
  };

  const handleClosePopup = () => {
    if (actionLoader) return false;
    closePopup();
  };

  if (addStatus === "" && !apiResponseError) {
    return (
      <div className="network-requests-confirm-action-container">
        <div className="network-requests-confirm-action-text-top">
          Are you sure you want to add <span className="network-requests-confirm-action-name">{networkRequestRowData?.name}</span> to the
          requested Group?
        </div>
        <div className="network-requests-confirm-action-btn-group">
          <span
            className={
              actionLoader
                ? "network-requests-confirm-action-btn-add cursor-default"
                : "network-requests-confirm-action-btn-add cursor-pointer"
            }
            onClick={handleAddToGroup}
          >
            {actionLoader ? (
              <Spinner
                animation="border"
                variant="light"
                className="network-requests-confirm-action-btn-spinner-loader"
              />
            ) : (
              "Add to Group"
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

  if (addStatus === "addToGroup" && !apiResponseError) {
    return (
      <div className="network-requests-action-response-container">
        <img
          src={greenThumbsUp}
          className="network-requests-action-response-icon-top"
          alt=""
        />
        <div className="network-requests-action-response-text">
          <span className="network-requests-action-response-name">{networkRequestRowData?.name}</span> is successfully added to the requested
          Group
        </div>
        <span
          onClick={closePopup}
          className="network-requests-action-response-close-btn-green"
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

export default AddToGroupConfirmation;
