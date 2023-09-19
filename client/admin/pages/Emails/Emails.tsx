import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from 'react-query'
import { fetchAllEmails, fetchEmailById } from '../../../apis/emails'
import LoadError from '../../../user/components/LoadError/LoadError'
import EmailsColumnTitles from '../../components/Emails/EmailsColumnTitles'
import DisplayCurrentEmails from '../../components/Emails/DisplayCurrentEmails'
import { useState } from 'react'
import { Email } from '../../../../models/Emails'
import EmailsSortingControls from '../../components/Emails/EmailsSortingControls'

const Emails = () => {
  const { getAccessTokenSilently } = useAuth0()
  const [emails, setEmails] = useState([] as Email[])

  // the 10 just for testing if the filter work or not
  const reviewsPerPage = 10

  //fetchtheData and then set
  const {
    data: fetchedmails,
    status: emailStatus,
    isLoading,
  } = useQuery(
    ['getEmails'],
    async () => {
      const token = await getAccessTokenSilently()
      return await fetchAllEmails(token)
    },
    {
      onSuccess: (data) => {
        setEmails(data)
      },
    },
  )

  console.log(emails, 'I am in the state')

  //
  return (
    <>
      <LoadError status={emailStatus} />
      {/* SortingControl */}
      {/* 
      <EmailsSortingControls /> */}
      <LoadError status={emailStatus} />
      <div className="flex justify-center overflow-x-auto">
        <div className="p-4 w-full lg:w-11/12">
          <div className="w-full bg-white mt-4 border border-gray-300">
            <EmailsColumnTitles />
            {!isLoading && fetchedmails && (
              <DisplayCurrentEmails currentEmails={emails} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Emails
