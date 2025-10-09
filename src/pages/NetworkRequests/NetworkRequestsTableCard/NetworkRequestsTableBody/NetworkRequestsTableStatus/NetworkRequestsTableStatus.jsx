import { capitalizeWords } from "../../../../../helpers/globalFunctions";

const NetworkRequestsTableStatus = ({
  item,
  setNetworkStatusPopup,
  setNetworkRequestType,
  setNetworkRequestRowData,
}) => {
  const openAddStatusPopup = () => {
    setNetworkRequestRowData({
      id: item?._id,
      name:
        item?.name?.length > 20 ? capitalizeWords(item?.name?.slice(0, 20)) + "..." : capitalizeWords(item?.name),
    });
    setNetworkStatusPopup(true);
    setNetworkRequestType("addToGroup");
  };

  const openRejectStatusPopup = () => {
    setNetworkRequestRowData({
      id: item?._id,
      name:
        item?.name?.length > 20 ? capitalizeWords(item?.name?.slice(0, 20)) + "..." : capitalizeWords(item?.name),
    });
    setNetworkStatusPopup(true);
    setNetworkRequestType("rejected");
  };

  return (
    <>
      {item?.actionStatus === "rejected" ? (
        <span className="network-requests-status-rejected">Rejected</span>
      ) : item?.actionStatus === "addToGroup" ? (
        <span className="network-requests-status-added">Added to Group</span>
      ) : (
        <div className="network-requests-action-btn-group">
          <span
            className="network-requests-add-btn"
            onClick={openAddStatusPopup}
          >
            Add to Group
          </span>
          <span
            className="network-requests-reject-btn"
            onClick={openRejectStatusPopup}
          >
            Reject
          </span>
        </div>
      )}
    </>
  );
};

export default NetworkRequestsTableStatus;
