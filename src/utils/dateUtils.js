// Fechas y horas se manejan como texto: "2026-11-05" y "09:30".
// Nunca se usa new Date("2026-11-05"): JavaScript lo interpreta como medianoche
// en UTC y en Costa Rica (UTC-6) se vería como el día anterior.

export const WEEKDAY_NAMES = [
  'domingo',
  'lunes',
  'martes',
  'miércoles',
  'jueves',
  'viernes',
  'sábado',
]

// Orden para mostrar la semana empezando por lunes.
export const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0]

const pad = (number) => String(number).padStart(2, '0')

// Date -> "2026-11-05" usando la fecha local del dispositivo.
export const toDateKey = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

export const getTodayKey = (now = new Date()) => toDateKey(now)

// "2026-11-05" -> Date a medianoche LOCAL (se arma con año, mes y día).
export const parseDateKey = (dateKey) => {
  const [year, month, day] = dateKey.split('-').map(Number)
  return new Date(year, month - 1, day)
}

// Comparar textos "AAAA-MM-DD" funciona porque el orden alfabético
// coincide con el orden de las fechas.
export const isPastDate = (dateKey, now = new Date()) =>
  dateKey < getTodayKey(now)

// 0 = domingo ... 6 = sábado
export const getWeekday = (dateKey) => parseDateKey(dateKey).getDay()

// "09:30" -> 570 (minutos desde la medianoche: 9 * 60 + 30)
export const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

// 570 -> "09:30"
export const minutesToTime = (totalMinutes) =>
  `${pad(Math.floor(totalMinutes / 60))}:${pad(totalMinutes % 60)}`

export const getMinutesNow = (now = new Date()) =>
  now.getHours() * 60 + now.getMinutes()

// "2026-11-05" -> "jueves, 5 de noviembre de 2026"
export const formatDate = (dateKey, locale = 'es-CR') =>
  new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(parseDateKey(dateKey))

// "14:30" -> "2:30 p. m."
export const formatTime = (time) => {
  const [hours, minutes] = time.split(':').map(Number)
  const suffix = hours >= 12 ? 'p. m.' : 'a. m.'
  const hours12 = hours % 12 || 12
  return `${hours12}:${pad(minutes)} ${suffix}`
}