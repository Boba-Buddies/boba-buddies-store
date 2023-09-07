import { useAuth0 } from '@auth0/auth0-react'
import { useQuery, useQueryClient } from 'react-query'

import { fetchAllOrders } from '../../../apis/purchases'
import { Orders } from '../../../../models/Purchases'
import LoadError from '../../../user/components/LoadError/LoadError'

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
  return (
    <>
      <LoadError status={ordersStatus} />
      {orders && (
        <>
          <h1>Order History</h1>
          <div className="space-y-4">
            {orders.map((order: Orders) => (
              <div
                key={order.orderId}
                className="p-4 border border-gray-400 rounded-md mb-4"
              >
                <div className="flex justify-between">
                  <p className="text-lg font-semibold"># {order.orderId}</p>
                  <p className="text-gray-500">{order.userName}</p>
                  <p className="text-gray-500">{order.purchasedAt}</p>
                </div>
                <div className="text-gray-600 mt-2">
                  Total: {formatCurrency(order.totalSale)}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  )
}
