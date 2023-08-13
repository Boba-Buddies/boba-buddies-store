import { Product } from '../../../../models/Products'

interface ProductPreviewProps {
  product: Product
}

function ViewProduct({ product }: ProductPreviewProps) {
  return (
    <div className="flex items-center max-w-5xl border border-black rounded">
      <div className="w-1/2">
        <img src={product.image} alt={product.name} className="w-full" />
      </div>
      <div className="w-1/2 ml-4">
        <h1 className="text-xl font-bold">{product.name}</h1>
        <h2 className="text-lg mt-2">${product.price}</h2>
        <p className="mt-1">Rating : {product.averageRating}</p>
        <p className="mt-2">{product.description}</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded">
          Add to cart
        </button>
      </div>
    </div>
  )
}

export default ViewProduct
