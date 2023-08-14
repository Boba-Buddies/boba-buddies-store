import { useQuery } from 'react-query'

import { fetchUser } from '../../../apis/users'

import LoadError from '../../components/LoadError/LoadError'
import { User } from '../../../../models/Users'

const Profile = () => {
  const { data: User, status } = useQuery('fetchUser', fetchUser)

  return (
    <>
      <LoadError status={status} />

      <h1 className="text-3xl font-bold tracking-wider">Profile</h1>

      <div>
        {/* {data &&
          data.map((userDetails: User) => (
            <p key={userDetails.userId}> {userDetails.firstName}</p>
          ))} */}
      </div>
    </>
  )
}

export default Profile
