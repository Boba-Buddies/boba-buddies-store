import { useQuery } from 'react-query'
import { fetchAllProductsUser } from '../../../apis/products'
import StarRating from '../../components/StarRating/StarRating'
import LoadError from '../../components/LoadError/LoadError'
import { useState } from 'react'

//For your reference:
//   products: {
//   id: number
//   name: string
//   image: string
//   price: number
//   description: string
//   stock: number
//   averageRating: number
// }

const Shop = () => {
  const [filter, setFilter] = useState('')
  const [sort, setSort] = useState('')

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
        <div className="flex flex-col items-center">
          <div>
            <div className="bg-red">
              <h1 className="text-3xl font-bold mt-2">Shop for Bubble Tea</h1>
              <div>
                {/* Filter */}
                <label htmlFor="filter">Filter by: </label>
                <select
                  name="filter"
                  id="filter"
                  onChange={(e) => setFilter(e.target.value)}
                  value={filter}
                >
                  <option value="">...</option>
                  <option value="With pearls">With pearls</option>
                  <option value="Without pearls">Without pearls</option>
                  <option value="Teas">Teas</option>
                  <option value="Smoothies">Smoothies</option>
                  <option value="Yogurts">Yogurts</option>
                  <option value="Drinks">Drinks</option>
                  <option value="Dairy free">Dairy free</option>
                </select>

                {/* Sort */}
                <label htmlFor="sort" className="ml-4">
                  Sort by:{' '}
                </label>
                <select
                  name="sort"
                  id="sort"
                  onChange={(e) => setSort(e.target.value)}
                  value={sort}
                >
                  <option value="">...</option>
                  <option value="Price (ascending)">Price (ascending)</option>
                  <option value="Price (Descending)">Price (Descending)</option>
                </select>
              </div>
            </div>
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
          </div>
        </div>
      )}
    </>
  )
}

export default Shop
