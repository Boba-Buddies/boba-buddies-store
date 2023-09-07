import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from 'react-query'

import { fetchAllOrders } from '../../../apis/purchases'
import { Orders } from '../../../../models/Purchases'
import LoadError from '../../../user/components/LoadError/LoadError'
import { Link } from 'react-router-dom'

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
          <div className="divTable bg-white mt-4 border border-gray-300">
            <div className="divRow bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <div className="divCell py-3 px-8">Order ID</div>
              <div className="divCell py-3 px-8">User Name</div>
              <div className="divCell py-3 px-8">Purchase Date</div>
              <div className="divCell py-3 px-8">Total Sale</div>
            </div>

            <div className="divBody text-gray-600 text-sm font-light">
              {orders.map((order: Orders) => (
                <Link
                  key={order.orderId}
                  to={`/admin/orders/${order.orderId}`}
                  className="divRow border-b border-gray-200 hover:bg-gray-100"
                >
                  <div className="divCell py-3 px-8 text-left whitespace-nowrap">
                    {order.orderId}
                  </div>
                  <div className="divCell py-3 px-8 text-left">
                    {order.userName}
                  </div>
                  <div className="divCell py-3 px-8 text-left">
                    {order.purchasedAt}
                  </div>
                  <div className="divCell py-3 px-8 text-left">
                    {formatCurrency(order.totalSale)}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}
