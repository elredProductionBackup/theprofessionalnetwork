import Spinner from 'react-bootstrap/Spinner'
import "./skills-chips-card.scss";

const SkillsChipsCard = ({ data, skillsData, index, profileLoader }) => {
  let noSkillsAdded = "";
  if (index === 0) noSkillsAdded = "No skills added yet";
  if (index === 1) noSkillsAdded = "No subjects added yet";
  if (index === 2) noSkillsAdded = "No hobbies added yet";

  return (
    <div className="skils-chips-card-container">
      <div className="skils-chips-card-content">
        <div className="skils-chips-card-header">{data?.headerText}</div>
        {profileLoader ? <div className="skills-chips-spinner-container"><Spinner animation="border" variant="danger" className="skills-chips-spinner-loader"/></div>
        : skillsData && skillsData?.length !== 0 ? <div className="skills-chips-card-chips-container">
           {skillsData?.map((skill, index) => (
             <span key={skill._id + index} className="skills-chips-card-chip">
               {skill?.value}
             </span>
           ))}
         </div> : <div className="no-skill-found-default-text">
             {noSkillsAdded}
         </div>}
      </div>
    </div>
  );
};

export default SkillsChipsCard;
