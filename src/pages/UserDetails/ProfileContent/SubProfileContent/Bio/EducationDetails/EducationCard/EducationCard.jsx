import React, { useState } from 'react';
import './EducationCard.scss'
import BlueTick from '../../../../../../../assets/Images/Group 14163.svg'
import BioModal from '../../Components/BioModal/BioModal'
import CertificateModalImage from '../../../../../../../assets/Icons/image 5.svg'
import CertificatePDF from '../../Components/CertificatePDF/CertificatePDF';
import DateContainer from '../../Components/DateContainer/DateContainer'
import { Icons } from '../../../../../../../assets/Icons/Icons';
import DefaultStaticPopover from '../../../../../../../components/DefaultStaticPopover/DefaultStaticPopover';

const EducationCard = ({ data }) => {
    const [certificateModal, setCertificateModal] = useState(false)
    const parts = data?.educationCertificateURL?.split('.');
    const certificateName = "Certificate." + parts?.[parts?.length - 1]?.toUpperCase();
    const [openTitle, setOpenTitle] = useState(false)
    const [openLocation, setOpenLocation] = useState(false)
    const [openStudies, setOpenStudies] = useState(false)
    const [openStatus, setOpenStatus] = useState(false)


    return (
        <div className="educationDetails">
            <img src={data?.sequence !== 0 ? Icons.PINNED : Icons.HIDDEN} alt="" id='icon_pinned_hidden' />
            <div className='educationInfo'>
                <div className='educationInfoChild' onClick={() => setOpenTitle(true)} onFocus={() => setOpenTitle(true)} onBlur={() => setOpenTitle(false)} tabIndex={-1}>
                    <div className='educationName'>Institution name - </div><div className='eName eName-ellipsis-institute'> {data?.institutionName}</div>
                    {
                        openTitle &&
                        <DefaultStaticPopover
                            position='bottom'
                            headerText={"Institution name"}
                            bodyText={data?.institutionName ? data?.institutionName : 'N/A'}
                        />
                    }
                </div>
                {data?.institutionKYCVerifiedStatus ? <img src={BlueTick} alt='err' className='blueTick-edu' /> : null}
            </div>

            <div className='eduDetails'>
                <div className='educationInfo col-4'>
                    <div className='educationInfoChild' onClick={() => setOpenLocation(true)} onFocus={() => setOpenLocation(true)} onBlur={() => setOpenLocation(false)} tabIndex={-1}>
                        <div className='educationName'>Location - </div>
                        <div className="eName eName-ellipsis">{data?.location?.city}</div>
                        {
                            openLocation &&
                            <DefaultStaticPopover
                                position='bottom'
                                headerText={"Location"}
                                bodyText={data?.location?.city ? data?.location?.city : 'N/A'}
                            />
                        }
                    </div>
                </div>
                <div className='educationInfo col-4'>
                    <div className='educationInfoChild' onClick={() => setOpenStudies(true)} onFocus={() => setOpenStudies(true)} onBlur={() => setOpenStudies(false)} tabIndex={-1}>
                        <div className='educationName'>Area of studies - </div>
                        <div className='eName eName-ellipsis-studies'>{data?.areaOfStudy}</div>
                        {
                            openStudies &&
                            <DefaultStaticPopover
                                position='bottom'
                                headerText={"Area of studies"}
                                bodyText={data?.areaOfStudy ? data?.areaOfStudy : 'N/A'}
                            />
                        }
                    </div>
                </div>
                <div className='educationInfo col-4'>
                    <div className='educationInfoChild' style={{position:'relative',cursor:'default', width:"100%"}}>
                    <div className="educationName" onClick={() => setOpenStatus(true)} onFocus={() => setOpenStatus(true)} onBlur={() => setOpenStatus(false)} tabIndex={-1} style={{cursor:'pointer'}}>Current status - </div>
                    {data?.currentlyStudying ? <div className='eName' style={{cursor:'pointer'}} onClick={() => setOpenStatus(true)} onFocus={() => setOpenStatus(true)} onBlur={() => setOpenStatus(false)} tabIndex={-1} >Studying here</div> : ""}
                    {
                          data?.currentlyStudying &&  openStatus &&
                            <DefaultStaticPopover
                                position='bottom'
                                headerText={"Current Status"}
                                bodyText={data?.currentlyStudying ? "Studying here" : 'N/A'}
                            />
                    }
                    </div> 
                </div>
            </div>

            <div className='dateContainer'>
                <DateContainer label="Start date" date={data?.startYear} />
                <DateContainer label="End date" date={data?.currentlyStudying?"":data?.endYear} />
                {data?.educationCertificateURL?.trim() && <CertificatePDF setCertificateModal={setCertificateModal} certificateName={certificateName} />}
            </div>

            {certificateModal && <BioModal setModelIsOpen={setCertificateModal} isOpenModel={certificateModal} resumeName={certificateName}
                contentImage={data?.educationCertificatePreview} url={data?.educationCertificateURL} imageType="certificate" />}
        </div >
    )
}

export default EducationCard;
