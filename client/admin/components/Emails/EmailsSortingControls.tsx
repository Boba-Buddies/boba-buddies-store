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
  return (
    <div className="border p-2 rounded flex flex-row justify-between items-center">
      <div className="flex items-center">
        {/* FILTER */}
        <p className="mx-2 font-semibold">Showing:</p>
        <select className="border p-2 rounded">
          <option value="all">All emails</option>
          <option value="unread">unread Emails</option>
        </select>

        {/* SORT */}
        <p className="mx-2 font-semibold">Filter by:</p>
        <select className="border p-2 rounded">
          <option value="...">...</option>
          <option value="Newest first">Newest first</option>
          <option value="Oldest first">Oldest first</option>
        </select>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col justify-center mx-2 font-semibold">
          Showing 1-10 of 100
        </div>
        <div className="flex justify-center">
          <button className="bg-gray-300 text-white font-bold py-2 px-4 rounded">
            {'<'}
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
            {'>'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmailsSortingControls
