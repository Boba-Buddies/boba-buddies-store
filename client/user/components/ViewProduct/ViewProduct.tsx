import { useState } from 'react'
import { UserProduct } from '../../../../models/Products'
import { addProductToCart } from '../../../apis/cart'
import StarRating from '../StarRating/StarRating'
import { useMutation } from 'react-query'
import {
  addToWishlistByProductId,
  deleteFromWishlistByProductId,
} from '../../../apis/wishlist'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'
import { useAuth0 } from '@auth0/auth0-react'

interface ViewProductProps {
  product: UserProduct
  wishlistStatus: boolean
  refetchWishlistProductStatus: () => void
}

function ViewProduct({
  product,
  wishlistStatus,
  refetchWishlistProductStatus,
}: ViewProductProps) {
  const [buttonText, setButtonText] = useState('Add to cart')
  const [buttonColor, setButtonColor] = useState(
    'bg-blue-500 hover:bg-blue-700',
  )
  const { getAccessTokenSilently } = useAuth0() // Use Auth0 to get the access token

  const cartMutation = useMutation(
    async (productId: number) => {
      const token = await getAccessTokenSilently()
      return addProductToCart(productId, token)
    },
    {
      onSuccess: () => {
        setButtonText('Item added')
        setButtonColor('bg-gray-500')
        setTimeout(() => {
          setButtonText('Add to cart')
          setButtonColor('bg-blue-500 hover:bg-blue-700')
        }, 1000)
      },
    },
  )

  const wishlistMutation = useMutation(
    async () => {
      const token = await getAccessTokenSilently()
      if (wishlistStatus) {
        return deleteFromWishlistByProductId(product.id, token)
      } else {
        return addToWishlistByProductId(product.id, token)
      }
    },
    {
      onSuccess: () => refetchWishlistProductStatus(),
    },
  )

  const handleAddToCart = () => {
    cartMutation.mutate(product.id)
  }

  const handleWishlistClick = () => {
    wishlistMutation.mutate()
  }

  return (
    <div className="flex items-center max-w-5xl" style={{ padding: '10px' }}>
      <div className="w-1/2">
        <img src={product.image} alt={product.name} className="w-full" />
      </div>
      <div className="w-1/2 ml-4">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <button
            className="flex items-center"
            onClick={handleWishlistClick}
          >
            <FontAwesomeIcon
              icon={wishlistStatus ? solidHeart : regularHeart}
              className={wishlistStatus ? 'text-red-500' : 'text-black'}
              style={{ fontSize: '1.875rem', marginLeft: '10px' }}
            />
            <span className="ml-2 self-center">
              {wishlistStatus ? 'Remove from wishlist' : 'Add to wishlist'}
            </span>
          </button>
        </div>

        <h2 className="text-xl font-bold">${product.price}</h2>
        <div className="flex">
          <StarRating rating={product.averageRating} size={1} />
          <p>{product.averageRating}</p>
        </div>

        <p className="mt-2">{product.description}</p>
        <button
          className={`${buttonColor} text-white font-bold py-2 px-4 mt-2 rounded`}
          onClick={handleAddToCart}
          disabled={cartMutation.isLoading}
        >
          {buttonText}
        </button>
        {cartMutation.isError ? <p>Error adding product to cart</p> : null}
      </div>
    </div>
  )
}

export default ViewProduct