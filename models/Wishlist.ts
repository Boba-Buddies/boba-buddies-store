import * as z from 'zod'

export const wishlisthProductSchema = z
  .object({
    id: z.number(),
    productId: z.number(),
    productName: z.string(),
    productImage: z.string(),
    productPrice: z.number(),
  })
  .array()

export type WishlisthProduct = z.infer<typeof wishlisthProductSchema>
