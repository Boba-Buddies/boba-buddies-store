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
import ViewProduct from '../../components/Product/ViewProduct'
import LoadError from '../../components/LoadError/LoadError'
import { ProductReviews } from '../../../../models/Reviews'

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

  console.log(reviews)
  return (
    <>
      <LoadError status={status} />
      {product && (
        <div
          className="flex flex-col items-center w-full"
          style={{ marginTop: '100px'}}
        >
          <ViewProduct product={product} />
          <div className="flex flex-col items-center max-w-5xl border border-black rounded"
          style={{ marginTop: '30px'}}>
            {reviews &&
              reviews.map((review) => {
                return (
                  <div key={review.userName} className = "border border-black rounded"
                  style={{marginBottom : '30px'}}>
                    <div className="flex flex-row gap-4"><h2>{review.userName}</h2> <h2>Created at: {review.createdAt}</h2></div>
                    <p>{review.rating} stars</p>
                    <p>{review.description}</p>
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
