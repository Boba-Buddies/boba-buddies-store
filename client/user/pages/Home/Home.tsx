import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  function goTo(link: string) {
    navigate(link)
  }
  return (
    <div className="min-h-screen" style={{ background: '#FFC5C7' }}>
      <div
        className="flex items-center justify-center min-h-screen"
        style={{
          backgroundImage: `url('/images/ellipse1.svg'), url('/images/ellipse2.svg')`,
          backgroundPosition: 'bottom left, top right',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="flex items-center justify-center">
          <div className="max-w-screen-xl flex flex-col items-center">
            {/* Welcome Card */}
            <div className="p-12 space-y-12 flex flex-col md:flex-row items-center w-4/5 md">
              <img
                src="/images/home-tea.svg"
                alt="Boba Buddies Logo"
                className="max-w-full h-auto pr-10"
                style={{ width: '65%', maxWidth: '100%' }}
              />

              <div className="flex flex-col text-white text-xl space-y-8 p-10">
                <img
                  src="/images/home-title.svg"
                  alt="Boba Buddies Logo"
                  className="max-w-full h-auto"
                  style={{ width: '90%', maxWidth: '100%' }}
                />
                <p>
                  Dive into our colorful world of delicious flavors, hand-shaken
                  to perfection. Join the fun, and become a boba buddy today!
                </p>

                <button
                  onClick={() => goTo('shop')}
                  className="w-1/2 border border-white border-2 text-white px-6 py-2 rounded-2xl hover:bg-white hover:text-rose-300 transition-all"
                >
                  Shop
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
