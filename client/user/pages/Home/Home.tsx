import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  function goTo(link: string) {
    navigate(link)
  }
  return (
    <div>
      <div>
        <div>
          <h1>Welcome to the Boba Buddies Store</h1>
          <button onClick={() => goTo('shop')}>Buy some tea</button>
        </div>
      </div>
      <div>
        <div>
          <img src="/images/bobaLogo.png" alt="" />
        </div>
        <div>
          <button>Contact</button>
          <button>Admin login</button>
        </div>
      </div>
    </div>
  )
}

export default Home
