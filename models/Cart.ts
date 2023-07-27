import * as z from 'zod'

export const CartSchema = z
  .object({
    image: z.string(),
    name: z.string(),
    quantity: z.number(),
    price: z.number(),
    totalPrice: z.number(),
  })
  .array()

export const CartItemSchema = z.object({
  id: z.number(),
  userId: z.string(),
  productId: z.number(),
  quantity: z.number(),
})

export type Cart = z.infer<typeof CartSchema>
export type CartItem = z.infer<typeof CartItemSchema>
