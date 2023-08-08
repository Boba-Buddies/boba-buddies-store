import request from 'superagent'
import { CartClient } from '../../models/Cart'

const baseUrl = '/api/v1/cart'

export async function fetchCart() {
  const response = await request.get(`${baseUrl}`)
  return response.body.cart as CartClient[]
}

// cart.ts
export async function deleteProductFromCartApi(productId: number) {
  try {
    console.log('Deleting product with ID:', productId)
    const response = await request
      .delete(`${baseUrl}/${productId}`)
      .set('Content-Type', 'application/json')

    console.log('Product deletion response:', response.body)
    return response.body.cart as CartClient[]
  } catch (error) {
    console.error('Error deleting product:', error)
    throw new Error('Failed to delete product')
  }
}
