import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from 'react-query'
import { fetchAllEmails } from '../../../apis/emails'
import LoadError from '../../../user/components/LoadError/LoadError'
import EmailsColumnTitles from '../../components/Emails/EmailsColumnTitles'

const Emails = () => {
  const { getAccessTokenSilently } = useAuth0()
  const { data: emails, status: emailStatus } = useQuery(
    ['getReviews'],
    async () => {
      const token = await getAccessTokenSilently()
      return await fetchAllEmails(token)
    },
  )
  console.log(emails)

  return (
    <>
      <LoadError status={emailStatus} />
      {/* SortingControl */}
      <div className="flex justify-center">
        <div className="p-4 w-full lg:w-11/12">
          <div className="divTable w-full bg-white mt-4 border border-gray-300">
            <EmailsColumnTitles />
          </div>
        </div>
      </div>
    </>
  )
}

export default Emails