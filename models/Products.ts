import * as z from 'zod'

export const clientProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  price: z.number(),
  description: z.string(),
  stock: z.number(),
  averageRating: z.number(),
})

export const adminProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  price: z.number(),
  description: z.string(),
  stock: z.number(),
  isEnabled: z.boolean(),
  averageRating: z.number(),
})

export const lowStockProductsSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
})

export const upsertProductSchema = z.object({
  name: z.string(),
  image: z.string(),
  price: z.number(),
  description: z.string(),
  stock: z.number(),
  isEnabled: z.boolean(),
})

export type ClientProduct = z.infer<typeof clientProductSchema>
export type AdminProduct = z.infer<typeof adminProductSchema>
export type LowStockProducts = z.infer<typeof lowStockProductsSchema>
export type UpsertProduct = z.infer<typeof upsertProductSchema>
