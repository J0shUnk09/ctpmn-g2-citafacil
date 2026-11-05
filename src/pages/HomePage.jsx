import { Link } from 'react-router-dom'
import ServiceList from '../components/ServiceList.jsx'
import { businessConfig } from '../data/businessConfig.js'
import { services } from '../data/services.js'
import '../styles/services.css'
import { WEEK_ORDER, WEEKDAY_NAMES, formatTime } from '../utils/dateUtils.js'

function HomePage() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <p className="eyebrow">{businessConfig.name}</p>
        <h1 id="hero-title">Agenda tu cita de forma rápida y sin llamadas</h1>
        <p>
          Selecciona el servicio de tu preferencia y aparta tu espacio en
          segundos.
        </p>
        <Link to="/reservar" className="btn btn-primary">
          Reservar cita
        </Link>
      </section>

      <section aria-labelledby="services-title">
        <h2 id="services-title">Nuestros servicios</h2>
        <ServiceList services={services} />
        <p className="muted">
          Servicios y precios de demostración, editables en el código.
        </p>
      </section>

      <section aria-labelledby="hours-title">
        <h2 id="hours-title">Horario de atención</h2>
        <ul className="hours-list">
          {WEEK_ORDER.map((day) => {
            const hours = businessConfig.workingHours[day]
            return (
              <li key={day}>
                <span className="hours-list__day">{WEEKDAY_NAMES[day]}</span>
                <span>
                  {hours
                    ? `${formatTime(hours.open)} a ${formatTime(hours.close)}`
                    : 'Cerrado'}
                </span>
              </li>
            )
          })}
        </ul>
      </section>
    </>
  )
}

export default HomePage