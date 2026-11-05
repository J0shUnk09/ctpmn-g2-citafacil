import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import AdminPage from './pages/AdminPage.jsx'
import BookingPage from './pages/BookingPage.jsx'
import HomePage from './pages/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

const STORAGE_KEY = 'citafacil.appointments'

function App() {
  // Las citas viven aquí para que todas las páginas compartan la misma lista.
  const [appointments, setAppointments] = useLocalStorage(
    STORAGE_KEY,
    [],
    Array.isArray,
  )

  const addAppointment = (appointment) =>
    setAppointments((current) => [...current, appointment])

  // Cambia solo los campos indicados de la cita con ese id.
  const updateAppointment = (id, changes) =>
    setAppointments((current) =>
      current.map((item) => (item.id === id ? { ...item, ...changes } : item)),
    )

  const deleteAppointment = (id) =>
    setAppointments((current) => current.filter((item) => item.id !== id))

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/reservar"
          element={
            <BookingPage
              appointments={appointments}
              onAddAppointment={addAppointment}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <AdminPage
              appointments={appointments}
              onUpdateAppointment={updateAppointment}
              onDeleteAppointment={deleteAppointment}
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App