# Guía de Despliegue en Render

## Backend en Render

### 1. Preparar el Repositorio

1. Sube tu código a GitHub (incluyendo la carpeta `backend/`)
2. Asegúrate de que el repositorio sea público o que tengas acceso desde Render

### 2. Crear Servicio en Render

1. Ve a [render.com](https://render.com) y crea una cuenta
2. Haz clic en "New +" y selecciona "Web Service"
3. Conecta tu repositorio de GitHub
4. Configura el servicio:

**Configuración Básica:**
- **Name:** `reparto-soda-backend`
- **Environment:** `Node`
- **Region:** Elige la más cercana a tus usuarios
- **Branch:** `main` (o tu rama principal)

**Configuración de Build:**
- **Build Command:** `cd backend && npm install`
- **Start Command:** `cd backend && npm start`

**Variables de Entorno:**
```
NODE_ENV=production
JWT_SECRET=tu_jwt_secret_super_seguro_aqui
PORT=10000
```

### 3. Desplegar

1. Haz clic en "Create Web Service"
2. Render comenzará a construir y desplegar tu aplicación
3. Una vez completado, obtendrás una URL como: `https://tu-backend.onrender.com`

## Frontend (Next.js)

### 1. Configurar Variables de Entorno

1. En tu proyecto Next.js, crea un archivo `.env.local`:
```
NEXT_PUBLIC_API_URL=https://tu-backend.onrender.com
```

2. Reemplaza `tu-backend.onrender.com` con la URL real de tu backend en Render

### 2. Desplegar Frontend (Opcional)

Puedes desplegar el frontend en:
- **Vercel** (recomendado para Next.js)
- **Netlify**
- **Render** (como Static Site)

## Verificación

### 1. Probar Backend

Una vez desplegado, puedes probar tu backend visitando:
- `https://tu-backend.onrender.com/` - Debería mostrar el mensaje de bienvenida
- `https://tu-backend.onrender.com/api/clientes` - Debería devolver un array de clientes

### 2. Probar Frontend

1. Asegúrate de que la variable `NEXT_PUBLIC_API_URL` esté configurada correctamente
2. Ejecuta `npm run dev` en tu frontend
3. Navega a las diferentes secciones del dashboard
4. Verifica que los datos se cargan desde el backend

## Troubleshooting

### Backend no responde
- Verifica que el servicio esté "Live" en Render
- Revisa los logs en Render para errores
- Asegúrate de que el puerto esté configurado correctamente

### CORS Errors
- El backend ya incluye configuración CORS
- Si persisten errores, verifica que la URL del frontend esté permitida

### Variables de Entorno
- Asegúrate de que las variables estén configuradas en Render
- Reinicia el servicio después de cambiar variables

## URLs de Ejemplo

Una vez desplegado, tus URLs serán algo como:
- **Backend:** `https://reparto-soda-backend.onrender.com`
- **Frontend:** `http://localhost:3000` (desarrollo) o tu dominio de producción

## Comandos Útiles

```bash
# Probar backend localmente
cd backend
npm run dev

# Probar frontend con backend local
# En .env.local: NEXT_PUBLIC_API_URL=http://localhost:5000
npm run dev

# Probar frontend con backend en Render
# En .env.local: NEXT_PUBLIC_API_URL=https://tu-backend.onrender.com
npm run dev
``` 