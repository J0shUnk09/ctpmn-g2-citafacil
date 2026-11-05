import { Link } from 'react-router-dom'
import { getEndTime } from '../utils/appointmentUtils.js'
import { formatDate, formatTime } from '../utils/dateUtils.js'
import { formatCurrency, formatDuration } from '../utils/formatUtils.js'

function BookingConfirmation({ appointment, onNewBooking }) {
  const { customerName, phone, serviceName, durationMinutes, price, date, time } =
    appointment

  return (
    <div className="card confirmation" role="status">
      <h2>¡Cita reservada!</h2>
      <p>
        Gracias, {customerName}. Tu cita quedó registrada y está pendiente de
        confirmación por el negocio.
      </p>

      <dl className="summary-list">
        <dt>Servicio</dt>
        <dd>{serviceName}</dd>
        <dt>Fecha</dt>
        <dd>{formatDate(date)}</dd>
        <dt>Hora</dt>
        <dd>
          {formatTime(time)} a {formatTime(getEndTime(appointment))}
        </dd>
        <dt>Duración</dt>
        <dd>{formatDuration(durationMinutes)}</dd>
        <dt>Precio</dt>
        <dd>{formatCurrency(price)}</dd>
        <dt>Teléfono</dt>
        <dd>{phone}</dd>
      </dl>

      <div className="confirmation__actions">
        <button type="button" className="btn btn-primary" onClick={onNewBooking}>
          Reservar otra cita
        </button>
        <Link to="/" className="btn btn-secondary">
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}

export default BookingConfirmation