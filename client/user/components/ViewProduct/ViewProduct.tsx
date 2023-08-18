import { useState } from 'react'
import { Product } from '../../../../models/Products'
import { addProductToCart } from '../../../apis/cart'
import StarRating from '../StarRating/StarRating'
import { useMutation } from 'react-query'

interface ViewProductProps {
  product: Product
}

function ViewProduct({ product }: ViewProductProps) {
  const mutation = useMutation((productId: number) =>
    addProductToCart(productId),
  )
  const [buttonText, setButtonText] = useState('Add to cart')
  const [buttonColor, setButtonColor] = useState(
    'bg-blue-500 hover:bg-blue-700',
  )

  const handleAddToCart = () => {
    mutation.mutate(product.id, {
      onSuccess: () => {
        setButtonText('Item added')
        setButtonColor('bg-gray-500')

        setTimeout(() => {
          setButtonText('Add to cart')
          setButtonColor('bg-blue-500 hover:bg-blue-700')
        }, 1000)
      },
    })
  }

  return (
    <div className="flex items-center max-w-5xl" style={{ padding: '10px' }}>
      <div className="w-1/2">
        <img src={product.image} alt={product.name} className="w-full" />
      </div>
      <div className="w-1/2 ml-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <h2 className="text-xl font-bold">${product.price}</h2>
        <div className="flex">
          <StarRating rating={product.averageRating} size={1} />
          <p>{product.averageRating}</p>
        </div>

        <p className="mt-2">{product.description}</p>
        <button
          className={`${buttonColor} text-white font-bold py-2 px-4 mt-2 rounded`}
          onClick={handleAddToCart}
          disabled={mutation.isLoading}
        >
          {buttonText}
        </button>
        {mutation.isError ? <p>Error adding product to cart</p> : null}
      </div>
    </div>
  )
}

export default ViewProduct
