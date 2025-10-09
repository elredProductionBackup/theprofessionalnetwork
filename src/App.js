import "./App.scss";
import Routing from "./Routing";
import { createContext, useState } from "react";
import { toastConfig } from "react-simple-toasts";
import 'react-simple-toasts/dist/style.css';
import 'react-simple-toasts/dist/theme/dark.css'; 
export const LogoutPopUp = createContext();
export const Auth = createContext();
export const SessionExpired = createContext();

function App() {
  toastConfig({ maxVisibleToasts: 1,theme:'dark' });
  const [logoutPop, setLogoutPop] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);
  const [sessionExpired, setSessionExpired] = useState(false);

  return (
    <Auth.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <LogoutPopUp.Provider value={{ logoutPop, setLogoutPop }}>
        <SessionExpired.Provider value={{ sessionExpired, setSessionExpired }}>
          <Routing />
        </SessionExpired.Provider>
      </LogoutPopUp.Provider>
    </Auth.Provider>
  );
}

export default App;
