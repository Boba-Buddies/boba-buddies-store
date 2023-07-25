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

export type UserOrders = z.infer<typeof UserOrdersSchema>
