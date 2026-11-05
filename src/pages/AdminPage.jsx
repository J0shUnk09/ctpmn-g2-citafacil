import { useState } from 'react'
import AdminFilters from '../components/AdminFilters.jsx'
import AppointmentCard from '../components/AppointmentCard.jsx'
import BookingForm from '../components/BookingForm.jsx'
import { businessConfig } from '../data/businessConfig.js'
import { services } from '../data/services.js'
import '../styles/admin.css'
import '../styles/booking.css'
import {
  buildAppointmentChanges,
  filterAppointments,
  sortAppointments,
  summarizeAppointments,
} from '../utils/adminUtils.js'
import { formatDate, getTodayKey } from '../utils/dateUtils.js'
import { formatCurrency } from '../utils/formatUtils.js'

function AdminPage({ appointments, onUpdateAppointment, onDeleteAppointment }) {
  const [date, setDate] = useState(getTodayKey)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [editingId, setEditingId] = useState(null)

  const isSearching = query.trim() !== ''

  const visibleAppointments = sortAppointments(
    filterAppointments(appointments, { date, query, status }),
  )

  // Resumen del día elegido (sin importar el filtro de estado ni la búsqueda).
  const daySummary = summarizeAppointments(
    appointments.filter((appointment) => appointment.date === date),
  )

  const getHeading = () => {
    if (isSearching) return `Resultados de la búsqueda (${visibleAppointments.length})`
    if (!date) return 'Citas'
    return `Citas del ${formatDate(date)} (${visibleAppointments.length})`
  }

  const getEmptyMessage = () => {
    if (!date && !isSearching) return 'Selecciona una fecha para ver sus citas.'
    if (isSearching || status !== 'all') {
      return 'No se encontraron citas con esos filtros.'
    }
    return 'No hay citas para esta fecha.'
  }

  const handleChangeStatus = (id, newStatus) =>
    onUpdateAppointment(id, { status: newStatus })

  const handleEditSubmit = (appointment, values, service) => {
    onUpdateAppointment(
      appointment.id,
      buildAppointmentChanges(values, service),
    )
    setEditingId(null)
    // Si la cita cambió de día, se muestra el día nuevo para verla de inmediato.
    setDate(values.date)
  }

  const handleDelete = (id) => {
    onDeleteAppointment(id)
    if (editingId === id) setEditingId(null)
  }

  return (
    <section className="admin" aria-labelledby="admin-title">
      <h1 id="admin-title">Panel del negocio</h1>

      <AdminFilters
        date={date}
        query={query}
        status={status}
        onDateChange={setDate}
        onQueryChange={setQuery}
        onStatusChange={setStatus}
      />

      {isSearching ? (
        <p className="muted">
          Al buscar se muestran las citas de todas las fechas. Borra el texto
          para volver a ver un solo día.
        </p>
      ) : (
        date && (
          <p className="admin-summary">
            Citas activas: <strong>{daySummary.count}</strong> · Total
            estimado: <strong>{formatCurrency(daySummary.total)}</strong>
          </p>
        )
      )}

      <h2>{getHeading()}</h2>

      {visibleAppointments.length === 0 ? (
        <p className="muted">{getEmptyMessage()}</p>
      ) : (
        <ul className="appointment-list">
          {visibleAppointments.map((appointment) => (
            <li key={appointment.id}>
              {editingId === appointment.id ? (
                <div className="booking admin-edit">
                  <h3>Editar cita de {appointment.customerName}</h3>
                  <BookingForm
                    services={services}
                    appointments={appointments}
                    config={businessConfig}
                    appointment={appointment}
                    submitLabel="Guardar cambios"
                    onSubmit={(values, service) =>
                      handleEditSubmit(appointment, values, service)
                    }
                    onCancel={() => setEditingId(null)}
                  />
                </div>
              ) : (
                <AppointmentCard
                  appointment={appointment}
                  onChangeStatus={handleChangeStatus}
                  onEdit={setEditingId}
                  onDelete={handleDelete}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default AdminPage