import React from 'react'
import './header.scss'
import { leftArrow } from '../../assets/Images'
import {  useNavigate } from 'react-router-dom';
const Header = ({ title, subTitle }) => {
    const navigate = useNavigate()
    return (
        <>
            <div className="page-headers-wrapper">
                <div >
                    <div className='d-flex'>
                        <img src={leftArrow} alt='leftArrow' onClick={() => navigate(`/main/${title.toLowerCase()}`)}/>
                        <h1 className="profile-title-text">{title}</h1>
                    </div>

                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><span className='HeadTitleHeading'>{title}</span></li>
                        <li className="breadcrumb-item" aria-current="page">
                            <span className='subTitle'>
                                {subTitle}
                            </span></li>
                    </ol>
                </div>
            </div>

        </>
    )
}

export default Header
