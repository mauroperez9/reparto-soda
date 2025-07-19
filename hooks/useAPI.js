import { useState, useEffect } from 'react';
import { clientesAPI, productosAPI, inventarioAPI, rutasAPI, ventasAPI, dashboardAPI } from '@/lib/api';

// Hook genérico para manejar operaciones CRUD
export function useCRUD(api, initialData = []) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.getAll();
      setData(result);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (itemData) => {
    setLoading(true);
    setError(null);
    try {
      const newItem = await api.create(itemData);
      setData(prev => [...prev, newItem]);
      return newItem;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (id, itemData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedItem = await api.update(id, itemData);
      setData(prev => prev.map(item => item.id === id ? updatedItem : item));
      return updatedItem;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(id);
      setData(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    create: createItem,
    update: updateItem,
    delete: deleteItem,
  };
}

// Hooks específicos para cada entidad
export function useClientes() {
  return useCRUD(clientesAPI);
}

export function useProductos() {
  return useCRUD(productosAPI);
}

export function useInventario() {
  return useCRUD(inventarioAPI);
}

export function useRutas() {
  return useCRUD(rutasAPI);
}

export function useVentas() {
  return useCRUD(ventasAPI);
}

// Hook para estadísticas del dashboard
export function useDashboardStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await dashboardAPI.getStats();
      setStats(result);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
} 