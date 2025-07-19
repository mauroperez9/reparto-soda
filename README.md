# 🥤 Sistema de Reparto de Soda y Agua

Sistema completo de gestión para empresas de reparto de soda y agua, con control de inventario, rutas, clientes y ventas.

## 🚀 Características

### 📊 Dashboard Completo
- **Gestión de Clientes** - Registro y seguimiento de clientes
- **Control de Productos** - Catálogo de productos y precios
- **Inventario Inteligente** - Control de envases prestados y disponibles
- **Planificación de Rutas** - Organización por días y zonas
- **Registro de Ventas** - Historial completo de transacciones

### 🏺 Control de Envases
- Seguimiento de envases en posesión de clientes
- Balance entre envases disponibles y prestados
- Valoración del inventario de envases
- Control de rotación de envases

### 📱 Interfaz Moderna
- Diseño responsive con HeroUI
- Modales para formularios
- Tablas interactivas
- Navegación intuitiva

## 🛠️ Tecnologías

### Frontend
- **Next.js 15** - Framework React con App Router
- **HeroUI** - Componentes de UI modernos
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **CORS** - Cross-origin resource sharing
- **Helmet** - Seguridad HTTP
- **Rate Limiting** - Protección contra spam

## 📦 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/reparto-soda.git
cd reparto-soda
```

### 2. Instalar dependencias del frontend
```bash
npm install
```

### 3. Instalar dependencias del backend
```bash
cd backend
npm install
cd ..
```

### 4. Configurar variables de entorno
```bash
# Copiar archivo de ejemplo
cp env.local.example .env.local

# Editar .env.local con tu configuración
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 5. Ejecutar en desarrollo
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
npm run dev
```

## 🌐 Despliegue

### Backend en Render
1. Conecta tu repositorio a Render
2. Configura como Web Service
3. Build Command: `cd backend && npm install`
4. Start Command: `cd backend && npm start`
5. Variables de entorno:
   ```
   NODE_ENV=production
   JWT_SECRET=tu_secret_super_seguro
   PORT=10000
   ```

### Frontend en Vercel
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Deploy automático

## 📋 Estructura del Proyecto

```
reparto-soda/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Páginas del dashboard
│   └── page.tsx          # Página principal
├── backend/              # Servidor Express
│   ├── server.js         # Servidor principal
│   └── package.json      # Dependencias del backend
├── components/           # Componentes React
│   ├── dashboard/        # Tablas del dashboard
│   ├── forms/           # Formularios
│   └── ui/              # Componentes de UI
├── hooks/               # Hooks personalizados
├── lib/                 # Utilidades y APIs
└── styles/              # Estilos globales
```

## 🔌 APIs Disponibles

### Clientes
- `GET /api/clientes` - Obtener todos los clientes
- `POST /api/clientes` - Crear nuevo cliente
- `PUT /api/clientes/:id` - Actualizar cliente
- `DELETE /api/clientes/:id` - Eliminar cliente

### Productos
- `GET /api/productos` - Obtener todos los productos
- `POST /api/productos` - Crear nuevo producto
- `PUT /api/productos/:id` - Actualizar producto
- `DELETE /api/productos/:id` - Eliminar producto

### Inventario
- `GET /api/inventario` - Obtener inventario
- `POST /api/inventario` - Agregar item al inventario
- `PUT /api/inventario/:id` - Actualizar item
- `DELETE /api/inventario/:id` - Eliminar item

### Rutas
- `GET /api/rutas` - Obtener todas las rutas
- `POST /api/rutas` - Crear nueva ruta
- `PUT /api/rutas/:id` - Actualizar ruta
- `DELETE /api/rutas/:id` - Eliminar ruta

### Ventas
- `GET /api/ventas` - Obtener todas las ventas
- `POST /api/ventas` - Registrar nueva venta
- `PUT /api/ventas/:id` - Actualizar venta
- `DELETE /api/ventas/:id` - Eliminar venta

### Dashboard
- `GET /api/dashboard` - Estadísticas del dashboard

## 🎯 Funcionalidades Principales

### Gestión de Clientes
- Registro con datos completos
- Control de envases por cliente
- Agrupación por zonas
- Historial de compras

### Control de Inventario
- Productos regulares y envases
- Seguimiento de stock disponible
- Control de envases prestados
- Valoración del inventario

### Planificación de Rutas
- Organización por días de la semana
- Asignación de clientes a rutas
- Cálculo de productos necesarios
- Optimización de entregas

### Registro de Ventas
- Ventas desde rutas o directas
- Múltiples métodos de pago
- Historial completo
- Estadísticas de ventas

## 🔧 Desarrollo

### Scripts Disponibles
```bash
# Frontend
npm run dev          # Desarrollo
npm run build        # Construir para producción
npm run start        # Ejecutar en producción

# Backend
cd backend
npm run dev          # Desarrollo con nodemon
npm start            # Producción
```

### Estructura de Datos
El sistema maneja las siguientes entidades:
- **Clientes** - Información de clientes y envases
- **Productos** - Catálogo de productos
- **Inventario** - Stock y envases
- **Rutas** - Planificación de entregas
- **Ventas** - Transacciones realizadas

## 📈 Próximas Mejoras

- [ ] Base de datos persistente (PostgreSQL/MongoDB)
- [ ] Autenticación de usuarios
- [ ] Reportes y analytics
- [ ] App móvil para repartidores
- [ ] Integración con GPS
- [ ] Notificaciones push
- [ ] Facturación electrónica

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👨‍💻 Autor

**Mauro** - Desarrollador del sistema de reparto

---

⭐ Si te gusta este proyecto, dale una estrella en GitHub!
