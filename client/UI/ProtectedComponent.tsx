import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import { useQuery } from 'react-query'
import { fetchCheckIfUserExists } from '../apis/users'
import LoadError from '../user/components/LoadError/LoadError'

interface Props {
  component: React.ComponentType<unknown>
}

// This is a very handy wrapper component that will redirect the user to the login page
// if they are not logged in
export const ProtectedComponent = ({ component }: Props) => {
  const { getAccessTokenSilently } = useAuth0()
  const { data: ifUserExists, status: statusUserExists } = useQuery(
    ['fetchCheckIfUserExists'],
    async () => {
      const token = await getAccessTokenSilently()
      return await fetchCheckIfUserExists(token)
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
      <LoadError status={statusUserExists} />

      {/* will create a new page for asking the user to create a new account */}
      {ifUserExists ? <Component /> : <div>Create an account to continue</div>}
    </>
  )
}
export default ProtectedComponent
