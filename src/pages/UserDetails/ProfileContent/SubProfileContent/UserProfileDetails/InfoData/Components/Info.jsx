import React, { useState, useEffect, useRef } from 'react';
import { openInMap, openLinkInNewTab } from '../../../../../../../helpers/globalFunctions';
import DefaultStaticPopover from '../../../../../../../components/DefaultStaticPopover/DefaultStaticPopover';

const Info = ({ title, value, map, caps, isPopup, link, fullLink, address }) => {
    const [open, setOpen] = useState(false);
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

    const handleClick = () => {
        if (isPopup) {
            setOpen(!open);
        }
    };

    const handleSpanClick = () => {
        handleClick();
        if (map && value.latitude && value?.longitude) {
            openInMap(value?.latitude, value?.longitude);
        }
    };

    return (
        <>
            <div className={`d-flex mb-3 ${fullLink ? "text-wrapper-full" : "text-wrapper"} ${isPopup ? 'cursor-pointer' : ''}`} ref={infoRef}>
                <div
                    className={`detail-heading`}
                    style={isPopup ? { cursor: 'pointer' } : null}
                    onClick={handleClick}
                >
                    {`${title} -`}
                </div>
                <div className={caps ? 'caps details-data' : 'details-data'} style={{ color: link && '#147BFF', textDecoration: link && "underline", cursor: (link && value?.length !== 0) && "pointer" }} >
                    <span
                        onClick={(e) => {
                            handleSpanClick(e);
                            if (link && !address) {
                                openLinkInNewTab(value);
                            }
                        }}
                        style={isPopup ? { cursor: 'pointer' } : null}
                    >
                        {map ? (value?.fullAddress? value?.fullAddress:"N/A") : value}
                    </span>
                </div>
                {open && isPopup && (
                    <div className='' style={{cursor:"pointer"}}>
                        <DefaultStaticPopover
                            position='bottom'
                            headerText={title}
                            bodyText={map ? "" : value}
                        />
                    </div>
                )}
            </div >
        </>
    );
};

export default Info;

