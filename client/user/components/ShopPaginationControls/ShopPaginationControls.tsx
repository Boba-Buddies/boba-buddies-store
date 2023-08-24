interface ShopPaginationControlsProps {
  page: number
  totalPages: number
  changePage: (newPage: number) => void
}

const ShopPaginationControls = ({
  page,
  totalPages,
  changePage,
}: ShopPaginationControlsProps) => {
  return (
    <div className="flex mt-4 justify-center" style={{ marginTop: '40px' }}>
      <button
        className={`${
          page === 1
            ? 'bg-gray-300 cursor-default'
            : 'bg-blue-500 hover:bg-blue-700'
        } text-white font-bold py-2 px-4 mt-2 rounded-full w-128`}
        disabled={page === 1}
        onClick={() => changePage(page - 1)}
      >
        Prev Page
      </button>
      <div className="inline-block bg-gray-100 rounded-full px-3 py-2 text-l font-bold text-gray-700 mt-2 ml-2 mr-2 w-12 text-center">
        {page}
      </div>
      <button
        className={`${
          page === totalPages
            ? 'bg-gray-300 cursor-default'
            : 'bg-blue-500 hover:bg-blue-700'
        } text-white font-bold py-2 px-4 mt-2 rounded-full w-128`}
        disabled={page === totalPages}
        onClick={() => changePage(page + 1)}
      >
        Next Page
      </button>
    </div>
  )
}

export default ShopPaginationControls
