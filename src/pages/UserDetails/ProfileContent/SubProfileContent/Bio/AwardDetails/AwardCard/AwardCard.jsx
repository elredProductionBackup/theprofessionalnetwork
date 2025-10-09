import React, { useEffect, useRef, useState } from 'react';
import './AwardCard.scss'
import BlueTick from '../../../../../../../assets/Images/Group 14163.svg'
import CertificateModalImage from '../../../../../../../assets/Icons/image 5.svg'
import BioModal from '../../Components/BioModal/BioModal'
import CertificatePDF from '../../Components/CertificatePDF/CertificatePDF';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Icons } from '../../../../../../../assets/Icons/Icons';
import { dateFormat,isPdfUrl } from '../../../../../../../helpers/globalFunctions';
import DefaultStaticPopover from '../../../../../../../components/DefaultStaticPopover/DefaultStaticPopover';

const AwardCard = ({ data }) => {
    const [certificateModal, setCertificateModal] = useState(false)
    const [awardIconLoading, setAwardIconLoading] = useState(true)
    const parts = data?.awardCertificateURL?.split('.');
    const certificateName = "Certificate." + parts?.[parts?.length - 1]?.toUpperCase();
    const [open, setOpen] = useState(false);
    const [openIssuedby, setIssuedby] = useState(false)
    const infoRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (infoRef.current && !infoRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);



    return (
        <div className="awardcard">
            {data?.pinStatus === "pinned" && <img src={Icons.PINNED} alt="" id='icon_pinned_hidden' />}
            {data?.pinStatus === "hidden" && <img src={Icons.HIDDEN} alt="" id='icon_pinned_hidden' />}
            <div className='awardmain'>
                <img src={data?.awardIconURL} alt='err' className={awardIconLoading ? 'd-none' : 'awardIcon'} onLoad={() => setAwardIconLoading(false)} />
                {awardIconLoading && <div className="award-icon-shimmer">
                    <Skeleton width="44px" height="42.24px" baseColor="#E8E8E8" highlightColor="#F7F7F7" />
                </div>}
                <div className="AwardTitleInfo">
                    <div className="ttt" style={{ position: "relative", cursor:"pointer" }} onClick={() => setOpen(true)} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)} tabIndex={2}>
                        <div className='title title-award-data'>Title - <span className='titleNext'>
                            {data?.awardTitle ? data?.awardTitle : 'N/A'}</span>

                        </div>
                        {
                            open &&
                            <DefaultStaticPopover
                                position='bottom'
                                headerText={"Title"}
                                bodyText={data?.awardTitle ? data?.awardTitle : 'N/A'}
                            />
                        }
                    </div>
                    <div className='d-flex' style={{ position: "relative", cursor:"pointer" }} onClick={() => setIssuedby(true)} onFocus={() => setIssuedby(true)} onBlur={() => setIssuedby(false)} tabIndex={-1}>
                        <div className='title title-award-data' >
                            Issued by - <span className='titleNext'>{data?.issuedBy}
                            </span>


                        </div>
                        {
                            openIssuedby &&
                            <DefaultStaticPopover
                                position='bottom'
                                headerText={"Issued by"}
                                bodyText={data?.issuedBy ? data?.issuedBy : 'N/A'}
                            />
                        }
                        {data?.issuedOrgVerifiedStatus && <span><img src={BlueTick} alt='err' className='blueTick' /></span>}
                    </div>
                </div>
                <div className={data?.awardCertificateURL ? "dateAwardContainer" : "dateAwardContainer container-no-certificate"} >
                    <div className='title'>Issued date  -  <span className='titleNext'>
                        {data?.issuedDate ? dateFormat(data?.issuedDate) : 'N/A'}</span></div>
                    {data?.awardCertificateURL.trim() && <CertificatePDF setCertificateModal={setCertificateModal} preview={CertificateModalImage} certificateName={certificateName} />}


                </div>
            </div>
            <div className='awardParagraph'>
                {data?.description}
            </div>

            {certificateModal && <BioModal setModelIsOpen={setCertificateModal} isOpenModel={certificateModal} imageType="certificate" 
            contentImage={isPdfUrl(data?.awardCertificateURL)?data?.pdfPreview:data.awardCertificateURL}
            url={data?.awardCertificateURL} resumeName={certificateName} />}
        </div >
    )
}

export default AwardCard;



