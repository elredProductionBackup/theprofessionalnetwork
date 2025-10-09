import React, { useContext, useEffect, useState } from 'react'
import './topbar.scss'
import { Images } from '../../assets/Images/Images'
import { Icons } from '../../assets/Icons/Icons'
import { useNavigate } from 'react-router'
import { LogoutPopUp } from '../../App'
import { isLoggedIn } from '../../helpers/globalFunctions'

const TopBar = () => {
    const navigate = useNavigate()
    const { logoutPop, setLogoutPop } = useContext(LogoutPopUp)
    const [email, setEmail] = useState('')

    useEffect(() => {
        if (isLoggedIn()) {
            setEmail(localStorage.getItem('email'))
        }
    }, [])

    return (
        <div className="topbar">
            <div className="left_side">
                <div className="logo" onClick={() => navigate('/main')}><img src={Images.ELRED_LOGO} alt="" />
                    <div className='title_logo'>Admin Portal</div></div>
            </div>
            <div className="right_side">
                <div className="user_section">
                    <img src={Icons.USER} alt="" /><span>{email}</span>
                </div>
                <div className="logout_section">
                    <img src={Icons.LOGOUT} alt="" onClick={() => setLogoutPop(true)} />
                    <span onClick={() => setLogoutPop(true)}>Logout</span>
                </div>
            </div>
        </div>
    )
}

export default TopBar
