import { useState } from 'react'
import {
  createAppointment,
  getAvailableSlots,
  getBusinessHours,
  validateBooking,
} from '../utils/appointmentUtils.js'
import { getTodayKey, isPastDate } from '../utils/dateUtils.js'
import { formatCurrency, formatDuration } from '../utils/formatUtils.js'
import AvailableSlots from './AvailableSlots.jsx'
import FormField from './FormField.jsx'

function BookingForm({
  services,
  appointments,
  config,
  initialServiceId = '',
  onBooked,
}) {
  const [values, setValues] = useState({
    customerName: '',
    phone: '',
    serviceId: initialServiceId,
    date: '',
    time: '',
  })
  const [errors, setErrors] = useState({})

  const selectedService = services.find((item) => item.id === values.serviceId)

  // Se recalcula en cada render: cuando cambia el servicio, la fecha o las citas
  // guardadas, la lista de horarios disponibles se actualiza sola.
  const slots =
    selectedService && values.date
      ? getAvailableSlots({
          date: values.date,
          durationMinutes: selectedService.durationMinutes,
          appointments,
          config,
        })
      : []

  const getSlotsMessage = () => {
    if (!selectedService || !values.date) {
      return 'Elige un servicio y una fecha para ver los horarios disponibles.'
    }
    if (isPastDate(values.date)) {
      return 'Esa fecha ya pasó. Elige hoy o una fecha futura.'
    }
    if (!getBusinessHours(values.date, config)) {
      return 'El negocio no atiende ese día. Elige otra fecha.'
    }
    if (slots.length === 0) {
      return 'No quedan horarios disponibles ese día. Prueba con otra fecha.'
    }
    return ''
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    // Si cambia el servicio o la fecha, los horarios posibles cambian:
    // se limpia la hora que estaba elegida.
    const resetsTime = name === 'serviceId' || name === 'date'

    setValues((current) => ({
      ...current,
      [name]: value,
      ...(resetsTime ? { time: '' } : {}),
    }))
    setErrors((current) => ({
      ...current,
      [name]: undefined,
      ...(resetsTime ? { time: undefined } : {}),
    }))
  }

  const selectTime = (time) => {
    setValues((current) => ({ ...current, time }))
    setErrors((current) => ({ ...current, time: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const foundErrors = validateBooking(values, {
      services,
      appointments,
      config,
    })
    setErrors(foundErrors)
    if (Object.keys(foundErrors).length > 0) return

    onBooked(createAppointment(values, selectedService))
  }

  // Atributos comunes de cada campo controlado (valor, evento y accesibilidad).
  const fieldProps = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: handleChange,
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })

  return (
    <form className="card booking-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <FormField
          id="customerName"
          label="Nombre del cliente"
          error={errors.customerName}
        >
          <input
            type="text"
            autoComplete="name"
            placeholder="Ej. María Pérez"
            {...fieldProps('customerName')}
          />
        </FormField>

        <FormField id="phone" label="Teléfono (8 dígitos)" error={errors.phone}>
          <input
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="Ej. 88888888"
            {...fieldProps('phone')}
          />
        </FormField>

        <FormField id="serviceId" label="Servicio" error={errors.serviceId}>
          <select {...fieldProps('serviceId')}>
            <option value="">Selecciona un servicio</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {`${service.name} · ${formatDuration(service.durationMinutes)} · ${formatCurrency(service.price)}`}
              </option>
            ))}
          </select>
        </FormField>

        <FormField id="date" label="Fecha" error={errors.date}>
          <input type="date" min={getTodayKey()} {...fieldProps('date')} />
        </FormField>
      </div>

      <AvailableSlots
        slots={slots}
        selectedTime={values.time}
        onSelect={selectTime}
        message={getSlotsMessage()}
        error={errors.time}
      />

      <button type="submit" className="btn btn-primary">
        Confirmar reserva
      </button>
    </form>
  )
}

export default BookingForm