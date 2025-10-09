import React, { useState } from 'react'
import { User, verifiedIcon } from '../../../../assets/Images'
import { openInMap, openLinkInNewTab } from '../../../../helpers/globalFunctions'
import defaultImg from '../../../../assets/Images/userImg.png'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import BioModal from "../../ProfileContent/SubProfileContent/Bio/Components/BioModal/BioModal"
import DefaultStaticPopover from '../../../../components/DefaultStaticPopover/DefaultStaticPopover'

const ProfileLeftContent = ({ user }) => {
    const [profilePicLoading, setProfilePicLoading] = useState(true);
    const [userPicture, setUserPicture] = useState(false);
    const handleDpClick = () => { if (!profilePicLoading && user?.dpURL) setUserPicture(true) }
    const [open, setOpen] = useState(false)

    return (
        <>
            <div className='d-flex addPadding' >
                <div className={profilePicLoading ? 'd-none' : 'position-relative user-select-none'}>
                    <img onClick={handleDpClick} className={user?.dpURL ? `profile-image-custom ${user?.aadhaarVerifiedStatus ? 'isBorder' : 'isBorderGrey'}` : `profile-image-custom`}
                        src={user?.dpURL} alt="img" onLoad={() => setProfilePicLoading(false)}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = defaultImg;
                            currentTarget.style.cursor = 'default';
                        }} />
                    {user?.aadhaarVerifiedStatus && <img src={verifiedIcon} className='verifiedIcon ' alt='verified' />}
                </div>
                {profilePicLoading && <div className="user-dp-shimmer-loader">
                    <Skeleton baseColor="#B4B4B4" highlightColor="#F7F7F7" circle width="140px" height="140px" />
                </div>}
                <div className="user-wrap ">
                    <h4>{user?.firstname ? user?.firstname + " " + user?.lastname : "Username Empty"}</h4>
                    <span className='d-flex manager-span'>
                        <span className='designation'>
                            {user?.title?.[0]?.value}
                        </span>
                        {user?.title?.length > 0 &&
                            <span className='designation-count'>
                                {user?.title?.length-1 === 0? 1:`+${user?.title?.length-1}`}
                            </span>}
                    </span>
                    <div className="main_test" onClick={() => setOpen(true)} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)} tabIndex={-1} style={{ cursor: "pointer" }}>
                        <div className='company-desc-top'  >
                            {user?.companyName}
                        </div>
                        {
                            open &&
                            <DefaultStaticPopover
                                position='bottom'
                                headerText={"Company name"}
                                bodyText={user?.companyName}
                            />
                        }
                    </div>
                    {
                        user?.location && <div className='location' onClick={() => openInMap(user?.location?.latitude, user?.location?.longitude)}>
                            <span>{user?.location?.city ? user?.location?.city + ',' : ''} {user?.location?.country}</span>
                        </div>
                    }
                    {user?.onBoardingStatus !== "pending" && <button className='red-button' onClick={() => openLinkInNewTab(user?.shareProfileURL)}>View Profile</button>}


                </div>
            </div >
            {user?.dpURL && userPicture && <BioModal setModelIsOpen={setUserPicture} isOpenModel={userPicture} contentImage={user?.dpURL}
                imageType="" url={user?.dpURL} userDPName={user?.firstname ? user?.firstname + " " + user?.lastname : "Username Empty"} />
            }
        </>
    )
}

export default ProfileLeftContent
