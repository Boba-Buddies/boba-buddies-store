import * as z from 'zod'

export const individualCartSchema = z.object({
  image: z.string(),
  name: z.string(),
  quantity: z.number(),
  price: z.number(),
  totalPrice: z.number(),
})

export const cartSchema = individualCartSchema.array()

export const cartClientSchema = individualCartSchema
  .extend({
    auth0Id: z.string(),
  })
  .array()

export const cartItemSchema = z.object({
  userId: z.string(),
  productId: z.number(),
  quantity: z.number(),
})

export const cartTransferInfoSchema = z.object({
  userId: z.string(),
  shippingId: z.number(),
})

export type Cart = z.infer<typeof cartSchema>
export type CartItem = z.infer<typeof cartItemSchema>
export type CartTransferInfo = z.infer<typeof cartTransferInfoSchema>
export type CartClientSchema = z.infer<typeof cartClientSchema>
