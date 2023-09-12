import { useEffect, useRef } from 'react'
import { useQuery } from 'react-query'
import { useAuth0 } from '@auth0/auth0-react'
import LoadError from '../../../user/components/LoadError/LoadError'
import { fetchOrderById } from '../../../apis/purchases'
import { Order } from '../../../../models/Purchases'

interface OrderPopupProps {
  orderId: number
  order: Order
  closeOrderPopup: () => void
}

const OrderPopup = ({ orderId, order, closeOrderPopup }: OrderPopupProps) => {
  const { getAccessTokenSilently } = useAuth0()

  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        closeOrderPopup()
      }
    }

    window.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [closeOrderPopup])

  const { status } = useQuery(
    ['getOrderById', orderId],
    async () => {
      const token = await getAccessTokenSilently()
      return await fetchOrderById(orderId, token)
    },
    {
      refetchOnWindowFocus: false,
    },
  )

  return (
    <>
      <LoadError status={status} />
      {status === 'success' && order && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div
            ref={popupRef}
            className="bg-white p-8 w-[70%] max-w-full max-h-[80%] overflow-y-auto shadow-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Order #{order.orderId}</h2>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Information:</h3>
              <p>
                Name: {order.userFirstName} {order.userLastName}
              </p>
              <p>Address: {order.userAddress}</p>
              <p>City: {order.userCity}</p>
              <p>Country: {order.userCountry}</p>
              <p>Zip Code: {order.userZipCode}</p>
              <p>Email: {order.userEmail}</p>
              <p>Phone Number: {order.userPhoneNumber}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Order Items:</h3>
              <ul>
                {order.orderItems.map((item) => (
                  <li key={item.productSale} className="mb-2">
                    <p>Product Name: {item.productName}</p>
                    <p>Product Sale: {item.productSale}</p>
                    <p>Product Image: {item.productImage}</p>
                    <p>Item Quantity: {item.itemQuantity}</p>
                  </li>
                ))}
              </ul>
            </div>
            <hr className="border-t border-gray-300" />
            <div className="mt-4 text-right">
              <button
                onClick={closeOrderPopup}
                className="px-2 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Back to orders
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default OrderPopup
