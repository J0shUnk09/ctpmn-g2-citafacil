// Configuración del negocio de demostración.
// Para usar CitaFácil con otro negocio solo es editar este archivo
export const businessConfig = {
  name: 'Barbería Demo',
  locale: 'es-CR',
  currency: 'CRC',

  // Cada cuántos minutos se ofrece una hora de inicio (9:00, 9:15, 9:30...).
  slotStepMinutes: 15,

  // Horario de atención por día de la semana.
  // 0 = domingo, 1 = lunes ... 6 = sábado. null significa "cerrado".
  workingHours: {
    0: null,
    1: { open: '09:00', close: '18:00' },
    2: { open: '09:00', close: '18:00' },
    3: { open: '09:00', close: '18:00' },
    4: { open: '09:00', close: '18:00' },
    5: { open: '09:00', close: '18:00' },
    6: { open: '09:00', close: '15:00' },
  },
}