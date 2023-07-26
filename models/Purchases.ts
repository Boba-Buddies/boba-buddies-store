import * as z from 'zod'

export const UserOrdersSchema = z
  .object({
    orderId: z.number(),
    purchasedAt: z.string(),
    totalAmount: z.number(),
  })
  .array()

export const OrdersSchema = z
  .object({
    userName: z.string(),
    orderId: z.number(),
    totalSale: z.number(),
    purchasedAt: z.string(),
  })
  .array()

export const OrderSchema = z.object({
  orderId: z.number(),
  userFirstName: z.string(),
  userLastName: z.string(),
  userAddress: z.string(),
  userCity: z.string(),
  userCountry: z.string(),
  userZipCode: z.string(),
  userEmail: z.string(),
  userPhoneNumber: z.string(),
  totalSale: z.number(),
  amountOfItems: z.number(),
  orderDate: z.string(),
  shippingType: z.string(),
  shippingPrice: z.number(),
  orderItems: z
    .object({
      productName: z.string(),
      productSale: z.number(),
      productImg: z.string(),
      itemQuantity: z.number(),
    })
    .array(),
})

export const TransferedCartSchema = z
  .object({
    productId: z.number(),
    quantity: z.number(),
    shippingId: z.number(),
  })
  .array()

export type UserOrders = z.infer<typeof UserOrdersSchema>
export type Orders = z.infer<typeof OrdersSchema>
export type Order = z.infer<typeof OrderSchema>
export type TransferedCart = z.infer<typeof TransferedCartSchema>
