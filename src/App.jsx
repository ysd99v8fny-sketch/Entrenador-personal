import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

function App() {
  const [conectado, setConectado] = useState(null)
  const [numEjercicios, setNumEjercicios] = useState(null)

  useEffect(() => {
    supabase
      .from('ejercicios')
      .select('*', { count: 'exact', head: true })
      .then(({ count, error }) => {
        setConectado(!error)
        setNumEjercicios(count)
      })
  }, [])

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>App de Gimnasio</h1>
      <p>
        Estado de conexión a Supabase:{' '}
        {conectado === null ? 'comprobando...' : conectado ? '✅ conectado' : '❌ revisa tus claves en Vercel/.env'}
      </p>
      {conectado && <p>Ejercicios cargados en la base de datos: {numEjercicios}</p>}
    </div>
  )
}

export default App
