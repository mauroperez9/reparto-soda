"use client";

import { useState } from "react";
import { RowActions } from "@/components/action-buttons";
import Modal from "@/components/ui/Modal";

// Tipo para ventas
export interface Venta {
  id: number;
  fecha: string;
  cliente: string;
  productos: {
    nombre: string;
    cantidad: number;
    precioUnitario: number;
  }[];
  total: number;
  metodoPago: "Efectivo" | "Transferencia" | "Fiado";
  estado: "Pagada" | "Pendiente" | "Cancelada";
  repartidor?: string;
}

interface VentasTableProps {
  ventas: Venta[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function VentasTable({ ventas, onEdit, onDelete }: VentasTableProps) {
  // Estado para el modal de detalles
  const [detallesModalOpen, setDetallesModalOpen] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState<Venta | null>(null);

  const formatearFecha = (fechaStr: string) => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatearMonto = (monto: number) => {
    return `$${monto.toLocaleString('es-AR')}`;
  };

  const obtenerClaseEstado = (estado: Venta['estado']) => {
    switch (estado) {
      case 'Pagada':
        return 'bg-success-100 text-success-600';
      case 'Pendiente':
        return 'bg-warning-100 text-warning-600';
      case 'Cancelada':
        return 'bg-danger-100 text-danger-600';
      default:
        return '';
    }
  };

  const obtenerClaseMetodoPago = (metodoPago: Venta['metodoPago']) => {
    switch (metodoPago) {
      case 'Efectivo':
        return 'bg-success-100 text-success-600';
      case 'Transferencia':
        return 'bg-primary-100 text-primary-600';
      case 'Fiado':
        return 'bg-warning-100 text-warning-600';
      default:
        return '';
    }
  };

  const calcularTotalProductos = (venta: Venta) => {
    return venta.productos.reduce((sum, producto) => sum + producto.cantidad, 0);
  };

  const mostrarDetallesVenta = (venta: Venta) => {
    setVentaSeleccionada(venta);
    setDetallesModalOpen(true);
  };

  const cerrarDetallesModal = () => {
    setDetallesModalOpen(false);
    setVentaSeleccionada(null);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-default-100">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Fecha</th>
              <th className="px-4 py-2 text-left">Cliente</th>
              <th className="px-4 py-2 text-left">Productos</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Método Pago</th>
              <th className="px-4 py-2 text-left">Estado</th>
              <th className="px-4 py-2 text-left">Repartidor</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta) => (
              <tr key={venta.id} className="border-b border-default-200">
                <td className="px-4 py-2">{venta.id}</td>
                <td className="px-4 py-2">{formatearFecha(venta.fecha)}</td>
                <td className="px-4 py-2">{venta.cliente}</td>
                <td className="px-4 py-2">
                  <div className="text-sm">
                    <div>{calcularTotalProductos(venta)} productos</div>
                    <button 
                      className="text-primary text-xs underline cursor-pointer mt-1"
                      onClick={() => mostrarDetallesVenta(venta)}
                    >
                      Ver detalles
                    </button>
                  </div>
                </td>
                <td className="px-4 py-2 font-medium">{formatearMonto(venta.total)}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${obtenerClaseMetodoPago(venta.metodoPago)}`}>
                    {venta.metodoPago}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${obtenerClaseEstado(venta.estado)}`}>
                    {venta.estado}
                  </span>
                </td>
                <td className="px-4 py-2">{venta.repartidor || "-"}</td>
                <td className="px-4 py-2">
                  <RowActions 
                    onEdit={() => onEdit(venta.id)}
                    onDelete={() => onDelete(venta.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de detalles de productos */}
      <Modal
        isOpen={detallesModalOpen}
        onClose={cerrarDetallesModal}
        title={ventaSeleccionada ? `Detalles de venta #${ventaSeleccionada.id}` : "Detalles de venta"}
        submitLabel="Cerrar"
        onSubmit={cerrarDetallesModal}
      >
        {ventaSeleccionada && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="border border-default-200 rounded p-3">
                <h4 className="font-medium text-sm mb-1">Cliente</h4>
                <p className="text-base">{ventaSeleccionada.cliente}</p>
              </div>
              <div className="border border-default-200 rounded p-3">
                <h4 className="font-medium text-sm mb-1">Fecha</h4>
                <p className="text-base">{formatearFecha(ventaSeleccionada.fecha)}</p>
              </div>
              <div className="border border-default-200 rounded p-3">
                <h4 className="font-medium text-sm mb-1">Método de Pago</h4>
                <span className={`px-2 py-1 rounded-full text-xs ${obtenerClaseMetodoPago(ventaSeleccionada.metodoPago)}`}>
                  {ventaSeleccionada.metodoPago}
                </span>
              </div>
              <div className="border border-default-200 rounded p-3">
                <h4 className="font-medium text-sm mb-1">Estado</h4>
                <span className={`px-2 py-1 rounded-full text-xs ${obtenerClaseEstado(ventaSeleccionada.estado)}`}>
                  {ventaSeleccionada.estado}
                </span>
              </div>
              {ventaSeleccionada.repartidor && (
                <div className="border border-default-200 rounded p-3">
                  <h4 className="font-medium text-sm mb-1">Repartidor</h4>
                  <p className="text-base">{ventaSeleccionada.repartidor}</p>
                </div>
              )}
            </div>

            <div className="border-t border-default-200 pt-4">
              <h4 className="font-medium mb-2">Productos vendidos</h4>
              <div className="border border-default-200 rounded-lg overflow-hidden">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-default-100">
                      <th className="px-3 py-2 text-left text-sm">Producto</th>
                      <th className="px-3 py-2 text-center text-sm">Cantidad</th>
                      <th className="px-3 py-2 text-right text-sm">Precio Unit.</th>
                      <th className="px-3 py-2 text-right text-sm">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ventaSeleccionada.productos.map((producto, index) => (
                      <tr key={index} className="border-t border-default-200">
                        <td className="px-3 py-2">{producto.nombre}</td>
                        <td className="px-3 py-2 text-center">{producto.cantidad}</td>
                        <td className="px-3 py-2 text-right">{formatearMonto(producto.precioUnitario)}</td>
                        <td className="px-3 py-2 text-right font-medium">
                          {formatearMonto(producto.cantidad * producto.precioUnitario)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-default-50 font-bold">
                      <td colSpan={3} className="px-3 py-2 text-right">Total:</td>
                      <td className="px-3 py-2 text-right">{formatearMonto(ventaSeleccionada.total)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
} 