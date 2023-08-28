const Dashboard = () => {
  return (
    <div className="bg-white text-black">
      <div className="text-xl p-4">Hi userName</div>
      <div className="flex flex-col gap-10 px-5 ">
        {/* Orders  */}
        <div className="bg-gray-100 p-4 rounded">
          <h1 className="text-2xl text-center">You have ### orders today</h1>
          <div className="flex flex-row justify-end pr-4">
            <button className="bg-black rounded-lg text-white p-2 hover:bg-gray-800 transition-all w-32">
              View Orders
            </button>
          </div>
        </div>
        {/* Low Stock */}
        <div className="bg-gray-100 p-4 rounded">
          <h1 className="text-2xl text-center">Low Stock Alert!</h1>
          <div className="flex flex-row justify-center gap-7">
            <div>image1</div>
            <div>image2</div>
            <div>image3</div>
            <div>image4</div>
          </div>
          <div className="flex flex-row justify-end pr-4">
            <button className="bg-black rounded-lg text-white p-2 hover:bg-gray-800 transition-all w-32">
              Restock
            </button>
          </div>
        </div>
        {/* Emails  */}
        <div className="bg-gray-100 p-4 rounded">
          <h1 className="text-2xl text-center">
            You have ### new emails today
          </h1>
          <div className="flex flex-row justify-end pr-4">
            <button className="bg-black rounded-lg text-white p-2 hover:bg-gray-800 transition-all w-32">
              View Emails
            </button>
          </div>
        </div>
        {/* Reviews  */}
        <div className="bg-gray-100 p-4 rounded">
          <h1 className="text-2xl text-center">You have ### reviews today</h1>
          <div className="flex flex-row justify-end pr-4">
            <button className="bg-black rounded-lg text-white p-2 hover:bg-gray-800 transition-all w-32 ">
              View Reviews
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
