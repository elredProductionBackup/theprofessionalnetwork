import React, { useState } from 'react';
import './AboutMe.scss'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import BioModal from '../Components/BioModal/BioModal'
import Spinner from 'react-bootstrap/Spinner'
import { truncateFileName } from '../../../../../../helpers/globalFunctions';

const Aboutme = ({ title, desc, preview, resumeURL, name, userBioLoader }) => {
    const [certificateModal, setCertificateModal] = useState(false)
    const [loader, setLoader] = useState(true);
    const parts = resumeURL?.split('.');
    const resumeName = name + "_resume." + parts?.[parts?.length - 1]?.toUpperCase();
    return (
        <div className="col-lg-12">
            <div className="card-about">
                <div className="card-header-about">
                    <div className="card-title-about">{title}</div>
                </div>
                <div className="card-body-about">
                  {userBioLoader ? <div className="bio-spinner-container">
                      <Spinner animation="border" variant="danger" className="bio-spinner-loader"/>
                  </div> : <>
                    {desc?.trim() ? <div className='aboutMeDesc'>{desc}</div> :
                        <div className="No-bio-data-available"><span className="no-about-inner">No about me added yet</span></div>}

                    {preview || resumeURL ? <div className='pdfContainer' >
                    <div className={loader ? 'show-img-loader skeleton-resume-top' : 'd-none'}><Skeleton baseColor="#B4B4B4" highlightColor="#F7F7F7" width="80px" height="80px" /></div>
                            <img onClick={() => setCertificateModal(true)} src={preview || resumeURL} alt='err' onLoad={() => setLoader(false)} className={loader ? 'd-none' : 'show-img-loader-resume'} />
                        <div className='pdfName' onClick={() => setCertificateModal(true)}>{truncateFileName(resumeName)}</div>
                    </div> : <div className="no-pdf-container">
                        <div className="no-resume-added-img"></div>
                        <div className="no-resume-text">No file added</div>
                    </div>}
                  </>}
                </div>
            </div>
            {certificateModal && <BioModal setModelIsOpen={setCertificateModal} isOpenModel={certificateModal} contentImage={preview || resumeURL}
                imageType="resume" url={resumeURL} resumeName={resumeName} />}
        </div>
    )
}
export default Aboutme;
