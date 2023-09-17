import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'
import { useQuery } from 'react-query'

import { fetchAllOrders, fetchOrderById } from '../../../apis/purchases'
import { Order, Orders } from '../../../../models/Purchases'
import LoadError from '../../../user/components/LoadError/LoadError'
import OrderPopup from './OrderPopup'

export const AllOrders = () => {
  const { getAccessTokenSilently } = useAuth0()
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 10

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

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

  const handleOrderCellClick = async (orderId: number) => {
    try {
      const token = await getAccessTokenSilently()
      const order = await fetchOrderById(orderId, token)
      setSelectedOrder(order)
    } catch (error) {
      console.error('Error fetching order details:', error)
    }
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
              {orders.slice(startIndex, endIndex).map((order: Orders) => (
                <div
                  key={order.orderId}
                  className="divRow border-b border-gray-200 hover:bg-gray-100"
                  onClick={() => handleOrderCellClick(order.orderId)}
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
                    {formatCurrency(order.totalSale + order.shippingPrice)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {selectedOrder && (
        <div className="order-details-popup">
          <button onClick={() => setSelectedOrder(null)}>Close</button>
          <OrderPopup
            orderId={selectedOrder.orderId}
            order={selectedOrder}
            closeOrderPopup={() => setSelectedOrder(null)}
          />
        </div>
      )}
    </>
  )
}
