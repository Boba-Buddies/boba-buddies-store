import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { fetchProductByIdUser } from '../../../apis/products'
import { fetchReviewsByProductId } from '../../../apis/reviews'
import ViewProduct from '../../components/ViewProduct/ViewProduct'
import LoadError from '../../components/LoadError/LoadError'
import ViewProductReviews from '../../components/ViewProductReviews/ViewProductReviews'
import { ProductReview } from '../../../../models/Reviews'
import { fetchWishlistStatusByProductId } from '../../../apis/wishlist'
import { useAuth0 } from '@auth0/auth0-react'

const ProductPage = () => {
  const { getAccessTokenSilently } = useAuth0() // Use Auth0 hook
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
    const fetchedReviews: ProductReview[] = await fetchReviewsByProductId(
      id
    )
    return fetchedReviews
  })

  const {
    data: wishlistStatus = false,
    refetch: refetchWishlistProductStatus,
    status: statusWishlist,
  } = useQuery(['getWishlistStatus', id], async () => {
    try {
      const token = await getAccessTokenSilently()
    const wishlistStatus: boolean = await fetchWishlistStatusByProductId(
      id,
      token,
    )
    return wishlistStatus
    } catch (error) {
      console.error("An error occurred:", error)
    }
    
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
