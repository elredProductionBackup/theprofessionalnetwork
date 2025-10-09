import React, { useContext, useEffect, useState } from 'react';
import './loginscreen.scss'
import { useNavigate } from 'react-router-dom';
import { API } from '../../../helpers/apiEndpoints';
import { axiosInstance } from '../../../helpers/axiosInstance';
import { Auth } from '../../../App';
import { Spinner } from 'react-bootstrap';

const LoginScreen = ({ email, resendOtp, otpTimer, errorMessage, setErrorMessage }) => {
  const navigate = useNavigate()
  const [otp, setOtp] = useState('')
  const [emptyField, setEmptyField] = useState(false);
  const [wrongOtp, setWrongOtp] = useState("")
  const { setIsLoggedIn } = useContext(Auth)
  const [loading, setLoading] = useState(false)
  const [showPropError, setShowPropError] = useState(false)
  
  useEffect(() => {
    if (errorMessage && errorMessage.includes("Too many OTP attempts")) {
      setShowPropError(true)
      const timer = setTimeout(() => {
        setShowPropError(false)
        setErrorMessage('')
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [errorMessage, wrongOtp])

  const verifyOtp = () => {
    if (otp.length === 6) {
      setLoading(true)
      const adminUserCode = localStorage.getItem("adminUserCode")
      axiosInstance.post(API.VERIFY_LOGIN, {
        adminUserCode,
        otp
      }).then(res => {
        if (res?.status === 200) {
          setIsLoggedIn(true)
          localStorage.setItem('accessToken', res?.data?.result?.[0]?.accessToken);
          navigate('/main');
        }
        setLoading(false)
      }).catch(err => {
        const serverMessage = err?.response?.data?.message || 'Something went wrong';
        if (serverMessage.includes("OTP for the specified email has expired/doesn't exist")) {
          setWrongOtp("OTP expired");
        } else if (serverMessage.includes("Invalid OTP entered")) {
          setWrongOtp("Invalid OTP");
        } else if(serverMessage.includes("Too many OTP attempts")){
          setErrorMessage(serverMessage)
          setWrongOtp("")
        }
        setLoading(false);
      });
    } else if (otp === "") {
      setEmptyField(true)
    } else {
      setWrongOtp("OTP must be 6 digits")
    }
  }

  const enterOtp = (e) => {
    setEmptyField(false);
    setWrongOtp("");
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    const sanitizedValue = numericValue.replace(/[.-]/g, '');
    setOtp(sanitizedValue.slice(0, 6));
  };

  const handleKeyDown = (e) => {
    if (e.key.toLowerCase() === 'e') {
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loading) verifyOtp();
  };

  return (
    <div className='login_screen'>
      <div className="title">Login</div>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email ID" 
          disabled 
          value={email} 
          className='email_input' 
        /><br />
        <div className='otp_verify'>
          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={enterOtp}
            className={emptyField || wrongOtp || showPropError? 'invalid_email_input' : 'email_input'}
            maxLength={6}
            onKeyDown={handleKeyDown}
          />
          <div className={!emptyField && !wrongOtp && !showPropError ? 'no_err_msg' : 'input_bottom_msg'}>
            {emptyField && <span className="err_msg">This field is required</span>}
            {showPropError && (
              <div className="err_msg">
                {errorMessage.includes("Please")
                  ? (
                    <>
                      {errorMessage.split("Please")[0].replace(/\.*\s*$/, "")}.<br />
                      Please{errorMessage.split("Please")[1]}
                    </>
                  )
                  : errorMessage}
              </div>
            )}

            {!wrongOtp.includes('Too many OTP attempts')  && <div className="err_msg">{wrongOtp}</div>}

            {otpTimer > 0 ? (
              <span className="otp_resend_timer_container">
                <span className="otp_resend_in">Resend OTP</span>
                <br />
                <span className="otp_resend_in">in</span> <span className="otp_resend_timer"> {otpTimer}s</span>
              </span>
            ) : (
              <span 
                className="otp_verify_resend" 
                onClick={() => {
                  if(showPropError){
                  } else{
                    resendOtp()
                    setEmptyField(false);
                    setWrongOtp("");
                  }
                }}
              >
                Resend OTP
              </span>
            )}
          </div>
        </div>
        <button 
          className='submit_btn' 
          onClick={verifyOtp}
          disabled={loading || showPropError}
        >
          {loading ? (
            <Spinner 
              animation="border" 
              variant="light" 
              size="sm" 
              className="submit-button-thin-border" 
            />
          ) : 'Verify OTP'}
        </button><br />
      </form>
    </div>
  )
}

export default LoginScreen