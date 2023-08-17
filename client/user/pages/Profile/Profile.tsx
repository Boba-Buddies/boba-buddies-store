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
        <p>{data && data.firstName}</p>
      </div>
    </>
  )
}

export default Profile
