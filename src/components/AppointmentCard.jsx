import { useState } from 'react'
import { APPOINTMENT_STATUS, getEndTime } from '../utils/appointmentUtils.js'
import { formatDate, formatTime } from '../utils/dateUtils.js'
import { formatCurrency, formatDuration } from '../utils/formatUtils.js'
import StatusBadge from './StatusBadge.jsx'

// Cancelar y eliminar piden una segunda confirmación dentro de la tarjeta.
const CONFIRM_TEXTS = {
  cancel: {
    question: '¿Cancelar esta cita? El horario quedará libre.',
    yes: 'Sí, cancelar',
  },
  delete: {
    question: '¿Eliminar esta cita? No se puede deshacer.',
    yes: 'Sí, eliminar',
  },
}

function AppointmentCard({ appointment, onChangeStatus, onEdit, onDelete }) {
  const [pendingAction, setPendingAction] = useState(null)

  const {
    id,
    customerName,
    phone,
    serviceName,
    durationMinutes,
    price,
    date,
    time,
    status,
  } = appointment

  // Solo las citas pendientes o confirmadas se pueden modificar.
  // Las completadas y canceladas quedan como historial (solo se pueden eliminar).
  const canConfirm = status === APPOINTMENT_STATUS.PENDING
  const isOpen =
    status === APPOINTMENT_STATUS.PENDING ||
    status === APPOINTMENT_STATUS.CONFIRMED

  const runPendingAction = () => {
    if (pendingAction === 'cancel') {
      onChangeStatus(id, APPOINTMENT_STATUS.CANCELLED)
    }
    if (pendingAction === 'delete') {
      onDelete(id)
    }
    setPendingAction(null)
  }

  return (
    <article
      className={`card appointment-card appointment-card--${status}`}
    >
      <header className="appointment-card__header">
        <h3>{customerName}</h3>
        <StatusBadge status={status} />
      </header>

      <dl className="appointment-card__details">
        <div>
          <dt>Teléfono</dt>
          <dd>{phone}</dd>
        </div>
        <div>
          <dt>Servicio</dt>
          <dd>{serviceName}</dd>
        </div>
        <div>
          <dt>Fecha</dt>
          <dd>{formatDate(date)}</dd>
        </div>
        <div>
          <dt>Hora</dt>
          <dd>
            {formatTime(time)} a {formatTime(getEndTime(appointment))}
          </dd>
        </div>
        <div>
          <dt>Duración</dt>
          <dd>{formatDuration(durationMinutes)}</dd>
        </div>
        <div>
          <dt>Precio</dt>
          <dd>{formatCurrency(price)}</dd>
        </div>
      </dl>

      {pendingAction ? (
        <div className="confirm-bar" role="alert">
          <p>{CONFIRM_TEXTS[pendingAction].question}</p>
          <button
            type="button"
            className="btn btn-danger btn-small"
            onClick={runPendingAction}
          >
            {CONFIRM_TEXTS[pendingAction].yes}
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-small"
            onClick={() => setPendingAction(null)}
          >
            No, volver
          </button>
        </div>
      ) : (
        <div className="appointment-card__actions">
          {canConfirm && (
            <button
              type="button"
              className="btn btn-primary btn-small"
              aria-label={`Confirmar cita de ${customerName}`}
              onClick={() =>
                onChangeStatus(id, APPOINTMENT_STATUS.CONFIRMED)
              }
            >
              Confirmar
            </button>
          )}
          {isOpen && (
            <>
              <button
                type="button"
                className="btn btn-secondary btn-small"
                aria-label={`Marcar como completada la cita de ${customerName}`}
                onClick={() =>
                  onChangeStatus(id, APPOINTMENT_STATUS.COMPLETED)
                }
              >
                Completar
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-small"
                aria-label={`Editar cita de ${customerName}`}
                onClick={() => onEdit(id)}
              >
                Editar
              </button>
              <button
                type="button"
                className="btn btn-danger btn-small"
                aria-label={`Cancelar cita de ${customerName}`}
                onClick={() => setPendingAction('cancel')}
              >
                Cancelar
              </button>
            </>
          )}
          <button
            type="button"
            className="btn btn-danger btn-small"
            aria-label={`Eliminar cita de ${customerName}`}
            onClick={() => setPendingAction('delete')}
          >
            Eliminar
          </button>
        </div>
      )}
    </article>
  )
}

export default AppointmentCard