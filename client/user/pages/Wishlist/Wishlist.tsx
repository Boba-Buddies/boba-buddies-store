import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  deleteFromWishlistByProductId,
  fetchWishlist,
} from '../../../apis/wishlist'
import LoadError from '../../components/LoadError/LoadError'
import { WishlistProduct } from '../../../../models/Wishlist'
import { fetchCart, modifyCartProductQuantity } from '../../../apis/cart'

const Wishlist = () => {
  const wishListQuery = useQuery('fetchWishlist', fetchWishlist)
  const cartQuery = useQuery('fetchCart', fetchCart)
  const queryClient = useQueryClient()
  const statuses = [wishListQuery.status, cartQuery.status]

  //add to the cart mutation
  const cartMutation = useMutation(
    ({ productId, quantity }: { productId: number; quantity: number }) =>
      modifyCartProductQuantity(productId, quantity),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries('fetchCart')
      },
    },
  )

  // remove from the wishList mutation
  const romoveMutation = useMutation(
    (productId: number) => deleteFromWishlistByProductId(productId),
    {
      onSuccess: async () => {
        console.log('delete Successfully!')

        queryClient.invalidateQueries('fetchWishlist')
      },
    },
  )

  function handleCartDetails(productId: number) {
    const product = cartQuery.data?.find((item) => item.productId === productId)
    const quantity = product ? product.quantity + 1 : 1
    cartMutation.mutate({ productId, quantity })
  }

  function removeFromWishList(productId: number) {
    romoveMutation.mutate(productId)
  }
  return (
    <>
      <LoadError status={statuses} />
      <div className="bg-zinc-700 w-full flex flex-col items-center">
        <div className="w-10/12">
          <h1 className="">WISHLIST</h1>
        </div>
        <div className="bg-lime-300 w-10/12">
          {!wishListQuery.isLoading &&
            wishListQuery.data &&
            wishListQuery.data.map((item: WishlistProduct) => (
              <div
                key={item.id}
                className="bg-sky-400 w-10/12 flex flex-row gap-10"
              >
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-3/12"
                />
                <h1>{item.productName}</h1>
                <h1>${item.productPrice.toFixed(2)}</h1>
                <button
                  className="w-1/6"
                  onClick={() => handleCartDetails(item.productId)}
                >
                  Add to Cart
                </button>
                <button
                  className="flex flex-col items-center"
                  onClick={() => removeFromWishList(item.productId)}
                >
                  <FontAwesomeIcon icon={faHeart} />
                  <p>Remove</p>
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default Wishlist
