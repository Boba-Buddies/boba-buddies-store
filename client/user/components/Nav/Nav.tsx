const Nav = () => {
  return (
    <div className="bg-red-300 flex flex-row justify-between">
      <div className="w-1/5">
        <img src="/images/bobaLogo.png" alt="logo" />
      </div>
      <div className="flex flex-row gap-7 mr-8">
        <button>Home</button>
        <button>Shop</button>
        <button>Cart</button>
        <button>Wishlist</button>
        <button>Account</button>
        <button>Login</button>
      </div>
    </div>
  )
}

export default Nav
