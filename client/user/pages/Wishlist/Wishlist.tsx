import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { fetchWishlist } from '../../../apis/wishlist'
import LoadError from '../../components/LoadError/LoadError'
import { WishlistProduct } from '../../../../models/Wishlist'
import { modifyCartProductQuantity } from '../../../apis/cart'

const Wishlist = () => {
  const { isLoading, data, status } = useQuery('fetchWishlist', fetchWishlist)
  const queryClient = useQueryClient()
  const cartMutation = useMutation(
    ({ productId, quantity }: { productId: number; quantity: number }) =>
      modifyCartProductQuantity(productId, quantity),
    {
      onSuccess: async () => {
        console.log('success!!! in the mutation')

        queryClient.invalidateQueries('fetchCart')
      },
    },
  )

  function handleCartDetails(productId: number) {
    const quantity = 1
    console.log(productId, 'I am the productId')

    cartMutation.mutate({ productId, quantity })
  }
  return (
    <>
      <LoadError status={status} />
      <div className="bg-zinc-700 w-full flex flex-col items-center">
        <div className="w-10/12">
          <h1 className="">WISHLIST</h1>
        </div>
        <div className="bg-lime-300 w-10/12">
          {!isLoading &&
            data &&
            data.map((item: WishlistProduct) => (
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
                <div className="flex flex-col items-center">
                  <FontAwesomeIcon icon={faHeart} />
                  <button>Remove</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default Wishlist
