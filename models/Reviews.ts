import * as z from 'zod'

export const productReviewSchema = z
  .object({
    productId: z.number(),
    userName: z.string(),
    rating: z.number(),
    createdAt: z.string(),
    description: z.string(),
  })

  export const userReviewSchema = z
  .object({
    productId: z.number(),
    productName : z.string(),
    productImage : z.string(),
    reviewDescription: z.string(),
    reviewerUserName: z.string(),
    reviewRating: z.number(),
    reviewCreatedAt: z.string(),

  })

export const reviewsSchema = z
  .object({
    id: z.number(),
    productName: z.string(),
    rating: z.number(),
    isEnabled: z.boolean(),
    userName: z.string(),
    createdAt: z.string(),
  })

export const reviewSchema = z.object({
  reviewId: z.number(),
  productName: z.string(),
  productImage: z.string(),
  reviewDescription: z.string(),
  reviewRating: z.number(),
  reviewIsEnabled: z.boolean(),
  reviewerUserName: z.string(),
  reviewCreatedAt: z.string(),
})

export const newReviewSchema = z.object({
  productId: z.number(),
  description: z.string(),
  rating: z.number(),
})

export const updatedReviewStatusSchema = z.object({
  id: z.number(),
  isEnabled: z.boolean(),
})

export type ProductReview = z.infer<typeof productReviewSchema>
export type Reviews = z.infer<typeof reviewsSchema>
export type Review = z.infer<typeof reviewSchema>
export type NewReview = z.infer<typeof newReviewSchema>
export type UpdatedReviewStatus = z.infer<typeof updatedReviewStatusSchema>
export type UserReview = z.infer<typeof userReviewSchema>
