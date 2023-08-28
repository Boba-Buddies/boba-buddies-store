import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { useNavigate } from 'react-router-dom'

const Nav = () => {
  const navigate = useNavigate()
  function goTo(link: string) {
    navigate(link)
  }
  return (
    <div className="bg-black h-16 flex justify-between items-center">
      <div className="flex align-center gap-4 text-white">
        <button
          className="hover:text-purple-700 transition-colors duration-300"
          onClick={() => goTo('/')}
        >
          Home
        </button>
        <button
          className="hover:text-purple-700 transition-colors duration-300"
          onClick={() => goTo('shop')}
        >
          Shop
        </button>
        <button
          className="hover:text-purple-700 transition-colors duration-300"
          onClick={() => goTo('cart')}
        >
          Cart
        </button>

        <button
          className="hover:text-purple-700 transition-colors duration-300"
          onClick={() => goTo('profile')}
        >
          Account
        </button>
        <div className="group relative">
          <button
            className="hover:text-purple-700 transition-colors duration-300"
            onClick={() => goTo('wishlist')}
          >
            <FontAwesomeIcon icon={faHeart} className="text-xl" />
          </button>
          <span className="absolute left-1/2 -bottom-6 bg-gray-500 text-white px-2 py-1 rounded shadow text-xs opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100">
            Wishlist
          </span>
        </div>
      </div>
      <div className="p-4" style={{ background: 'blue' }}>
        <button className="text-white hover:text-purple-700 transition-colors duration-300">
          Login
        </button>
      </div>
    </div>
  )
}

export default Nav
