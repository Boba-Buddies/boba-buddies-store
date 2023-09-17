import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from 'react-query'
import { fetchAllOrders, fetchOrderById } from '../../../apis/purchases'
import { Order, Orders } from '../../../../models/Purchases'
import OrderSortingControls from './OrderSortingControls'
import LoadError from '../../../user/components/LoadError/LoadError'
import OrderPopup from './OrderPopup'
import OrderTable from './OrderTable'

export const AllOrders = () => {
  const { getAccessTokenSilently } = useAuth0()
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [search, setSearch] = useState<string>('')
  const [sort, setSort] = useState<string>('newest')
  const [oldestFirst, setOldestFirst] = useState<boolean>(false)

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

  // Check if orders is undefined before filtering and sorting
  if (orders === undefined) {
    return <div>Loading...</div>
  }

  // Filter and sort orders based on search and sort criteria
  const filteredAndSortedOrders = orders
    .filter((order: Orders) =>
      order.orderId.toString().includes(search.toLowerCase()),
    )
    .sort((a: Orders, b: Orders) => {
      const dateA = new Date(a.purchasedAt)
      const dateB = new Date(b.purchasedAt)

      if (sort === 'newest') {
        return dateB.getTime() - dateA.getTime()
      } else if (sort === 'oldest') {
        return dateA.getTime() - dateB.getTime()
      }
      return 0
    })

  return (
    <>
      <OrderSortingControls
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
        oldestFirst={oldestFirst}
        setOldestFirst={setOldestFirst}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
      <LoadError status={ordersStatus} />
      <OrderTable
        orders={filteredAndSortedOrders}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        handleOrderCellClick={handleOrderCellClick}
        formatCurrency={formatCurrency}
        totalPages={0}
      />
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

export default AllOrders
