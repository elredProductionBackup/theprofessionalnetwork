import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Needs from "./pages/Needs/Needs";
import Leads from "./pages/Leads/Leads";
import Login from "./pages/Login/Login";
import UserDetails from "./pages/UserDetails/UserDetails";
import UsersDashboard from "./pages/UsersDashboard/Users/UsersDashboard";
import Main from "./pages/Main/Main";
import LogoutPopup from "./components/LogoutPopup/LogoutPopup";
import ProtectedRoutes from "./ProtectedRoutes";
import { Auth } from "./App";
import LoggedInRoute from "./LoggedInRoute";
import Feedbacks from "./pages/Feedbacks/Feedbacks";
import NetworkRequests from "./pages/NetworkRequests/NetworkRequests";
import SessionExpiredPopup from "./components/SessionExpiredPopup/SessionExpiredPopup";

const Routing = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(Auth);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [localStorage]);

  if (isLoggedIn === undefined) {
    return null;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoggedInRoute Component={Login} />} />
        <Route path="/main" element={<ProtectedRoutes Component={Dashboard} />}>
          <Route index element={<Main />} />
          <Route path="users" element={<UsersDashboard />} />
          <Route path="needs" element={<Needs />} />
          <Route path="leads" element={<Leads />} />
          <Route path="feedbacks" element={<Feedbacks />} />
          <Route path="network-requests" element={<NetworkRequests />} />
        </Route>
        <Route
          path="/main/user-details/:userCode"
          element={<ProtectedRoutes Component={UserDetails} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <LogoutPopup />
      <SessionExpiredPopup />
    </Router>
  );
};

export default Routing;
