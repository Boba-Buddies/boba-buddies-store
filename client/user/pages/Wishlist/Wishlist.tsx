import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'

const Wishlist = () => {
  return (
    <div className="bg-zinc-700 w-full flex flex-col items-center">
      <div className="w-10/12">
        <h1 className="">WISHLIST</h1>
      </div>
      <div className="bg-lime-300 w-10/12">
        <div className="bg-sky-400 w-10/12">
          <img src="" alt="" />
          <div>
            <h1>Name</h1>
            <p>Subtile</p>
          </div>
          <h1>Price</h1>
          <button>Add to Busket</button>
          <div>
            <FontAwesomeIcon icon={faHeart} />
            <button>Remove</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wishlist
