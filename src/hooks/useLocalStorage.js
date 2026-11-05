import { useEffect, useState } from 'react'

// Igual que useState, pero el valor se guarda en localStorage y se recupera
// al recargar la página. isValid evita usar datos dañados o con otra forma.
export function useLocalStorage(key, initialValue, isValid = () => true) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      if (stored === null) return initialValue
      const parsed = JSON.parse(stored)
      return isValid(parsed) ? parsed : initialValue
    } catch {
      // JSON dañado o localStorage bloqueado: se parte del valor inicial.
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Sin espacio o bloqueado: la app sigue funcionando sin guardar.
    }
  }, [key, value])

  return [value, setValue]
}