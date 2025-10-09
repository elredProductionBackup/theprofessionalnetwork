import "./session-expired.scss";
import SessionExpiredIcon from "../../assets/Images/session-expired-icon.png";
import { useNavigate } from "react-router-dom";
import { logout } from "../../helpers/globalFunctions";
import { useContext, useEffect } from "react";
import { Auth, SessionExpired } from "../../App";

const SessionExpiredPopup = () => {
  const { setIsLoggedIn } = useContext(Auth);
  const { sessionExpired, setSessionExpired } = useContext(SessionExpired);
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionExpired) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [sessionExpired]);

  if (!sessionExpired) return null;

  return (
    <div className="session-expired-popup-overlay">
      <div className="session-expired-popup-body">
        <div className="session-expired-popup-container">
          <img
            src={SessionExpiredIcon}
            className="session-expired-icon-top"
            alt=""
          />
          <div className="session-expired-header-text">Session Expired!</div>
          <div className="session-expired-sub-text">
            Please Log out and log in again
          </div>
          <span
            onClick={() => logout(navigate, setSessionExpired, setIsLoggedIn)}
            className="session-expired-logout-btn-red"
          >
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default SessionExpiredPopup;
