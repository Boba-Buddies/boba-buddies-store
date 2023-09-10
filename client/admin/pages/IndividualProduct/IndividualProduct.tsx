import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { fetchProductByIdAdmin } from '../../../apis/products'
import { fetchReviewsByProductId } from '../../../apis/reviews'
import { ProductReview } from '../../../../models/Reviews'
import { fetchWishlistStatusByProductId } from '../../../apis/wishlist'
import { useAuth0 } from '@auth0/auth0-react'
import LoadError from '../../../user/components/LoadError/LoadError'
import EditProduct from '../../components/EditProduct/EditProduct'

const IndividualProduct = () => {
  const { getAccessTokenSilently } = useAuth0() // Use Auth0 hook
  const params = useParams()
  const id = Number(params.id)

  const { data: product, status: statusProductS } = useQuery(
    ['getProduct', id],
    async () => {
      const token = await getAccessTokenSilently()
      return await fetchProductByIdAdmin(id, token)
    },
  )

  const {
    data: reviews,
    refetch: refetchReviews,
    status: statusReviews,
  } = useQuery(['getReviews', id], async () => {
    const token = await getAccessTokenSilently()
    const fetchedReviews: ProductReview[] = await fetchReviewsByProductId(
      id,
      token,
    )
    return fetchedReviews
  })

  const {
    data: wishlistStatus = false,
    refetch: refetchWishlistProductStatus,
    status: statusWishlist,
  } = useQuery(['getWishlistStatus', id], async () => {
    const token = await getAccessTokenSilently()
    const wishlistStatus: boolean = await fetchWishlistStatusByProductId(
      id,
      token,
    )
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
          <EditProduct
            product={product}
          />
        </div>
      )}
    </>
  )
}

export default IndividualProduct
