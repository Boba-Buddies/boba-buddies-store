import { Review } from '../../../../models/Reviews'
import StarRating from '../../../user/components/StarRating/StarRating'
import { formatDateToDDMMYYYY } from '../../../utils/formatDate/formatDate'

interface ReviewPopupProps {
  review: Review
  onClose: () => void
  onToggle: (id: number, isEnabled: boolean) => void
}

const ReviewPopup = ({ review, onClose, onToggle }: ReviewPopupProps) => {
  return (
    <div
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          zIndex: 1001,
          width: '80%',
          maxWidth: '500px',
          minHeight: '400px',
        }}
        className="flex flex-col justify-between"
      >
        <div>
          <button 
            onClick={onClose}
            style={{ marginBottom: '20px' }}
            className="px-2 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Back to reviews
          </button>
          <div className="flex justify-between font-bold text-lg">
            <h2>{review.reviewerUserName}</h2>
            <p>{formatDateToDDMMYYYY(review.reviewCreatedAt)}</p>
          </div>
          <div className="flex mt-8 items-center">
            <img
              style={{ maxWidth: '150px' }}
              src={review.productImage}
              alt={review.productName}
            />
            <h2>{review.productName}</h2>
          </div>
        </div>
        <div>
          <div className="flex gap-4 mt-4 mb-2">
            <p className = "font-bold">Rating:</p>
            <StarRating rating={review.reviewRating} size={1} />
            <p>({review.reviewRating})</p>
          </div>
          <h2 className='font-bold'>Description:</h2>
          <p>{review.reviewDescription}</p>
        </div>
        <button
          style={{
            backgroundColor: review.reviewIsEnabled ? 'green' : 'red',
            marginTop: '30px',
            width: '80px'
          }}
          onClick={() => onToggle(review.reviewId, !review.reviewIsEnabled)}
          className="px-2 py-1 text-white rounded"
        >
          {review.reviewIsEnabled ? 'Enabled' : 'Disabled'}
        </button>
      </div>
    </div>
  )
}

export default ReviewPopup
