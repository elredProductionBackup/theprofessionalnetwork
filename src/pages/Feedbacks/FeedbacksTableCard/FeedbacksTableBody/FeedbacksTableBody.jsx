import { useNavigate } from "react-router-dom";
import { dateFormat, timeFormat } from "../../../../helpers/globalFunctions";
import FeedbacksUserProfilePic from "./FeedbacksUserProfilePic/FeedbacksUserProfilePic";
import FeedbackRatingStars from "./FeedbackRatingStars/FeedbackRatingStars";
import FeedbackReadMorePopup from "../FeedbackReadMorePopup/FeedbackReadMorePopup";
import { useEffect, useRef, useState } from "react";
import FeedbackTextColumn from "./FeedbackTextColumn/FeedbackTextColumn";

const FeedbacksTableBody = ({ feedbacksData }) => {
  const navigate = useNavigate();
  const [feedbackPopup, setFeedbackPopup] = useState(false);
  const [feedbackPopupData, setFeedbackPopupData] = useState({});

  const [shouldShowReadMore, setShouldShowReadMore] = useState([]);
  const feedbackRefs = useRef([]);

  useEffect(() => {
    const checkOverflow = () => {
      setShouldShowReadMore(
        feedbacksData.map((_, index) => {
          const feedbackElement = feedbackRefs.current[index];
          return (
            feedbackElement &&
            feedbackElement.scrollWidth > feedbackElement.clientWidth
          );
        })
      );
    };
    checkOverflow();

    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [feedbacksData]);

  return (
    <>
      <tbody>
        {feedbacksData?.map((item, index) => (
          <tr
            key={item._id}
            className={item?.userCode && item?.name ? "feedback-table-row" : ""}
            onClick={() => {
              if (item?.userCode && item?.name)
                navigate(
                  `/main/user-details/${item?.userCode}?tab=Userdetails&title=Feedbacks`
                );
            }}
          >
            <td className="feedback-table-table-data feedback-table-table-data-name-img-new">
              <FeedbacksUserProfilePic dpURL={item?.dpURL} />
              <div className="feedback-table-table-name-container">
                <span className="feedback-table-table-name-new">
                  {item?.name || "Anonymous"}
                </span>
              </div>
            </td>
            <td className="feedback-table-table-data feedback-table-table-data-screen-name">
              {item?.screenName}
            </td>
            <td
              className="feedback-table-table-data feedback-table-table-data-feedback"
              ref={(el) => (feedbackRefs.current[index] = el)}
            >
              {item?.feedback ? (
                <FeedbackTextColumn
                  item={item}
                  setFeedbackPopupData={setFeedbackPopupData}
                  setFeedbackPopup={setFeedbackPopup}
                  shouldShowReadMore={shouldShowReadMore[index]}
                />
              ) : (
                <div className="feedback-table-table-data-no-feedback">-</div>
              )}
            </td>
            <td className="feedback-table-table-data feedback-table-table-center">
              <FeedbackRatingStars ratingScore={item?.rating} />
            </td>
            <td className="feedback-table-table-data feedback-table-table-center feedback-table-table-data-date">
              {item?.createdAt ? dateFormat(item?.createdAt) : "-"}
            </td>
            <td className="feedback-table-table-data feedback-table-table-data-time">
              {item?.createdAt ? timeFormat(item?.createdAt) : "-"}
            </td>
            <td className="feedback-table-table-data feedback-table-table-center">
              <span
                className={`feedback-table-table-badge ${
                  item?.onboardingStatus
                    ? "feedback-table-bg-success"
                    : "feedback-table-bg-danger"
                }`}
              >
                {item?.onboardingStatus ? "Completed" : "Pending"}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
      {feedbackPopup && (
        <FeedbackReadMorePopup
          setFeedbackPopup={setFeedbackPopup}
          feedbackPopupData={feedbackPopupData}
        />
      )}
    </>
  );
};

export default FeedbacksTableBody;
