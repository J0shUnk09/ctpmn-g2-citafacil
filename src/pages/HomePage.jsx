import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <h1 id="hero-title">Agenda tu cita de forma rápida y sin llamadas</h1>
        <p>
          Selecciona el servicio de tu preferencia y aparta tu espacio en
          segundos.
        </p>
        <Link to="/reservar" className="btn btn-primary">
          Reservar cita
        </Link>
      </section>

      <section aria-labelledby="services-title">
        <h2 id="services-title">Nuestros servicios</h2>
        <p className="muted">
          Aquí aparecerá el catálogo de servicios (Etapa 2).
        </p>
      </section>
    </>
  )
}

export default HomePage