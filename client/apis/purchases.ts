import request from 'superagent'
const baseUrl = '/api/v1/purchases'

export async function moveCartToPurchases(shippingId: number) {
  try {
    await request.post(baseUrl).send({ shippingId })
  } catch (error) {
    console.error('Error creating product:', (error as Error).message)
    return { error: (error as Error).message }
  }
}
