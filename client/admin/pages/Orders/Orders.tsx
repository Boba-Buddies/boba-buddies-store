import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from 'react-query'
import { fetchAllOrders, fetchOrderById } from '../../../apis/purchases'
import { Order } from '../../../../models/Purchases'
import LoadError from '../../../user/components/LoadError/LoadError'
import OrderPopup from './OrderPopup'
import OrderTable from './OrderTable'

export const Orders = () => {
  const { getAccessTokenSilently } = useAuth0()
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 10

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

  const totalPages = Math.ceil((orders?.length || 0) / itemsPerPage)

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <>
      <LoadError status={ordersStatus} />
      {orders && (
        <>
          <OrderTable
            orders={orders}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            handleOrderCellClick={handleOrderCellClick}
            formatCurrency={formatCurrency}
          />
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

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          {' < '}
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          {' > '}
        </button>
      </div>
    </>
  )
}

export default Orders
