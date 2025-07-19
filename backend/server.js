const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// In-memory data storage (en producción usarías una base de datos)
let data = {
  clientes: [
    {
      id: 1,
      nombre: "Juan Pérez",
      telefono: "123456789",
      direccion: "Calle Principal 123",
      zona: "Centro",
      envasesAgua: 2,
      envasesSoda: 1,
      fechaRegistro: "2024-01-15"
    }
  ],
  productos: [
    {
      id: 1,
      nombre: "Soda Cola 2L",
      categoria: "Soda",
      precio: 950,
      stock: 120
    }
  ],
  inventario: [
    {
      id: 1,
      producto: "Soda Cola 2L",
      categoria: "Soda",
      cantidad: 120,
      precioUnitario: 950,
      fechaIngreso: "2024-01-15",
      ubicacion: "Almacén Central",
      esEnvase: false
    },
    {
      id: 2,
      producto: "Envase Agua 12L",
      categoria: "Envases",
      cantidad: 50,
      envasesEnClientes: 150,
      precioUnitario: 2000,
      fechaIngreso: "2024-01-15",
      ubicacion: "Depósito Envases",
      esEnvase: true
    }
  ],
  rutas: [
    {
      id: 1,
      nombre: "Ruta Centro",
      dia: "Lunes",
      clientes: [1],
      productosNecesarios: [
        { productoId: 1, cantidad: 10 },
        { productoId: 2, cantidad: 5 }
      ]
    }
  ],
  ventas: [
    {
      id: 1,
      clienteId: 1,
      fecha: "2024-01-15",
      productos: [
        { productoId: 1, cantidad: 2, precio: 950 }
      ],
      total: 1900,
      metodoPago: "Efectivo",
      estado: "Completada"
    }
  ]
};

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'API Reparto Soda funcionando!' });
});

// Clientes routes
app.get('/api/clientes', (req, res) => {
  res.json(data.clientes);
});

app.post('/api/clientes', (req, res) => {
  const nuevoCliente = {
    id: Date.now(),
    ...req.body,
    fechaRegistro: new Date().toISOString().split('T')[0]
  };
  data.clientes.push(nuevoCliente);
  res.status(201).json(nuevoCliente);
});

app.put('/api/clientes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.clientes.findIndex(c => c.id === id);
  if (index !== -1) {
    data.clientes[index] = { ...data.clientes[index], ...req.body };
    res.json(data.clientes[index]);
  } else {
    res.status(404).json({ message: 'Cliente no encontrado' });
  }
});

app.delete('/api/clientes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  data.clientes = data.clientes.filter(c => c.id !== id);
  res.json({ message: 'Cliente eliminado' });
});

// Productos routes
app.get('/api/productos', (req, res) => {
  res.json(data.productos);
});

app.post('/api/productos', (req, res) => {
  const nuevoProducto = {
    id: Date.now(),
    ...req.body
  };
  data.productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
});

app.put('/api/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.productos.findIndex(p => p.id === id);
  if (index !== -1) {
    data.productos[index] = { ...data.productos[index], ...req.body };
    res.json(data.productos[index]);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

app.delete('/api/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  data.productos = data.productos.filter(p => p.id !== id);
  res.json({ message: 'Producto eliminado' });
});

// Inventario routes
app.get('/api/inventario', (req, res) => {
  res.json(data.inventario);
});

app.post('/api/inventario', (req, res) => {
  const nuevoItem = {
    id: Date.now(),
    ...req.body
  };
  data.inventario.push(nuevoItem);
  res.status(201).json(nuevoItem);
});

app.put('/api/inventario/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.inventario.findIndex(i => i.id === id);
  if (index !== -1) {
    data.inventario[index] = { ...data.inventario[index], ...req.body };
    res.json(data.inventario[index]);
  } else {
    res.status(404).json({ message: 'Item no encontrado' });
  }
});

app.delete('/api/inventario/:id', (req, res) => {
  const id = parseInt(req.params.id);
  data.inventario = data.inventario.filter(i => i.id !== id);
  res.json({ message: 'Item eliminado' });
});

// Rutas routes
app.get('/api/rutas', (req, res) => {
  res.json(data.rutas);
});

app.post('/api/rutas', (req, res) => {
  const nuevaRuta = {
    id: Date.now(),
    ...req.body
  };
  data.rutas.push(nuevaRuta);
  res.status(201).json(nuevaRuta);
});

app.put('/api/rutas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.rutas.findIndex(r => r.id === id);
  if (index !== -1) {
    data.rutas[index] = { ...data.rutas[index], ...req.body };
    res.json(data.rutas[index]);
  } else {
    res.status(404).json({ message: 'Ruta no encontrada' });
  }
});

app.delete('/api/rutas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  data.rutas = data.rutas.filter(r => r.id !== id);
  res.json({ message: 'Ruta eliminada' });
});

// Ventas routes
app.get('/api/ventas', (req, res) => {
  res.json(data.ventas);
});

app.post('/api/ventas', (req, res) => {
  const nuevaVenta = {
    id: Date.now(),
    ...req.body,
    fecha: new Date().toISOString().split('T')[0]
  };
  data.ventas.push(nuevaVenta);
  res.status(201).json(nuevaVenta);
});

app.put('/api/ventas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.ventas.findIndex(v => v.id === id);
  if (index !== -1) {
    data.ventas[index] = { ...data.ventas[index], ...req.body };
    res.json(data.ventas[index]);
  } else {
    res.status(404).json({ message: 'Venta no encontrada' });
  }
});

app.delete('/api/ventas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  data.ventas = data.ventas.filter(v => v.id !== id);
  res.json({ message: 'Venta eliminada' });
});

// Dashboard stats
app.get('/api/dashboard', (req, res) => {
  const stats = {
    totalClientes: data.clientes.length,
    totalProductos: data.productos.length,
    totalVentas: data.ventas.length,
    totalRutas: data.rutas.length,
    valorInventario: data.inventario.reduce((sum, item) => 
      sum + (item.cantidad * item.precioUnitario), 0
    ),
    envasesDisponibles: data.inventario
      .filter(item => item.esEnvase)
      .reduce((sum, item) => sum + item.cantidad, 0),
    envasesEnClientes: data.inventario
      .filter(item => item.esEnvase)
      .reduce((sum, item) => sum + (item.envasesEnClientes || 0), 0)
  };
  res.json(stats);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
}); 