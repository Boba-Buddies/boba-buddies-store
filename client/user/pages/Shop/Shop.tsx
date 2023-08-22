import { useQuery } from 'react-query'
import { fetchAllProductsUser } from '../../../apis/products'
import StarRating from '../../components/StarRating/StarRating'
import LoadError from '../../components/LoadError/LoadError'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Shop = () => {
  const [filter, setFilter] = useState('')
  const [sort, setSort] = useState('')
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null)

  const { data: products, status: statusProducts } = useQuery(
    ['getAllProducts'],
    async () => {
      return await fetchAllProductsUser()
    },
  )

  const filteredProducts = products
    ? products.filter((product) => {
        const lowerCaseName = product.name.toLowerCase()
        switch (filter) {
          case 'With pearls':
            return lowerCaseName.includes('pearl')
          case 'Without pearls':
            return !lowerCaseName.includes('pearl')
          case 'Teas':
            return lowerCaseName.includes('tea')
          case 'Smoothies':
            return lowerCaseName.includes('smoothie')
          case 'Yogurts':
            return lowerCaseName.includes('yogurt')
          case 'Fruit Drinks':
            return lowerCaseName.includes('drink')
          case 'Dairy free':
            return !lowerCaseName.includes('milk')
          default:
            return true
        }
      })
    : []

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case 'Price (Low to High)':
        return a.price - b.price
      case 'Price (High to Low)':
        return b.price - a.price
      default:
        return 0
    }
  })

  return (
    <>
      <LoadError status={statusProducts} />
      {products && (
        <div className="flex flex-col items-center">
          <div>
            <div className="bg-red">
              <h1 className="text-3xl font-bold mt-2">Shop for Bubble Tea</h1>
              <div>
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
                  <option value="Fruit Drinks">Fruit drinks</option>
                  <option value="Dairy free">Dairy free</option>
                </select>

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
                  <option value="Price (Low to High)">Price (Low to High)</option>
                  <option value="Price (High to Low)">Price (High to Low)</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  className="border p-4 rounded-md flex flex-col justify-between"
                  style={{ width: '350px' }}
                >
                  <Link
                    to={`/shop/${product.id}`}
                    className="w-full h-48 block"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-contain"
                    />
                  </Link>

                  <div>
                    <Link
                      to={`/shop/${product.id}`}
                      onMouseEnter={() => setHoveredProductId(product.id)}
                      onMouseLeave={() => setHoveredProductId(null)}
                      className="text-xl font-bold mt-2 block cursor-pointer"
                      style={{
                        color:
                          hoveredProductId === product.id ? '#1D4ED8' : 'inherit',
                      }}
                    >
                      {product.name}
                    </Link>

                    <Link
                      to={`/shop/${product.id}`}
                      onMouseEnter={() => setHoveredProductId(product.id)}
                      onMouseLeave={() => setHoveredProductId(null)}
                      className="text-lg text-gray-600 block cursor-pointer"
                      style={{
                        color:
                          hoveredProductId === product.id ? '#1D4ED8' : 'inherit',
                      }}
                    >
                      ${product.price.toFixed(2)}
                    </Link>

                    <Link
                      to={`/shop/${product.id}`}
                      className="block cursor-pointer"
                    >
                      <div className="flex items-center mt-2">
                        <span className="text-yellow-400">
                          <StarRating
                            rating={product.averageRating}
                            size={1.5}
                          />
                        </span>
                        <span className="ml-2 text-sm text-gray-500">
                          ({product.averageRating})
                        </span>
                      </div>
                    </Link>
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
