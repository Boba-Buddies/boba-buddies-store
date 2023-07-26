import * as z from 'zod'

export const productsSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    img: z.string(),
    price: z.number(),
    description: z.string(),
    stock: z.number(),
    isEnabled: z.boolean(),
    averageRating: z.number(),
  })
  .array()

export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  img: z.string(),
  price: z.number(),
  description: z.string(),
  stock: z.number(),
  averageRating: z.number(),
})

export const lowStockProductsSchema = z.object({
  id: z.number(),
  name: z.string(),
  img: z.string(),
})

export const upsertProductSchema = z.object({
  name: z.string(),
  img: z.string(),
  price: z.number(),
  description: z.string(),
  stock: z.number(),
  isEnabled: z.boolean(),
})

export type Products = z.infer<typeof productsSchema>
export type Product = z.infer<typeof productSchema>
export type LowStockProducts = z.infer<typeof lowStockProductsSchema>
export type UpsertProduct = z.infer<typeof upsertProductSchema>
