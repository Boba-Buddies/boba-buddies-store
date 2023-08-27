import { useNavigate } from 'react-router-dom'

export const AdminNavBar = () => {
  const navigate = useNavigate()
  function goTo(link: string) {
    navigate(link)
  }

  return (
    <div>
      AdminNavBar
      <button onClick={() => goTo('admin/dashboard')}>Dashboard</button>
      <button onClick={() => goTo('admin/inbox')}>Inbox</button>
    </div>
  )
}
