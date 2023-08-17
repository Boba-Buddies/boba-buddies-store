import { ShippingOptions } from '../../../../models/ShippingOptions'
interface ShippingMethodProps {
  shippingData: ShippingOptions[]
  handleShippingChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

function ShippingMethod({
  shippingData,
  handleShippingChange,
}: ShippingMethodProps) {
  return (
    <div>
      <label htmlFor="shipping" className="font-medium">
        SELECT SHIPPING METHOD
      </label>
      <select
        name="shipping"
        id="shipping"
        className="border p-2 w-full mb-4"
        onChange={handleShippingChange}
      >
        <option value="">Please Select the Shipping Type</option>
        {shippingData.map((option: ShippingOptions) => (
          <option value={option.id} key={option.id}>
            {option.shippingType}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ShippingMethod
