import request from 'superagent'
const baseUrl = '/api/v1/shipping-options'

export async function fetchAllShippingOptions() {
  try {
    const response = await request.get(baseUrl)
    return response.body.shippingOptions
  } catch (error) {
    console.error('Error fetching all products:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}
