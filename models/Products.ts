import * as z from 'zod'

export const productsSchema = z.object({
  id: z.number(),
  name: z.string(),
  img: z.string(),
  price: z.number(),
  description: z.string(),
  stock: z.number(),
  is_enabled: z.boolean(),
  average_rating: z.number(),
})

export type Products = z.infer<typeof productsSchema>
