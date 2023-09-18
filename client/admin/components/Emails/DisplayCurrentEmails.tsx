import { Email } from '../../../../models/Emails'

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
          <div className="flex-1 py-3 px-8 text-left">{email.createdAt}</div>
        </div>
      ))}
    </div>
  )
}

export default DisplayCurrentEmails
