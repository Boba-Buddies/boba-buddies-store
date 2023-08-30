import { useQuery } from 'react-query'
import { fetchUser } from '../../../apis/users'
import LoadError from '../../components/LoadError/LoadError'
import { fetchLatestOrderId } from '../../../apis/purchases'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const ThankYou = () => {
  const { getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()

  const { data: user, status } = useQuery(['getUser'], async () => {
    return await fetchUser()
  })

  const { data: orderId, status: statusOrderId } = useQuery(
    ['getLatestOrderId'],
    async () => {
      const token = await getAccessTokenSilently()
      return await fetchLatestOrderId(token)
    },
  )

  return (
    <>
      <LoadError status={[status, statusOrderId]} />
      <div className="mt-8 text-2xl text-center font-bold">
        <div>THANK YOU</div>
        {user && <div>{`${user.firstName} ${user.lastName}`}</div>}
        <div>FOR YOUR ORDER!</div>
      </div>

      {orderId && (
        <div className="mt-8 mb-8 ml-2 border rounded-md px-3 py-2 text-center">
          ORDRE NUMBER #{orderId.orderId}
        </div>
      )}

      <div className="mt-8 mb-8 ml-2 border rounded-md px-3 py-2 text-center">
        <div className="text-xl">Your order will be shipped to</div>
        {user && (
          <div>
            <div>{user.address}</div>
            <div>{user.city}</div>
            <div>{user.country}</div>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => navigate('/')}
        className="ml-2 mr-2 mt-6 rounded-md bg-black text-white p-4 w-full text-2xl font-bold"
      >
        Back to home
      </button>
    </>
  )
}

export default ThankYou
