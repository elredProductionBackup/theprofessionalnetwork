import React, { useEffect, useState } from 'react'
import InfoHeader from './Components/InfoHeader'
import Info from './Components/Info'
import { dateTime, updateTimer } from '../../../../../../helpers/globalFunctions';
import Spinner from 'react-bootstrap/Spinner'

const DeviceInfoChip = ({ userDetails, userDetailsLoader, setUserDetails }) => {
    const { loginDetails } = userDetails;
    const [remainingPhoneOtpTime, setRemainingPhoneOtpTime] = useState("");
    const [remainingEmailOtpTime, setRemainingEmailOtpTime] = useState("");

    // Effect for Phone Number OTP timer
    useEffect(() => {
      if (!loginDetails?.phoneNumberOtpExpirationTime) return;
  
      updateTimer(loginDetails.phoneNumberOtpExpirationTime, setRemainingPhoneOtpTime, setUserDetails); 
  
      const timerInterval = setInterval(() => {
        updateTimer(loginDetails.phoneNumberOtpExpirationTime, setRemainingPhoneOtpTime, setUserDetails);
      }, 1000);
  
      return () => clearInterval(timerInterval);
    }, [loginDetails?.phoneNumberOtpExpirationTime, setUserDetails]);

    // Effect for Email OTP timer
    useEffect(() => {
      if (!loginDetails?.emailOtpExpirationTime) return;
  
      updateTimer(loginDetails.emailOtpExpirationTime, setRemainingEmailOtpTime, setUserDetails); 
  
      const timerInterval = setInterval(() => {
        updateTimer(loginDetails.emailOtpExpirationTime, setRemainingEmailOtpTime, setUserDetails);
      }, 1000);
  
      return () => clearInterval(timerInterval);
    }, [loginDetails?.emailOtpExpirationTime, setUserDetails]);

    return (
        <>
            <div className='Info-wrapper'>
                <InfoHeader title='Login details' />
                <div className='loginDetails-wrapper row'>
                  {userDetailsLoader ? <div className="user-details-spinner-container">
                        <Spinner animation="border" variant="danger" className="user-details-spinner-loader"/>
                    </div> : <>
                    <div className='detail-wrapper mb-2 col-lg-6 col-md-6 col-xl-4 col-12'>
                        <Info title={"Last login time"} value={loginDetails?.lastLoginTime ? dateTime(loginDetails?.lastLoginTime) : "N/A"} />
                        <Info title={"Current device details"} value={loginDetails?.currentDeviceDetails?loginDetails?.currentDeviceDetails:"N/A"} />
                        <Info title={"Network"} value={loginDetails?.network? loginDetails?.network :"N/A"} />
                        <Info title={"Email OTP"} value={loginDetails?.emailOtp? loginDetails?.emailOtp :"N/A"} />
                    </div>
                    <div className='detail-wrapper mb-2 col-lg-6 col-md-6 col-xl-4 col-12'>
                        <Info title={"Last logout time"} value={loginDetails?.lastLogoutTime ? dateTime(loginDetails?.lastLogoutTime) : "N/A"} />
                        <Info title={"Last logout location"} value={loginDetails?.lastLogoutLocation?.city || loginDetails?.lastLogoutLocation?.country ? loginDetails?.lastLogoutLocation?.city + ' ' + loginDetails?.lastLogoutLocation?.country:"N/A"} />
                        <Info title={"Phone Number OTP"} value={loginDetails?.phoneNumberOtp? loginDetails?.phoneNumberOtp:"N/A"} />
                        <Info title={"Email OTP validity time"} value={loginDetails?.emailOtpExpirationTime? remainingEmailOtpTime : "N/A"} />
                    </div>
                    <div className='detail-wrapper mb-2 col-lg-6 col-md-6 col-xl-4 col-12'>
                        <Info title={"Last accessed location"} value={loginDetails?.lastAccessedLocation?.city || loginDetails?.lastAccessedLocation?.country ? loginDetails?.lastAccessedLocation?.city + ' ' + loginDetails?.lastAccessedLocation?.country:"N/A"} />
                        <Info title={"Sign in via"} value={loginDetails?.signInVia ? loginDetails?.signInVia:"N/A"} />
                        <Info title={"Phone Number OTP validity time"} value={loginDetails?.phoneNumberOtpExpirationTime ? remainingPhoneOtpTime: "N/A"} />
                    </div>
                  </>}
                </div>
            </div>
        </>
    )
}

export default DeviceInfoChip