import { Order } from '../../../../models/Purchases'

interface OrderDetailsProps {
  order: Order | null
}

function OrderDetails({ order }: OrderDetailsProps) {
  // Check if order is null or undefined
  if (!order) {
    return null // Render nothing if order is missing
  }

  return (
    <div className="order-details">
      <h2>Order Details</h2>
      <p>Order ID: {order.orderId}</p>
      <p>
        User Name: {order.userFirstName} {order.userLastName}
      </p>
      <p>Total Sale: {order.totalSale}</p>
      <p>Purchase Date: {order.orderDate}</p>
      {/* Add more order details here */}
    </div>
  )
}

export default OrderDetails
