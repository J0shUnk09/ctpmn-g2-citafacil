import { STATUS_LABELS } from '../utils/appointmentUtils.js'
import { getTodayKey } from '../utils/dateUtils.js'
import FormField from './FormField.jsx'

function AdminFilters({
  date,
  query,
  status,
  onDateChange,
  onQueryChange,
  onStatusChange,
}) {
  return (
    <form
      className="card admin-filters"
      role="search"
      onSubmit={(event) => event.preventDefault()}
    >
      <FormField id="filter-date" label="Fecha">
        <div className="admin-filters__date">
          <input
            id="filter-date"
            type="date"
            value={date}
            onChange={(event) => onDateChange(event.target.value)}
          />
          <button
            type="button"
            className="btn btn-secondary btn-small"
            onClick={() => onDateChange(getTodayKey())}
          >
            Hoy
          </button>
        </div>
      </FormField>

      <FormField id="filter-status" label="Estado">
        <select
          id="filter-status"
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
        >
          <option value="all">Todos los estados</option>
          {Object.entries(STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </FormField>

      <FormField id="filter-query" label="Buscar por nombre o teléfono">
        <input
          id="filter-query"
          type="search"
          placeholder="Ej. María o 8888"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </FormField>
    </form>
  )
}

export default AdminFilters