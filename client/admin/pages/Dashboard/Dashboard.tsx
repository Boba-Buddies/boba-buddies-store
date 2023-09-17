import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from 'react-query'
import { fetchAmountOfOrdersByDate } from '../../../apis/purchases'
import { fetchUser } from '../../../apis/users'
import { fetchAmountOfUnreadEmailsByToday } from '../../../apis/emails'
import { fetchAmountOfReviewsByDate } from '../../../apis/reviews'
import { fetchAmountOfProductsBelowStockLevel } from '../../../apis/products'
import { AdminProduct } from '../../../../models/Products'

const Dashboard = () => {
  const { getAccessTokenSilently } = useAuth0()

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

  return (
    <div className="bg-white text-black">
      <div className="text-xl p-4">Hi {profileQuery.data?.firstName}</div>
      <div className="flex flex-col gap-10 px-5 ">
        {/* Orders  */}
        <div className="bg-gray-100 p-4 rounded">
          <h1 className="text-2xl text-center">
            You have {orderAmountQuery.data} orders today
          </h1>
          <div className="flex flex-row justify-end pr-4">
            <button className="bg-black rounded-lg text-white p-2 hover:bg-gray-800 transition-all w-32">
              View Orders
            </button>
          </div>
        </div>
        {/* Low Stock */}
        <div className="bg-gray-100 p-4 rounded">
          <h1 className="text-2xl text-center">Low Stock Alert!</h1>
          <div className="flex flex-row justify-center gap-7">
            {lowStockQuery.data?.lowStockProducts.map(
              (product: AdminProduct) => {
                return (
                  <div key={product.id}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-28"
                    />
                  </div>
                )
              },
            )}
          </div>
          <div className="flex flex-row justify-end pr-4">
            <button className="bg-black rounded-lg text-white p-2 hover:bg-gray-800 transition-all w-32">
              Restock
            </button>
          </div>
        </div>
        {/* Emails  */}
        <div className="bg-gray-100 p-4 rounded">
          <h1 className="text-2xl text-center">
            You have {emailQuery.data} new emails today
          </h1>
          <div className="flex flex-row justify-end pr-4">
            <button className="bg-black rounded-lg text-white p-2 hover:bg-gray-800 transition-all w-32">
              View Emails
            </button>
          </div>
        </div>
        {/* Reviews  */}
        <div className="bg-gray-100 p-4 rounded">
          <h1 className="text-2xl text-center">
            You have {reviewAmountQuery.data?.reviewCount} reviews today
          </h1>
          <div className="flex flex-row justify-end pr-4">
            <button className="bg-black rounded-lg text-white p-2 hover:bg-gray-800 transition-all w-32 ">
              View Reviews
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
