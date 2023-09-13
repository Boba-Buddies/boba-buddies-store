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
import {
  PaymentInformation,
  DeliveryAddress,
  PaymentMethod,
  ShippingMethod,
  OrderSummary,
} from '../../components'
import LoadError from '../../components/LoadError/LoadError'
import { useAuth0 } from '@auth0/auth0-react'

function Checkout() {
  const { getAccessTokenSilently } = useAuth0()
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
  //Different Query
  const ShippingQuery = useQuery('fetchAllShippingOptions', async () => {
    const token = await getAccessTokenSilently()
    return await fetchAllShippingOptions(token)
  })

  const CartQuery = useQuery(
    'fetchCart',
    async () => {
      const token = await getAccessTokenSilently()
      const cartData = await fetchCart(token)
      return cartData
    },
    {
      onSuccess: (data: CartClient[]) => {
        setCartProduct(data)
      },
    },
  )

  const statuses = [ShippingQuery.status, CartQuery.status]

  //Mutation of Different Query
  const purchaseMutation = useMutation(
    ({ shippingId, token }: { shippingId: number; token: string }) =>
      moveCartToPurchases(shippingId, token),
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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    updateUserDataMutation.mutate(userDetails)
    const shippingId = selectedShipping.id
    const token = await getAccessTokenSilently()
    purchaseMutation.mutate({ shippingId, token })
    navigate('/thankyou')
  }

  return (
    <>
      <LoadError status={statuses} />
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
