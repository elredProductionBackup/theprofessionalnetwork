import React, { useState } from 'react';
import './CompanyCard.scss'
import BlueTick from '../../../../../../../assets/Images/Group 14163.svg'
import DateContainer from '../../Components/DateContainer/DateContainer'
import { Icons } from '../../../../../../../assets/Icons/Icons';
import DefaultStaticPopover from '../../../../../../../components/DefaultStaticPopover/DefaultStaticPopover';

const EducationCard = ({ data }) => {
    const [openInfo, setOpenInfo] = useState(false)
    const [openLocation, setLocation] = useState(false)
    const [openDesignation, setDesignation] = useState(false)
    const [openStatus, setOpenStatus] = useState(false)

    return (
        <div className="companyDetails" >
            <img src={data?.sequence !== 0 ? Icons.PINNED : Icons.HIDDEN} alt="" id='icon_pinned_hidden' />
            <div className='companyInfo' >
                <div className='companyName' style={{cursor:"pointer"}} onClick={() => setOpenInfo(true)} onFocus={() => setOpenInfo(true)} onBlur={() => setOpenInfo(false)} tabIndex={-1}>
                    Company name - </div><span style={{ cursor: "pointer" }} className={data?.orgKYCVerifiedStatus ? 'cName cName-company-ellisis' : "cName unverified-company-ellisis"} onClick={() => setOpenInfo(true)} onFocus={() => setOpenInfo(true)} onBlur={() => setOpenInfo(false)} tabIndex={-1}>{data?.companyName}
                    {
                    openInfo &&
                    <DefaultStaticPopover
                        position='bottom'
                        headerText={"Company name"}
                        bodyText={data?.companyName ? data?.companyName : 'N/A'}
                    />
                }

                    </span>
                {data?.orgKYCVerifiedStatus ? <img src={BlueTick} alt='err' className='blueTick' /> : null}

            </div>

            <div className='comDetails'>
                <div className='companyInfo col-4'>
                    <div className='companyName'   onClick={() => setLocation(true)}
                        onFocus={() => setLocation(true)}
                        onBlur={() => setLocation(false)}
                        tabIndex={-1}
                        style={{ cursor: "pointer" }}>Location - </div>
                    <div className="cName cName-ellipsis" style={{ cursor: "pointer" }}
                        onClick={() => setLocation(true)}
                        onFocus={() => setLocation(true)}
                        onBlur={() => setLocation(false)}
                        tabIndex={-1}
                    >{data?.location?.city}
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
                <div className='companyInfo col-8'>
                    <div className='companyName' onClick={() => setDesignation(true)}
                        onFocus={() => setDesignation(true)}
                        onBlur={() => setDesignation(false)}
                        tabIndex={-1} style={{cursor:'pointer'}}>Designation - </div>
                    <div className='cName cName-designation-ellipsis'
                        onClick={() => setDesignation(true)}
                        onFocus={() => setDesignation(true)}
                        onBlur={() => setDesignation(false)}
                        tabIndex={-1}
                        style={{ cursor: "pointer" }}
                    >{data?.designation.join(', ')}</div>
                    {
                        openDesignation &&
                        <DefaultStaticPopover
                            position='bottom'
                            headerText={"Designation"}
                            bodyText={data?.designation ? data?.designation.join(', ') : 'N/A'}
                        />
                    }
                </div>

            </div>

            <div className='dateContainerCompany'>
                <DateContainer label="Start date" date={data?.startYear} className="companyName" />
                <DateContainer label="End date" date={data?.currentlyWorking?"": data?.endYear} className="companyName" />
                <div className='companyInfo col-4' style={{position:'relative',cursor:"default"}} > 
                    <div className="companyName" style={{cursor:'pointer'}} onClick={() => setOpenStatus(true)} onFocus={() => setOpenStatus(true)} onBlur={() => setOpenStatus(false)} tabIndex={-1}>Current status - </div>
                    {data?.currentlyWorking ? <div className='cName' style={{cursor:'pointer'}} onClick={() => setOpenStatus(true)} onFocus={() => setOpenStatus(true)} onBlur={() => setOpenStatus(false)} tabIndex={-1}>Working here</div> : ""}
                    {
                          data?.currentlyWorking &&  openStatus &&
                            <DefaultStaticPopover
                                position='bottom'
                                headerText={"Current Status"}
                                bodyText={data?.currentlyWorking ? "Working here" : 'N/A'}
                            />
                    }
                </div>
            </div>
        </div >
    )
}

export default EducationCard;
