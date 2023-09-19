import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  function goTo(link: string) {
    navigate(link)
  }
  return (
    <div
      className=" flex items-center justify-center"
      style={{ background: '#FFC5C7' }}
    >
      <div className="max-w-screen-xl flex flex-col items-center p-2">
        {/* Welcome Card */}
        <div className=" p-10 space-y-12 flex flex-row items-center w-4/5">
          <img
            src="/images/home-tea.svg"
            alt="Boba Buddies Logo"
            className="max-w-full h-auto"
            style={{ width: '50%', maxWidth: '50%' }}
          />
          <div className="flex flex-col text-white text-xl space-y-4 p-10">
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
              className="w-60 border border-white border-2 text-white px-6 py-2 rounded-lg hover:bg-white hover:text-rose-300 transition-all"
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
