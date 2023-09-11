import { Link } from 'react-router-dom'
import { AdminProduct } from '../../../../models/Products'
import StarRating from '../../../user/components/StarRating/StarRating'


interface ViewProductsProps {
  hoveredProductId: number | null
  setHoveredProductId: (id: number | null) => void
  getPaginatedProducts: () => AdminProduct[]
}

const ViewProducts = ({
  hoveredProductId,
  setHoveredProductId,
  getPaginatedProducts,
}: ViewProductsProps) => {
  return (
    <div className="flex flex-col flex-wrap">
      {getPaginatedProducts().map((product) => (
        <div key={product.id} className={product.stock < 5 && 'bg-red-300' || ''} style={{ width: 'auto' }}>
          <div
            key={product.id}
            className="border p-4 rounded-md flex flex-row items-center justify-between"
          // style={{ width: '320px' }}
          >
            <div className='w-1/4'>
              <Link
                to={`/admin/${product.id}`}
                className="w-full h-48 block"
              // style={{ marginBottom: "15px" }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-contain"
                />
              </Link>
            </div>

            <div className='flex-col w-1/4 mr-6'>
              <Link
                to={`/admin/${product.id}`}
                onMouseEnter={() => setHoveredProductId(product.id)}
                onMouseLeave={() => setHoveredProductId(null)}
                className="text-2xl font-bold mt-2 block cursor-pointer"
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
                to={`/admin/${product.id}`}
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
            <div className='w-1/5'>
              <Link
                to={`/admin/${product.id}`}
                onMouseEnter={() => setHoveredProductId(product.id)}
                onMouseLeave={() => setHoveredProductId(null)}
                className="text-xl font-bold block cursor-pointer"
                style={{
                  color:
                    hoveredProductId === product.id
                      ? '#1D4ED8'
                      : 'inherit',
                }}
              >
                ${product.price.toFixed(2)}
              </Link>
            </div>

            <div className='w-1/5'>
              <Link
                to={`/admin/${product.id}`}
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
                {`Stock: ${product.stock}`}
              </Link>
            </div>

            <div className='flex-col w-1/4'>
              <Link
                to={`/admin/${product.id}`}
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
                {product.stock && product.stock < 5 && <span className='text-red-500'>LOW STOCK</span>}
              </Link>

              <Link
                to={`/admin/${product.id}`}
                onMouseEnter={() => setHoveredProductId(product.id)}
                onMouseLeave={() => setHoveredProductId(null)}
                className="text-xl font-bold block cursor-pointer"
                style={{
                  color:
                    hoveredProductId === product.id
                      ? '#1D4ED8'
                      : 'inherit',
                }}
              >
                {product.isEnabled && <span className='text-green-600'>ENABLED</span> || <span className='text-red-600'>DISABLED</span>}
              </Link>
            </div>





          </div>
        </div>
      ))
      }
    </div >
  )
}

export default ViewProducts