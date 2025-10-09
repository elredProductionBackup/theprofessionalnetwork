import React, { useEffect, useState } from 'react'
import ProfileTab from './ProfileTab'
import { API } from '../../../../../helpers/apiEndpoints'
import { axiosInstanceHeader } from '../../../../../helpers/axiosInstance'

const Profile = ({ selectedTab, userCode }) => {
  const [userProfile, setUserProfile] = useState([])
  const [profileLoader, setProfileLoader] = useState(false)

  const fetchUserProfile = () => {
    if (userCode) {
      setProfileLoader(true);
      axiosInstanceHeader.post(API.USER_PROFILE_DETAILS, { userCode })
        .then(res => {
          setUserProfile(res?.data?.result?.[0])
          setProfileLoader(false)
        })
        .catch(err => {console.log(err, 'fffffff'); setProfileLoader(false)})
    }
  }

  useEffect(() => {
    fetchUserProfile()
  }, [userCode])

  return (
    <>  <div className='Tab-data-wrapper'>
      <div className={selectedTab === "Profile" ? "tab-pane   active show" : "tab-pane"} id="Profile">
        <div id="profile-log-switch">
          <ProfileTab data={userProfile} profileLoader={profileLoader} />
        </div>
      </div>

    </div>

    </>
  )
}

export default Profile
