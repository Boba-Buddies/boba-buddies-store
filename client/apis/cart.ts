import request from 'superagent'
import { CartClient } from '../../models/Cart'

const baseUrl = '/api/v1/cart'

export async function fetchCart() {
  const response = await request.get(`${baseUrl}`)
  return response.body.cart as CartClient[]
}

export async function deleteProductFromCartApi(productId: number) {
  const response = await request
    .delete(`${baseUrl}/${productId}`)
    .set('Content-Type', 'application/json')

  return response.body.cart as CartClient[]
}

export async function modifyCartItemQuantity(
  productId: number,
  quantity: number,
) {
  const response = await request
    .patch('/api/update-quantity')
    .send({ productId, quantity })

  return response.body.cart as CartClient[]
}
