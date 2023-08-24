import * as z from 'zod'

export const userOrdersSchema = z.object({
  orderId: z.number(),
  purchasedAt: z.string(),
  totalAmount: z.number(),
})

export const ordersSchema = z
  .object({
    userName: z.string(),
    orderId: z.number(),
    totalSale: z.number(),
    purchasedAt: z.string(),
  })
  .array()

export const orderSchema = z.object({
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
      productImage: z.string(),
      itemQuantity: z.number(),
    })
    .array(),
})

export const transferedCartSchema = z
  .object({
    productId: z.number(),
    quantity: z.number(),
    shippingId: z.number(),
  })
  .array()

export type UserOrders = z.infer<typeof userOrdersSchema>
export type Orders = z.infer<typeof ordersSchema>
export type Order = z.infer<typeof orderSchema>
export type TransferedCart = z.infer<typeof transferedCartSchema>
