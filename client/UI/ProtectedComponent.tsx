import { withAuthenticationRequired } from '@auth0/auth0-react'

interface Props {
  component: React.ComponentType<unknown>
}

// This is a very handy wrapper component that will redirect the user to the login page
// if they are not logged in
export const ProtectedComponent = ({ component }: Props) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div>
        <h1>Redirecting you to the login page...</h1>
      </div>
    ),
  })

  return <Component />
}
export default ProtectedComponent
