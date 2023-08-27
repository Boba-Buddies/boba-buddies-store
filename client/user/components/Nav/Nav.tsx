import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { useNavigate } from 'react-router-dom'

const Nav = () => {
  const navigate = useNavigate()
  function goTo(link: string) {
    navigate(link)
  }
  return (
    <div className="bg-black h-16 flex justify-center items-center">
      <div className="flex gap-6 text-white text-sm">
        <button
          className="hover:text-rose-600 transition-colors duration-300"
          onClick={() => goTo('/')}
        >
          Home
        </button>
        <button
          className="hover:text-rose-600 transition-colors duration-300"
          onClick={() => goTo('shop')}
        >
          Shop
        </button>
        <button
          className="hover:text-rose-600 transition-colors duration-300"
          onClick={() => goTo('cart')}
        >
          Cart
        </button>
        <div className="group relative">
          <button
            className="hover:text-rose-600 transition-colors duration-300"
            onClick={() => goTo('wishlist')}
          >
            <FontAwesomeIcon icon={faHeart} className="text-xl" />
          </button>
          <span className="absolute left-[-50%] bottom-[-110%] bg-gray-500 text-white px-2 py-1 rounded shadow text-xs opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100">
            Wishlist
          </span>
        </div>
        <button
          className="hover:text-rose-600 transition-colors duration-300"
          onClick={() => goTo('profile')}
        >
          Account
        </button>
        <button className="hover:text-rose-600 transition-colors duration-300">
          Login
        </button>
      </div>
    </div>
  )
}

export default Nav
