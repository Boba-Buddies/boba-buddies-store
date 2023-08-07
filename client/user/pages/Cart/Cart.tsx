import { useEffect } from 'react'
import { useCartStore } from '../../../store/cart'
import { CartClient } from '../../../../models/Cart'

const Cart = () => {
  const { cart, loading, error, fetchCart } = useCartStore()
  const userId = 'auth0|abc12345'

  useEffect(() => {
    fetchCart(userId)
  }, [userId, fetchCart])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: error.message</div>

  return (
    <div>
      <h2 className="text-blue-500">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item: CartClient) => (
          <div
            key={item.productId}
            className="flex items-center mb-6 border p-4"
          >
            <div className="flex-shrink-0 w-1/4 pr-4">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold">{item.name}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Cart
