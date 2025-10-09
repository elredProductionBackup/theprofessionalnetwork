import React from 'react'
import ProfileLeftContent from './ProfileLeftContent'
import ProfileRightContent from './ProfileRightContent'
import DarkCoder from './Components/DarkCoder'

const ProfileDetail = ({ user }) => {
    return (
        <>
            <div className='d-flex content-top-wrapper row'>
                <div className='col-xl-8 col-12 col-md-8 col-lg-8 add-flex'>
                    <div className='Dark-detail-wrapper  add-right-margin'>
                        <DarkCoder data={"User code"} value={user?.userCode} />
                    </div>
                    <div className='add-space Dark-detail-wrapper'>
                        <DarkCoder data={"UID"} value={user?.uid} />
                    </div>
                </div>
                <div className='col-xl-3 col-12 col-md-3 col-lg-3'>
                    <div className='BloodGroup-wrapper'>
                        Blood group -
                        {user?.bloodGroup ?
                            " " + user?.bloodGroup?.slice(0, user?.bloodGroup?.length - 1) + " " + (user?.bloodGroup?.slice(-1) == "+" ? 'positive ' : "negative ") +
                            `(${user?.bloodGroup?.slice(0, user?.bloodGroup?.length - 1)}${user?.bloodGroup?.slice(-1)})`
                            : ' N/A'}
                    </div>
                </div>

            </div>


            <div className="content-middle-wrapper ">
                <div className='Divider-wrapper row '>
                    <div className='col-xl-4 col-12 col-md-12 col-lg-5 addBottom-margin borderLine'>
                        <ProfileLeftContent user={user} />
                    </div>
                    <div className='col-xl-8 col-12 col-md-12 col-lg-7'>
                        <ProfileRightContent user={user} />
                    </div>
                </div>
            </div>

        </>
    )
}

export default ProfileDetail
