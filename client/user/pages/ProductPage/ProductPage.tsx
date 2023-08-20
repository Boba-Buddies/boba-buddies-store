import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { fetchProductById } from '../../../apis/products'
import {
  fetchReviewsByProductId} from '../../../apis/reviews'
import ViewProduct from '../../components/ViewProduct/ViewProduct'
import LoadError from '../../components/LoadError/LoadError'
import ViewProductReviews from '../../components/ViewProductReviews/ViewProductReviews'
import { ProductReviews } from '../../../../models/Reviews'

const ProductPage = () => {
  const params = useParams()
  const id = Number(params.id)

  const { data: product, status } = useQuery(['getProduct', id], async () => {
    return await fetchProductById(id)
  })

  const { data: reviews, refetch } = useQuery(['getReviews', id], async () => {
    const fetchedReviews: ProductReviews = await fetchReviewsByProductId(id)
    return fetchedReviews
  })

  return (
    <>
      <LoadError status={status} />
      {product && reviews && (
        <div
          className="flex flex-col items-center w-full"
          style={{ marginTop: '100px', marginBottom: '150px' }}
        >
          <ViewProduct product={product} />
          <ViewProductReviews product={product} reviews={reviews} refetch={refetch}/>
        </div>
      )}
    </>
  )
}

export default ProductPage
