import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import BookingConfirmation from '../components/BookingConfirmation.jsx'
import BookingForm from '../components/BookingForm.jsx'
import { businessConfig } from '../data/businessConfig.js'
import { services } from '../data/services.js'
import '../styles/booking.css'
import { createAppointment } from '../utils/appointmentUtils.js'

function BookingPage({ appointments, onAddAppointment }) {
  const [searchParams] = useSearchParams()
  const [confirmedAppointment, setConfirmedAppointment] = useState(null)

  // Si se llegó desde una tarjeta del catálogo (/reservar?servicio=corte),
  // ese servicio queda preseleccionado.
  const requestedId = searchParams.get('servicio')
  const initialServiceId = services.some((service) => service.id === requestedId)
    ? requestedId
    : ''

  const handleSubmit = (values, service) => {
    const appointment = createAppointment(values, service)
    onAddAppointment(appointment)
    setConfirmedAppointment(appointment)
  }

  return (
    <section className="booking" aria-labelledby="booking-title">
      <h1 id="booking-title">Reservar cita</h1>
      <p className="muted">
        Elige servicio y fecha: solo se muestran los horarios libres.
      </p>

      {confirmedAppointment ? (
        <BookingConfirmation
          appointment={confirmedAppointment}
          onNewBooking={() => setConfirmedAppointment(null)}
        />
      ) : (
        <BookingForm
          services={services}
          appointments={appointments}
          config={businessConfig}
          initialServiceId={initialServiceId}
          onSubmit={handleSubmit}
        />
      )}
    </section>
  )
}

export default BookingPage