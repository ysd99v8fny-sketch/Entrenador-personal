import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import Auth from './Auth'
import Perfil from './Perfil'

function App() {
  const [session, setSession] = useState(undefined) // undefined = cargando, null = sin sesión
  const [perfil, setPerfil] = useState(undefined)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (session) {
      cargarPerfil()
    }
  }, [session])

  const cargarPerfil = async () => {
    const { data } = await supabase
      .from('usuarios')
      .select('*')
      .eq('auth_id', session.user.id)
      .maybeSingle()
    setPerfil(data)
  }

  const cerrarSesion = async () => {
    await supabase.auth.signOut()
    setPerfil(undefined)
  }

  if (session === undefined) {
    return <p style={{ padding: '2rem', fontFamily: 'sans-serif' }}>Cargando...</p>
  }

  if (!session) {
    return <Auth />
  }

  if (perfil === undefined) {
    return <p style={{ padding: '2rem', fontFamily: 'sans-serif' }}>Cargando perfil...</p>
  }

  if (!perfil) {
    return <Perfil session={session} onPerfilCreado={cargarPerfil} />
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Hola, {perfil.nombre} 👋</h1>
      <p>Objetivo: {perfil.objetivo}</p>
      <p>Nivel: {perfil.nivel}</p>
      <button onClick={cerrarSesion} style={{ padding: '0.5rem 1rem', marginTop: '1rem' }}>
        Cerrar sesión
      </button>
    </div>
  )
}

export default App
