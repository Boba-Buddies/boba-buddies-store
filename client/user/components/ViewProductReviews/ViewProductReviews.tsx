import { useState } from 'react'
import { useMutation } from 'react-query'
import { NewReview, ProductReview } from '../../../../models/Reviews'
import { UserProduct } from '../../../../models/Products'
import StarRating from '../StarRating/StarRating'
import { formatDateToDDMMYYYY } from '../../../utils/formatDate/formatDate'
import { addReview } from '../../../apis/reviews'
import { useAuth0 } from '@auth0/auth0-react'

interface ProductReviewsProps {
  product: UserProduct
  reviews: ProductReview[]
  refetchReviews: () => void
}

function ViewProductReviews({
  product,
  reviews,
  refetchReviews,
}: ProductReviewsProps) {
  const [isAddingReview, setIsAddingReview] = useState(false)
  const [reviewDescription, setReviewDescription] = useState('')
  const [reviewRating, setReviewRating] = useState(3)

  const { getAccessTokenSilently } = useAuth0()

  const addReviewMutation = useMutation(
    async (newReview: NewReview) => {
      const token = await getAccessTokenSilently()
      return addReview(newReview, token)
    },
    {
      onSuccess: () => {
        refetchReviews()
      },
      onError: (error) => {
        console.error("An error occurred:", error)
      }
    },
  )

  const handleAddReviewClick = () => {
    setIsAddingReview(true)
  }

  const handleCancelClick = () => {
    setIsAddingReview(false)
    setReviewDescription('')
    setReviewRating(3)
  }

  const handleIncrementRating = () => {
    if (reviewRating < 5) setReviewRating(reviewRating + 0.5)
  }

  const handleDecrementRating = () => {
    if (reviewRating > 0.5) setReviewRating(reviewRating - 0.5)
  }

  const handleSubmitReview = () => {
    if (reviewDescription.trim() === '') return

    const newReview = {
      productId: product.id,
      description: reviewDescription,
      rating: reviewRating,
    }

    addReviewMutation.mutate(newReview)

    setReviewDescription('')
    setReviewRating(3)
    setIsAddingReview(false)
  }

  return (
    <div
      className="flex flex-col items-center max-w-5xl"
      style={{ marginTop: '40px' }}
    >
      <div
        className="flex flex-row items-center max-w-5xl"
        style={{ marginBottom: '20px' }}
      >
        <h2 className="text-3xl font-bold mr-2">{product.averageRating}</h2>
        <StarRating rating={product.averageRating} size={2} />
      </div>

      {reviews &&
        reviews.map((review) => {
          return (
            <div
              key={review.userName}
              className="flex flex-col border border-black rounded"
              style={{ marginBottom: '30px', padding: '10px', width: '400px' }}
            >
              <div
                className="flex flex-row justify-between font-bold"
                style={{ marginBottom: '5px' }}
              >
                <h2>{review.userName}</h2>
                <h2>{formatDateToDDMMYYYY(review.createdAt)}</h2>
              </div>
              <p style={{ marginBottom: '20px' }}>{review.description}</p>
              <div className="flex">
                <StarRating rating={review.rating} size={1} />
              </div>
            </div>
          )
        })}
      {isAddingReview ? (
        <div className="flex flex-col" style={{ width: '400px' }}>
          <textarea
            onChange={(e) => setReviewDescription(e.target.value)}
            placeholder="Write your review here..."
            className="min-w-full max-w-2xl p-4 mt-2 bg-white border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y transition duration-150 ease-in-out"
            rows={5}
          />
          <div className="flex flex-col items-center">
            <div>
              <button
                onClick={handleDecrementRating}
                className="bg-red-500 hover:bg-red-700 text-white font-bold px-3 py-1 mt-2 rounded-full w-12 text-center"
                disabled={reviewRating <= 0.5}
              >
                -
              </button>
              <div className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mt-2 ml-2 mr-2 w-12 text-center">
                {reviewRating}
              </div>
              <button
                onClick={handleIncrementRating}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 py-1 mt-2 rounded-full  w-12 text-center"
                disabled={reviewRating >= 5}
              >
                +
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4 mt-4">
            <button
              onClick={handleSubmitReview}
              disabled={reviewDescription.trim() === ''}
              className={`${
                reviewDescription.trim() === ''
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-700'
              } text-white font-bold py-2 px-4 w-128 rounded-full`}
            >
              Submit
            </button>
            <button
              onClick={handleCancelClick}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 w-128 rounded-full"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={handleAddReviewClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-128 rounded-full mt-4"
        >
          Add review
        </button>
      )}
    </div>
  )
}

export default ViewProductReviews
