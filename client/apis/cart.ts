import request from 'superagent'
import { CartClient } from '../../models/Cart'

const baseUrl = '/api/v1/cart'

export async function fetchCart() {
  const response = await request.get(`${baseUrl}`)
  return response.body.cart as CartClient[]
}
