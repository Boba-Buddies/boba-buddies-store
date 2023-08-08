import request from 'superagent'
import { CartClient } from '../../models/Cart'

const baseUrl = '/api/v1/cart'

export async function fetchCart() {
  const response = await request.get(`${baseUrl}`)
  return response.body.cart as CartClient[]
}

export async function deleteProduct(productId: number) {
  const response = await request
    .delete(`${baseUrl}/single`)
    .send({ productId })
    .set('Content-Type', 'application/json')

  return response.body.cart as CartClient[]
}
