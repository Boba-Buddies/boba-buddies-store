import request from 'superagent'
import { NewReview, UpdatedReviewStatus } from '../../models/Reviews'

const baseUrl = '/api/v1/reviews'

export async function fetchReviewsByProductId(productId: number) {
  try {
    const response = await request.get(`${baseUrl}/by-product-id/${productId}`)
    return response.body
  } catch (error) {
    console.error(
      'Error fetching reviews by product ID:',
      (error as Error).message,
    )
    return { error: (error as Error).message }
  }
}

//!ADMIN ONLY FUNCTION
export async function fetchAmountOfReviewsByDate(date: string) {
  try {
    const response = await request.get(`${baseUrl}/amount-by-date/${date}`)
    return response.body
  } catch (error) {
    console.error(
      'Error fetching amount of reviews by date:',
      (error as Error).message,
    )
    return { error: (error as Error).message }
  }
}

//!ADMIN ONLY FUNCTION
export async function fetchAllReviews() {
  try {
    const response = await request.get(`${baseUrl}/all`)
    return response.body
  } catch (error) {
    console.error('Error fetching all reviews:', (error as Error).message)
    return { error: (error as Error).message }
  }
}

//!ADMIN ONLY FUNCTION
export async function fetchReviewById(id: number) {
  try {
    const response = await request.get(`${baseUrl}/by-review-id/${id}`)
    return response.body
  } catch (error) {
    console.error('Error fetching review by ID:', (error as Error).message)
    return { error: (error as Error).message }
  }
}

export async function addReview(newReview: NewReview) {
  try {
    const response = await request.post(`${baseUrl}/add`).send(newReview)
    return response.body
  } catch (error) {
    console.error('Error creating review:', (error as Error).message)
    return { error: (error as Error).message }
  }
}

//!ADMIN ONLY FUNCTION
export async function modifyReviewStatusById(
  updatedReviewStatus: UpdatedReviewStatus,
) {
  try {
    const response = await request
      .patch(`${baseUrl}/update-status`)
      .send(updatedReviewStatus)
    return response.body
  } catch (error) {
    console.error('Error modifying review status:', (error as Error).message)
    return { error: (error as Error).message }
  }
}

export async function deleteReviewByProductId(productId: number) {
  try {
    const response = await request.delete(`${baseUrl}/remove/${productId}`)
    return response.body
  } catch (error) {
    console.error('Error deleting review:', (error as Error).message)
    return { error: (error as Error).message }
  }
}
