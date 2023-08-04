import { Outlet } from 'react-router-dom'
import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'

function AppLayout() {
  return (
    <div className="page">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  )
}

export default AppLayout
