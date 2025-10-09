import Spinner from 'react-bootstrap/Spinner';
import SkillsChipsCard from "./SkillsChipsCard/SkillsChipsCard";
import StyleAccordionSingleCard from "./StyleAccordionSingleCard/StyleAccordionSingleCard";
import { skillsChipsCardsData } from "./data";
import "./profile-tab.scss";

const ProfileTab = ({ data, profileLoader }) => {
  const { attributes } = data
  const skillsChipsData = (index) => {
    let skillsArr = [];
    if (index === 0) skillsArr = data?.skills;
    if (index === 1) skillsArr = data?.subjects;
    if (index === 2) skillsArr = data?.hobbies;
    return skillsArr;
  }
  return (
    <>
      <div className="profile-tab-skils-card">
        <div className="profile-tab-skills-card-header">Skills</div>
        <div className="profile-tab-skills-card-container">
          {skillsChipsCardsData?.map((data, index) => (
            <SkillsChipsCard key={data?.id} data={data} skillsData={skillsChipsData(index)} index={index} profileLoader={profileLoader} />
          ))}
        </div>
      </div>
      <div className="profile-tab-accordion-card">
        <div className="profile-tab-accordion-card-header">Super skills</div>
        <div className="profile-tab-accordion-card-container">
          {profileLoader ? <div className="profile-tab-accordion-card-loader"><Spinner animation="border" variant="danger" className="profile-tab-accordion-card-spinner-loader"/></div>
           : (attributes && attributes?.length !== 0) ? attributes?.map((item, index) => (
            <StyleAccordionSingleCard
              key={item + index}
              item={item}
              index={index}
            />
          )) : <div className="no-super-skills-gamification">No super skills added yet</div>}
        </div>
      </div>
    </>
  );
};

export default ProfileTab;
