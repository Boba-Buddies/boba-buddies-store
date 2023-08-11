import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { useCartStore } from '../../../store/cart'
import { CartClient } from '../../../../models/Cart'

import {
  deleteProductFromCart,
  fetchCart,
  modifyCartProductQuantity,
} from '../../../apis/cart'
import LoadError from '../../components/LoadError/LoadError'

const Cart = () => {
  const setCart = useCartStore((state) => state.setCart)
  const queryClient = useQueryClient()

  const { data, status } = useQuery('fetchCart', fetchCart, {
    onSuccess: (data) => {
      setCart(data)
    },
  })

  const navigate = useNavigate()
  function goTo(link: string) {
    navigate(link)
  }

  const modifyQuantityMutation = useMutation<
    CartClient[],
    Error,
    { productId: number; quantity: number }
  >(
    ({ productId, quantity }) => modifyCartProductQuantity(productId, quantity),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries('fetchCart')
      },
    },
  )

  const deleteProductMutation = useMutation(
    (productId: number) => deleteProductFromCart(productId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('fetchCart')
      },
    },
  )

  return (
    <>
      <LoadError status={status} />
      <div className="flex justify-center items-center mt-4">
        <h1 className="text-3xl font-bold tracking-wider">CART</h1>
      </div>

      <div className="flex justify-center items-center min-h-screen mt-4">
        <div className="flex w-4/5">
          <div className="w-3/4 pr-6">
            {data &&
              data.map((item: CartClient) => (
                <div
                  key={item.productId}
                  className="flex items-center justify-between mb-6 border p-4 rounded-md"
                >
                  <div className="flex-shrink-0 w-1/4 pr-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-w-full h-auto"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-gray-600">Price: ${item.price}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => {
                          modifyQuantityMutation.mutate({
                            productId: item.productId,
                            quantity: item.quantity - 1,
                          })
                        }}
                        className="px-2 py-1 bg-gray-300 text-gray-600 rounded-full transition-colors hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-300"
                      >
                        -
                      </button>
                      <p className="px-3">{item.quantity}</p>
                      <button
                        onClick={() => {
                          modifyQuantityMutation.mutate({
                            productId: item.productId,
                            quantity: item.quantity + 1,
                          })
                        }}
                        className="px-2 py-1 bg-gray-300 text-gray-600 rounded-full transition-colors hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-300"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        deleteProductMutation.mutate(item.productId)
                      }
                      className="mt-3 px-3 py-1 text-sm bg-red-500 text-white rounded-md transition-colors hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                    >
                      Remove
                    </button>
                  </div>
                  <p className="font-bold text-right">
                    $ {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
          </div>

          <div className="w-1/5">
            <div className="border border-gray-300 shadow-md bg-gray-100 p-4 rounded-md">
              {data && (
                <p className="text-gray-600">
                  Total: $
                  {data
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0,
                    )
                    .toFixed(2)}
                </p>
              )}
              <p className="text-gray-600">
                <span>Shipping: TBC</span>
              </p>
              <button
                onClick={() => goTo('/Checkout')}
                className="mt-2 px-2 py-1 bg-black text-white rounded-md transition-colors hover:bg-gray-700 focus:outline-none focus:ring focus:ring-black"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
