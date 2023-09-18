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
          <a href="/shop" className="hover:text-purple-700">
            Shop
          </a>
          <a href="/contact" className="hover:text-purple-700">
            Contact
          </a>
          <a href="/contact" className="hover:text-purple-700">
            login
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
