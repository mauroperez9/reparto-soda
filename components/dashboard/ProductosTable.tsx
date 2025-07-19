"use client";

import { RowActions } from "@/components/action-buttons";

// Tipo para los productos
export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
}

interface ProductosTableProps {
  productos: Producto[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function ProductosTable({ productos, onEdit, onDelete }: ProductosTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-default-100">
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Precio</th>
            <th className="px-4 py-2 text-left">Stock</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id} className="border-b border-default-200">
              <td className="px-4 py-2">{producto.id}</td>
              <td className="px-4 py-2">{producto.nombre}</td>
              <td className="px-4 py-2">${producto.precio}</td>
              <td className="px-4 py-2">{producto.stock}</td>
              <td className="px-4 py-2">
                <RowActions 
                  onEdit={() => onEdit(producto.id)}
                  onDelete={() => onDelete(producto.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 