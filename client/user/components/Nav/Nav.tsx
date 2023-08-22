import { useNavigate } from 'react-router-dom'

const Nav = () => {
  const navigate = useNavigate()
  function goTo(link: string) {
    navigate(link)
  }
  return (
    <div className="bg-red-300 flex flex-row justify-between">
      <div className="w-1/5">
        <img src="/images/bobaLogo.png" alt="logo" />
      </div>
      <div className="flex flex-row gap-7 mr-8">
        <button onClick={() => goTo('/')}>Home</button>
        <button onClick={() => goTo('shop')}>Shop</button>
        <button onClick={() => goTo('cart')}>Cart</button>
        <button onClick={() => goTo('wishlist')}>WishList</button>
        <button onClick={() => goTo('profile')}>Account</button>
        <button>Login</button>
      </div>
    </div>
  )
}

export default Nav
