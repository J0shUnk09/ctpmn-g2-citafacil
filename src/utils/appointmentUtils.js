import {
  getMinutesNow,
  getTodayKey,
  getWeekday,
  isPastDate,
  minutesToTime,
  timeToMinutes,
} from './dateUtils.js'

export const APPOINTMENT_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
}

export const STATUS_LABELS = {
  pending: 'Pendiente',
  confirmed: 'Confirmada',
  completed: 'Completada',
  cancelled: 'Cancelada',
}

// Exactamente 8 dígitos numéricos, sin restricciones sobre el primer dígito.
export const PHONE_REGEX = /^\d{8}$/

// Solo las citas canceladas liberan su espacio; las demás ocupan el horario.
export const blocksSchedule = (appointment) =>
  appointment.status !== APPOINTMENT_STATUS.CANCELLED

// Dos intervalos [inicio, fin) se superponen si cada uno empieza antes
// de que termine el otro. Ejemplo (en minutos desde la medianoche):
//   A = 10:00-10:45 -> 600 a 645     B = 10:30-11:00 -> 630 a 660
//   600 < 660 y 630 < 645  -> se superponen
//   C = 10:45-11:15 -> 645 a 675:  600 < 675 pero 645 < 645 es falso
//   -> A y C no se superponen (C empieza justo cuando A termina)
export const intervalsOverlap = (startA, endA, startB, endB) =>
  startA < endB && startB < endA

// ¿El intervalo propuesto choca con alguna cita activa de ese día?
// ignoreId permite al editar ignorar la propia cita.
export const hasConflict = (
  appointments,
  { date, startMinutes, durationMinutes, ignoreId = null },
) => {
  const endMinutes = startMinutes + durationMinutes

  return appointments.some((appointment) => {
    if (
      appointment.id === ignoreId ||
      appointment.date !== date ||
      !blocksSchedule(appointment)
    ) {
      return false
    }
    const appointmentStart = timeToMinutes(appointment.time)
    return intervalsOverlap(
      startMinutes,
      endMinutes,
      appointmentStart,
      appointmentStart + appointment.durationMinutes,
    )
  })
}

// Horario de atención de una fecha, o null si el negocio cierra ese día.
export const getBusinessHours = (dateKey, config) =>
  config.workingHours[getWeekday(dateKey)] ?? null

// Horas de inicio disponibles para un servicio en una fecha.
// Ejemplo: abre 9:00 (540), cierra 18:00 (1080), servicio de 45 min:
//   último inicio posible = 1080 - 45 = 1035 (5:15 p. m.)
//   cantidad = (1035 - 540) / 15 + 1 = 34 opciones, de 9:00 a 5:15 p. m.
export const getAvailableSlots = ({
  date,
  durationMinutes,
  appointments,
  config,
  ignoreId = null,
  now = new Date(),
}) => {
  if (!date || !durationMinutes || isPastDate(date, now)) return []

  const hours = getBusinessHours(date, config)
  if (!hours) return []

  const open = timeToMinutes(hours.open)
  const lastStart = timeToMinutes(hours.close) - durationMinutes
  if (lastStart < open) return []

  const step = config.slotStepMinutes
  const count = Math.floor((lastStart - open) / step) + 1
  const isToday = date === getTodayKey(now)
  const minutesNow = getMinutesNow(now)

  return Array.from({ length: count }, (_, index) => open + index * step)
    .filter((start) => !(isToday && start <= minutesNow))
    .filter(
      (start) =>
        !hasConflict(appointments, {
          date,
          startMinutes: start,
          durationMinutes,
          ignoreId,
        }),
    )
    .map(minutesToTime)
}

// Hora en que termina una cita: "10:00" + 45 min -> "10:45"
export const getEndTime = (appointment) =>
  minutesToTime(timeToMinutes(appointment.time) + appointment.durationMinutes)

// Devuelve un objeto con un mensaje por cada campo inválido ({} si todo está bien).
export const validateBooking = (
  values,
  { services, appointments, config, ignoreId = null, now = new Date() },
) => {
  const errors = {}

  if (!values.customerName.trim()) {
    errors.customerName = 'Escribe el nombre del cliente.'
  }

  if (!PHONE_REGEX.test(values.phone.trim())) {
    errors.phone = 'El teléfono debe tener exactamente 8 dígitos numéricos.'
  }

  const service = services.find((item) => item.id === values.serviceId)
  if (!service) {
    errors.serviceId = 'Selecciona un servicio.'
  }

  if (!values.date) {
    errors.date = 'Selecciona una fecha.'
  } else if (isPastDate(values.date, now)) {
    errors.date = 'La fecha no puede ser anterior a hoy.'
  } else if (!getBusinessHours(values.date, config)) {
    errors.date = 'El negocio no atiende ese día. Elige otra fecha.'
  }

  if (!values.time) {
    errors.time = 'Selecciona una hora disponible.'
  } else if (service && !errors.date) {
    const slots = getAvailableSlots({
      date: values.date,
      durationMinutes: service.durationMinutes,
      appointments,
      config,
      ignoreId,
      now,
    })
    if (!slots.includes(values.time)) {
      errors.time = 'Ese horario ya no está disponible. Elige otro.'
    }
  }

  return errors
}

const generateId = () =>
  typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`

// Crea la cita guardando una COPIA de nombre, duración y precio del servicio:
// si el catálogo cambia después, las citas ya hechas no se alteran.
export const createAppointment = (values, service) => ({
  id: generateId(),
  customerName: values.customerName.trim(),
  phone: values.phone.trim(),
  serviceId: service.id,
  serviceName: service.name,
  durationMinutes: service.durationMinutes,
  price: service.price,
  date: values.date,
  time: values.time,
  status: APPOINTMENT_STATUS.PENDING,
  createdAt: new Date().toISOString(),
})