"use client";

import { RowActions } from "@/components/action-buttons";

// Tipo para los pedidos
export interface Pedido {
  id: number;
  cliente: string;
  producto: string;
  cantidad: number;
  estado: "Pendiente" | "En reparto" | "Entregado";
}

interface PedidosTableProps {
  pedidos: Pedido[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function PedidosTable({ pedidos, onEdit, onDelete }: PedidosTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-default-100">
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Cliente</th>
            <th className="px-4 py-2 text-left">Producto</th>
            <th className="px-4 py-2 text-left">Cantidad</th>
            <th className="px-4 py-2 text-left">Estado</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id} className="border-b border-default-200">
              <td className="px-4 py-2">{pedido.id}</td>
              <td className="px-4 py-2">{pedido.cliente}</td>
              <td className="px-4 py-2">{pedido.producto}</td>
              <td className="px-4 py-2">{pedido.cantidad}</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  pedido.estado === "Pendiente" ? "bg-warning-100 text-warning-600" :
                  pedido.estado === "En reparto" ? "bg-primary-100 text-primary-600" :
                  "bg-success-100 text-success-600"
                }`}>
                  {pedido.estado}
                </span>
              </td>
              <td className="px-4 py-2">
                <RowActions 
                  onEdit={() => onEdit(pedido.id)}
                  onDelete={() => onDelete(pedido.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 