import { useQuery } from 'react-query';
import { fetchAllProductsUser } from '../../../apis/products';
import StarRating from '../../components/StarRating/StarRating';
import LoadError from '../../components/LoadError/LoadError';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SortFilterControls from '../../components/SortFilterControls/SortFilterControls';

const Shop = () => {
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const productsPerPage = 15;

  useEffect(() => {
    setPage(1); // Reset page to 1 when filter/sort is changed
  }, [filter, sort]);

  const { data: products, status: statusProducts } = useQuery(
    ['getAllProducts'],
    async () => {
      return await fetchAllProductsUser();
    },
  );

  const filteredProducts = products
    ? products.filter((product) => {
        const lowerCaseName = product.name.toLowerCase();
        switch (filter) {
          case 'With pearls':
            return lowerCaseName.includes('pearl');
          case 'Without pearls':
            return !lowerCaseName.includes('pearl');
          case 'Teas':
            return lowerCaseName.includes('tea');
          case 'Smoothies':
            return lowerCaseName.includes('smoothie');
          case 'Yogurts':
            return lowerCaseName.includes('yogurt');
          case 'Fruit Drinks':
            return lowerCaseName.includes('drink');
          case 'Dairy free':
            return !/milk|smoothie|yogurt/.test(lowerCaseName);
          default:
            return true;
        }
      })
    : [];

    const sortedProducts = [...filteredProducts].sort((a, b) => {
      switch (sort) {
        case 'Price (Low to High)':
          return a.price - b.price;
        case 'Price (High to Low)':
          return b.price - a.price;
        case 'Alphabetical (A to Z)':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  
    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  
    const getPaginatedProducts = () => {
      const start = (page - 1) * productsPerPage;
      const end = start + productsPerPage;
      return sortedProducts.slice(start, end);
    };
  
    return (
      <>
        <LoadError status={statusProducts} />
        {products && (
          <div className="flex flex-col items-center" style={{ marginTop: '60px', marginBottom: '100px' }}>
            <div>
              <h1 className="text-4xl font-bold mt-2">Shop for Bubble Tea</h1>
              <SortFilterControls filter={filter} sort={sort} setFilter={setFilter} setSort={setSort} />
              <div className="grid grid-cols-3 gap-4">
                {getPaginatedProducts().map((product) => (
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
              <div className="flex mt-4">
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous Page</button>
                <span className="mx-4">{page}</span>
                <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next Page</button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default Shop;