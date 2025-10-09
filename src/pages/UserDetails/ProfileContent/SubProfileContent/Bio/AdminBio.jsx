import React, { useEffect, useState } from 'react';
import Aboutme from './AboutMe/AboutMe';
import Biodetails from './BioDetails/BioDetails';
import { API } from '../../../../../helpers/apiEndpoints';
import { axiosInstanceHeader } from '../../../../../helpers/axiosInstance';

const AdminBio = ({ userCode, name }) => {
    const [userBio, setUserBio] = useState([])
    const [awardCount, setAwardCount] = useState(0);
    const [educationCount, setEducationCount] = useState(0);
    const [companyCount, setCompanyCount] = useState(0);
    const [userBioLoader, setUserBioLoader] = useState(false);

    const fetchBio = () => {
        if (userCode) {
            setUserBioLoader(true);
            axiosInstanceHeader.post(API.USER_BIO, { userCode })
                .then(res => {
                    setUserBio(res?.data?.result?.[0])
                    setAwardCount(res?.data?.result?.[0]?.totalAwardsCount)
                    setEducationCount(res?.data?.result?.[0]?.totalEducationDetailsCount)
                    setCompanyCount(res?.data?.result?.[0]?.totalCompanyDetailsCount)
                    setUserBioLoader(false);
                })
                .catch(err => {console.log(err, 'fffffff'); setUserBioLoader(false)})
        }
    }

    useEffect(() => {
        fetchBio()
    }, [userCode])

    return (
        <div className="padding-top-about">
            <Aboutme title="About me" desc={userBio?.aboutMe} preview={userBio?.pdfPreview} resumeURL={userBio?.resumeURL} name={name} userBioLoader={userBioLoader} />
            <Biodetails userCode={userCode} totalAwardsCount={awardCount} totalEducationDetailsCount={educationCount} totalCompanyDetailsCount={companyCount}
                setAwardCount={setAwardCount} setEducationCount={setEducationCount} setCompanyCount={setCompanyCount} />
        </div>
    );
}

export default AdminBio;
