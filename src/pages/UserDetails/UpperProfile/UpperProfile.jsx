import React from 'react'

import UpperProfileDetails from './UpperProfileDetails'

const UpperProfile = ({ setSelectedTab, selectedTab, user }) => {

    return (
        <>
            <div className="col-12">
                <div className='Banner-img' style={{
                    backgroundImage: `url(${user?.profileBannerImageURL})`,
                    borderRadius: " 5px 5px 0px 0px",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}>
                    <div className='background-inner-wrapper '>
                        {
                            user?.accountStatus == "active" ? <div className='Active-wrapper'>
                                <div className='Active-green'></div>
                                <div className='active-Text'>Active</div>
                            </div> : <div className='Active-wrapper'>
                                <div className='Inactive-red'></div>
                                <div className='active-Text'>Inactive</div>
                            </div>
                        }
                        {
                            user?.categoryName ? <div className='card-category-wrapper'>
                                <div className='card-Text'>
                                    Card category - {user?.categoryName === "customImageCards" ? 'Custom Image' : user?.categoryName}</div>
                            </div> : ""
                        }
                    </div>

                </div>
                <div className="card card-profile">
                    <UpperProfileDetails setSelectedTab={setSelectedTab} selectedTab={selectedTab} user={user} />

                </div>

            </div>

        </>
    )
}

export default UpperProfile
