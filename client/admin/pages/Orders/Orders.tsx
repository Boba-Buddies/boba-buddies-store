import { AllOrders } from './AllOrders'

export const Orders = () => {
  return (
    <div className="p-4">
      <div className="w-3/4 mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Orders</h1>
        <AllOrders />
      </div>
    </div>
  )
}
