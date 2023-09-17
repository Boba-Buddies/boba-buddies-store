import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from 'react-query'
import { fetchAllEmails } from '../../../apis/emails'
import LoadError from '../../../user/components/LoadError/LoadError'

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
      <div>
        <div>This a sortingControl Email box</div>
      </div>
      <div>Email</div>
    </>
  )
}

export default Emails
