import starImg from "../../../../../assets/Icons/yellow_star.svg";
import "./feedback-rating-stars.scss";

const FeedbackRatingStars = ({ ratingScore }) => {
  let stars = [];
  for (let i = 0; i < ratingScore; i++) stars.push(i);

  return (
    <div className="feedback-table-stars-container">
      {stars.map((item) => (
        <span key={item} className="feedback-table-star">
          <img src={starImg} alt="" className="feedback-table-star-img" />
        </span>
      ))}
    </div>
  );
};

export default FeedbackRatingStars;
