import * as z from 'zod'
export const shippingOptionsSchema = z.object({
  id: z.number(),
  shippingType: z.string(),
  price: z.number(),
})

export type ShippingOptions = z.infer<typeof shippingOptionsSchema>
