import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { useQuery } from 'react-query'
import { fetchWishlist } from '../../../apis/wishlist'
import LoadError from '../../components/LoadError/LoadError'
import { WishlistProduct } from '../../../../models/Wishlist'

const Wishlist = () => {
  const { isLoading, data, status } = useQuery('fetchWishlist', fetchWishlist)

  return (
    <>
      <LoadError status={status} />
      <div className="bg-zinc-700 w-full flex flex-col items-center">
        <div className="w-10/12">
          <h1 className="">WISHLIST</h1>
        </div>
        <div className="bg-lime-300 w-10/12">
          {!isLoading &&
            data &&
            data.map((item: WishlistProduct) => (
              <div
                key={item.id}
                className="bg-sky-400 w-10/12 flex flex-row gap-10"
              >
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-3/12"
                />
                <h1>{item.productName}</h1>
                <h1>${item.productPrice.toFixed(2)}</h1>
                <button className="w-1/6">Add to Cart</button>
                <div className="flex flex-col items-center">
                  <FontAwesomeIcon icon={faHeart} />
                  <button>Remove</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default Wishlist
