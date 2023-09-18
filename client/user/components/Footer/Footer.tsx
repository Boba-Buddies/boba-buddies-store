import { useAuth0 } from '@auth0/auth0-react'

const Footer = () => {

  const { loginWithRedirect } = useAuth0()

  const handleLoginClick = () => {
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${window.location.origin}/redirect`,
      },
    })
  }

  return (
    <footer className="bg-black text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>&copy; {new Date().getFullYear()} Boba Buddies</div>
        <div className="space-x-4">
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
          onClick={handleLoginClick}
        >
          Admin Login
        </button>
      </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
