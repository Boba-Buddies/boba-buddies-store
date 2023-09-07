import { useAuth0 } from '@auth0/auth0-react'
import { useQuery, useQueryClient } from 'react-query'
import { AllOrders } from './AllOrders'

export const Orders = () => {
  const { getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()

  return (
    <div>
      <AllOrders />
    </div>
  )
}
