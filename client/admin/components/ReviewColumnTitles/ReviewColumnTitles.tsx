const ReviewColumnTitles = () => {
  return (
    <div className="divRow bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
      <div className="divCell py-3 px-8" style={{ minWidth: '200px' }}>
        UserName
      </div>
      <div className="divCell py-3 px-8" style={{ minWidth: '300px' }}>
        Product
      </div>
      <div className="divCell py-3 px-8" style={{ minWidth: '100px' }}>
        Rating
      </div>
      <div className="divCell py-3 px-8" style={{ minWidth: '100px' }}>
        Status
      </div>
      <div className="divCell py-3 px-8" style={{ minWidth: '200px' }}>
        Date Created
      </div>
    </div>
  )
}

export default ReviewColumnTitles
