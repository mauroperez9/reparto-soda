"use client";

import { useMemo } from "react";

// Interfaces
interface ClienteRuta {
  id: number;
  nombre: string;
  direccion: string;
  productos: {
    id: number;
    nombre: string;
    cantidad: number;
  }[];
}

interface Ruta {
  id: number;
  nombre: string;
  dia: string;
  zona: string;
  repartidor: string;
  vehiculo: string;
  clientes: ClienteRuta[];
}

interface RutasRepartoProps {
  rutas: Ruta[];
}

export default function RutasReparto({ rutas }: RutasRepartoProps) {
  // Total de clientes y productos
  const estadisticas = useMemo(() => {
    const totalClientes = rutas.reduce((total, ruta) => total + ruta.clientes.length, 0);
    
    // Contar productos en todas las rutas
    const productosMap: Record<string, number> = {};
    rutas.forEach(ruta => {
      ruta.clientes.forEach(cliente => {
        cliente.productos.forEach(producto => {
          productosMap[producto.nombre] = (productosMap[producto.nombre] || 0) + producto.cantidad;
        });
      });
    });
    
    return {
      totalRutas: rutas.length,
      totalClientes,
      productosPopulares: Object.entries(productosMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
    };
  }, [rutas]);
  
  // Contar rutas por día
  const rutasPorDia = useMemo(() => {
    const dias = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
    const conteo: Record<string, number> = {};
    
    dias.forEach(dia => {
      conteo[dia] = rutas.filter(ruta => ruta.dia === dia).length;
    });
    
    return conteo;
  }, [rutas]);
  
  return (
    <div className="bg-default-100 p-6 rounded-lg mb-6">
      <h3 className="text-lg font-medium mb-4">Resumen de Rutas</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-primary text-white p-4 rounded-lg shadow-sm">
          <div className="text-2xl font-bold">{estadisticas.totalRutas}</div>
          <div className="text-sm opacity-90">Rutas activas</div>
        </div>
        
        <div className="bg-primary text-white p-4 rounded-lg shadow-sm">
          <div className="text-2xl font-bold">{estadisticas.totalClientes}</div>
          <div className="text-sm opacity-90">Clientes en rutas</div>
        </div>
        
        <div className="bg-primary text-white p-4 rounded-lg shadow-sm">
          <div className="font-medium mb-1">Productos más solicitados:</div>
          <div className="space-y-1">
            {estadisticas.productosPopulares.length > 0 ? (
              estadisticas.productosPopulares.map(([nombre, cantidad]) => (
                <div key={nombre} className="text-sm">
                  <span className="font-medium">{nombre}:</span> {cantidad} unidades
                </div>
              ))
            ) : (
              <div className="text-sm opacity-75">No hay productos registrados</div>
            )}
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Distribución de rutas por día</h4>
        <div className="grid grid-cols-7 gap-2">
          {Object.entries(rutasPorDia).map(([dia, cantidad]) => (
            <div 
              key={dia} 
              className={`${cantidad > 0 ? 'bg-primary text-white' : 'bg-default-200 text-default-700'} rounded-lg p-2 text-center`}
            >
              <div className="text-sm font-medium capitalize">{dia}</div>
              <div className="text-lg font-bold">
                {cantidad}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 