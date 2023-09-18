import { Email } from '../../../../models/Emails'

interface DisplayCurrentEmailsProps {
  currentEmails: Email[]
}

const DisplayCurrentEmails = ({ currentEmails }: DisplayCurrentEmailsProps) => {
  return (
    <div className="divBody text-gray-600 text-sm font-light">
      {currentEmails.map((email) => (
        <div key={email.id} className="divRow border-b">
          <div className="divCell py-3 px-8 text-left whitespace-nowrap border-r w-1/4">
            {email.userName}
          </div>
          <div className="divCell py-3 px-8 text-left border-r w-1/4">
            {email.title}
          </div>
          <div className="divCell py-3 px-8 text-left w-1/4">
            {email.createdAt}
          </div>
        </div>
      ))}
    </div>
  )
}

export default DisplayCurrentEmails
