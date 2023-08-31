import { useQuery } from 'react-query'
import { fetchAllProductsUser } from '../../../apis/products'
import LoadError from '../../components/LoadError/LoadError'
import { useState, useEffect } from 'react'
import SortFilterControls from '../../components/SortFilterControls/SortFilterControls'
import ViewShopProducts from '../../components/ViewShopProducts/ViewShopProducts'
import ShopPaginationControls from '../../components/ShopPaginationControls/ShopPaginationControls'
import { useAuth0 } from '@auth0/auth0-react'

const Shop = () => {
  const { getAccessTokenSilently } = useAuth0()
  const [filter, setFilter] = useState('')
  const [sort, setSort] = useState('')
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null)
  const [page, setPage] = useState(1)
  const productsPerPage = 15

  useEffect(() => {
    setPage(1)
  }, [filter, sort])

  const { data: products, status: statusProducts } = useQuery(
    ['getAllProducts'],
    async () => {
      const token = await getAccessTokenSilently()
      return await fetchAllProductsUser(token) 
    },
  )

  const changePage = (newPage: number) => {
    setPage(newPage)
    window.scrollTo({ top: 0 })
  }

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
            return !/milk|smoothie|yogurt/.test(lowerCaseName)
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

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage)

  const getPaginatedProducts = () => {
    const start = (page - 1) * productsPerPage
    const end = start + productsPerPage
    return sortedProducts.slice(start, end)
  }

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
            <ViewShopProducts
              hoveredProductId={hoveredProductId}
              setHoveredProductId={setHoveredProductId}
              getPaginatedProducts={getPaginatedProducts}
            />
            <ShopPaginationControls
              page={page}
              totalPages={totalPages}
              changePage={changePage}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Shop
