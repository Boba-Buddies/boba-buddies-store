import { useQuery } from 'react-query'

import { fetchUser } from '../../../apis/users'

import LoadError from '../../components/LoadError/LoadError'

const Profile = () => {
  const { data, status } = useQuery('fetchUser', fetchUser)

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold tracking-wider mb-8">
        Hello, {data?.firstName} {data?.lastName}!
      </h1>

      <div className="flex">
        <div className="w-1/2 pr-8">
          <h2 className="text-xl font-semibold mb-4">Orders</h2>
          <ul className="space-y-2">
            <li className="border p-2">Order 1</li>
            <li className="border p-2">Order 2</li>
            <li className="border p-2">Order 3</li>
            {/* Add more items as needed */}
          </ul>
        </div>

        <div className="w-1/2 pl-8">
          <h2 className="text-xl font-semibold mb-4">Account Details</h2>
          <p>
            {data?.firstName} {data?.lastName}
          </p>
          <p>{data?.address}</p>
          <p>{data?.city}</p>
          <p>{data?.country}</p>
          <p>{data?.zipCode}</p>
          <LoadError status={status} />
        </div>
      </div>

      <div className="mt-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Reviews</h2>
          <ul className="space-y-2">
            <li className="border p-2">Review 1</li>
            <li className="border p-2">Review 2</li>
            <li className="border p-2">Review 3</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Profile
