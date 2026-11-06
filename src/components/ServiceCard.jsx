import { Link } from 'react-router-dom'
import { formatCurrency, formatDuration } from '../utils/formatUtils.js'

function ServiceCard({ service }) {
  const { id, name, description, durationMinutes, price } = service

  return (
    <article className="card service-card">
      <h3>{name}</h3>
      <p className="muted">{description}</p>
      <p className="service-card__meta">
        <span>{formatDuration(durationMinutes)}</span>
        <strong className="service-card__price">{formatCurrency(price)}</strong>
      </p>
      <Link
        to={`/reservar?servicio=${id}`}
        className="btn btn-secondary"
        aria-label={`Reservar ${name}`}
      >
        Reservar
      </Link>
    </article>
  )
}

export default ServiceCard