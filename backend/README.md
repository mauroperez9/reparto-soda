# Backend Reparto Soda

Backend para el sistema de gestión de reparto de soda y agua.

## Instalación Local

1. Instalar dependencias:
```bash
npm install
```

2. Crear archivo .env basado en env.example:
```bash
cp env.example .env
```

3. Ejecutar en desarrollo:
```bash
npm run dev
```

4. Ejecutar en producción:
```bash
npm start
```

## Despliegue en Render

1. Conectar tu repositorio a Render
2. Configurar como Web Service
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Environment Variables:
   - `NODE_ENV=production`
   - `JWT_SECRET=tu_secret_super_seguro`

## Endpoints

### Clientes
- GET /api/clientes - Obtener todos los clientes
- POST /api/clientes - Crear nuevo cliente
- PUT /api/clientes/:id - Actualizar cliente
- DELETE /api/clientes/:id - Eliminar cliente

### Productos
- GET /api/productos - Obtener todos los productos
- POST /api/productos - Crear nuevo producto
- PUT /api/productos/:id - Actualizar producto
- DELETE /api/productos/:id - Eliminar producto

### Inventario
- GET /api/inventario - Obtener inventario
- POST /api/inventario - Agregar item al inventario
- PUT /api/inventario/:id - Actualizar item
- DELETE /api/inventario/:id - Eliminar item

### Rutas
- GET /api/rutas - Obtener todas las rutas
- POST /api/rutas - Crear nueva ruta
- PUT /api/rutas/:id - Actualizar ruta
- DELETE /api/rutas/:id - Eliminar ruta

### Ventas
- GET /api/ventas - Obtener todas las ventas
- POST /api/ventas - Registrar nueva venta
- PUT /api/ventas/:id - Actualizar venta
- DELETE /api/ventas/:id - Eliminar venta

### Dashboard
- GET /api/dashboard - Estadísticas del dashboard 