import * as z from 'zod'

export const cartSchema = z.object({
  image: z.string(),
  name: z.string(),
  quantity: z.number(),
  price: z.number(),
  totalPrice: z.number(),
  productId: z.number(),
})

export const cartClientSchema = cartSchema.extend({
  auth0Id: z.string(),
})

export const cartItemSchema = z.object({
  userId: z.string(),
  productId: z.number(),
  quantity: z.number(),
})

export const cartTransferInfoSchema = z.object({
  userId: z.string(),
  shippingId: z.number(),
})

export const removedProductSchema = z.object({
  userId: z.string(),
  productId: z.number(),
})

export type Cart = z.infer<typeof cartSchema>
export type CartItem = z.infer<typeof cartItemSchema>
export type CartTransferInfo = z.infer<typeof cartTransferInfoSchema>
export type CartClient = z.infer<typeof cartClientSchema>
export type RemovedProduct = z.infer<typeof removedProductSchema>
