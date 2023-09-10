import { ReviewForTable } from '../../../../models/Reviews'
import {
  format24HourTo12Hour,
  formatDateToDDMMYYYY,
} from '../../../utils/formatDate/formatDate'

interface DisplayReviewsProps {
  currentReviews: ReviewForTable[]
  fetchAndShowReviewDetails: (reviewId: number) => void
}

const DisplayReviews = ({
  currentReviews,
  fetchAndShowReviewDetails,
}: DisplayReviewsProps) => {
  return (
    <div className="divBody text-gray-600 text-sm font-light">
      {currentReviews.map((review) => (
        <div
          key={review.id}
          className="divRow border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
          onClick={() => fetchAndShowReviewDetails(review.id)}
        >
          <div
            className="divCell py-3 px-8 text-left whitespace-nowrap"
            style={{ minWidth: '200px' }}
          >
            {review.userName}
          </div>
          <div
            className="divCell py-3 px-8 text-left"
            style={{ minWidth: '300px' }}
          >
            {review.productName}
          </div>
          <div
            className="divCell py-3 px-8 text-left"
            style={{ minWidth: '100px' }}
          >
            {review.rating}
          </div>
          <div
            className="divCell py-3 px-8 text-left"
            style={{ minWidth: '100px' }}
          >
            {review.isEnabled ? 'Enabled' : 'Disabled'}
          </div>
          <div
            className="divCell py-3 px-8 text-left"
            style={{ minWidth: '200px' }}
          >
            {format24HourTo12Hour(review.createdAt)}{' '}
            {formatDateToDDMMYYYY(review.createdAt)}
          </div>
        </div>
      ))}
    </div>
  )
}

export default DisplayReviews
