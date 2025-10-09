import React from 'react'
import Bio from './SubProfileContent/Bio/AdminBio'
import Profile from './SubProfileContent/Profile/Profile'
import UserProfileDetails from './SubProfileContent/UserProfileDetails/UserProfileDetails'

const LowerProfileDetails = ({ setSelectedTab, selectedTab, user }) => {
    const { userCode } = user
    return (
        <div>
            <div className="tab-content mb-2">

                {selectedTab === 'Userdetails' && <UserProfileDetails selectedTab={selectedTab} setSelectedTab={setSelectedTab} userCode={userCode} />}
                {selectedTab === 'Profile' && <Profile selectedTab={selectedTab} setSelectedTab={setSelectedTab} userCode={userCode} />}
                {selectedTab === 'Bio' && <Bio selectedTab={selectedTab} setSelectedTab={setSelectedTab} userCode={userCode} name={user?.firstname}/>}


            </div>
        </div>
    )
}

export default LowerProfileDetails
