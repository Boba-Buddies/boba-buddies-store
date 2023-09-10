import React from 'react'

interface ReviewSortingControlsProps {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  filter: string
  setFilter: React.Dispatch<React.SetStateAction<string>>
  sort: string
  setSort: React.Dispatch<React.SetStateAction<string>>
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  totalPages: number
  totalReviews: number
}

const ReviewSortingControls: React.FC<ReviewSortingControlsProps> = ({
  search,
  setSearch,
  filter,
  setFilter,
  sort,
  setSort,
  currentPage,
  setCurrentPage,
  totalPages,
  totalReviews,
}) => {
  const lastIndex = currentPage * 20
  const firstIndex = lastIndex - 20

  return (
    <>
      {/* SEARCH */}
      <div className="border p-2 rounded flex justify-between items-center">
        <div className="flex items-center">
          <input
            className="border p-2 rounded mr-2"
            type="text"
            placeholder="Search for a product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* FILTER */}
          <p className="mx-2 font-semibold">Showing:</p>
          <select
            className="border p-2 rounded"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          >
            <option value="all">All</option>
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
          </select>

          {/* SORT */}
          <p className="mx-2 font-semibold">Filter by:</p>
          <select
            className="border p-2 rounded"
            onChange={(e) => setSort(e.target.value)}
            value={sort}
          >
            <option value="...">...</option>
            <option value="Newest first">Newest first</option>
            <option value="Oldest first">Oldest first</option>
            <option value="High to low rating">High to low rating</option>
            <option value="Low to high rating">Low to high rating</option>
          </select>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col justify-center mx-2 font-semibold">
            Showing {firstIndex + 1}-{Math.min(lastIndex, totalReviews)} of{' '}
            {totalReviews}
          </div>
          <div className="flex justify-center">
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
      </div>
    </>
  )
}

export default ReviewSortingControls
