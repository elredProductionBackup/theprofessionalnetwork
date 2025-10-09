import React, { useContext } from 'react'
import './logoutpopup.scss'
import { Button, Modal } from 'react-bootstrap'
import { Auth, LogoutPopUp } from '../../App'
import { useNavigate } from 'react-router-dom'
import { Icons } from '../../assets/Icons/Icons'
import { logout } from '../../helpers/globalFunctions'

const LogoutPopup = () => {
    const { logoutPop, setLogoutPop } = useContext(LogoutPopUp)
    const { setIsLoggedIn } = useContext(Auth)
    const navigate = useNavigate()

    return (
        <div>
            <Modal show={logoutPop} onHide={() => setLogoutPop(false)} className='logoutModal'>
                <Modal.Body className='modalBody'>
                    <img src={Icons.LOGOUT} alt="" />
                    <div className="message">
                        Are you sure you want to log out ?
                    </div>
                </Modal.Body>
                <div className="action_btns">
                    <button className='no_btn' onClick={() => setLogoutPop(false)}>No</button>
                    <button className='yes_btn' onClick={() => logout(navigate, setLogoutPop, setIsLoggedIn)}>Yes</button>
                </div>
            </Modal>
        </div>
    )
}

export default LogoutPopup
