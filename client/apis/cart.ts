import request from 'superagent'
import { CartClient, RemovedProduct } from '../../models/Cart'

const baseUrl = '/api/v1/cart'

export async function fetchCart() {
  const response = await request.get(`${baseUrl}`)
  return response.body.cart as CartClient[]
}

export async function removeProduct(removedProduct: RemovedProduct) {
  const response = await request
    .delete(`${baseUrl}/single`)
    .send(removedProduct)
    .set('Content-Type', 'application/json')

  return response.body.cart as CartClient[]
}
