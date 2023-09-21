import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from 'react-query'
import { fetchAmountOfOrdersByDate } from '../../../apis/purchases'
import { fetchUser } from '../../../apis/users'
import { fetchAmountOfUnreadEmailsByToday } from '../../../apis/emails'
import { fetchAmountOfReviewsByDate } from '../../../apis/reviews'
import { fetchAmountOfProductsBelowStockLevel } from '../../../apis/products'
import { AdminProduct } from '../../../../models/Products'
import LoadError from '../../../user/components/LoadError/LoadError'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const { getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()
  function goTo(link: string) {
    navigate(link)
  }
  const formattedDate = new Date().toISOString().split('T')[0]

  const orderAmountQuery = useQuery('fetchAmountOfOrdersByDate', async () => {
    const token = await getAccessTokenSilently()
    return await fetchAmountOfOrdersByDate(formattedDate, token)
  })

  const profileQuery = useQuery('fetchUser', async () => {
    const token = await getAccessTokenSilently()
    return await fetchUser(token)
  })

  const emailQuery = useQuery('fetchAmountOfUnreadEmailsByToday', async () => {
    const token = await getAccessTokenSilently()
    return await fetchAmountOfUnreadEmailsByToday(token)
  })

  const reviewAmountQuery = useQuery('fetchAmountOfReviewsByDate', async () => {
    const token = await getAccessTokenSilently()
    return await fetchAmountOfReviewsByDate(formattedDate, token)
  })

  const lowStockQuery = useQuery(
    'fetchAmountOfProductsBelowStockLevel',
    async () => {
      const token = await getAccessTokenSilently()
      const maxStock = 5
      return await fetchAmountOfProductsBelowStockLevel(maxStock, token)
    },
  )
  const statuses = [
    orderAmountQuery.status,
    profileQuery.status,
    emailQuery.status,
    reviewAmountQuery.status,
    lowStockQuery.status,
  ]

  return (
    <div className="flex flex-col items-center justify-center">
      <LoadError status={statuses} />
      <div className="bg-white text-black w-1/2 rounded-lg shadow-lg mt-4 p-4">
        <div className="text-2xl m-4">Hi, {profileQuery.data?.firstName}!</div>
        {/* Orders */}
        <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center mb-4 min">
          <div>
            <h1 className="text-2xl mb-2">
              You have {orderAmountQuery.data} orders today
            </h1>
          </div>
          <button
            className="bg-black rounded-lg text-white py-2 px-4 hover:bg-gray-800 transition-all"
            onClick={() => goTo('/admin/orders')}
          >
            View Orders
          </button>
        </div>

        {/* Low Stock */}
        <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl mb-2 text-red-500">Low Stock Alert!</h1>
            <div className="flex flex-row justify-center gap-7">
              {lowStockQuery.data?.lowStockProducts.map(
                (product: AdminProduct) => (
                  <div key={product.id}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-28"
                    />
                  </div>
                ),
              )}
            </div>
          </div>
          <button
            className="bg-black rounded-lg text-white py-2 px-4 hover:bg-gray-800 transition-all mt-4"
            onClick={() => goTo('/admin/products-summary')}
          >
            Restock
          </button>
        </div>

        {/* Emails */}
        <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl mb-2">
              You have {emailQuery.data} new emails today
            </h1>
          </div>
          <button
            className="bg-black rounded-lg text-white py-2 px-4 hover:bg-gray-800 transition-all"
            onClick={() => goTo('/admin/inbox')}
          >
            View Emails
          </button>
        </div>

        {/* Reviews */}
        <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center">
          <div>
            <h1 className="text-2xl mb-2">
              You have {reviewAmountQuery.data?.reviewCount} reviews today
            </h1>
          </div>
          <button
            className="bg-black rounded-lg text-white py-2 px-4 hover:bg-gray-800 transition-all"
            onClick={() => goTo('/admin/reviews')}
          >
            View Reviews
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
