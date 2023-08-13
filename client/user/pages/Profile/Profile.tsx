import { useQuery } from 'react-query'

import { fetchUser } from '../../../apis/users'

import LoadError from '../../components/LoadError/LoadError'
import { User } from '../../../../models/Users'

const Profile = () => {
  const { data, status } = useQuery('fetchUser', fetchUser)

  return (
    <>
      <LoadError status={status} />
      <h1 className="text-3xl font-bold tracking-wider">Profile</h1>

      <div>
        {data &&
          data.map((userDetails: User) => (
            <div key={userDetails.id}>
              {' '}
              {/* Added 'key' prop for mapping */}
              {userDetails.firstName}
            </div>
          ))}
      </div>
    </>
  )
}

export default Profile
