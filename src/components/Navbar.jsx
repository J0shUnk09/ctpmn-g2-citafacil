import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/img_logo.png'

const links = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/reservar', label: 'Reservar', end: false },
  { to: '/admin', label: 'Panel admin', end: false },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="brand" onClick={closeMenu}>
          <img src={logo} alt="Logo de CitaFácil" width="48" height="48" />
          <span>CitaFácil</span>
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? 'Cerrar' : 'Menú'}
        </button>

        <nav
          id="main-nav"
          className={menuOpen ? 'main-nav is-open' : 'main-nav'}
          aria-label="Principal"
        >
          <ul>
            {links.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    isActive ? 'nav-link is-active' : 'nav-link'
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar