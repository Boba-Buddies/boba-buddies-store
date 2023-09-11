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
            className="bg-white p-8 rounded-lg w-96 max-w-full max-h-full overflow-y-auto shadow-xl"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Order Details</h2>
              <button
                onClick={closeOrderPopup}
                className="px-2 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Back to orders
              </button>
            </div>
            <hr className="my-4 border-t border-gray-300" />
            <div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Order ID:</h3>
                <p>{order.orderId}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">User Information:</h3>
                <p>
                  User Name: {order.userFirstName} {order.userLastName}
                </p>
                <p>User Email: {order.userEmail}</p>
                <p>User Phone Number: {order.userPhoneNumber}</p>
                <p>User Address: {order.userAddress}</p>
                <p>User City: {order.userCity}</p>
                <p>User Country: {order.userCountry}</p>
                <p>User Zip Code: {order.userZipCode}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Order Information:</h3>
                <p>Total Sale: {order.totalSale}</p>
                <p>Amount Of Items: {order.amountOfItems}</p>
                <p>Order Date: {order.orderDate}</p>
                <p>Shipping Type: {order.shippingType}</p>
                <p>Shipping Price: {order.shippingPrice}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Order Items:</h3>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.productSale}>
                      <p>Product Name: {item.productName}</p>
                      <p>Product Sale: {item.productSale}</p>
                      <p>Product Image: {item.productImage}</p>
                      <p>Item Quantity: {item.itemQuantity}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default OrderPopup
