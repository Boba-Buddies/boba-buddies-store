import { useQuery } from 'react-query'
import { fetchCart } from '../../../apis/cart'
import { CartClient } from '../../../../models/Cart'
import { fetchAllShippingOptions } from '../../../apis/shipping'
import { ShippingOptions } from '../../../../models/ShippingOptions'
import { useState } from 'react'

function Checkout() {
  const [cartProducts, setCartProduct] = useState([] as CartClient[])

  useQuery('fetchProfiles', fetchCart, {
    onSuccess: (data: CartClient[]) => {
      setCartProduct(data)
    },
  })

  const [selectedShipping, setSelectedShipping] = useState({
    type: '',
    price: 0,
  })
  const ShippingQuery = useQuery(
    'fetchAllShippingOptions',
    fetchAllShippingOptions,
  )

  const handleShippingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const shippingOption = ShippingQuery.data?.find(
      (option: ShippingOptions) => option.id === Number(e.target.value),
    )

    if (shippingOption) {
      setSelectedShipping({
        type: shippingOption.shippingType,
        price: shippingOption.price,
      })
    }
  }

  const subtotal = cartProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  )
  const total = subtotal + selectedShipping.price
  return (
    <>
      <div className=" text-black p-8">
        <div className="text-4xl font-bold mb-4">I am the Logo</div>
        <form action="">
          <div>
            <h1 className="text-2xl font-semibold mb-4">PAYMENT INFORMATION</h1>
          </div>
          <div>
            <input
              type="text"
              id="phone"
              placeholder="PHONE"
              className="border p-2 w-full mb-4"
            />
          </div>
          <h1 className="text-2xl font-semibold mb-4">DELIVERY ADDRESS</h1>
          <div className="flex flex-row">
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="FIRST NAME"
              className="border p-2 w-full mb-4 mr-6"
            />
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="LAST NAME"
              className="border p-2 w-full mb-4"
            />
          </div>
          <div>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="ADDRESS"
              className="border p-2 w-full mb-4"
            />
          </div>
          <div>
            <input
              type="text"
              name="city"
              id="city"
              placeholder="CITY"
              className="border p-2 w-full mb-4"
            />
          </div>
          <div className="flex flex-row">
            <input
              type="text"
              name="country"
              id="country"
              placeholder="COUNTRY"
              className="border p-2 w-full mb-4 mr-6"
            />
            <input
              type="text"
              name="zipCode"
              id="zipCode"
              placeholder="ZIPCODE"
              className="border p-2 w-full mb-4"
            />
          </div>
          <div>
            <label htmlFor="payment" className="font-medium">
              SELECT PAYMENT METHOD
            </label>
            <select
              name="payment"
              id="payment"
              className="border p-2 w-full mb-4"
              onChange={handleShippingChange}
            >
              <option value="card">CREDIT</option>
              <option value="visa">VISA</option>
            </select>
          </div>
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
              {!ShippingQuery.isLoading &&
                ShippingQuery.data &&
                ShippingQuery.data.map((option: ShippingOptions) => (
                  <option value={option.id} key={option.id}>
                    {option.shippingType}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <h1 className="text-2xl font-semibold mb-4">ORDER SUMMARY</h1>

            {cartProducts.map((product: CartClient) => (
              <div
                className="flex justify-between mb-2"
                key={product.productId}
              >
                <div className="flex flex-row">
                  <div>{product.quantity}</div> <span className="mx-2">X</span>{' '}
                  {product.name}
                </div>
                <div>${product.price.toFixed(2)}</div>
              </div>
            ))}

            <div className="flex justify-between mb-2">
              <h1 className="text-xl font-semibold">SUBTOTAL</h1>
              <p className="text-lg">NZD $2.00</p>
            </div>
            <div className="mb-2 ">
              <h1 className="text-xl font-semibold">SHIPPING METHOD</h1>
              <div className="flex flex-row justify-between">
                <div className="text-sm">{selectedShipping.type}</div>
                <div className="text-lg">
                  ${selectedShipping.price.toFixed(2)}
                </div>
              </div>
            </div>
            <div className="flex justify-between mb-4">
              <h1 className="text-xl font-semibold">ORDER TOTAL</h1>
              <p className="text-lg">NZD $ {total.toFixed(2)}</p>
            </div>
          </div>
          <button className="bg-black text-white p-4 w-full text-lg font-bold">
            COMPLETE ORDER
          </button>
        </form>
      </div>
    </>
  )
}

export default Checkout
