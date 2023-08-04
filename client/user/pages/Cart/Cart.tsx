import React from 'react'
import { useQuery } from 'react-query'
import { fetchCartByUserId } from '../../../apis/cart'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'


const Cart = () => {
  const userId = 'auth0|abc12345'
  const { data, refetch } = useQuery(['getCart'], async () => {
    return await fetchCartByUserId(userId)
  })

  console.log(data)
  return <div>Cart</div>
}

export default Cart
