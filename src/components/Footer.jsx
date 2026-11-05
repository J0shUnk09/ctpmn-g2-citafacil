const currentYear = new Date().getFullYear()

function Footer() {
  return (
    <footer className="site-footer">
      <p>© {currentYear} CitaFácil · CTP Mercedes Norte · Prototipo educativo</p>
      <p className="site-footer__note">
        Las citas se guardan solo en este navegador (localStorage). No hay
        servidor ni base de datos compartida.
      </p>
    </footer>
  )
}

export default Footer