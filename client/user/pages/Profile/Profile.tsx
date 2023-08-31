import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { fetchUser } from '../../../apis/users'
import {
  deleteReviewByProductId,
  fetchUserReviews,
} from '../../../apis/reviews'
import LoadError from '../../components/LoadError/LoadError'
import { UserReview } from '../../../../models/Reviews'
import { UserOrders } from '../../../../models/Purchases'
import { fetchUserOrders } from '../../../apis/purchases'
import { useAuth0 } from '@auth0/auth0-react'
import StarRating from '../../components/StarRating/StarRating'

const Profile = () => {
  const { logout, getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  function goTo(link: string) {
    navigate(link)
  }
  const { data, status } = useQuery('fetchUser', async () => {
    const token = await getAccessTokenSilently()
    return await fetchUser(token)
  })

  const { data: reviews, status: reviewsStatus } = useQuery(
    'fetchUserReviews',
    async () => {
      const token = await getAccessTokenSilently()
      return await fetchUserReviews(token)
    },
  )

  const { data: orders, status: ordersStatus } = useQuery(
    'fetchUserOrders',
    async () => {
      const token = await getAccessTokenSilently()
      return await fetchUserOrders(token)
    },
  )

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const deleteReviewMutation = useMutation(
    async (productId: number) => {
      const token = await getAccessTokenSilently()
      return deleteReviewByProductId(productId, token)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('fetchUserReviews')
      },
    },
  )

  function handleLogout() {
    logout({ logoutParams: { returnTo: window.location.origin } })
    console.log(window.location.origin)
  }

  return (
    <div className="flex justify-center items-center">
      <div className="p-8 w-4/5">
        <LoadError status={status} />

        <button
          className="mt-2 py-1 px-2 bg-gray-400 text-sm text-white font-semibold rounded-md transition duration-300 ease-in-out hover:bg-gray-500 hover:text-gray-100 focus:outline-none focus:ring focus:ring-gray-400"
          onClick={handleLogout}
        >
          Logout
        </button>

        <h1 className="text-3xl font-bold tracking-wider mb-8">
          Hello, {data?.firstName} {data?.lastName}!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="border p-4 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order History</h2>
            <div className="space-y-4">
              {ordersStatus === 'loading' ? (
                <p>Loading orders...</p>
              ) : ordersStatus === 'error' ? (
                <p className="text-red-600">Error loading orders</p>
              ) : orders && orders.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {orders.map((order: UserOrders) => (
                    <li
                      key={order.orderId}
                      className="p-4 border border-gray-300 rounded-md mb-4"
                    >
                      <div className="flex justify-between">
                        <div className="text-lg font-semibold">
                          # {order.orderId}
                        </div>
                        <div className="text-gray-500">{order.purchasedAt}</div>
                      </div>
                      <div className="text-gray-600 mt-2">
                        Total: {formatCurrency(order.totalAmount)}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No orders available.</p>
              )}
            </div>
          </section>

          <section className="border p-4 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Account Details</h2>
            <p>
              {data?.firstName} {data?.lastName}
            </p>
            <h3 className="font-semibold pt-6">Username: </h3>
            <div className="pb-4">
              <p>{data?.userName}</p>
            </div>

            <h3 className="font-semibold pt-6">Phone Number: </h3>
            <div className="pb-4">
              <p>{data?.phoneNumber}</p>
            </div>

            <h3 className="font-semibold pt-6">Email: </h3>
            <div className="pb-4">
              <p>{data?.emailAddress}</p>
            </div>

            <h3 className="font-semibold pt-6">Address: </h3>
            <div className="pb-4">
              <p>{data?.address}</p>
              <p>{data?.city}</p>
              <p>{data?.country}</p>
              <p>{data?.zipCode}</p>
            </div>

            <button
              onClick={() => goTo(`/edit`)}
              className="mt-2 py-1 px-2 bg-gray-400 text-sm text-white font-semibold rounded-md transition duration-300 ease-in-out hover:bg-gray-500 hover:text-gray-100 focus:outline-none focus:ring focus:ring-gray-400"
            >
              Edit Details
            </button>
          </section>
        </div>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Reviews</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviewsStatus === 'loading' ? (
              <p>Loading reviews...</p>
            ) : reviewsStatus === 'error' ? (
              <p>Error loading reviews</p>
            ) : (
              reviews.map((review: UserReview) => (
                <li
                  key={review.productId}
                  className="border p-4 rounded-md shadow-md hover:shadow-lg transition duration-300"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">
                      {review.productName}
                    </h3>
                    <span className="text-gray-500">
                      {review.reviewCreatedAt}
                    </span>
                  </div>
                  <p className="mb-4">{review.reviewDescription}</p>
                  <div className="flex items-center">
                    <span className="text-gray-600 text-sm mr-2">
                      {review.reviewerUserName}
                    </span>
                    <div className="flex items-center">
                      <StarRating rating={review.reviewRating} size={1} />
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      deleteReviewMutation.mutate(review.productId)
                    }
                    className="mt-2 text-red-500 hover:text-red-600 cursor-pointer"
                  >
                    Delete
                  </button>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>
    </div>
  )
}

export default Profile
