import React from 'react'
import AdminBio from './AdminBio'

const Bio = ({ selectedTab }) => {
    return (
      <>  <div className='Tab-data-wrapper'>
      <div className={selectedTab === "Profile" ? "tab-pane   active show" : "tab-pane"} id="Profile">
        <div id="profile-log-switch">
         <AdminBio/>

        </div>
      </div>

    </div>

    </>
    )
}

export default Bio
