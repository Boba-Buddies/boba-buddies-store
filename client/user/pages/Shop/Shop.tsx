import { useQuery } from 'react-query'
import { fetchAllProductsUser } from '../../../apis/products'
import StarRating from '../../components/StarRating/StarRating'
import LoadError from '../../components/LoadError/LoadError'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import SortFilterControls from '../../components/SortFilterControls/SortFilterControls'

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
            return !/milk|smoothie|yogurt/.test(lowerCaseName) //This is a regular expression
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
      case 'Alphabetical (A to Z)':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  return (
    <>
      <LoadError status={statusProducts} />
      {products && (
        <div
          className="flex flex-col items-center"
          style={{ marginTop: '60px', marginBottom: '100px' }}
        >
          <div>
            <h1 className="text-4xl font-bold mt-2">Shop for Bubble Tea</h1>
            <SortFilterControls
              filter={filter}
              sort={sort}
              setFilter={setFilter}
              setSort={setSort}
            />
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
                          hoveredProductId === product.id
                            ? '#1D4ED8'
                            : 'inherit',
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
                          hoveredProductId === product.id
                            ? '#1D4ED8'
                            : 'inherit',
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
