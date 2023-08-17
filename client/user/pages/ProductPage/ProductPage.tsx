import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { ChangeEvent } from 'react'
import { fetchProductById } from '../../../apis/products'
import {
  fetchReviewsByProductId,
  createReviewByUserId,
  deleteReviewByProductId,
} from '../../../apis/reviews'
import ViewProduct from '../../components/ViewProduct/ViewProduct'
import LoadError from '../../components/LoadError/LoadError'
import { ProductReviews } from '../../../../models/Reviews'
import StarRating from '../../components/StarRating/StarRating'
import { formatDateToDDMMYYYY } from '../../../utils/FormatDate/formatDate'

const ProductPage = () => {
  const params = useParams()
  const id = Number(params.id)

  const { data: product, status } = useQuery(['getProduct', id], async () => {
    return await fetchProductById(id)
  })

  const { data: reviews } = useQuery(['getReviews', id], async () => {
    const fetchedReviews: ProductReviews = await fetchReviewsByProductId(id)
    return fetchedReviews
  })

  return (
    <>
      <LoadError status={status} />
      {product && (
        <div
          className="flex flex-col items-center w-full"
          style={{ marginTop: '100px'}}
        >
          <ViewProduct product={product} />
          <div
            className="flex flex-col items-center max-w-5xl"
            style={{ marginTop: '30px' }}
          >
            {reviews &&
              reviews.map((review) => {
                return (
                  <div
                    key={review.userName}
                    className="flex flex-col border border-black rounded"
                    style={{ marginBottom: '30px', padding : "10px" }}
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
                      <p>{review.rating}</p>
                      <StarRating rating={review.rating} size={0.9} />
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      )}
    </>
  )
}

export default ProductPage
