import request from 'superagent'
import { WishlistProduct } from '../../models/Wishlist'

const baseUrl = '/api/v1/wishlist'

export async function fetchWishlist(token: string) {
  try {
    const response = await request
      .get(`${baseUrl}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
    return response.body as WishlistProduct[]
  } catch (error) {
    console.error(
      'Error fetching wishlist by user ID:',
      (error as Error).message,
    )
    throw { error: (error as Error).message }
  }
}

export async function fetchWishlistStatusByProductId(
  productId: number,
  token: string,
) {
  try {
    const response = await request
      .get(`${baseUrl}/status/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
    return response.body.status
  } catch (error) {
    console.error(
      'Error fetching wishlist status by product ID:',
      (error as Error).message,
    )
    return { error: (error as Error).message }
  }
}

export async function addToWishlistByProductId(
  productId: number,
  token: string,
) {
  try {
    const response = await request
      .post(`${baseUrl}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send({ productId: productId })
    return response.body
  } catch (error) {
    console.error('Error adding to wishlist:', (error as Error).message)
    return { error: (error as Error).message }
  }
}

export async function deleteFromWishlistByProductId(
  productId: number,
  token: string,
) {
  try {
    const response = await request
      .delete(`${baseUrl}/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
    return response.body
  } catch (error) {
    console.error('Error removing from wishlist:', (error as Error).message)
    return { error: (error as Error).message }
  }
}
