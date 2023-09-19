interface EmailSortingControlsProps {
  filter: string
  setFilter: React.Dispatch<React.SetStateAction<string>>
  sort: string
  setSort: React.Dispatch<React.SetStateAction<string>>
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  totalPages: number
  totalEmails: number
}

const EmailsSortingControls: React.FC<EmailSortingControlsProps> = ({
  filter,
  setFilter,
  sort,
  setSort,
  currentPage,
  setCurrentPage,
  totalPages,
  totalEmails,
}) => {
  const lastIndex = currentPage * 10
  const firstIndex = lastIndex - 10
  return (
    <div className="border p-2 rounded flex flex-row justify-between items-center">
      <div className="flex items-center">
        {/* FILTER */}
        <p className="mx-2 font-semibold">Showing:</p>
        <select
          className="border p-2 rounded"
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        >
          <option value="all">All emails</option>
          <option value="unread">unread Emails</option>
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
        </select>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col justify-center mx-2 font-semibold">
          Showing {firstIndex + 1}-{Math.min(lastIndex, totalEmails)} of{' '}
          {totalEmails}
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
  )
}

export default EmailsSortingControls
