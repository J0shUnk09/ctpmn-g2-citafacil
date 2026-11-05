import { Outlet } from 'react-router-dom'
import Footer from './Footer.jsx'
import Navbar from './Navbar.jsx'

function Layout() {
  return (
    <>
      <Navbar />
      <main className="main-container">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout