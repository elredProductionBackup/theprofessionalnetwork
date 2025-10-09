import React from 'react'

import UserProfileTabIndex from './ProfileDerails/UserProfileTabIndex'
import ProfileDetail from './ProfileDerails/ProfileDetail'
const UpperProfileDetails = ({ setSelectedTab, selectedTab, user }) => {
    return (

        <div className="card-body">
            <div className="wideget-user">
                <div className="row">
                    <div className='UpperProfile-Wrapper'>
                        <div className="col-12  ms-2">
                            <ProfileDetail user={user} />
                        </div>
                        <div className='col-12'>
                            <UserProfileTabIndex setSelectedTab={setSelectedTab} selectedTab={selectedTab} user={user} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default UpperProfileDetails
