import { useMutation, useQuery, useQueryClient } from 'react-query'
import { fetchCart } from '../../../apis/cart'
import { CartClient } from '../../../../models/Cart'
import { fetchAllShippingOptions } from '../../../apis/shipping'
import { ShippingOptions } from '../../../../models/ShippingOptions'
import { useState } from 'react'
import { moveCartToPurchases } from '../../../apis/purchases'
import { UpdateUser } from '../../../../models/Users'
import { modifyUserDetails } from '../../../apis/users'
import { useNavigate } from 'react-router-dom'

import PaymentInformation from '../../components/Checkout/PaymentInformation'
import DeliveryAddress from '../../components/Checkout/DeliveryAdress'
import PaymentMethod from '../../components/Checkout/PaymentMethod'
import ShippingMethod from '../../components/Checkout/ShippingMethod'
import OrderSummary from '../../components/Checkout/OrderSummary'

function Checkout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [cartProducts, setCartProduct] = useState([] as CartClient[])
  const [userDetails, setUserDetails] = useState({
    phoneNumber: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
  })
  const [selectedShipping, setSelectedShipping] = useState({
    id: 0,
    type: '',
    price: 0,
  })

  const purchaseMutation = useMutation(
    (shippingId: number) => moveCartToPurchases(shippingId),
    {
      onSuccess: async () => {
        //Need to check the api function
        queryClient.invalidateQueries('fetchOrderByOrderId')
        queryClient.invalidateQueries('fetchAllOrders')
      },
    },
  )

  const updateUserDataMutation = useMutation(
    (updatedDetail: UpdateUser) => modifyUserDetails(updatedDetail),
    {
      onSuccess: async () => {
        //Need to check the user api function
        queryClient.invalidateQueries('fetchUser')
        queryClient.invalidateQueries('fetchUserName')
      },
    },
  )

  useQuery('fetchProfiles', fetchCart, {
    onSuccess: (data: CartClient[]) => {
      setCartProduct(data)
    },
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
        id: shippingOption.id,
        type: shippingOption.shippingType,
        price: shippingOption.price,
      })
    }
  }

  function handleUserDetailsChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setUserDetails({
      ...userDetails,
      [name]: value,
    })
  }

  const subtotal = cartProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  )
  const total = subtotal + selectedShipping.price

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    updateUserDataMutation.mutate(userDetails)
    const submittedShippingId = selectedShipping.id
    purchaseMutation.mutate(submittedShippingId)
    navigate('/thankyou')
  }

  return (
    <>
      <div className=" text-black p-8">
        <div className="text-4xl font-bold mb-4">I am the Logo</div>
        <form onSubmit={handleSubmit}>
          <PaymentInformation
            handleUserDetailsChange={handleUserDetailsChange}
          />
          <DeliveryAddress handleUserDetailsChange={handleUserDetailsChange} />
          <PaymentMethod />
          {!ShippingQuery.isLoading && ShippingQuery.data && (
            <ShippingMethod
              shippingData={ShippingQuery.data}
              handleShippingChange={handleShippingChange}
            />
          )}
          <OrderSummary
            cartProducts={cartProducts}
            subtotal={subtotal}
            selectedShipping={selectedShipping}
            total={total}
          />
          <button
            className="bg-black text-white p-4 w-full text-lg font-bold"
            type="submit"
          >
            COMPLETE ORDER
          </button>
        </form>
      </div>
    </>
  )
}

export default Checkout
