import { Product } from '../../../../models/Products'
import StarRating from '../StarRating/StarRating'

interface ViewProductProps {
  product: Product
}

function ViewProduct({ product }: ViewProductProps) {
  return (
    <div
      className="flex items-center max-w-5xl"
      style={{ padding: '10px' }}
    >
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
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded">
          Add to cart
        </button>
      </div>
    </div>
  )
}

export default ViewProduct
