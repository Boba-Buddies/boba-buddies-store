import request from 'superagent'

const baseUrl = '/api/v1/wishlist'

export async function fetchWishlist() {
  try {
    const response = await request.get(`${baseUrl}`)
    return response.body
  } catch (error) {
    console.error(
      'Error fetching wishlist by user ID:',
      (error as Error).message,
    )
    return { error: (error as Error).message }
  }
}

export async function fetchWishlistStatusByProductId(productId: number) {
  try {
    const response = await request.get(`${baseUrl}/status/${productId}`)
    return response.body.status
  } catch (error) {
    console.error(
      'Error fetching wishlist status by product ID:',
      (error as Error).message,
    )
    return { error: (error as Error).message }
  }
}

export async function addToWishlistByProductId(productId: number) {
  try {
    const response = await request
      .post(`${baseUrl}`)
      .send({ productId: productId })
    return response.body
  } catch (error) {
    console.error('Error adding to wishlist:', (error as Error).message)
    return { error: (error as Error).message }
  }
}

export async function deleteFromWishlistByProductId(productId: number) {
  try {
    const response = await request.delete(`${baseUrl}/${productId}`)
    return response.body
  } catch (error) {
    console.error('Error removing from wishlist:', (error as Error).message)
    return { error: (error as Error).message }
  }
}
