import React, { useState } from 'react';
import Certificate from '../../../../../../../assets/Images/image 5.svg'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CertificatePDF = ({ setCertificateModal, preview, certificateName }) => {
    const [certificateIconLoader, setCertificateIconLoader] = useState(true);
    return (
        <div className='d-flex'>
            <img src={preview ? preview : Certificate} alt='err' 
                className={certificateIconLoader ? 'd-none' : 'certificateImage'} onClick={() => setCertificateModal(true)} onLoad={() => setCertificateIconLoader(false)} />
            {certificateIconLoader && <div className="certificate-icon-shimmer">
                <Skeleton width="39px" height="30px" baseColor="#E8E8E8" highlightColor="#F7F7F7" />
            </div>}

            <div className='certificateText' onClick={() => setCertificateModal(true)}>{certificateName}</div>
        </div>
    )
}

export default CertificatePDF;
