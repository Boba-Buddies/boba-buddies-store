import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

interface Props {
  component: React.ComponentType<unknown>
}

export const UnprotectedComponent = ({ component }: Props) => {
  //const { isLoading } = useAuth0()

  // if (isLoading) {
  //   // Render loading indicator or placeholder content while Auth0 is being initialized
  //   return
  // }

  // Render the component if the user is authenticated
  const Component = component
  return <Component />
}

export default UnprotectedComponent
