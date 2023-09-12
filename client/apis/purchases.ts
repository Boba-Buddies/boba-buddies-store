import request from 'superagent'
const baseUrl = '/api/v1/purchases'

export async function moveCartToPurchases(shippingId: number, token: string) {
  try {
    await request
      .post(baseUrl)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send({ shippingId })
  } catch (error) {
    console.error('Error creating new Purchase:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

export async function fetchLatestOrderId(token: string) {
  try {
    const res = await request
      .get(baseUrl + '/latest-order')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
    return res.body
  } catch (error) {
    console.error(
      'Error fetching latest purchase order:',
      (error as Error).message,
    )
    throw { error: (error as Error).message }
  }
}

// fetches orders by user id
export async function fetchUserOrders(token: string) {
  try {
    const response = await request
      .get(`${baseUrl}/user-orders`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
    return response.body.orders
  } catch (error) {
    console.error('Error fetching user orders:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

// fetches all orders
export async function fetchAllOrders(token: string) {
  try {
    const response = await request
      .get(`${baseUrl}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
    return response.body.orders
  } catch (error) {
    console.error('Error fetching user orders:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

export async function fetchOrderById(orderId: number, token: string) {
  try {
    const response = await request
      .get(`${baseUrl}/order/${orderId}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')

    if (response.status === 200) {
      return response.body.order
    } else {
      console.error('Error fetching order by ID:', response.text)
      throw { error: response.text }
    }
  } catch (error) {
    console.error('Error fetching user orders:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}
