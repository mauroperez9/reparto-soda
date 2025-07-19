"use client";

import { useState, useEffect } from "react";
import { Input } from "@heroui/input";

// Tipos
interface Producto {
  id: number;
  nombre: string;
  cantidad: number;
}

// Tipo para cliente existente
export interface Cliente {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  zona: string;
  envases?: {
    agua12L: number;
    agua20L: number;
    soda: number;
  };
}

interface ClienteRuta {
  id?: number;
  nombre: string;
  direccion: string;
  productos: Producto[];
}

interface ClienteRutaFormProps {
  id?: string;
  rutaNombre: string;
  onSubmit: (clienteData: ClienteRuta) => void;
  clienteInicial?: ClienteRuta;
  clientesExistentes?: Cliente[];
}

// Datos de ejemplo para productos disponibles
const PRODUCTOS_DISPONIBLES = [
  { id: 1, nombre: "Agua 20L" },
  { id: 2, nombre: "Refresco 2L Cola" },
  { id: 3, nombre: "Refresco 2L Naranja" },
  { id: 4, nombre: "Agua 5L" },
  { id: 5, nombre: "Agua con gas 2L" }
];

// Clientes de ejemplo por si no se proporcionan
const CLIENTES_EJEMPLO: Cliente[] = [
  { id: 1, nombre: "Restaurant El Buen Sabor", direccion: "Av. Principal 123", zona: "Capital", telefono: "555-1234" },
  { id: 2, nombre: "Hotel Plaza", direccion: "Calle Comercio 456", zona: "Godoy Cruz", telefono: "555-5678" },
  { id: 3, nombre: "Cafetería Central", direccion: "Plaza Mayor 789", zona: "Maipú", telefono: "555-9012" },
  { id: 4, nombre: "Gimnasio Fitness", direccion: "Av. Deportiva 234", zona: "Las Heras", telefono: "555-3456" },
];

export default function ClienteRutaForm({ 
  id, 
  rutaNombre, 
  onSubmit, 
  clienteInicial, 
  clientesExistentes = CLIENTES_EJEMPLO 
}: ClienteRutaFormProps) {
  // Estado para el selector de cliente existente
  const [clienteSeleccionadoId, setClienteSeleccionadoId] = useState<string>("");
  const [modoCreacion, setModoCreacion] = useState<"seleccionar" | "manual">(
    clienteInicial ? "manual" : "seleccionar"
  );
  
  const [nombre, setNombre] = useState(clienteInicial?.nombre || "");
  const [direccion, setDireccion] = useState(clienteInicial?.direccion || "");
  const [productos, setProductos] = useState<Producto[]>(clienteInicial?.productos || []);
  
  const [productoSeleccionado, setProductoSeleccionado] = useState<string>("");
  const [cantidadProducto, setCantidadProducto] = useState<number>(1);
  
  // Efecto para cargar datos de cliente seleccionado
  useEffect(() => {
    if (clienteSeleccionadoId && modoCreacion === "seleccionar") {
      const clienteSeleccionado = clientesExistentes.find(
        c => c.id.toString() === clienteSeleccionadoId
      );
      
      if (clienteSeleccionado) {
        setNombre(clienteSeleccionado.nombre);
        setDireccion(clienteSeleccionado.direccion);
      }
    }
  }, [clienteSeleccionadoId, clientesExistentes, modoCreacion]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!nombre || !direccion) {
      alert("Por favor, complete el nombre y dirección del cliente");
      return;
    }
    
    if (productos.length === 0) {
      alert("Por favor, agregue al menos un producto");
      return;
    }
    
    onSubmit({
      id: clienteInicial?.id,
      nombre,
      direccion,
      productos
    });
  };
  
  const handleAgregarProducto = () => {
    if (!productoSeleccionado || cantidadProducto <= 0) return;
    
    const productoId = Number(productoSeleccionado);
    const productoExistente = productos.find(p => p.id === productoId);
    const productoInfo = PRODUCTOS_DISPONIBLES.find(p => p.id === productoId);
    
    if (!productoInfo) return;
    
    if (productoExistente) {
      // Actualizar cantidad si ya existe
      setProductos(productos.map(p => 
        p.id === productoId 
          ? { ...p, cantidad: p.cantidad + cantidadProducto } 
          : p
      ));
    } else {
      // Añadir nuevo producto
      setProductos([
        ...productos, 
        { 
          id: productoId, 
          nombre: productoInfo.nombre, 
          cantidad: cantidadProducto 
        }
      ]);
    }
    
    // Resetear selección
    setProductoSeleccionado("");
    setCantidadProducto(1);
  };
  
  const handleEliminarProducto = (productoId: number) => {
    setProductos(productos.filter(p => p.id !== productoId));
  };
  
  const handleCambioModo = (modo: "seleccionar" | "manual") => {
    setModoCreacion(modo);
    // Limpiar datos si cambiamos al modo seleccionar
    if (modo === "seleccionar") {
      setClienteSeleccionadoId("");
      setNombre("");
      setDireccion("");
    }
  };

  // Función para mostrar información del cliente seleccionado
  const renderClienteSeleccionadoInfo = () => {
    if (!clienteSeleccionadoId) return null;
    
    const cliente = clientesExistentes.find(c => c.id.toString() === clienteSeleccionadoId);
    if (!cliente) return null;
    
    return (
      <div className="mt-3 p-3 bg-default-50 rounded-lg">
        <h4 className="font-medium text-sm">Información del cliente:</h4>
        <div className="grid grid-cols-2 gap-2 mt-1">
          <div className="text-sm">
            <span className="font-medium">Nombre:</span> {cliente.nombre}
          </div>
          <div className="text-sm">
            <span className="font-medium">Zona:</span> {cliente.zona}
          </div>
          <div className="text-sm col-span-2">
            <span className="font-medium">Dirección:</span> {cliente.direccion}
          </div>
          <div className="text-sm">
            <span className="font-medium">Teléfono:</span> {cliente.telefono}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <form id={id} onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-4">
        <h3 className="text-sm font-medium text-default-600">
          Agregando cliente a ruta: <span className="font-bold">{rutaNombre}</span>
        </h3>
      </div>
      
      {!clienteInicial && (
        <div className="mb-4">
          <div className="flex gap-2 mb-3">
            <button
              type="button"
              onClick={() => handleCambioModo("seleccionar")}
              className={`flex-1 py-2 px-3 rounded-lg border ${
                modoCreacion === "seleccionar"
                  ? "bg-primary text-white border-primary"
                  : "bg-default-50 border-default-200 hover:bg-default-100"
              }`}
            >
              Seleccionar cliente existente
            </button>
            <button
              type="button"
              onClick={() => handleCambioModo("manual")}
              className={`flex-1 py-2 px-3 rounded-lg border ${
                modoCreacion === "manual"
                  ? "bg-primary text-white border-primary"
                  : "bg-default-50 border-default-200 hover:bg-default-100"
              }`}
            >
              Crear cliente manualmente
            </button>
          </div>
          
          {modoCreacion === "seleccionar" && (
            <div>
              <label htmlFor="clienteExistente" className="block text-sm font-medium mb-1">
                Seleccionar Cliente
              </label>
              <select
                id="clienteExistente"
                className="w-full p-2 border border-default-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={clienteSeleccionadoId}
                onChange={(e) => setClienteSeleccionadoId(e.target.value)}
              >
                <option value="">Seleccione un cliente</option>
                {clientesExistentes.map(cliente => (
                  <option key={cliente.id} value={cliente.id.toString()}>
                    {cliente.nombre} - {cliente.direccion} ({cliente.zona})
                  </option>
                ))}
              </select>
              
              {renderClienteSeleccionadoInfo()}
            </div>
          )}
        </div>
      )}
      
      {/* Solo mostrar campos de cliente cuando estemos en modo manual o editando */}
      {(modoCreacion === "manual" || clienteInicial) && (
        <>
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium mb-1">
              Nombre del Cliente
            </label>
            <Input
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Tienda Los Pinos"
              required
              fullWidth
              variant="bordered"
            />
          </div>
          
          <div>
            <label htmlFor="direccion" className="block text-sm font-medium mb-1">
              Dirección
            </label>
            <Input
              id="direccion"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              placeholder="Ej: Av. Principal #123"
              required
              fullWidth
              variant="bordered"
            />
          </div>
        </>
      )}
      
      <div className="border-t border-default-200 pt-4 mt-4">
        <h4 className="font-medium mb-2">Productos a entregar</h4>
        
        <div className="flex gap-2 mb-4">
          <div className="flex-1">
            <select 
              className="w-full p-2 border border-default-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={productoSeleccionado}
              onChange={(e) => setProductoSeleccionado(e.target.value)}
            >
              <option value="">Seleccionar producto</option>
              {PRODUCTOS_DISPONIBLES.map(producto => (
                <option key={producto.id} value={producto.id.toString()}>
                  {producto.nombre}
                </option>
              ))}
            </select>
          </div>
          
          <div className="w-24">
            <Input
              type="number"
              min="1"
              value={cantidadProducto.toString()}
              onChange={(e) => setCantidadProducto(Number(e.target.value))}
              fullWidth
              variant="bordered"
            />
          </div>
          
          <button
            type="button"
            onClick={handleAgregarProducto}
            className="bg-primary text-white px-4 rounded-lg hover:bg-primary-600 disabled:opacity-50"
            disabled={!productoSeleccionado}
          >
            Añadir
          </button>
        </div>
        
        {/* Lista de productos agregados */}
        {productos.length > 0 ? (
          <div className="border border-default-200 rounded-lg overflow-hidden">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-default-100">
                  <th className="px-3 py-2 text-left text-sm">Producto</th>
                  <th className="px-3 py-2 text-left text-sm">Cantidad</th>
                  <th className="px-3 py-2 text-center text-sm w-16">Acción</th>
                </tr>
              </thead>
              <tbody>
                {productos.map(producto => (
                  <tr key={producto.id} className="border-t border-default-200">
                    <td className="px-3 py-2">{producto.nombre}</td>
                    <td className="px-3 py-2">{producto.cantidad}</td>
                    <td className="px-3 py-2 text-center">
                      <button
                        type="button"
                        onClick={() => handleEliminarProducto(producto.id)}
                        className="text-danger hover:text-danger-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center p-4 border border-dashed border-default-300 rounded-lg">
            No hay productos agregados
          </div>
        )}
      </div>
    </form>
  );
} 