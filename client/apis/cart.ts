import request from 'superagent'
import { CartClient } from '../../models/Cart'

const baseUrl = '/api/v1/cart'

export async function addProductToCart(productId: number, quantity = 1) {
  try {
    const response = await request
      .post(`${baseUrl}/add-item`)
      .send({ productId, quantity })

    if (response.status === 200) {
      console.log('Product added to the cart successfully.')
    } else {
      console.error('Failed to add the product to the cart.')
    }
  } catch (error) {
    console.error('An error occurred:', (error as Error).message)
    return { error: (error as Error).message }
  }
}

export async function fetchCart() {
  const response = await request.get(`${baseUrl}`)
  return response.body.cart as CartClient[]
}

export async function deleteProductFromCart(productId: number) {
  const response = await request
    .delete(`${baseUrl}/${productId}`)
    .set('Content-Type', 'application/json')

  return response.body.cart as CartClient[]
}

export async function modifyCartProductQuantity(
  productId: number,
  quantity: number,
) {
  await request
    .patch(`${baseUrl}/update-quantity`)
    .send({ productId, quantity })
}
