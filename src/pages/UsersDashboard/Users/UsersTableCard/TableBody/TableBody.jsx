import { useNavigate } from "react-router-dom";
import { dateFormat, userLocation } from "../../../../../helpers/globalFunctions";
import UserProfilePic from "./UserProfilePic.jsx/UserProfilePic";

const TableBody = ({ usersTableData, data }) => {
  const navigate = useNavigate();

  return (
    <tbody>
      {data?.map((item, id) => (
        <tr key={id} className="user-table-row" onClick={() => navigate(`/main/user-details/${item?.userCode}?tab=Userdetails`)}>
          <td className="user-table-table-data user-table-table-data-name-img-new">
            <UserProfilePic dpURL={item?.dpURL} />
            <div className="user-table-table-name-container">
              <span className="user-table-table-name-new">{item?.firstname} {item?.lastname}</span>
              {item?.title?.length !== 0 ? (
                <span className="user-table-table-title-container-span">
                  <span className="user-table-table-title-container-new">
                    <span className="user-table-table-title-new">{item?.title?.[0]?.value}</span>
                  </span>
                  {item?.title?.length > 1 && (<span className="user-table-table-title-badge">{item?.title?.length}</span>)}
                </span>) : <span className="n-a">N/A</span>}
            </div>
          </td>
          <td className="user-table-table-data user-table-table-data-company-new">{item?.companyName ? item?.companyName : "-"}</td>
          <td className="user-table-table-data user-table-table-center">
            <span className={`user-table-table-badge ${item?.onBoardingStatus?.toLowerCase() === "completed" ? "user-table-bg-success" : "user-table-bg-danger"}`}>
              {item?.onBoardingStatus}
            </span>
          </td>
          <td className="user-table-table-data user-table-table-data-location-new">{userLocation(item?.location?.city, item?.location?.country)}</td>
          <td className="user-table-table-data user-table-table-center user-table-data-joining-date">{item?.accountCreatedDate ? dateFormat(item?.accountCreatedDate) : "-"}</td>
          <td className={`user-table-table-data user-table-table-center ${item?.accountStatus?.toLowerCase() === "active"
            ? "user-table-table-status-green" : "user-table-table-status-red"}`}>
            <span className={item?.accountStatus?.toLowerCase() === "active" ? "user-table-table-status-round-green" : "user-table-table-status-round-red"}></span>
            {item?.accountStatus ? item?.accountStatus : "-"}
          </td>
          <td className="user-table-table-data user-table-table-center">
            <span className="aadhaar-verified-text-blue">
              {item?.aadhaarVerifiedStatus ? <span className="verified">Verified</span> : <span className="n_verified">Not verified</span>}</span>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
