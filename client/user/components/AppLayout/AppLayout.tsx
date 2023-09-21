import { Outlet } from 'react-router-dom'
import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'
import { useQuery } from 'react-query'
import { fetchIsUserAdmin } from '../../../apis/users'
import { User } from '../../../../models/Users'
import { AdminNavBar } from '../../../admin/components/AdminNavBar/AdminNavBar'
import LoadError from '../LoadError/LoadError'
import { useAuth0 } from '@auth0/auth0-react'

function AppLayout() {
  const { getAccessTokenSilently } = useAuth0()
  const { data: isAdmin, status: statusIsAdmin } = useQuery(
    ['fetchIsUserAdmin'],
    async () => {
      const token = await getAccessTokenSilently()
      const isAdmin: boolean = await fetchIsUserAdmin(token)
      return isAdmin
    },
  )

  return (
    <div className="flex flex-col min-h-screen">
      <LoadError status={statusIsAdmin} />

      {isAdmin ? <AdminNavBar /> : <Nav />}

      <div className="flex-grow">
        <Outlet />
      </div>

      {/* Footer */}
      {isAdmin ? <Footer /> : <Footer />}
    </div>
  )
}

export default AppLayout
