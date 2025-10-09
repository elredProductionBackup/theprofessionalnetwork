import React, { useEffect, useState } from 'react'

import DeviceInfoChip from './InfoData/DeviceInfoChip'
import PersonalInfo from './InfoData/PersonalInfo'
import ProfessionalInfo from './InfoData/ProfessionalInfo'
import './userprofiledetails.scss'
import { axiosInstanceHeader } from '../../../../../helpers/axiosInstance'
import { API } from '../../../../../helpers/apiEndpoints'
const UserProfileDetails = ({ selectedTab, userCode }) => {
    const [userDetails, setUserDetails] = useState([])
    const [userDetailsLoader, setUserDetailsLoader] = useState(false)

    const fetchUserDetails = () => {
        if (userCode) {
            setUserDetailsLoader(true);
            axiosInstanceHeader.post(API.USER_DETAILS, { userCode })
                .then(res => {
                    setUserDetails(res?.data?.result?.[0])
                    setUserDetailsLoader(false);
                })
                .catch(err => {console.log(err, 'fffffff'); setUserDetailsLoader(false)})
        }
    }

    useEffect(() => {
        fetchUserDetails()
    }, [userCode])

    return (
        <>  <div className='Tab-data-wrapper'>
            <div className={selectedTab === "Details" ? "tab-pane   active show" : "tab-pane"} id="Details">
                <div id="profile-log-switch">
                    <div className="d-flex row">
                        <div className='col-12'>
                            <DeviceInfoChip userDetails={userDetails} userDetailsLoader={userDetailsLoader} setUserDetails={setUserDetails}/>
                        </div>

                    </div>
                    <div className="d-flex row">
                        <div className='col-12'>
                            <PersonalInfo userDetails={userDetails} userDetailsLoader={userDetailsLoader} />
                        </div>

                    </div>
                    <div className="d-flex row">
                        <div className='col-12'>
                            <ProfessionalInfo userDetails={userDetails}userDetailsLoader={userDetailsLoader} />
                        </div>

                    </div>

                </div>
            </div>

        </div>

        </>
    )
}

export default UserProfileDetails
