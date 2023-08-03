import request from 'superagent'
import { CartClient } from '../../models/Cart'

const baseUrl = '/api/v1/cart'

export async function fetchCartByUserId(userId: string) {
  const response = await request.get(`${baseUrl}?userId=${userId}`)
  return response.body.cart as CartClient
}