import { CartClient } from '../../../../models/Cart'
interface SelectedShipping {
  id: number
  type: string
  price: number
}
interface OderSummaryProps {
  cartProducts: CartClient[]
  subtotal: number
  selectedShipping: SelectedShipping
  total: number
}
function OrderSummary({
  cartProducts,
  subtotal,
  selectedShipping,
  total,
}: OderSummaryProps) {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">ORDER SUMMARY</h1>

      {cartProducts.map((product: CartClient) => (
        <div className="flex justify-between mb-2" key={product.productId}>
          <div className="flex flex-row">
            <div>{product.quantity}</div> <span className="mx-2">X</span>{' '}
            {product.name}
          </div>
          <div>${product.price.toFixed(2)}</div>
        </div>
      ))}

      <div className="flex justify-between mb-2">
        <h1 className="text-xl font-semibold">SUBTOTAL</h1>
        <p className="text-lg">${subtotal.toFixed(2)}</p>
      </div>
      <div className="mb-2 ">
        <h1 className="text-xl font-semibold">SHIPPING METHOD</h1>
        <div className="flex flex-row justify-between">
          <div className="text-sm">{selectedShipping.type}</div>
          <div className="text-lg">${selectedShipping.price.toFixed(2)}</div>
        </div>
      </div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">ORDER TOTAL</h1>
        <p className="text-lg">NZD $ {total.toFixed(2)}</p>
      </div>
    </div>
  )
}

export default OrderSummary
