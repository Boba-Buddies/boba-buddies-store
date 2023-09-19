import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from 'react-query'
import { fetchAllEmails, fetchEmailById } from '../../../apis/emails'
import LoadError from '../../../user/components/LoadError/LoadError'
import EmailsColumnTitles from '../../components/Emails/EmailsColumnTitles'
import DisplayCurrentEmails from '../../components/Emails/DisplayCurrentEmails'
import { useEffect, useState } from 'react'
import { Email } from '../../../../models/Emails'
import EmailsSortingControls from '../../components/Emails/EmailsSortingControls'

const Emails = () => {
  const { getAccessTokenSilently } = useAuth0()
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('Newest first')
  const [sortedEmails, setSortedEmails] = useState<Email[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  // the 10 just for testing if the filter work or not
  const emailsPerPage = 10

  // fetche All the emails
  const {
    data: fetchedmails,
    status: emailStatus,
    isLoading,
  } = useQuery(['getEmails'], async () => {
    const token = await getAccessTokenSilently()
    return (await fetchAllEmails(token)) as Email[]
  })

  useEffect(() => {
    if (!isLoading && fetchedmails) {
      setSortedEmails(fetchedmails)
    }
  }, [sort, fetchedmails, isLoading])

  const filteredAndSortedEmails = fetchedmails
    ?.filter((email) => {
      if (filter === 'all') return true
      if (filter === 'unread') return !email.isRead
      return true
    })
    .sort((a, b) => {
      switch (sort) {
        case 'Newest first':
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        case 'Oldest first':
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
        default:
          return 0
      }
    })

  const lastIndex = currentPage * emailsPerPage
  const firstIndex = lastIndex - emailsPerPage
  const currentEmails = filteredAndSortedEmails?.slice(firstIndex, lastIndex)
  const totalPages = Math.ceil(
    (filteredAndSortedEmails?.length ?? 0) / emailsPerPage,
  )
  return (
    <>
      <LoadError status={emailStatus} />

      {!isLoading &&
        fetchedmails &&
        currentEmails &&
        filteredAndSortedEmails && (
          <div className="flex justify-center overflow-x-auto">
            <div className="p-4 w-full lg:w-11/12">
              {/* SortingControl */}
              <EmailsSortingControls
                filter={filter}
                setFilter={setFilter}
                sort={sort}
                setSort={setSort}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                totalEmails={filteredAndSortedEmails.length}
              />
              <div className="w-full bg-white mt-4 border border-gray-300">
                <EmailsColumnTitles />

                <DisplayCurrentEmails currentEmails={sortedEmails} />
              </div>
            </div>
          </div>
        )}
    </>
  )
}

export default Emails
