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
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App