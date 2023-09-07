import { useAuth0 } from '@auth0/auth0-react'
import { useQuery, useMutation } from 'react-query'
import {
  fetchCheckIfUserExists,
  fetchIsUserAdmin,
  insertUser,
} from '../../../apis/users'
import { useNavigate } from 'react-router-dom'
import { NewUser } from '../../../../models/Users'

const Redirect = () => {
  const { getAccessTokenSilently, user } = useAuth0()
  const navigate = useNavigate()
  function goTo(link: string) {
    navigate(link)
  }

  const { data: ifUserExists, status: statusUserExists } = useQuery(
    ['fetchCheckIfUserExists'],
    async () => {
      const token = await getAccessTokenSilently()
      return await fetchCheckIfUserExists(token)
    },
  )

  const { data: isAdmin, status: statusIsAdmin } = useQuery(
    ['fetchIsUserAdmin'],
    async () => {
      const token = await getAccessTokenSilently()
      return await fetchIsUserAdmin(token)
    },
  )

  const addUserMutation = useMutation(async (newUser: NewUser) => {
    console.log(99)
    const token = await getAccessTokenSilently()
    return insertUser(newUser, token)
  })

  console.log(user)

  if (ifUserExists) {
    if (isAdmin) {
      console.log(1)
      goTo('/admin')
    } else {
      console.log(2)
      goTo('/profile')
    }
  } 
    const newUser = {
      firstName: '',
      lastName: '',
      userName: user?.nickname || 'defaultUsername',
      emailAddress: user?.email || 'defaultEmail@example.com',
    }
    addUserMutation.mutate(newUser)
    goTo('/edit')

    return (
      <div>Redirecting...</div>
    )
  }




//Check if user exists
//If they don't exist we add them to the database. Then we redirect them to the home page.
//If they do exist, we check if they are admin.
//If they are admin, redirect to dashboard.
//If they are not admin, redirect to profile page.

export default Redirect
