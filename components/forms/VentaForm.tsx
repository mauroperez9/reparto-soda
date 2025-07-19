"use client";

import { useState, useEffect } from "react";
import { Input } from "@heroui/input";
import { Venta } from "@/components/dashboard/VentasTable";

interface VentaFormProps {
  onSubmit: (venta: Omit<Venta, "id">) => void;
  ventaInicial?: Venta;
  id?: string;
}

// Datos de ejemplo para productos
const PRODUCTOS_DISPONIBLES = [
  { id: 1, nombre: "Agua 20L", precio: 1500 },
  { id: 2, nombre: "Refresco 2L Cola", precio: 950 },
  { id: 3, nombre: "Refresco 2L Naranja", precio: 950 },
  { id: 4, nombre: "Agua 5L", precio: 600 },
  { id: 5, nombre: "Agua con gas 2L", precio: 750 }
];

// Datos de ejemplo para clientes
const CLIENTES_DISPONIBLES = [
  { id: 1, nombre: "Restaurant El Buen Sabor" },
  { id: 2, nombre: "Hotel Plaza" },
  { id: 3, nombre: "Cafetería Central" },
  { id: 4, nombre: "Gimnasio Fitness" },
  { id: 5, nombre: "Supermercado Economía" }
];

// Datos de ejemplo para repartidores
const REPARTIDORES_DISPONIBLES = [
  { id: 1, nombre: "Juan Pérez" },
  { id: 2, nombre: "Miguel Rojas" },
  { id: 3, nombre: "Carlos Sánchez" }
];

export default function VentaForm({ onSubmit, ventaInicial, id }: VentaFormProps) {
  const [fecha, setFecha] = useState(ventaInicial?.fecha || obtenerFechaActual());
  const [clienteId, setClienteId] = useState<string>(ventaInicial ? obtenerClienteId(ventaInicial.cliente) : "");
  const [metodoPago, setMetodoPago] = useState<Venta["metodoPago"]>(ventaInicial?.metodoPago || "Efectivo");
  const [estado, setEstado] = useState<Venta["estado"]>(ventaInicial?.estado || "Pagada");
  const [repartidorId, setRepartidorId] = useState<string>(ventaInicial && ventaInicial.repartidor ? obtenerRepartidorId(ventaInicial.repartidor) : "");
  
  const [productos, setProductos] = useState<Venta["productos"]>(ventaInicial?.productos || []);
  const [productoSeleccionadoId, setProductoSeleccionadoId] = useState<string>("");
  const [cantidadProducto, setCantidadProducto] = useState<number>(1);
  
  // Total calculado
  const [total, setTotal] = useState(ventaInicial?.total || 0);
  
  // Determinar si la venta viene de una ruta
  const vieneDeLaRuta = ventaInicial && ventaInicial.productos.length > 0 && ventaInicial.productos.every(p => p.precioUnitario > 0);

  // Función para obtener fecha actual en formato YYYY-MM-DD
  function obtenerFechaActual() {
    const hoy = new Date();
    return hoy.toISOString().split('T')[0];
  }

  // Función para encontrar ID de cliente por nombre
  function obtenerClienteId(nombreCliente: string): string {
    const cliente = CLIENTES_DISPONIBLES.find(c => c.nombre === nombreCliente);
    return cliente ? cliente.id.toString() : "";
  }

  // Función para encontrar ID de repartidor por nombre
  function obtenerRepartidorId(nombreRepartidor: string): string {
    const repartidor = REPARTIDORES_DISPONIBLES.find(r => r.nombre === nombreRepartidor);
    return repartidor ? repartidor.id.toString() : "";
  }

  // Actualizar el total cuando cambien los productos
  useEffect(() => {
    const nuevoTotal = productos.reduce((sum, producto) => 
      sum + (producto.cantidad * producto.precioUnitario), 0);
    setTotal(nuevoTotal);
  }, [productos]);

  // Actualizar el estado cuando cambia el método de pago
  useEffect(() => {
    if (metodoPago === "Fiado") {
      setEstado("Pendiente");
    } else if (!ventaInicial) {
      // Si no estamos editando, al cambiar de Fiado a otro método, establecer como Pagada
      setEstado("Pagada");
    }
  }, [metodoPago, ventaInicial]);

  const handleAgregarProducto = () => {
    if (vieneDeLaRuta) return; // No permitir agregar productos si viene de una ruta
    
    if (!productoSeleccionadoId || cantidadProducto <= 0) return;
    
    const productoId = Number(productoSeleccionadoId);
    const productoInfo = PRODUCTOS_DISPONIBLES.find(p => p.id === productoId);
    
    if (!productoInfo) return;
    
    // Buscar si el producto ya existe en la lista
    const productoExistente = productos.find(p => p.nombre === productoInfo.nombre);
    
    if (productoExistente) {
      // Actualizar cantidad si ya existe
      setProductos(productos.map(p => 
        p.nombre === productoInfo.nombre 
          ? { ...p, cantidad: p.cantidad + cantidadProducto } 
          : p
      ));
    } else {
      // Añadir nuevo producto
      setProductos([
        ...productos, 
        { 
          nombre: productoInfo.nombre, 
          cantidad: cantidadProducto, 
          precioUnitario: productoInfo.precio
        }
      ]);
    }
    
    // Resetear selección
    setProductoSeleccionadoId("");
    setCantidadProducto(1);
  };
  
  const handleEliminarProducto = (nombreProducto: string) => {
    setProductos(productos.filter(p => p.nombre !== nombreProducto));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!clienteId) {
      alert("Por favor, seleccione un cliente");
      return;
    }
    
    if (productos.length === 0) {
      alert("Por favor, agregue al menos un producto");
      return;
    }
    
    // Obtener nombre del cliente seleccionado
    const clienteSeleccionado = CLIENTES_DISPONIBLES.find(c => c.id.toString() === clienteId);
    
    // Obtener nombre del repartidor seleccionado (si hay uno)
    const repartidorSeleccionado = repartidorId 
      ? REPARTIDORES_DISPONIBLES.find(r => r.id.toString() === repartidorId)
      : undefined;
    
    onSubmit({
      fecha,
      cliente: clienteSeleccionado?.nombre || "",
      productos,
      total,
      metodoPago,
      estado,
      repartidor: repartidorSeleccionado?.nombre
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fecha" className="block text-sm font-medium mb-1">
            Fecha
          </label>
          <Input
            id="fecha"
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
            fullWidth
            variant="bordered"
          />
        </div>
        
        <div>
          <label htmlFor="cliente" className="block text-sm font-medium mb-1">
            Cliente
          </label>
          <select
            id="cliente"
            className="w-full p-2 border border-default-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
            required
          >
            <option value="">Seleccionar cliente</option>
            {CLIENTES_DISPONIBLES.map(cliente => (
              <option key={cliente.id} value={cliente.id.toString()}>
                {cliente.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="metodoPago" className="block text-sm font-medium mb-1">
            Método de Pago
          </label>
          <select
            id="metodoPago"
            className="w-full p-2 border border-default-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value as Venta["metodoPago"])}
            required
          >
            <option value="Efectivo">Efectivo</option>
            <option value="Transferencia">Transferencia</option>
            <option value="Fiado">Fiado</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="estado" className="block text-sm font-medium mb-1">
            Estado
          </label>
          <select
            id="estado"
            className="w-full p-2 border border-default-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            value={estado}
            onChange={(e) => setEstado(e.target.value as Venta["estado"])}
            required
            disabled={metodoPago === "Fiado"}
          >
            <option value="Pagada">Pagada</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Cancelada">Cancelada</option>
          </select>
          {metodoPago === "Fiado" && (
            <p className="text-xs text-warning-600 mt-1">El estado se establece automáticamente como "Pendiente" para ventas a fiado</p>
          )}
        </div>
        
        <div>
          <label htmlFor="repartidor" className="block text-sm font-medium mb-1">
            Repartidor (opcional)
          </label>
          <select
            id="repartidor"
            className="w-full p-2 border border-default-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            value={repartidorId}
            onChange={(e) => setRepartidorId(e.target.value)}
          >
            <option value="">Sin repartidor</option>
            {REPARTIDORES_DISPONIBLES.map(repartidor => (
              <option key={repartidor.id} value={repartidor.id.toString()}>
                {repartidor.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="border-t border-default-200 pt-4 mt-4">
        <h4 className="font-medium mb-2">Productos vendidos</h4>
        
        {vieneDeLaRuta && (
          <div className="bg-success-50 border border-success-200 p-3 rounded-lg mb-4">
            <p className="text-success-700 text-sm font-medium">
              Estos productos han sido cargados automáticamente desde la ruta de reparto con sus precios correspondientes.
            </p>
          </div>
        )}
        
        {!vieneDeLaRuta && (
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex-1 min-w-[200px]">
              <select 
                className="w-full p-2 border border-default-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={productoSeleccionadoId}
                onChange={(e) => setProductoSeleccionadoId(e.target.value)}
              >
                <option value="">Seleccionar producto</option>
                {PRODUCTOS_DISPONIBLES.map(producto => (
                  <option key={producto.id} value={producto.id.toString()}>
                    {producto.nombre} - ${producto.precio}
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
              disabled={!productoSeleccionadoId}
            >
              Añadir
            </button>
          </div>
        )}
        
        {/* Lista de productos agregados */}
        {productos.length > 0 ? (
          <div className="border border-default-200 rounded-lg overflow-hidden">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-default-100">
                  <th className="px-3 py-2 text-left text-sm">Producto</th>
                  <th className="px-3 py-2 text-right text-sm">Precio Unit.</th>
                  <th className="px-3 py-2 text-center text-sm">Cantidad</th>
                  <th className="px-3 py-2 text-right text-sm">Subtotal</th>
                  <th className="px-3 py-2 text-center text-sm w-16">Acción</th>
                </tr>
              </thead>
              <tbody>
                {productos.map(producto => (
                  <tr key={producto.nombre} className="border-t border-default-200">
                    <td className="px-3 py-2">{producto.nombre}</td>
                    <td className="px-3 py-2 text-right font-medium">${producto.precioUnitario}</td>
                    <td className="px-3 py-2 text-center">
                      {vieneDeLaRuta ? (
                        <span className="font-medium">{producto.cantidad}</span>
                      ) : (
                        <Input
                          type="number"
                          min="1"
                          value={producto.cantidad.toString()}
                          onChange={(e) => {
                            const newCantidad = Number(e.target.value);
                            setProductos(productos.map(p => 
                              p.nombre === producto.nombre ? { ...p, cantidad: newCantidad } : p
                            ));
                          }}
                          size="sm"
                          className="w-16 mx-auto"
                        />
                      )}
                    </td>
                    <td className="px-3 py-2 text-right font-medium">
                      <span className="text-success-600">${(producto.cantidad * producto.precioUnitario).toLocaleString()}</span>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <button
                        type="button"
                        onClick={() => handleEliminarProducto(producto.nombre)}
                        className="text-danger hover:text-danger-600"
                        disabled={vieneDeLaRuta}
                        title={vieneDeLaRuta ? "No se puede eliminar productos preestablecidos" : "Eliminar"}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${vieneDeLaRuta ? 'opacity-30' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-default-50">
                  <td colSpan={3} className="px-3 py-2 text-right font-medium">Total:</td>
                  <td className="px-3 py-2 text-right font-bold">${total.toLocaleString()}</td>
                  <td></td>
                </tr>
              </tfoot>
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