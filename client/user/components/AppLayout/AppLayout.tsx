import { Outlet } from 'react-router-dom'
import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'
import { useQuery } from 'react-query'
import { fetchIsUserAdmin } from '../../../apis/users'
import { User } from '../../../../models/Users'
import { AdminNavBar } from '../../../admin/components/AdminNavBar/AdminNavBar'
import LoadError from '../LoadError/LoadError'

function AppLayout() {
  const { data: isAdmin, status: statusIsAdmin } = useQuery(
    ['fetchIsUserAdmin'],
    async () => {
      const isAdmin: boolean = await fetchIsUserAdmin()
      return isAdmin
    },
  )

  return (
    <>
      <LoadError status={statusIsAdmin} />
      <div className="page">
        {isAdmin ? <AdminNavBar /> : <Nav />}
        <Outlet />
        {isAdmin ? <Footer /> : <Footer />}
      </div>
    </>
  )
}

export default AppLayout
