import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

function App() {
  const [conectado, setConectado] = useState(null)
  const [numEjercicios, setNumEjercicios] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    supabase
      .from('ejercicios')
      .select('id, nombre')
      .then(({ data, error }) => {
        if (error) {
          setConectado(false)
          setErrorMsg(error.message)
        } else {
          setConectado(true)
          setNumEjercicios(data.length)
        }
      })
  }, [])

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>App de Gimnasio</h1>
      <p>
        Estado de conexión a Supabase:{' '}
        {conectado === null ? 'comprobando...' : conectado ? '✅ conectado' : '❌ error'}
      </p>
      {conectado && <p>Ejercicios cargados en la base de datos: {numEjercicios}</p>}
      {errorMsg && <p style={{ color: 'red' }}>Detalle del error: {errorMsg}</p>}
    </div>
  )
}

export default App
