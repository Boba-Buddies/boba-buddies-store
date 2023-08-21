import { useQuery } from 'react-query'
import { fetchAllProductsUser } from '../../../apis/products'
import StarRating from '../../components/StarRating/StarRating'
import LoadError from '../../components/LoadError/LoadError'

const Shop = () => {
  const { data: products, status: statusProducts } = useQuery(
    ['getAllProducts'],
    async () => {
      return await fetchAllProductsUser()
    },
  )

  return (
    <>
      <LoadError status={statusProducts} />
      {products && (
        <div className="grid grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-md flex flex-col justify-between"
              style={{ maxWidth: '350px' }}
            >
              <div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-contain"
                />
              </div>

              <div>
                <h3 className="text-xl font-bold mt-2">{product.name}</h3>
                <p className="text-lg text-gray-600">
                  ${product.price.toFixed(2)}
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-400">
                    <StarRating rating={product.averageRating} size={1.5} />
                  </span>
                  <span className="ml-2 text-sm text-gray-500">
                    ({product.averageRating})
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Shop
