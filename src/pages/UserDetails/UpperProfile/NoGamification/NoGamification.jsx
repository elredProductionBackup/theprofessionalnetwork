import { Icon } from "@iconify/react";
import "./no-gamification.scss";

const NoGamification = () => {
  return (
    <div className="no-gamification-container">
        <div className="no-gamification-inner">
            <Icon icon="emojione-monotone:exclamation-mark" className="no-gamification-exclaim-icon" />
            <span className="no-gamification-text">Gamification not completed !</span>
        </div>
    </div>
  )
}

export default NoGamification;