# App de Gimnasio

Base inicial del proyecto: React + Vite + Supabase.

## Configuración local

1. Instala dependencias: `npm install`
2. Copia `.env.example` a `.env` y rellena tus claves de Supabase (Project Settings → API en tu panel de Supabase: copia "Project URL" y la clave "anon public")
3. Arranca el servidor local: `npm run dev`

## Despliegue en Vercel

1. Sube este proyecto a un repositorio de GitHub
2. En Vercel, ve a tu proyecto → Settings → Environment Variables
3. Añade `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` con los mismos valores de tu `.env`
4. Vuelve a desplegar (Deployments → botón de tres puntos en el último deploy → Redeploy)

## Estructura

- `src/App.jsx` — componente principal
- `src/supabaseClient.js` — conexión a la base de datos
- `ejercicios.json` — catálogo base de ejercicios (ver carpeta raíz del proyecto en Claude)
