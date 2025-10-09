import React, { useContext, useEffect, useState } from "react";
import UserDetailsWrapper from "./UserDetailsWrapper";
import "./userdetails.scss";
import TopBar from "../../components/TopBar/TopBar";
import { useParams } from "react-router-dom";
import { axiosInstanceHeader } from "../../helpers/axiosInstance";
import { API } from "../../helpers/apiEndpoints";
import { SessionExpired } from "../../App";

const UserDetails = () => {
  const params = useParams();
  const { userCode } = params;
  const { setSessionExpired } = useContext(SessionExpired);
  const [user, setUser] = useState([]);
  const [userError, setUserError] = useState("");

  const fetchDetails = () => {
    axiosInstanceHeader
      .post(API.BASIC_DETAILS, { userCode })
      .then((res) => {
        setUser(res?.data?.result?.[0]);
      })
      .catch((err) => {
        console.log(err, "details error");
        if (err?.response?.data?.errorCode === 1) {
          setSessionExpired(true);
          setUserError("Session Expired");
        } else {
          setUserError("Something went wrong! Please try again");
        }
      });
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <>
      <TopBar />
      <div className="User-Details-Wrapper">
        <UserDetailsWrapper user={user} />
      </div>
    </>
  );
};

export default UserDetails;
