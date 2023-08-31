import request from 'superagent'
import { NewReview, UpdatedReviewStatus } from '../../models/Reviews'

const baseUrl = '/api/v1/reviews'

export async function fetchReviewsByProductId(
  productId: number,
  token: string,
) {
  try {
    const response = await request
      .get(`${baseUrl}/by-product-id/${productId}`)
      .set('Authorization', `Bearer ${token}`)
    return response.body
  } catch (error) {
    console.error(
      'Error fetching reviews by product ID:',
      (error as Error).message,
    )
    throw { error: (error as Error).message }
  }
}

export async function fetchUserReviews(token: string) {
  try {
    const response = await request
      .get(`${baseUrl}/user`)
      .set('Authorization', `Bearer ${token}`)
    return response.body
  } catch (error) {
    console.error('Error fetching reviews of user:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

//!ADMIN ONLY FUNCTION
export async function fetchAmountOfReviewsByDate(date: string, token: string) {
  try {
    const response = await request
      .get(`${baseUrl}/amount-by-date/${date}`)
      .set('Authorization', `Bearer ${token}`)
    return response.body
  } catch (error) {
    console.error(
      'Error fetching amount of reviews by date:',
      (error as Error).message,
    )
    throw { error: (error as Error).message }
  }
}

//!ADMIN ONLY FUNCTION
export async function fetchAllReviews(token: string) {
  try {
    const response = await request
      .get(`${baseUrl}/all`)
      .set('Authorization', `Bearer ${token}`)
    return response.body
  } catch (error) {
    console.error('Error fetching all reviews:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

//!ADMIN ONLY FUNCTION
export async function fetchReviewById(id: number, token: string) {
  try {
    const response = await request
      .get(`${baseUrl}/by-review-id/${id}`)
      .set('Authorization', `Bearer ${token}`)
    return response.body
  } catch (error) {
    console.error('Error fetching review by ID:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

export async function addReview(newReview: NewReview, token: string) {
  try {
    const response = await request
      .post(`${baseUrl}/add`)
      .send(newReview)
      .set('Authorization', `Bearer ${token}`)
    return response.body
  } catch (error) {
    console.error('Error creating review:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

//!ADMIN ONLY FUNCTION
export async function modifyReviewStatusById(
  updatedReviewStatus: UpdatedReviewStatus,
  token: string,
) {
  try {
    const response = await request
      .patch(`${baseUrl}/update-status`)
      .send(updatedReviewStatus)
      .set('Authorization', `Bearer ${token}`)
    return response.body
  } catch (error) {
    console.error('Error modifying review status:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

export async function deleteReviewByProductId(
  productId: number,
  token: string,
) {
  try {
    const response = await request
      .delete(`${baseUrl}/remove/${productId}`)
      .set('Authorization', `Bearer ${token}`)
    return response.body
  } catch (error) {
    console.error('Error deleting review:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}
