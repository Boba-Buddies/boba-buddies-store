import { Email } from '../../../../models/Emails'
import {
  format24HourTo12Hour,
  formatDateToDDMMYYYY,
} from '../../../utils/formatDate/formatDate'

interface DisplayCurrentEmailsProps {
  currentEmails: Email[]
}

const DisplayCurrentEmails = ({ currentEmails }: DisplayCurrentEmailsProps) => {
  return (
    <div className="text-gray-600 text-sm font-light">
      {currentEmails.map((email) => (
        <div key={email.id} className="flex border border-gray-300 ">
          <div className="flex-1 py-3 px-8 text-left whitespace-nowrap">
            {email.userName}
          </div>
          <div className="flex-1 py-3 px-8 text-left">{email.title}</div>
          <div className="flex-1 py-3 px-8 text-left">
            {format24HourTo12Hour(email.createdAt)}{' '}
            {formatDateToDDMMYYYY(email.createdAt)}
          </div>
        </div>
      ))}
    </div>
  )
}

export default DisplayCurrentEmails
