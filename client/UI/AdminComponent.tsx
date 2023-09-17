import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import { useQuery } from 'react-query'
import { fetchIsUserAdmin } from '../apis/users'
import LoadError from '../user/components/LoadError/LoadError'

interface Props {
  component: React.ComponentType<unknown>
}

// This is a very handy wrapper component that will redirect the user to the login page
// if they are not logged in
export const AdminComponent = ({ component }: Props) => {
  const { getAccessTokenSilently } = useAuth0()
  const { data: isAdmin, status: statusIsAdmin } = useQuery(
    ['fetchIsUserAdmin'],
    async () => {
      const token = await getAccessTokenSilently()
      return await fetchIsUserAdmin(token)
    },
  )

  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div>
        <h1>Redirecting you to the login page...</h1>
      </div>
    ),
  })

  return (
    <>
      <LoadError status={statusIsAdmin} />
      {isAdmin ? <Component /> : <div>Not Admin Authorized</div>}
    </>
  )
}
export default AdminComponent
