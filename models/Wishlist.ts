import * as z from 'zod'

export const wishlistProductSchema = z
  .object({
    id: z.number(),
    productId: z.number(),
    productName: z.string(),
    productImage: z.string(),
    productPrice: z.number(),
  })
  .array()

export type WishlisthProduct = z.infer<typeof wishlistProductSchema>
