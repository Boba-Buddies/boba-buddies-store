import * as z from 'zod'

export const cartSchema = z
  .object({
    image: z.string(),
    name: z.string(),
    quantity: z.number(),
    price: z.number(),
    totalPrice: z.number(),
  })
  .array()

export const cartItemSchema = z.object({
  userId: z.string(),
  productId: z.number(),
  quantity: z.number(),
})

export type Cart = z.infer<typeof cartSchema>
export type CartItem = z.infer<typeof cartItemSchema>
