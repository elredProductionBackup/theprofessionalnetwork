import networkIcon from "../../../../assets/Icons/network-requests2.svg";

const NetworkRequestsTopHeader = ({ headerText, count }) => {
  return (
    <div className="network-requests-table-card-header-new">
      <div className="network-requests-table-card-title-left">
        <span className="network-requests-table-card-title-left-img">
          <img src={networkIcon} alt="" />
        </span>
        <span className="network-requests-table-card-title-left-text">
          {headerText}
        </span>
      </div>
      <div className="network-requests-table-card-title-right">{count}</div>
    </div>
  );
};

export default NetworkRequestsTopHeader;
