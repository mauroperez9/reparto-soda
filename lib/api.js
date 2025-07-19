const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Función helper para hacer requests
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}

// Clientes API
export const clientesAPI = {
  getAll: () => apiRequest('/api/clientes'),
  create: (cliente) => apiRequest('/api/clientes', {
    method: 'POST',
    body: JSON.stringify(cliente),
  }),
  update: (id, cliente) => apiRequest(`/api/clientes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(cliente),
  }),
  delete: (id) => apiRequest(`/api/clientes/${id}`, {
    method: 'DELETE',
  }),
};

// Productos API
export const productosAPI = {
  getAll: () => apiRequest('/api/productos'),
  create: (producto) => apiRequest('/api/productos', {
    method: 'POST',
    body: JSON.stringify(producto),
  }),
  update: (id, producto) => apiRequest(`/api/productos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(producto),
  }),
  delete: (id) => apiRequest(`/api/productos/${id}`, {
    method: 'DELETE',
  }),
};

// Inventario API
export const inventarioAPI = {
  getAll: () => apiRequest('/api/inventario'),
  create: (item) => apiRequest('/api/inventario', {
    method: 'POST',
    body: JSON.stringify(item),
  }),
  update: (id, item) => apiRequest(`/api/inventario/${id}`, {
    method: 'PUT',
    body: JSON.stringify(item),
  }),
  delete: (id) => apiRequest(`/api/inventario/${id}`, {
    method: 'DELETE',
  }),
};

// Rutas API
export const rutasAPI = {
  getAll: () => apiRequest('/api/rutas'),
  create: (ruta) => apiRequest('/api/rutas', {
    method: 'POST',
    body: JSON.stringify(ruta),
  }),
  update: (id, ruta) => apiRequest(`/api/rutas/${id}`, {
    method: 'PUT',
    body: JSON.stringify(ruta),
  }),
  delete: (id) => apiRequest(`/api/rutas/${id}`, {
    method: 'DELETE',
  }),
};

// Ventas API
export const ventasAPI = {
  getAll: () => apiRequest('/api/ventas'),
  create: (venta) => apiRequest('/api/ventas', {
    method: 'POST',
    body: JSON.stringify(venta),
  }),
  update: (id, venta) => apiRequest(`/api/ventas/${id}`, {
    method: 'PUT',
    body: JSON.stringify(venta),
  }),
  delete: (id) => apiRequest(`/api/ventas/${id}`, {
    method: 'DELETE',
  }),
};

// Dashboard API
export const dashboardAPI = {
  getStats: () => apiRequest('/api/dashboard'),
}; 