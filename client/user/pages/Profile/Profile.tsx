import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { fetchUser } from '../../../apis/users'

import LoadError from '../../components/LoadError/LoadError'

const Profile = () => {
  const navigate = useNavigate()
  function goTo(link: string) {
    navigate(link)
  }

  const { data, status } = useQuery('fetchUser', fetchUser)

  return (
    <div className="p-8">
      <LoadError status={status} />

      <h1 className="text-3xl font-bold tracking-wider mb-8">
        Hello, {data?.firstName} {data?.lastName}!
      </h1>

      <div className="flex">
        <div className="w-1/2 pr-8">
          <section className="mb-8">
            <h2 className="text-xl font-semibold">Orders</h2>
            <ul className="space-y-2">
              <li className="border p-2">Order 1</li>
              <li className="border p-2">Order 2</li>
              <li className="border p-2">Order 3</li>
              {/* Add more items as needed */}
            </ul>
          </section>
        </div>

        <div className="w-1/2 pl-8">
          <section className="mb-8">
            <h2 className="text-xl font-semibold">Account Details</h2>
            <p>
              {data?.firstName} {data?.lastName}
            </p>
            <p>{data?.address}</p>
            <p>{data?.city}</p>
            <p>{data?.country}</p>
            <p>{data?.zipCode}</p>

            <button
              onClick={() => goTo(`/edit-profile/${data?.userId}`)}
              className="mt-2 py-1 px-2 bg-gray-400 text-sm text-white font-semibold rounded-md transition duration-300 ease-in-out hover:bg-gray-500 hover:text-gray-100 focus:outline-none focus:ring focus:ring-gray-400"
            >
              Edit Details
            </button>
          </section>
        </div>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>
        <ul className="space-y-2">
          <li className="border p-2">Review 1</li>
          <li className="border p-2">Review 2</li>
          <li className="border p-2">Review 3</li>
          {/* Add more items as needed */}
        </ul>
      </section>
    </div>
  )
}

export default Profile
