import * as z from 'zod'

//ProductReviewsSchema
//ReviewsSchema
//ReviewSchema
//NewReviewSchema

export const ProductReviewsSchema = z.object({
  productId: z.number(),
  userName: z.string(),
  rating: z.number(),
  createdAt: z.string(),
  description: z.string(),
})

export const ReviewsSchema = z.object({
  id: z.number(),
  productName: z.string(),
  rating: z.number(),
  isEnabled: z.boolean(),
  userName: z.string(),
  createdAt: z.string(),
})

export const ReviewSchema = z.object({
  reviewId: z.number(),
  productName: z.string(),
  productImg: z.string(),
  reviewDescription: z.string(),
  reviewRating: z.number(),
  reviewIsEnabled: z.boolean(),
  reviewerUserName: z.string(),
  reviewCreatedAt: z.string(),
})

export type ProductReviews = z.infer<typeof ProductReviewsSchema>
export type Reviews = z.infer<typeof ReviewsSchema>
export type Review = z.infer<typeof ReviewSchema>
