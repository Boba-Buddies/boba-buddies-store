import { useEffect } from 'react'
import { useCartStore } from '../../../store/cart'
import { CartClient } from '../../../../models/Cart'

const Cart = () => {
  const { cart, loading, error, fetchCart, deleteProductFromCart } =
    useCartStore()
  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: error.message</div>

  const handleDeleteProductFromCart = async (productId: number) => {
    try {
      await deleteProductFromCart(productId)
      fetchCart()
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const handleUpdateQuantityFromCart = async (
    productId: number,
    quantity: number,
  ) => {}

  return (
    <div>
      <h2 className="text-blue-500">Your Cart</h2>
      {cart?.map((item: CartClient) => (
        <div key={item.productId} className="flex items-center mb-6 border p-4">
          <div className="flex-shrink-0 w-1/4 pr-4">
            <img src={item.image} alt={item.name} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold">{item.name}</h3>
            <p>Price: ${item.price}</p>
            <div className="flex items-center mt-2">
              <button
                onClick={() =>
                  handleUpdateQuantityFromCart(
                    item.productId,
                    item.quantity - 1,
                  )
                }
                className="px-2 py-1 bg-gray-300 text-gray-600 rounded-full transition-colors hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-300"
              >
                -
              </button>
              <p className="px-3">{item.quantity}</p>
              <button
                onClick={() =>
                  handleUpdateQuantityFromCart(
                    item.productId,
                    item.quantity + 1,
                  )
                }
                className="px-2 py-1 bg-gray-300 text-gray-600 rounded-full transition-colors hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-300"
              >
                +
              </button>
            </div>
            <button
              onClick={() => handleDeleteProductFromCart(item.productId)}
              className="mt-3 px-3 py-1 text-sm bg-red-500 text-white rounded-md transition-colors hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Cart
