import { formatTime } from '../utils/dateUtils.js'

// Lista de horas de inicio disponibles, elegibles como botones de radio.
function AvailableSlots({ slots, selectedTime, onSelect, message, error }) {
  return (
    <fieldset
      className="slots"
      aria-describedby={error ? 'time-error' : undefined}
    >
      <legend>Hora disponible</legend>

      {slots.length > 0 ? (
        <div className="slots__list">
          {slots.map((slot) => (
            <label key={slot} className="slot">
              <input
                type="radio"
                name="time"
                value={slot}
                checked={selectedTime === slot}
                onChange={() => onSelect(slot)}
              />
              <span>{formatTime(slot)}</span>
            </label>
          ))}
        </div>
      ) : (
        <p className="muted">{message}</p>
      )}

      {error && (
        <p id="time-error" className="field-error" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  )
}

export default AvailableSlots