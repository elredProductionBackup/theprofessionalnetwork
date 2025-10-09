export const updateNetworkRequestsData = (
  id,
  networkRequestsData,
  setNetworkRequestsData,
  status
) => {
  const data = networkRequestsData?.map((item) =>
    item?._id === id ? { ...item, actionStatus: status } : item
  );
  setNetworkRequestsData(data);
};
