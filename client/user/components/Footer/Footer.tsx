import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()
  function goTo(link: string) {
    navigate(link)
  }

  const { loginWithRedirect } = useAuth0()

  const handleLoginClick = () => {
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${window.location.origin}/redirect`,
      },
    })
  }

  return (
    <footer className="text-white py-2" style={{ background: '#9B99FF' }}>
      <div className="flex justify-end pr-12">
        <div className="space-x-4">
          <div className="flex space-x-6 text-white">
            <button
              className="hover:text-rose-200 transition-colors duration-300"
              onClick={() => goTo('/')}
            >
              Home
            </button>
            <button
              className="hover:text-rose-200 transition-colors duration-300"
              onClick={() => goTo('/shop')}
            >
              Shop
            </button>
            <button
              className="hover:text-rose-200 transition-colors duration-300"
              onClick={() => goTo('/contact')}
            >
              Contact
            </button>
            <button
              className="hover:text-rose-200 transition-colors duration-300"
              onClick={handleLoginClick}
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
