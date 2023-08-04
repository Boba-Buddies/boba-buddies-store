import React, { useEffect } from 'react'
import { useCartStore } from '../../../store/cart'

const Cart = () => {
  const { cart, loading, error, fetchCart } = useCartStore()
  const userId = 'auth0|abc12345'

  useEffect(() => {
    fetchCart(userId)
  }, [userId, fetchCart])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  console.log(cart)
  return (
    <div>
      <h2>Your Cart</h2>
      {cart.map((item: any) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
    </div>
  )
}

export default Cart
