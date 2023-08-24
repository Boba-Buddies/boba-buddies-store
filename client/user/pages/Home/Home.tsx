import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  function goTo(link: string) {
    navigate(link)
  }
  return (
    <div className="bg-white text-black flex flex-col items-center font-sans py-8">
      <div className="max-w-screen-xl w-full p-8 flex flex-col items-center mb-60">
        {/* Welcome Card */}
        <div className="bg-white border shadow-md rounded-lg p-10 flex flex-col items-center mb-36 w-4/5">
          <h1 className="text-6xl font-bold my-20  text-center w-3/4">
            Welcome to the Boba Buddies Store
          </h1>
          <button
            onClick={() => goTo('shop')}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-all"
          >
            Buy some tea!
          </button>
        </div>

        {/* Contact and Admin Login Card */}
        <div className="bg-white border shadow-md rounded-lg py-8 px-24 flex flex-row justify-between items-center w-4/5">
          <div className="w-1/4 ml-7">
            <img
              src="/images/bobaLogo.png"
              alt="Boba Buddies Logo"
              className="max-w-full h-auto"
            />
          </div>

          <button
            className="text-white bg-black px-4 py-2 rounded-lg hover:bg-gray-700 transition-all"
            onClick={() => goTo('admin')}
          >
            Admin login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
