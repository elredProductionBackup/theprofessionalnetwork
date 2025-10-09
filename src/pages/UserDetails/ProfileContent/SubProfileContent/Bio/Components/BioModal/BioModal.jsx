import React, { useState, useEffect, useRef } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import './BioModal.scss'
import { Icon } from '@iconify/react';
import { truncateFileName } from '../../../../../../../helpers/globalFunctions';

const Modals = ({ setModelIsOpen, isOpenModel, contentImage, imageType, url, resumeName, userDPName }) => {
    const [certificateLoader, setCertificateLoader] = useState(true);
    const linkRef = useRef(null);
    const modalRef = useRef(null);

    useEffect(() => {
        if (isOpenModel) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpenModel]);


    const resumeDonwload = () => {
        linkRef.current.click();
    }

    return (

        <>
            <div className="modal" id="bio-modal" data-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true"
                onClick={(e) => e.target === modalRef.current && setModelIsOpen(false)} ref={modalRef}>
                <div className="dialouge-modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            {resumeName && <p className={url ? "modal-title-bio" : "modal-title-bio-no-download"}>{truncateFileName(resumeName)}</p>}
                            {userDPName && <div className="user-dp-name">{userDPName}</div>}
                            {url && !userDPName && <a target="_blank" rel="noreferrer" ref={linkRef} href={url} download={"Resume.pdf"} >
                                <Icon icon="material-symbols-light:download-sharp" color="#736bd0" className='bio-modal-download'
                                    onClick={resumeDonwload} />
                            </a>}   
                            <Icon icon="radix-icons:cross-1" onClick={() => setModelIsOpen(!isOpenModel)} className='bio-modal-cross' />
                        </div>

                        <div className={certificateLoader ? "modal-main-loader" : "modal-main-content"}>
                            {url && contentImage? <div className={userDPName && !imageType ? 'user-dp-content-scroll' : 'content-scroll'}>
                                <Spinner animation="border" variant="danger" size="md" className={certificateLoader ? 'show-img-loader' : 'hide-img-loader'} />
                                {imageType === 'resume' && (
                                    <img src={contentImage} alt='err' className={!certificateLoader ? 'resume-modal' : 'show-img-loader hide-img-in-modal'}
                                        onLoad={() => setCertificateLoader(false)} />
                                )}

                                {imageType === 'certificate' && (
                                    <img src={contentImage} alt='err' className={!certificateLoader ? 'certificate-modal' : 'show-img-loader hide-img-in-modal'}
                                        onLoad={() => setCertificateLoader(false)} />
                                )}

                                {userDPName && !imageType && (
                                    <img src={contentImage} alt='err' className={!certificateLoader ? 'user-picture-img pe-none' : 'show-img-loader hide-img-in-modal'}
                                        onLoad={() => setCertificateLoader(false)} />
                                )}
                            </div> : <div className="no-certificate-available">No certificate found</div>}
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Modals
