import { useState } from 'react'
import { supabase } from './supabaseClient'

function Perfil({ session, onPerfilCreado }) {
  const [nombre, setNombre] = useState('')
  const [edad, setEdad] = useState('')
  const [sexo, setSexo] = useState('masculino')
  const [alturaCm, setAlturaCm] = useState('')
  const [nivel, setNivel] = useState('principiante')
  const [objetivo, setObjetivo] = useState('hipertrofia')
  const [error, setError] = useState(null)
  const [cargando, setCargando] = useState(false)

  const manejarEnvio = async (e) => {
    e.preventDefault()
    setError(null)
    setCargando(true)

    const { error } = await supabase.from('usuarios').insert({
      auth_id: session.user.id,
      nombre,
      edad: parseInt(edad, 10),
      sexo,
      altura_cm: parseFloat(alturaCm),
      nivel,
      objetivo,
    })

    if (error) {
      setError(error.message)
      setCargando(false)
    } else {
      onPerfilCreado()
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto', fontFamily: 'sans-serif' }}>
      <h2>Completa tu perfil</h2>
      <form onSubmit={manejarEnvio} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          style={{ padding: '0.5rem' }}
        />
        <input
          type="number"
          placeholder="Edad"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
          required
          min={12}
          max={100}
          style={{ padding: '0.5rem' }}
        />
        <select value={sexo} onChange={(e) => setSexo(e.target.value)} style={{ padding: '0.5rem' }}>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
          <option value="otro">Otro</option>
        </select>
        <input
          type="number"
          placeholder="Altura (cm)"
          value={alturaCm}
          onChange={(e) => setAlturaCm(e.target.value)}
          required
          min={100}
          max={250}
          style={{ padding: '0.5rem' }}
        />
        <label>
          Nivel de experiencia
          <select value={nivel} onChange={(e) => setNivel(e.target.value)} style={{ padding: '0.5rem', width: '100%' }}>
            <option value="principiante">Principiante</option>
            <option value="intermedio">Intermedio</option>
            <option value="avanzado">Avanzado</option>
          </select>
        </label>
        <label>
          Objetivo
          <select value={objetivo} onChange={(e) => setObjetivo(e.target.value)} style={{ padding: '0.5rem', width: '100%' }}>
            <option value="hipertrofia">Ganar músculo (hipertrofia)</option>
            <option value="perdida_grasa">Perder grasa</option>
            <option value="fuerza">Fuerza</option>
            <option value="resistencia">Resistencia</option>
          </select>
        </label>
        <button type="submit" disabled={cargando} style={{ padding: '0.6rem' }}>
          {cargando ? 'Guardando...' : 'Guardar perfil'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default Perfil
