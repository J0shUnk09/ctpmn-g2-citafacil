import { blocksSchedule } from './appointmentUtils.js'

// "María" -> "maria": permite buscar sin importar mayúsculas ni tildes.
export const normalizeText = (text) =>
  text
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

// Filtra las citas del panel.
// - Sin texto de búsqueda: solo las citas de la fecha elegida.
// - Con texto de búsqueda: citas de TODAS las fechas cuyo nombre o teléfono coincida.
// - status = 'all' no filtra por estado.
export const filterAppointments = (appointments, { date, query, status }) => {
  const text = normalizeText(query)
  // "8888-7777" -> "88887777". Si no hay dígitos no se compara el teléfono,
  // porque "".includes("") sería verdadero para todas las citas.
  const digits = query.replace(/\D/g, '')

  return appointments.filter((appointment) => {
    if (status !== 'all' && appointment.status !== status) return false
    if (text === '') return appointment.date === date

    const matchesName = normalizeText(appointment.customerName).includes(text)
    const matchesPhone = digits !== '' && appointment.phone.includes(digits)
    return matchesName || matchesPhone
  })
}

// Ordena por fecha y luego por hora. Como ambas son texto con ceros a la
// izquierda ("2026-11-05", "09:30"), comparar texto equivale a comparar tiempo.
export const sortAppointments = (appointments) =>
  [...appointments].sort(
    (a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time),
  )

// Cuenta las citas activas (no canceladas) y suma sus precios.
// Ejemplo: corte ₡5 000 + facial ₡8 000 + una cancelada de ₡3 500
//   -> { count: 2, total: 13000 }
export const summarizeAppointments = (appointments) => {
  const active = appointments.filter(blocksSchedule)
  return {
    count: active.length,
    total: active.reduce((sum, appointment) => sum + appointment.price, 0),
  }
}

// Campos de una cita que cambian al editarla (el estado, el id y la fecha de
// creación se conservan). Guarda otra vez la copia del servicio elegido.
export const buildAppointmentChanges = (values, service) => ({
  customerName: values.customerName.trim(),
  phone: values.phone.trim(),
  serviceId: service.id,
  serviceName: service.name,
  durationMinutes: service.durationMinutes,
  price: service.price,
  date: values.date,
  time: values.time,
})