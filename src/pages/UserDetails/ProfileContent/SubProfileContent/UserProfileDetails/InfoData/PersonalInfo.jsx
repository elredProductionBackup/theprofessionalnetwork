import React from 'react'
import InfoHeader from './Components/InfoHeader'
import Info from './Components/Info'
import Spinner from 'react-bootstrap/Spinner'
import DefaultStaticPopover from '../../../../../../components/DefaultStaticPopover/DefaultStaticPopover'

const PersonalInfo = ({ userDetails, userDetailsLoader }) => {
    const { personalDetails } = userDetails

    return (
        <>
            <div className='Info-wrapper'>
                <InfoHeader title='Personal details' />
                <div className='loginDetails-wrapper row'>
                    {userDetailsLoader ? <div className="personal-details-spinner-container">
                        <Spinner animation="border" variant="danger" className="personal-details-spinner-loader" />
                    </div> : <>
                        <div className='detail-wrapper mb-2 col-lg-6 col-md-6 col-xl-4 col-12'>
                            <Info title={"Username"} value={personalDetails?.username? personalDetails?.username : "N/A"} isPopup/>
                            <Info title={"Gender"} value={personalDetails?.gender? personalDetails?.gender : "N/A"} caps={true} />
                            <Info title={"Full name"} value={personalDetails?.firstname? personalDetails?.firstname + " " + personalDetails?.lastname : "N/A"} isPopup/>
                            <Info title={"Birthdate"} value={personalDetails?.dob ? personalDetails?.dob : "N/A"} />
                        </div>
                        <div className='detail-wrapper mb-2 col-lg-6 col-md-6 col-xl-4 col-12'>
                            <Info title={"Address"} value={personalDetails?.address} map={true} link={personalDetails?.address?.fullAddress} address/>
                            <Info title={"Phone no"} value={personalDetails?.phone? personalDetails?.phone : "N/A"} />
                            <Info title={"E-mail"} value={personalDetails?.email? personalDetails?.email:"N/A"} />
                            <Info title={"Website"} value={personalDetails?.website? personalDetails?.website:"N/A"} link={personalDetails?.website} />
                        </div>
                        <div className='detail-wrapper mb-2 col-lg-6 col-md-6 col-xl-4 col-12'>
                            <Info title={"Aadhar verification status"} value={personalDetails?.aadhaarVerificationStatus ? "Verified" : "Not verified"} />
                            <Info title={"Alternate phone no"} value={personalDetails?.alternatePhone?personalDetails?.alternatePhone:"N/A"} />
                            <Info title={"Alternate e-mail"} value={personalDetails?.alternameEmail?personalDetails?.alternameEmail:"N/A"} />
                            <Info title={"Social media link"} value={personalDetails?.socialMediaURL? personalDetails?.socialMediaURL:"N/A"} link={personalDetails?.socialMediaURL}/>
                        </div>
                    </>}
                </div>
            </div>
        </>
    )
}

export default PersonalInfo
