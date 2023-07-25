import * as z from 'zod'

//UserOrdersSchema
//OrdersSchema
//OrderSchema
//TransferedCartSchema

export const UserOrdersSchema = z.object({
  orderId: z.number(),
  purchasedAt: z.string(),
  totalAmount: z.string(),
})

export const OrdersSchema = z.object({
  userName: z.string(),
  orderId: z.number(),
  totalSale: z.number(),
  purchasedAt: z.string(),
})

export type UserOrders = z.infer<typeof UserOrdersSchema>
export type Orders = z.infer<typeof OrdersSchema>
