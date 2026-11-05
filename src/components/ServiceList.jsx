import ServiceCard from './ServiceCard.jsx'

function ServiceList({ services }) {
  return (
    <ul className="service-grid">
      {services.map((service) => (
        <li key={service.id}>
          <ServiceCard service={service} />
        </li>
      ))}
    </ul>
  )
}

export default ServiceList