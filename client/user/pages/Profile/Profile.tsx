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
            <p>{data?.address}</p>
            <p>{data?.city}</p>
            <p>{data?.country}</p>
            <p>{data?.zipCode}</p>

            <button
              onClick={() => goTo(`/edit-profile`)}
              className="mt-2 py-1 px-2 bg-gray-400 text-sm text-white font-semibold rounded-md transition duration-300 ease-in-out hover:bg-gray-500 hover:text-gray-100 focus:outline-none focus:ring focus:ring-gray-400"
            >
              Edit Details
            </button>
          </section>
        </div>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Reviews</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="border p-2 rounded-md shadow-md">Review 1</li>
            <li className="border p-2 rounded-md shadow-md">Review 2</li>
            <li className="border p-2 rounded-md shadow-md">Review 3</li>
            {/* Add more items as needed */}
          </ul>
        </section>
      </div>
    </div>
  )
}

export default Profile
