import { useCallback, useContext, useEffect, useState } from "react";
import UsersTableCard from "./UsersTableCard/UsersTableCard";
import {
  onBoardingStatus,
  sortOptions,
  usersTableData,
} from "./UsersTableCard/data";
import { axiosInstanceHeader } from "../../../helpers/axiosInstance";
import { API } from "../../../helpers/apiEndpoints";
import _ from "lodash";
import { SessionExpired } from "../../../App";

const Users = () => {
  const { setSessionExpired } = useContext(SessionExpired);
  const [usersData, setUsersData] = useState([]);
  const [usersError, setUsersError] = useState("");
  const [totalUsers, setTotalUsers] = useState("");
  const [activePage, setActivePage] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchKey, setSearchKey] = useState(sortOptions[0]?.value);
  const [onboardingStatus, setOnboardingStatus] = useState("");
  const [userLoader, setUsersLoader] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    deBouncedfetchUsers(searchKey, searchText, onboardingStatus);
  }, [activePage, searchText, onboardingStatus]);

  const deBouncedfetchUsers = useCallback(
    _.debounce((searchKey, searchText, onboardingStatus) => {
      if (searchText?.toLowerCase() !== debouncedSearch?.toLowerCase())
        setActivePage(0);
      fetchUsers(searchKey, searchText, onboardingStatus);
      setDebouncedSearch(searchText);
    }, 300),
    [activePage]
  );

  const fetchUsers = (searchKey, searchVal, onboardingStatus) => {
    setUsersError("");
    setUsersLoader(true);
    axiosInstanceHeader
      .post(
        `${API.ALL_USERS}?start=${
          activePage * itemsPerPage + 1
        }&offset=${itemsPerPage}
      &searchKey=${searchKey}&searchValue=${searchVal?.toLowerCase()}&onboardingStatus=${onboardingStatus}`
      )
      .then((res) => {
        setTotalUsers(res?.data?.totalUserCount);
        setUsersData(res?.data?.result);
        setUsersLoader(false);
      })
      .catch((err) => {
        console.log("Error, ", err);
        if (err?.response?.data?.errorCode === 1) {
          setSessionExpired(true);
          setUsersError("Session Expired");
        } else {
          setUsersError("Something went wrong! Please try again");
        }
        setUsersLoader(false);
      });
  };

  return (
    <>
      <UsersTableCard
        tableHeaderTextOne="Name"
        tableHeaderTextTwo="Organisation"
        tableHeaderTextThree="Onboarding status"
        tableHeaderTextFour="Location"
        tableHeaderTextFive="Account created date"
        tableHeaderTextSix="Account status"
        tableHeaderTextSeven="Aadhaar verified"
        usersTableData={usersTableData}
        usersError={usersError}
        onBoardingStatus={onBoardingStatus}
        sortOptions={sortOptions}
        data={usersData}
        count={totalUsers}
        itemsPerPage={itemsPerPage}
        activePage={activePage}
        setActivePage={setActivePage}
        searchText={searchText}
        setSearchText={setSearchText}
        setSearchKey={setSearchKey}
        setOnboardingStatus={setOnboardingStatus}
        searchKey={searchKey}
        userLoader={userLoader}
      />
    </>
  );
};

export default Users;
