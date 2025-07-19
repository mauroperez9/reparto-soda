"use client";

import { RowActions } from "@/components/action-buttons";

// Tipo para los elementos de inventario
export interface ItemInventario {
  id: number;
  producto: string;
  categoria: string;
  cantidad: number;
  precioUnitario: number;
  fechaIngreso: string;
  ubicacion: string;
  esEnvase?: boolean;
  envasesEnClientes?: number;
}

interface InventarioTableProps {
  items: ItemInventario[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function InventarioTable({ items, onEdit, onDelete }: InventarioTableProps) {
  // Función para formatear precio
  const formatPrecio = (precio: number) => {
    return `$${precio.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      {/* Tabla de Productos */}
      <div className="overflow-x-auto">
        <h3 className="text-lg font-medium mb-3">Productos en Stock</h3>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-default-100">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Producto</th>
              <th className="px-4 py-2 text-left">Categoría</th>
              <th className="px-4 py-2 text-left">Cantidad</th>
              <th className="px-4 py-2 text-left">Precio Unitario</th>
              <th className="px-4 py-2 text-left">Valor Total</th>
              <th className="px-4 py-2 text-left">Fecha Ingreso</th>
              <th className="px-4 py-2 text-left">Ubicación</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.filter(item => !item.esEnvase).map((item) => (
              <tr key={item.id} className="border-b border-default-200">
                <td className="px-4 py-2">{item.id}</td>
                <td className="px-4 py-2">{item.producto}</td>
                <td className="px-4 py-2">{item.categoria}</td>
                <td className="px-4 py-2">{item.cantidad}</td>
                <td className="px-4 py-2">{formatPrecio(item.precioUnitario)}</td>
                <td className="px-4 py-2">{formatPrecio(item.cantidad * item.precioUnitario)}</td>
                <td className="px-4 py-2">{item.fechaIngreso}</td>
                <td className="px-4 py-2">{item.ubicacion}</td>
                <td className="px-4 py-2">
                  <RowActions 
                    onEdit={() => onEdit(item.id)}
                    onDelete={() => onDelete(item.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tabla de Envases */}
      <div className="overflow-x-auto">
        <h3 className="text-lg font-medium mb-3">Control de Envases</h3>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-primary-100">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Tipo de Envase</th>
              <th className="px-4 py-2 text-left">Disponibles</th>
              <th className="px-4 py-2 text-left">En Clientes</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Valor Unitario</th>
              <th className="px-4 py-2 text-left">Ubicación</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.filter(item => item.esEnvase).map((item) => (
              <tr key={item.id} className="border-b border-default-200">
                <td className="px-4 py-2">{item.id}</td>
                <td className="px-4 py-2">{item.producto}</td>
                <td className="px-4 py-2 font-medium text-success-600">{item.cantidad}</td>
                <td className="px-4 py-2 font-medium text-warning-600">{item.envasesEnClientes || 0}</td>
                <td className="px-4 py-2 font-medium text-primary-600">
                  {item.cantidad + (item.envasesEnClientes || 0)}
                </td>
                <td className="px-4 py-2">{formatPrecio(item.precioUnitario)}</td>
                <td className="px-4 py-2">{item.ubicacion}</td>
                <td className="px-4 py-2">
                  <RowActions 
                    onEdit={() => onEdit(item.id)}
                    onDelete={() => onDelete(item.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 