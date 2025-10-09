import { capitalizeWords } from "../../../../helpers/globalFunctions";
import NetworkRequestsTableStatus from "./NetworkRequestsTableStatus/NetworkRequestsTableStatus";

const NetworkRequestsTableBody = ({
  networkRequestsData,
  setNetworkStatusPopup,
  setNetworkRequestType,
  setNetworkRequestRowData,
}) => {
  return (
    <>
      <tbody>
        {networkRequestsData?.map((item) => (
          <tr key={item?._id}>
            <td className="network-requests-table-table-data network-requests-table-table-data-name-container">
              <span className="network-requests-table-table-name">
                {item?.name ?capitalizeWords(item?.name):'Anonymous'}
              </span>
            </td>
            <td className="network-requests-table-table-data network-requests-table-table-center network-requests-table-table-data-email ">
              {item?.email? item.email:'-'}
            </td>
            <td className="network-requests-table-table-data network-requests-table-table-center network-requests-table-table-data-organisation">
              {item?.companyName ? item.companyName:'-'}
            </td>
            <td className="network-requests-table-table-data network-requests-table-table-center network-requests-table-table-phone-number">
              {item?.phone ? item.phone:'-'}
            </td>
            <td className="network-requests-table-table-data network-requests-table-table-center network-requests-table-table-status">
              <NetworkRequestsTableStatus
                item={item}
                setNetworkStatusPopup={setNetworkStatusPopup}
                setNetworkRequestType={setNetworkRequestType}
                setNetworkRequestRowData={setNetworkRequestRowData}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default NetworkRequestsTableBody;
