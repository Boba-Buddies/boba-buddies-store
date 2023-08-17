import { ProductReviews } from '../../../../models/Reviews'
import { Product } from '../../../../models/Products'
import StarRating from '../StarRating/StarRating'
import { formatDateToDDMMYYYY } from '../../../utils/FormatDate/formatDate'

interface ProductReviewsProps {
  product: Product
  reviews: ProductReviews
}

function ViewProductReviews({ product, reviews }: ProductReviewsProps) {
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
    </div>
  )
}

export default ViewProductReviews
