import { useContext, useEffect, useState } from "react";
import NetworkRequestsTableCard from "./NetworkRequestsTableCard/NetworkRequestsTableCard";
import { networkRequestsTableheaderText } from "./NetworkRequestsTableCard/data";
import NetworkRequestStatusPopup from "./NetworkRequestStatusPopup/NetworkRequestStatusPopup";
import { axiosInstanceHeader } from "../../helpers/axiosInstance";
import { API } from "../../helpers/apiEndpoints";
import { SessionExpired } from "../../App";

const NetworkRequests = () => {
  const { setSessionExpired } = useContext(SessionExpired);
  const [networkRequestsData, setNetworkRequestsData] = useState([]);
  const [networkRequestsError, setNetworkRequestsError] = useState("");
  const [totalNetworkRequests, setTotalNetworkRequests] = useState(null);
  const [activePage, setActivePage] = useState(0);
  const [networkRequestsLoader, setNetworkRequestsLoader] = useState(true);
  const [networkStatusPopup, setNetworkStatusPopup] = useState(false);
  const [networkRequestType, setNetworkRequestType] = useState("");
  const [networkRequestRowData, setNetworkRequestRowData] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchNetworkRequests();
  }, [activePage]); // eslint-disable-line

  const fetchNetworkRequests = () => {
    setNetworkRequestsError("");
    setNetworkRequestsLoader(true);
    axiosInstanceHeader
      .get(
        `${API.GET_ADD_NETWORK_REQUESTS}?start=${
          activePage * itemsPerPage + 1
        }&offset=${itemsPerPage}`
      )
      .then((res) => {
        setTotalNetworkRequests(res?.data?.totalUserNetworkRequest);
        setNetworkRequestsData(res?.data?.result);
        setNetworkRequestsLoader(false);
      })
      .catch((err) => {
        console.log("Error, ", err);
        if (err?.response?.data?.errorCode === 1) {
          setSessionExpired(true);
          setNetworkRequestsError("Session Expired");
        } else {
          setNetworkRequestsError("Something went wrong! Please try again");
        }
        setNetworkRequestsLoader(false);
      });
  };

  return (
    <>
      <NetworkRequestsTableCard
        networkRequestsTableheaderText={networkRequestsTableheaderText}
        networkRequestsData={networkRequestsData}
        networkRequestsError={networkRequestsError}
        networkRequestsLoader={networkRequestsLoader}
        setNetworkStatusPopup={setNetworkStatusPopup}
        setNetworkRequestType={setNetworkRequestType}
        count={totalNetworkRequests}
        setNetworkRequestRowData={setNetworkRequestRowData}
        itemsPerPage={itemsPerPage}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      {networkStatusPopup && (
        <NetworkRequestStatusPopup
          setNetworkStatusPopup={setNetworkStatusPopup}
          networkRequestType={networkRequestType}
          networkRequestRowData={networkRequestRowData}
          networkRequestsData={networkRequestsData}
          setNetworkRequestsData={setNetworkRequestsData}
        />
      )}
    </>
  );
};

export default NetworkRequests;
