import request from 'superagent'
const baseUrl = '/api/v1/purchases'

export async function moveCartToPurchases(shippingId: number) {
  try {
    await request.post(baseUrl).send({ shippingId })
  } catch (error) {
    console.error('Error creating new Purchase:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

export async function fetchLatestOrderId() {
  try {
    const res = await request.get(baseUrl + '/latest-order')
    console.log('client- api:', res.body)
    return res.body
  } catch (error) {
    console.error('Error fetching latest purchase order:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}