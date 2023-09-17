interface OrderSortingControlsProps {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  sort: string
  setSort: React.Dispatch<React.SetStateAction<string>>
  currentPage: number
  totalPages: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

function OrderSortingControls({
  search,
  setSearch,
  sort,
  setSort,
  currentPage,
  totalPages,
  setCurrentPage,
}: OrderSortingControlsProps) {
  return (
    <div className="border p-2 rounded flex justify-between items-center">
      <div className="flex items-center">
        {/* SEARCH */}
        <input
          className="border p-2 rounded mr-2"
          type="text"
          placeholder="Search Order Number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* SORT */}
        <p className="mx-2 font-semibold">Sort by:</p>
        <select
          className="border p-2 rounded"
          onChange={(e) => setSort(e.target.value)}
          value={sort}
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center">
        <button
          className={`${
            currentPage === 1
              ? 'bg-gray-300 cursor-default'
              : 'bg-blue-500 hover:bg-blue-700'
          } text-white font-bold py-2 px-4 rounded`}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          {'<'}
        </button>
        <button
          className={`${
            currentPage === totalPages
              ? 'bg-gray-300 cursor-default'
              : 'bg-blue-500 hover:bg-blue-700'
          } text-white font-bold py-2 px-4 rounded ml-2`}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          {'>'}
        </button>
      </div>
    </div>
  )
}

export default OrderSortingControls
