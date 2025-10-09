import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import './login.scss'
import LoginScreen from './LoginScreen/LoginScreen'
import LoginEmail from './LoginEmail/LoginEmail'
import { Icons } from '../../assets/Icons/Icons'
import { API } from '../../helpers/apiEndpoints'
import { axiosInstance } from '../../helpers/axiosInstance'
import { isValidEmail } from '../../helpers/globalFunctions'
import toast from 'react-simple-toasts'

const Login = () => {
    const [otpRequest, setOtpRequest] = useState(false);
    const [email, setEmail] = useState("");
    const [otpTimer, setOtpTimer] = useState(0);
    const [loading, setLoading] = useState(false);
    const [wrongEmail, setWrongEmail] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [noUser, setNoUser] = useState(false)
    const [otpLimitMessage, setOtpLimitMessage] = useState("")

    useEffect(() => {
        let countdown;
        if (otpTimer) {
            countdown = setInterval(() => {
                setOtpTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(countdown);
    }, [otpTimer]);


    const requestOtp = () => {

        if (isValidEmail(email)) {
            if (email !== "") {
                setLoading(true)
                axiosInstance.post(API.LOGIN, {
                    email
                }).then(res => {
                    if (res?.status === 200) {
                        setErrorMessage("")
                        setOtpRequest(true);
                        localStorage.setItem("adminUserCode", res?.data?.result?.[0]?.adminUserCode)
                        localStorage.setItem("email", res?.data?.result?.[0]?.email)
                        setLoading(false)
                        setOtpTimer(60)
                    }
                }).catch(err => {
                    const errorMessage = err?.response?.data?.message || 'Something went wrong';
                    if(errorMessage.includes('Permission is denied - user is not an admin')){
                        setErrorMessage("Permission Denied - not an admin user")
                    } else{
                        setErrorMessage(errorMessage);
                    }
                    setLoading(false);
                });
                
            }
        } else {
            setWrongEmail(true)
            setErrorMessage("Invalid email ID")
        }
    }

    const resendOtp = () => {
        axiosInstance.post(API.LOGIN, { email })
            .then(res => {
                setOtpLimitMessage("")
                setOtpTimer(60)
                localStorage.setItem("adminUserCode", res?.data?.result?.[0]?.adminUserCode)
                localStorage.setItem("email", res?.data?.result?.[0]?.email)
            }).catch(err => {
                const errorMessage = err?.response?.data?.message || 'Something went wrong';
                setErrorMessage(errorMessage);
            });
    }
    

    return (
        <div className='login_page'>
            <img src={Icons.RED_LOGO} alt="" id='elredLogo' />
            <div className="welcome">Welcome to the admin portal</div>
            {
                otpRequest ? <LoginScreen email={email} resendOtp={resendOtp} otpTimer={otpTimer} errorMessage={errorMessage} setErrorMessage={setErrorMessage}/> :
                    <LoginEmail email={email} setEmail={setEmail} requestOtp={requestOtp}
                        loading={loading} setLoading={setLoading} wrongEmail={wrongEmail}
                        setWrongEmail={setWrongEmail} noUser={noUser} setNoUser={setNoUser} errorMessage={errorMessage}
                        setErrorMessage={setErrorMessage}/>
            }
        </div>
    )
}

export default Login    

// onClick={()=> toast('Your toast is ready! 🍞', {
//     position: 'center',
//     duration: 2000,
//     className: 'toast-success',
//     })}