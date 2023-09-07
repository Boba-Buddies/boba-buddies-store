import { useAuth0 } from '@auth0/auth0-react'
import { useQuery, useQueryClient } from 'react-query'

export const Orders = () => {
  const { getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()
  

  return <div>Orders</div>
}
