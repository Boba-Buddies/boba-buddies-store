import { useAuth0 } from '@auth0/auth0-react'
import { useQuery, useMutation } from 'react-query'
import {
  fetchCheckIfUserExists,
  fetchIsUserAdmin,
  insertUser,
} from '../../../apis/users'
import { useNavigate } from 'react-router-dom'
import { NewUser } from '../../../../models/Users'
import { useEffect } from 'react'

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
    const token = await getAccessTokenSilently()
    return insertUser(newUser, token)
  })

  useEffect(() => {
    if (statusUserExists === 'success' && statusIsAdmin === 'success') {
      if (ifUserExists) {
        if (isAdmin) {
          goTo('/admin')
        } else {
          goTo('/profile')
        }
      } else if (user && user.nickname && user.email) {
        const newUser = {
          firstName: '',
          lastName: '',
          userName: user.nickname,
          emailAddress: user.email,
        }
        addUserMutation.mutate(newUser)
        goTo('/edit')
      }
    }
  }, [ifUserExists, isAdmin, user, goTo])

  return <div>Redirecting...</div>
}

export default Redirect
