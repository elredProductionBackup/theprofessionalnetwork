import React from 'react';
import AwardIcon from '../../../../../../../assets/Icons/trophy.svg'
import AwardBlue from '../../../../../../../assets/Images/trophy2.svg'
import CompanyIcon from '../../../../../../../assets/Icons/building.svg'
import EducationWhite from '../../../../../../../assets/Images/education2.svg'
import EducationIcon from '../../../../../../../assets/Icons/education.svg'
import CompanyWhite from '../../../../../../../assets/Images/company2.svg'
import { handleButtonClick } from '../BioUtils';

const BioCardButton = ({ activeButton, setActiveButton, totalAwardsCount, totalEducationDetailsCount,totalCompanyDetailsCount }) => {
  return (
    <>
      <button type="button" className={activeButton === 'awards' ? "awardButton" : "notActiveAwardButton"} onClick={() => handleButtonClick('awards', setActiveButton)}>
        <img src={activeButton === 'awards' ? AwardIcon : AwardBlue} alt='err' className={activeButton === 'awards' ? 'awardIcons' : "nonActiveAwardIcons"} color='#000' />
        <span className={activeButton === 'awards' ? 'awardTitle' : 'nonActiveAwardTitle'}>Awards & certificates</span>
        <span className={activeButton === 'awards' ? "badge-award" : "nonactiveBadge"}>{totalAwardsCount || 0}</span>
      </button>

      <button type="button" className={activeButton === 'education' ? "awardButton" : "notActiveAwardButton"} onClick={() => handleButtonClick('education', setActiveButton)}>
        <img src={activeButton === 'education' ? EducationWhite : EducationIcon} alt='err' className='awardIcons2' />
        <span className={activeButton === 'education' ? 'awardTitle' : 'nonActiveAwardTitle'}>Education details</span>
        <span className={activeButton === 'education' ? "badge-award" : "nonactiveBadge"}>{totalEducationDetailsCount || 0}</span>
      </button>

      <button type="button" className={activeButton === 'company' ? "awardButton" : "notActiveAwardButton"} onClick={() => handleButtonClick('company', setActiveButton)}>
        <img src={activeButton === 'company' ? CompanyWhite : CompanyIcon} alt='err' className='awardIcons3' />
        <span className={activeButton === 'company' ? 'awardTitle' : 'nonActiveAwardTitle'}>Company details</span>
        <span className={activeButton === 'company' ? "badge-award" : "nonactiveBadge"}>{totalCompanyDetailsCount || 0}</span>
      </button>
    </>
  )
}

export default BioCardButton;
