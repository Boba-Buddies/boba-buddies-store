import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from 'react-query'
import { fetchAllEmails } from '../../../apis/emails'
import LoadError from '../../../user/components/LoadError/LoadError'
import EmailsColumnTitles from '../../components/Emails/EmailsColumnTitles'
import DisplayCurrentEmails from '../../components/Emails/DisplayCurrentEmails'

const Emails = () => {
  const { getAccessTokenSilently } = useAuth0()
  const {
    data: fetchedmails,
    status: emailStatus,
    isLoading,
  } = useQuery(['getEmails'], async () => {
    const token = await getAccessTokenSilently()
    return await fetchAllEmails(token)
  })
  console.log(fetchedmails)

  return (
    <>
      <LoadError status={emailStatus} />
      {/* SortingControl */}
      <LoadError status={emailStatus} />
      <div className="flex justify-center overflow-x-auto">
        <div className="p-4 w-full lg:w-11/12">
          <div className="divTable w-full bg-white mt-4 border border-gray-300">
            <EmailsColumnTitles />
            {!isLoading && fetchedmails && (
              <DisplayCurrentEmails currentEmails={fetchedmails} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Emails
