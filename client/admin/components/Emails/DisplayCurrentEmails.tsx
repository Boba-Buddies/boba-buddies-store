import { Email } from '../../../../models/Emails'

interface DisplayCurrentEmailsProps {
  currentEmails: Email[]
}

const DisplayCurrentEmails = ({ currentEmails }: DisplayCurrentEmailsProps) => {
  return (
    <div className="divBody text-gray-600 text-sm font-light">
      {currentEmails.map((email) => (
        <div key={email.id}>
          <div
            className="divCell py-3 px-8 text-left whitespace-nowrap"
            style={{ minWidth: '50px' }}
          >
            {email.userName}
          </div>
          <div
            className="divCell py-3 px-8 text-left"
            style={{ minWidth: '50px' }}
          >
            {email.title}
          </div>
          <div
            className="divCell py-3 px-8 text-left"
            style={{ minWidth: '50px' }}
          >
            {email.createdAt}
          </div>
        </div>
      ))}
    </div>
  )
}

export default DisplayCurrentEmails
