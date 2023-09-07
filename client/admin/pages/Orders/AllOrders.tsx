import { useAuth0 } from '@auth0/auth0-react'
import { useQuery, useQueryClient } from 'react-query'

import { fetchAllOrders } from '../../../apis/purchases'
import { Orders } from '../../../../models/Purchases'

export const AllOrders = () => {
  const { getAccessTokenSilently } = useAuth0()

  const { data: orders, status: ordersStatus } = useQuery(
    'fetchAllOrders',
    async () => {
      const token = await getAccessTokenSilently()
      return await fetchAllOrders(token)
    },
  )

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount)
  }

  console.log(orders)
  return (
    <>
      <h1>Order History</h1>
      <div className="space-y-4">
        {ordersStatus === 'loading' ? (
          <p>Loading orders...</p>
        ) : ordersStatus === 'error' ? (
          <p className="text-red-600">Error loading orders</p>
        ) : orders && orders.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {orders.map((order: Orders) => (
              <li
                key={order.orderId}
                className="p-4 border border-gray-400 rounded-md mb-4"
              >
                <div className="flex justify-between">
                  <div className="text-lg font-semibold"># {order.orderId}</div>
                  <div className="text-gray-500">{order.purchasedAt}</div>
                </div>
                <div className="text-gray-600 mt-2">
                  Total: {formatCurrency(order.totalSale)}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No orders available.</p>
        )}
      </div>
    </>
  )
}
