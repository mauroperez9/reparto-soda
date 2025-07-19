"use client";

import { useState, useEffect } from "react";
import { Input } from "@heroui/input";
import { Pedido } from "@/components/dashboard/PedidosTable";

interface PedidoFormProps {
  onSubmit: (pedido: Omit<Pedido, "id">) => void;
  pedidoInicial?: Pedido;
}

export default function PedidoForm({ onSubmit, pedidoInicial }: PedidoFormProps) {
  const [cliente, setCliente] = useState(pedidoInicial?.cliente || "");
  const [producto, setProducto] = useState(pedidoInicial?.producto || "");
  const [cantidad, setCantidad] = useState(pedidoInicial?.cantidad.toString() || "");
  const [estado, setEstado] = useState<Pedido["estado"]>(pedidoInicial?.estado || "Pendiente");

  useEffect(() => {
    if (pedidoInicial) {
      setCliente(pedidoInicial.cliente);
      setProducto(pedidoInicial.producto);
      setCantidad(pedidoInicial.cantidad.toString());
      setEstado(pedidoInicial.estado);
    }
  }, [pedidoInicial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!cliente || !producto || !cantidad) {
      alert("Por favor, complete todos los campos");
      return;
    }
    
    onSubmit({
      cliente,
      producto,
      cantidad: parseInt(cantidad, 10),
      estado
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="cliente" className="block text-sm font-medium mb-1">
          Cliente
        </label>
        <Input
          id="cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          placeholder="Nombre del cliente"
          required
          fullWidth
          variant="bordered"
        />
      </div>
      
      <div>
        <label htmlFor="producto" className="block text-sm font-medium mb-1">
          Producto
        </label>
        <Input
          id="producto"
          value={producto}
          onChange={(e) => setProducto(e.target.value)}
          placeholder="Nombre del producto"
          required
          fullWidth
          variant="bordered"
        />
      </div>
      
      <div>
        <label htmlFor="cantidad" className="block text-sm font-medium mb-1">
          Cantidad
        </label>
        <Input
          id="cantidad"
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          placeholder="Cantidad"
          required
          fullWidth
          variant="bordered"
        />
      </div>
      
      <div>
        <label htmlFor="estado" className="block text-sm font-medium mb-1">
          Estado
        </label>
        <select
          id="estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value as Pedido["estado"])}
          className="w-full px-3 py-2 bg-content2 rounded-md border border-default-200 focus:outline-none focus:border-primary"
        >
          <option value="Pendiente">Pendiente</option>
          <option value="En reparto">En reparto</option>
          <option value="Entregado">Entregado</option>
        </select>
      </div>
    </form>
  );
} 