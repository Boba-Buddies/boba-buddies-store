import { useQuery } from 'react-query'

import { fetchUser } from '../../../apis/users'

import LoadError from '../../components/LoadError/LoadError'

const Profile = () => {
  const { data, status } = useQuery('fetchUser', fetchUser)

  return (
    <>
      <LoadError status={status} />

      <h1 className="text-3xl font-bold tracking-wider">Profile</h1>

      <div>
        <h2>Account Details</h2>
        <p>
          {data && data.firstName} {data && data.lastName}
        </p>
        <p>{data && data.address}</p>
        <p>{data && data.city}</p>
        <p>{data && data.country}</p>
        <p>{data && data.zipCode}</p>
      </div>
    </>
  )
}

export default Profile
