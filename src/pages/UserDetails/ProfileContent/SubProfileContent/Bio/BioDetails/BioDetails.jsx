import React, { useState } from 'react';
import BioCardButton from './BioCardButton/BioCardButton';
import AwardDetails from '../AwardDetails/AwardDetails';
import EducationDetails from '../EducationDetails/EducationDetails';
import CompanyDetails from '../CompanyDetails/CompanyDetails'
import './BioDetails.scss';

const BioDetails = ({ userCode, totalAwardsCount, totalEducationDetailsCount, totalCompanyDetailsCount, setAwardCount, setEducationCount, setCompanyCount }) => {
  const [activeButton, setActiveButton] = useState('awards');

  return (
    <div className="col-lg-12">
      <div className="card-bio">
        <div className="card-header-bio">
          <BioCardButton activeButton={activeButton} setActiveButton={setActiveButton}
            totalAwardsCount={totalAwardsCount} totalEducationDetailsCount={totalEducationDetailsCount} 
            totalCompanyDetailsCount={totalCompanyDetailsCount} />
        </div>

        <div>
          {activeButton === 'awards' ? <AwardDetails userCode={userCode} setAwardCount={setAwardCount} /> :
            activeButton === 'education' ? <EducationDetails userCode={userCode} setEducationCount={setEducationCount} /> :
              activeButton === 'company' ? <CompanyDetails userCode={userCode} setCompanyCount={setCompanyCount} />
                : null
          }
        </div>
      </div>
    </div>
  );
};

export default BioDetails;
