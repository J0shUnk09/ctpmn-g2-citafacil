// 5000 -> "₡5 000"
export const formatCurrency = (amount, locale = 'es-CR', currency = 'CRC') =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)

// 45 -> "45 min"
export const formatDuration = (minutes) => `${minutes} min`