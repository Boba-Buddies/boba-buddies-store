import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  function goTo(link: string) {
    navigate(link)
  }
  return (
    <div
      className="items-center font-sans py-8"
      style={{ background: '#FFC5C7' }}
    >
      <div className="max-w-screen-xl w-full p-8 flex flex-col items-center mb-60">
        {/* Welcome Card */}
        <div className=" p-10 flex flex-row items-center mb-36 w-4/5">
          <img
            src="/images/home-tea.svg"
            alt="Boba Buddies Logo"
            className="max-w-full h-auto"
          />
          <div className="flex flex-col text-white">
            <img
              src="/images/home-title.svg"
              alt="Boba Buddies Logo"
              className="max-w-full h-auto"
            />
            <p>
              Dive into our colorful world of delicious flavors, hand-shaken to
              perfection. Join the fun, and become a boba buddy today!
            </p>

            <button
              onClick={() => goTo('shop')}
              className="border text-white px-6 py-2 rounded-lg hover:bg-white transition-all"
            >
              Shop
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
