const currentYear = new Date().getFullYear()

function Footer() {
  return (
    <footer className="site-footer">
      <p>© {currentYear} CitaFácil · CTP Mercedes Norte · Grupo 2</p>
      <p className="site-footer__note">
        Los datos solo se guardan en (localStorage).
      </p>
    </footer>
  )
}

export default Footer