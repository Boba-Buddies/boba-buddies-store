import { useQuery } from 'react-query'

import { fetchUser } from '../../../apis/users'

import LoadError from '../../components/LoadError/LoadError'

const Profile = () => {
  const { data, status } = useQuery('fetchUser', fetchUser)

  return (
    <>
      <h1 className="text-3xl font-bold tracking-wider">Profile</h1>
      <div className="flex">
        <div className="w-1/2 p-8">
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Orders</h2>
            {/* Render your list of orders here */}
            <ul className="pl-4">
              <li className="border p-2 mb-2">Order 1</li>
              <li className="border p-2 mb-2">Order 2</li>
              <li className="border p-2 mb-2">Order 3</li>
              {/* Add more items as needed */}
            </ul>
          </div>
        </div>

        <div className="w-1/2 p-8">
          <LoadError status={status} />

          <div className="mt-4">
            <h2 className="text-xl font-semibold">Account Details</h2>
            <p>
              {data && data.firstName} {data && data.lastName}
            </p>
            <p>{data && data.address}</p>
            <p>{data && data.city}</p>
            <p>{data && data.country}</p>
            <p>{data && data.zipCode}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
