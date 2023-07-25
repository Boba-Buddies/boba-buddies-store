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








export type ProductReviews = z.infer<typeof ProductReviewsSchema>