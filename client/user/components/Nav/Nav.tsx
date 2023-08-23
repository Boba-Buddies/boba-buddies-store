import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { useNavigate } from 'react-router-dom'

const Nav = () => {
  const navigate = useNavigate()
  function goTo(link: string) {
    navigate(link)
  }
  return (
    <div className="bg-white flex flex-row justify-end items-center py-4 px-8">
      <div className="w-1/4 my-2">
        <img src="/images/bobaLogo.png" alt="logo" className="w-11/12 px-8" />
      </div>
      <div className="flex flex-row justify-end gap-6 text-sm mr-7">
        <button
          className="text-black border-2 border-black px-4 py-1 hover:shadow-lg transition-all ease-in-out duration-300"
          onClick={() => goTo('/')}
        >
          Home
        </button>

        <button
          className="text-black border-2 border-black px-4 py-1 hover:shadow-lg transition-all ease-in-out duration-300"
          onClick={() => goTo('shop')}
        >
          Shop
        </button>
        <button
          className="text-black border-2 border-black px-4 py-1 hover:shadow-lg transition-all ease-in-out duration-300"
          onClick={() => goTo('cart')}
        >
          Cart
        </button>

        <button
          className="text-black border-2 border-black px-4 py-1 hover:shadow-lg transition-all ease-in-out duration-300"
          onClick={() => goTo('profile')}
        >
          Account
        </button>
        <button className="text-black border-2 border-black px-4 py-1 hover:shadow-lg transition-all ease-in-out duration-300">
          Login
        </button>
        <button
          className="text-black  px-4 py-1 hover:text-rose-600 transition-all ease-in-out duration-300"
          onClick={() => goTo('wishlist')}
        >
          <FontAwesomeIcon icon={faHeart} className="text-2xl" />
        </button>
      </div>
    </div>
  )
}

export default Nav
