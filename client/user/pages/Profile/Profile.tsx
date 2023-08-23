import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { fetchUser } from '../../../apis/users'
import { fetchUserReviews } from '../../../apis/reviews'
import LoadError from '../../components/LoadError/LoadError'
import { UserReview } from '../../../../models/Reviews'

const Profile = () => {
  const navigate = useNavigate()
  function goTo(link: string) {
    navigate(link)
  }

  const { data, status } = useQuery('fetchUser', fetchUser)

  const { data: reviews, status: reviewsStatus } = useQuery(
    'fetchUserReviews',
    fetchUserReviews,
  )

  return (
    <div className="flex justify-center items-center">
      <div className="p-8 w-4/5">
        <LoadError status={status} />

        <h1 className="text-3xl font-bold tracking-wider mb-8">
          Hello, {data?.firstName} {data?.lastName}!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="border p-4 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Orders</h2>
            <ul className="space-y-2">
              <li className="border p-2">Order 1</li>
              <li className="border p-2">Order 2</li>
              <li className="border p-2">Order 3</li>
              {/* Add more items as needed */}
            </ul>
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
                      <span className="text-yellow-500">
                        {'\u2605'.repeat(review.reviewRating)}
                      </span>
                      <span className="text-gray-400 ml-1">
                        {'\u2605'.repeat(5 - review.reviewRating)}
                      </span>
                    </div>
                  </div>

                  <button
                    className="absolute top-2 right-2 text-red-500 hover:text-red-600 cursor-pointer"
                    onClick={() => handleDeleteReview(review.productId)}
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
