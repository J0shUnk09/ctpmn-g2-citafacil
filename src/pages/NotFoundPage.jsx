import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section aria-labelledby="notfound-title">
      <h1 id="notfound-title">Página no encontrada</h1>
      <p className="muted">La dirección que escribiste no existe.</p>
      <Link to="/" className="btn btn-primary">
        Volver al inicio
      </Link>
    </section>
  )
}

export default NotFoundPage