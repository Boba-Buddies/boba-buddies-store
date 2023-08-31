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

export async function fetchCart(token: string) {
  try {
    const response = await request
      .get(`${baseUrl}/cart`)
      .set('Authorization', `Bearer ${token}`)

    const cartData = response.body as CartClient[]
    return cartData
  } catch (error) {
    console.error('An error occurred:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

export async function deleteProductFromCart(productId: number, token: string) {
  try {
    const response = await request
      .delete(`${baseUrl}/cart/${productId}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    const cartData = response.body as CartClient[]
    return cartData
  } catch (error) {
    console.error('An error occurred:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

export async function modifyCartProductQuantity(
  productId: number,
  quantity: number,
  token: string,
) {
  try {
    const response = await request
      .patch(`${baseUrl}/update-quantity`)
      .send({ productId, quantity })
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    const cartData = response.body as CartClient[]
    return cartData
  } catch (error) {
    console.error('An error occurred:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}
