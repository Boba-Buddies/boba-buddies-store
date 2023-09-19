import { useEffect, useRef } from 'react'
import { useQuery, useMutation } from 'react-query'
import { useAuth0 } from '@auth0/auth0-react'
import { fetchEmailById } from '../../../apis/emails'
import LoadError from '../../../user/components/LoadError/LoadError'
import { Email } from '../../../../models/Emails'
import { formatDateToDDMMYYYY } from '../../../utils/formatDate/formatDate'

interface EmailPopupProps {
  emailId: number
  closeEmailPopup: () => void
}

const ReviewPopup = ({ emailId, closeEmailPopup }: EmailPopupProps) => {
  const { getAccessTokenSilently } = useAuth0()

  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        closeEmailPopup()
      }
    }

    window.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [closeEmailPopup])

  const {
    data: email,
    status,
    refetch,
  } = useQuery(
    ['fetchEmailById', emailId],
    async () => {
      const token = await getAccessTokenSilently()
      return (await fetchEmailById(token, emailId)) as Email
    },
    {
      refetchOnWindowFocus: false,
    },
  )

  return (
    <>
      <LoadError status={status} />
      {status === 'success' && email && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div
            ref={popupRef}
            className="bg-white p-5 rounded-lg flex flex-col justify-between w-4/5 max-w-lg min-h-[400px]"
          >
            <div>
              <button
                onClick={closeEmailPopup}
                className="px-2 py-1 text-white bg-blue-600 rounded hover:bg-blue-700 mb-5"
              >
                Back to inbox
              </button>
              <div className="flex justify-between font-bold text-lg">
                <h2>{email.userName}</h2>
                <p>{formatDateToDDMMYYYY(email.createdAt)}</p>
              </div>
            </div>
            <div>
              <h2 className="font-bold">Description:</h2>
              <p>{email.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ReviewPopup
