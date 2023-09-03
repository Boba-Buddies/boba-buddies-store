import { useQuery } from 'react-query'
import { useAuth0 } from '@auth0/auth0-react'
import { fetchAllProductsAdmin } from '../../../apis/products'
import { useEffect, useState } from 'react'
import SortFilterControls from '../../../user/components/SortFilterControls/SortFilterControls'
import ShopPaginationControls from '../../../user/components/ShopPaginationControls/ShopPaginationControls'
import LoadError from '../../../user/components/LoadError/LoadError'
import ViewProducts from '../../components/ViewProducts/ViewProducts'
import ProductSearchBar from '../../components/ProductSearchBar/ProductSearchBar'

const ProductsSummary = () => {
  const { getAccessTokenSilently } = useAuth0()
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState('')
  const [filter, setFilter] = useState('')
  const productsPerPage = 15
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null)
  const [searchProductId, setSearchProductId] = useState<number | null>(null);

  useEffect(() => {
    setPage(1)
  }, [filter, sort])

  const { data: products, status: statusProducts } = useQuery(
    ['getAllProducts'],
    async () => {
      const token = await getAccessTokenSilently()
      // return await fetchAllProductsUser(token)
      return await fetchAllProductsAdmin(token)
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
    if (searchProductId) {
      return filteredProducts.filter(p => p.id === searchProductId)
    } else {
      const start = (page - 1) * productsPerPage
      const end = start + productsPerPage
      return sortedProducts.slice(start, end)
    }

  }

  const setSearchProductIdHandler = (id: number | null) => {
    setSearchProductId(id);
  }


  return (
    <>
      <LoadError status={statusProducts} />
      {products && <div
        className="flex flex-col items-center"
        style={{ marginTop: '60px', marginBottom: '100px' }}
      >
        <ProductSearchBar setSearchProductIdHanlder={setSearchProductIdHandler} />

        <SortFilterControls
          filter={filter}
          sort={sort}
          setFilter={setFilter}
          setSort={setSort}
        />
        <ViewProducts
          hoveredProductId={hoveredProductId}
          setHoveredProductId={setHoveredProductId}
          getPaginatedProducts={getPaginatedProducts}
        />
        <ShopPaginationControls
          page={page}
          totalPages={totalPages}
          changePage={changePage}
        />
      </div>}
    </>);
}

export default ProductsSummary