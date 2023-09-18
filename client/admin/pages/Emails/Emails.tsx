import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from 'react-query'
import { fetchAllEmails, fetchEmailById } from '../../../apis/emails'
import LoadError from '../../../user/components/LoadError/LoadError'
import EmailsColumnTitles from '../../components/Emails/EmailsColumnTitles'
import DisplayCurrentEmails from '../../components/Emails/DisplayCurrentEmails'
import { useState } from 'react'
import { Email } from '../../../../models/Emails'

const Emails = () => {
  const { getAccessTokenSilently } = useAuth0()
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const {
    data: fetchedmails,
    status: emailStatus,
    isLoading,
  } = useQuery(['getEmails'], async () => {
    const token = await getAccessTokenSilently()
    return await fetchAllEmails(token)
  })

  // const emailId = 2
  // const fetchAndShowEmailsDetails = async (emailId: number) => {
  //   const token = await getAccessTokenSilently()
  //   const review = await fetchEmailById(emailId, token)
  //   setSelectedReview(review)
  // }

  return (
    <>
      <LoadError status={emailStatus} />
      {/* SortingControl */}
      <LoadError status={emailStatus} />
      <div className="flex justify-center overflow-x-auto">
        <div className="p-4 w-full lg:w-11/12">
          <div className="w-full bg-white mt-4 border border-gray-300">
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
function setSelectedReview(review: any) {
  throw new Error('Function not implemented.')
}
