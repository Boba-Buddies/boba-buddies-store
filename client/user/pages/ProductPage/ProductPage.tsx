import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { fetchProductByIdUser } from '../../../apis/products'
import { fetchReviewsByProductId } from '../../../apis/reviews'
import ViewProduct from '../../components/ViewProduct/ViewProduct'
import LoadError from '../../components/LoadError/LoadError'
import ViewProductReviews from '../../components/ViewProductReviews/ViewProductReviews'
import { ProductReviews } from '../../../../models/Reviews'
import { fetchWishlistStatusByProductId } from '../../../apis/wishlist'

const ProductPage = () => {
  const params = useParams()
  const id = Number(params.id)
  const { data: product, status: statusProductS } = useQuery(
    ['getProduct', id],
    async () => {
      return await fetchProductByIdUser(id)
    },
  )

  const {
    data: reviews,
    refetch: refetchReviews,
    status: statusReviews,
  } = useQuery(['getReviews', id], async () => {
    const fetchedReviews: ProductReviews = await fetchReviewsByProductId(id)
    return fetchedReviews
  })

  const {
    data: wishlistStatus = false,
    refetch: refetchWishlistProductStatus,
    status : statusWishlist
  } = useQuery(['getWishlistStatus', id], async () => {
    const wishlistStatus: boolean = await fetchWishlistStatusByProductId(id)
      return wishlistStatus
  })

  return (
    <>
      <LoadError status={[statusProductS, statusReviews, statusWishlist]} />
      {product && reviews && (
        <div
          className="flex flex-col items-center w-full"
          style={{ marginTop: '100px', marginBottom: '150px' }}
        >
          <ViewProduct
            product={product}
            wishlistStatus={wishlistStatus}
            refetchWishlistProductStatus={refetchWishlistProductStatus}
          />
          <ViewProductReviews
            product={product}
            reviews={reviews}
            refetchReviews={refetchReviews}
          />
        </div>
      )}
    </>
  )
}

export default ProductPage
