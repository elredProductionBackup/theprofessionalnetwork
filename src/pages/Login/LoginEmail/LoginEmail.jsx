import React from 'react'
import './loginemail.scss'
import { Spinner } from 'react-bootstrap'

const LoginEmail = ({ email, setEmail, requestOtp, loading, wrongEmail, setWrongEmail, noUser, setNoUser, errorMessage, setErrorMessage }) => {

    const setEmailId = (e) => {
        const regex = /^[0-9a-zA-Z\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/;
        if (regex.test(e.target.value) || e.target.value === '') {
        setWrongEmail(false);
        setNoUser(false);
        setErrorMessage("")
        setEmail(e.target.value);
        } 
        return false;
    }

    const handleSubmit = (e) => {
        e.preventDefault();  
        if (!loading) requestOtp();
    };

    return (
        <div className='login_screen'>
            <div className="title">Login</div>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email ID" value={email}
                    className={errorMessage ? 'invalid_email_input' : 'email_input'}
                    onChange={setEmailId} disabled={loading} /><br />
                {/* {wrongEmail && <span className='error_msg'>Invalid email ID</span>} */}
                {/* {noUser && <span className='error_msg'>Permission Denied - not an admin user</span>} */}
                {errorMessage && <div className='error_msg'>{errorMessage}</div>}
                <div className="otp_txt">OTP will be sent to your registered email ID</div>
                <button className='get_otp_btn' onClick={loading ? null : () => requestOtp()}>
                    {loading ? <Spinner animation="border" variant="light" size="sm" className="submit-button-thin-border" /> : 'Send OTP'}
                </button>
            </form>
        </div>
    )
}

export default LoginEmail
