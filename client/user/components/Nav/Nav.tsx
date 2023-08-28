import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const Nav = () => {
  const navigate = useNavigate()
  function goTo(link: string) {
    navigate(link)
  }

  const { isAuthenticated, loginWithRedirect } = useAuth0()

  const handleProfileClick = () => {
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${window.location.origin}/redirect`,
      },
    })
    if (isAuthenticated) {
      // If the user is authenticated, redirect them to the '/profile' route.
      goTo('/profile')
    } else {
      // If the user is not authenticated, redirect them to the Auth0 login page.
      window.location.href = 'YOUR_AUTH0_LOGIN_URL_HERE'
    }
  }

  return (
    <nav className="bg-black h-16 flex justify-between items-center px-6 md:px-12 lg:px-16">
      <div className="flex space-x-6 text-white">
        <button
          className="hover:text-purple-700 transition-colors duration-300"
          onClick={() => goTo('/')}
        >
          Home
        </button>
        <button
          className="hover:text-purple-700 transition-colors duration-300"
          onClick={() => goTo('/shop')}
        >
          Shop
        </button>
        <button
          className="hover:text-purple-700 transition-colors duration-300"
          onClick={() => goTo('/cart')}
        >
          Cart
        </button>
      </div>

      <div className="flex space-x-6 text-white">
        <div className="group relative">
          <button
            className="hover:text-purple-700 transition-colors duration-300 flex items-center"
            onClick={handleProfileClick}
          >
            <img
              src="/images/user.svg"
              alt="Profile Icon"
              className="h-5 w-5 "
            />
          </button>
          <span className="absolute left-1/2 -bottom-6 bg-gray-500 text-white px-2 py-1 rounded shadow text-xs opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100">
            Account
          </span>
        </div>

        <div className="group relative">
          <button onClick={() => goTo('/wishlist')}>
            <FontAwesomeIcon icon={faHeart} className="text-xl" />
          </button>
          <span className="absolute left-1/2 -bottom-6 bg-gray-500 text-white px-2 py-1 rounded shadow text-xs opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100">
            Wishlist
          </span>
        </div>
      </div>
    </nav>
  )
}

export default Nav
