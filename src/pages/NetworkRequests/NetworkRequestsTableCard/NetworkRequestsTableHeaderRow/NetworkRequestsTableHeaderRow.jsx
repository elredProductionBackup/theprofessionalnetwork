const NetworkRequestsTableHeaderRow = ({ networkRequestsTableheaderText }) => {
  return (
    <thead className="network-requests-table-table-head">
      <tr className="network-requests-table-table-head-row-new">
        <th className="network-requests-table-table-text-header-new network-requests-table-header-first">
          {networkRequestsTableheaderText?.headerOne}
        </th>
        <th className="network-requests-table-table-text-header-new network-requests-table-header-second">
          {networkRequestsTableheaderText?.headerTwo}
        </th>
        <th className="network-requests-table-table-text-header-new network-requests-table-header-third">
          {networkRequestsTableheaderText?.headerThree}
        </th>
        <th className="network-requests-table-table-text-header-new network-requests-table-header-fourth">
          {networkRequestsTableheaderText?.headerFour}
        </th>
        <th className="network-requests-table-table-text-header-new network-requests-table-header-fifth">
          {networkRequestsTableheaderText?.headerFive}
        </th>
      </tr>
    </thead>
  );
};

export default NetworkRequestsTableHeaderRow;
