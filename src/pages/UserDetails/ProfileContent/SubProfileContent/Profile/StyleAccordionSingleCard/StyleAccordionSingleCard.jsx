import { Icon } from "@iconify/react";
import { useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import "./style-accordion-single-card.scss";

const StyleAccordionSingleCard = ({ item, index }) => {
  const [show, setShow] = useState(false);

  return (
    <div
      key={item?.question?.id}
      className={`${index === 0 ? "" : "top-margin-style-accordion"}`}
    >
      <div
        onClick={() => setShow(!show)}
        className={
          show
            ? "style-accordion-question"
            : "style-accordion-question-collapsed"
        }
      >
        <div className="style-accordion-question-text">{item?.question}</div>
        {show ? (
          <Icon
            icon="material-symbols:arrow-back-ios-new-rounded"
            rotate={1}
            className="style-accordion-question-icon"
          />
        ) : (
          <Icon
            icon="material-symbols:arrow-back-ios-new-rounded"
            rotate={3}
            className="style-accordion-question-icon"
          />
        )}
      </div>
      {/* <Collapse in={show}>
        <div className={`style-accordion-answer-container ${show?'show':''}`}>
          <div className="style-accordion-answer">
            {item?.answer ? (
              item?.answer
            ) : (
              <span className="style-accordion-no-answer">No answer added</span>
            )}
          </div>
        </div>
      </Collapse> */}
      <Collapse in={show}>
          <div className="style-accordion-answer-container">
              <div className="style-accordion-answer">
                  {item?.answer || <span className="style-accordion-no-answer">No answer added</span>}
              </div>
          </div>
      </Collapse>
    </div>
  );
};

export default StyleAccordionSingleCard;
