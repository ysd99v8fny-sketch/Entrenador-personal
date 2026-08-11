import { useState } from 'react'
import { supabase } from './supabaseClient'

function Auth() {
  const [modo, setModo] = useState('login') // 'login' o 'registro'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [cargando, setCargando] = useState(false)

  const manejarEnvio = async (e) => {
    e.preventDefault()
    setError(null)
    setCargando(true)

    const { error } = modo === 'login'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password })

    if (error) setError(error.message)
    setCargando(false)
  }

  return (
    <div style={{ maxWidth: '360px', margin: '4rem auto', fontFamily: 'sans-serif' }}>
      <h2>{modo === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}</h2>
      <form onSubmit={manejarEnvio} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '0.5rem' }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          style={{ padding: '0.5rem' }}
        />
        <button type="submit" disabled={cargando} style={{ padding: '0.6rem' }}>
          {cargando ? 'Enviando...' : modo === 'login' ? 'Entrar' : 'Registrarme'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p style={{ marginTop: '1rem' }}>
        {modo === 'login' ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
        <button
          onClick={() => setModo(modo === 'login' ? 'registro' : 'login')}
          style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', padding: 0 }}
        >
          {modo === 'login' ? 'Regístrate' : 'Inicia sesión'}
        </button>
      </p>
    </div>
  )
}

export default Auth
