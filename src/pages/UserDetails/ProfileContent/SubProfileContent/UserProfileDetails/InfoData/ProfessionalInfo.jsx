import React from 'react'
import InfoHeader from './Components/InfoHeader'
import Info from './Components/Info'
import Spinner from 'react-bootstrap/Spinner'
import { getLabel } from '../../../../../../helpers/globalFunctions'
const ProfessionalInfo = ({ userDetails, userDetailsLoader }) => {
    const { professionalDetails } = userDetails

    return (
        <>
            <div className='Info-wrapper'>
                <InfoHeader title='Professional details' />
                <div className='loginDetails-wrapper row'>
                    {userDetailsLoader ? <div className="professional-details-spinner-container">
                        <Spinner animation="border" variant="danger" className="professional-details-spinner-loader" />
                    </div> : <>
                        <div className='detail-wrapper mb-2 col-lg-6 col-md-6 col-xl-4 col-12'>
                            <Info title={"Profession"} value={professionalDetails?.profession?professionalDetails?.profession:"N/A"} />
                            <Info title={"Organisation type"} value={professionalDetails?.organizationType? getLabel(professionalDetails?.organizationType,professionalDetails?.profession?professionalDetails?.profession:"") :"N/A"} />
                            {/* <Info title={"Name of the organisation"} value={professionalDetails?.organizationName} /> */}
                        </div>
                        <div className='detail-wrapper mb-2 col-lg-6 col-md-6 col-xl-4 col-12'>
                            <Info title={"Ministry"} value={professionalDetails?.ministry?professionalDetails?.ministry:"N/A"} />
                        </div>
                        <div className='detail-wrapper mb-2 col-lg-6 col-md-6 col-xl-4 col-12'>
                            <Info title={"Department"} value={professionalDetails?.department?professionalDetails?.department:"N/A"} />
                        </div>
                    </>}
                    <Info title={"Name of the organisation"} value={professionalDetails?.organizationName?professionalDetails?.organizationName:"N/A"} fullLink />

                </div>
            </div>
        </>
    )
}

export default ProfessionalInfo
