import { Review } from '../../../../models/Reviews'

interface ReviewPopupProps {
  review: Review
  onClose: () => void
  onToggle: (id: number, isEnabled: boolean) => void
}

const ReviewPopup = ({ review, onClose, onToggle }: ReviewPopupProps) => {
  return (
    <div className="review-popup">
      <button onClick={onClose}>Back to reviews</button>
      <h2>{review.reviewerUserName}</h2>
      <p>{review.reviewCreatedAt}</p>
      <img src={review.productImage} alt={review.productName} />
      <h3>{review.productName}</h3>
      <p>Rating: {review.reviewRating}</p>
      <p>{review.reviewDescription}</p>
      <button
        style={{ backgroundColor: review.reviewIsEnabled ? 'green' : 'red' }}
        onClick={() => onToggle(review.reviewId, !review.reviewIsEnabled)}
      >
        {review.reviewIsEnabled ? 'Enabled' : 'Disabled'}
      </button>
    </div>
  )
}

export default ReviewPopup
