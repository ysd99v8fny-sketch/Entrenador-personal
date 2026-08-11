import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

function App() {
  const [conectado, setConectado] = useState(null)

  useEffect(() => {
    // Prueba simple de conexión a Supabase
    supabase.auth.getSession().then(({ error }) => {
      setConectado(!error)
    })
  }, [])

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>App de Gimnasio</h1>
      <p>Bienvenido. Esta es la base del proyecto.</p>
      <p>
        Estado de conexión a Supabase:{' '}
        {conectado === null ? 'comprobando...' : conectado ? '✅ conectado' : '❌ revisa tus claves en .env'}
      </p>
    </div>
  )
}

export default App
