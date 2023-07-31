import * as z from 'zod'

export const productReviewsSchema = z
  .object({
    productId: z.number(),
    userName: z.string(),
    rating: z.number(),
    createdAt: z.string(),
    description: z.string(),
  })
  .array()

export const reviewsSchema = z
  .object({
    id: z.number(),
    productName: z.string(),
    rating: z.number(),
    isEnabled: z.boolean(),
    userName: z.string(),
    createdAt: z.string(),
  })
  .array()

export const reviewSchema = z.object({
  reviewId: z.number(),
  productName: z.string(),
  productImg: z.string(),
  reviewDescription: z.string(),
  reviewRating: z.number(),
  reviewIsEnabled: z.boolean(),
  reviewerUserName: z.string(),
  reviewCreatedAt: z.string(),
})

export const newReviewSchema = z.object({
  userId : z.string(),
  productId: z.number(),
  description: z.string(),
  rating: z.number(),
})

export type ProductReviews = z.infer<typeof productReviewsSchema>
export type Reviews = z.infer<typeof reviewsSchema>
export type Review = z.infer<typeof reviewSchema>
export type NewReview = z.infer<typeof newReviewSchema>
