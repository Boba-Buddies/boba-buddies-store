import { NewReview, ProductReviews } from '../../../../models/Reviews'
import { Product } from '../../../../models/Products'
import StarRating from '../StarRating/StarRating'
import { formatDateToDDMMYYYY } from '../../../utils/FormatDate/formatDate'
import { addReview } from '../../../apis/reviews'
import { useState } from 'react'
import { useMutation } from 'react-query'


interface ProductReviewsProps {
  product: Product
  reviews: ProductReviews
}

function ViewProductReviews({ product, reviews }: ProductReviewsProps) {
  const [isAddingReview, setIsAddingReview] = useState(false)
  const [reviewDescription, setReviewDescription] = useState('')
  const [reviewRating, setReviewRating] = useState(3)

  const addReviewMutation = useMutation((newReview: NewReview) => addReview(newReview))

  const handleAddReviewClick = () => {
    setIsAddingReview(true)
  }

  const handleCancelClick = () => {
    setIsAddingReview(false)
    setReviewDescription('')
    setReviewRating(3)
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
        <h2 className="text-3xl font-bold">{product.averageRating}</h2>
        <StarRating rating={product.averageRating} size={2} />
      </div>

      {reviews &&
        reviews.map((review) => {
          return (
            <div
              key={review.userName}
              className="flex flex-col border border-black rounded"
              style={{ marginBottom: '30px', padding: '10px', width : '400px'}}
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
          <textarea onChange={(e) => setReviewDescription(e.target.value)} placeholder="Write your review here..." />
          <input type="range" min="0.5" max="5" step="0.5" value={reviewRating} onChange={(e) => setReviewRating(+e.target.value)} />
          <button onClick={handleSubmitReview} disabled={reviewDescription.trim() === ''}>Submit review</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        <button onClick={handleAddReviewClick}>Add review</button>
      )}
    </div>
  )
}

export default ViewProductReviews
