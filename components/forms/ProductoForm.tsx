"use client";

import { useState, useEffect } from "react";
import { Input } from "@heroui/input";
import { Producto } from "@/components/dashboard/ProductosTable";

interface ProductoFormProps {
  onSubmit: (producto: Omit<Producto, "id">) => void;
  productoInicial?: Producto;
}

export default function ProductoForm({ onSubmit, productoInicial }: ProductoFormProps) {
  const [nombre, setNombre] = useState(productoInicial?.nombre || "");
  const [precio, setPrecio] = useState(productoInicial?.precio.toString() || "");
  const [stock, setStock] = useState(productoInicial?.stock.toString() || "");

  useEffect(() => {
    if (productoInicial) {
      setNombre(productoInicial.nombre);
      setPrecio(productoInicial.precio.toString());
      setStock(productoInicial.stock.toString());
    }
  }, [productoInicial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!nombre || !precio || !stock) {
      alert("Por favor, complete todos los campos");
      return;
    }
    
    onSubmit({
      nombre,
      precio: parseInt(precio, 10),
      stock: parseInt(stock, 10)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium mb-1">
          Nombre del Producto
        </label>
        <Input
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del producto"
          required
          fullWidth
          variant="bordered"
        />
      </div>
      
      <div>
        <label htmlFor="precio" className="block text-sm font-medium mb-1">
          Precio ($)
        </label>
        <Input
          id="precio"
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          placeholder="Precio del producto"
          required
          fullWidth
          variant="bordered"
        />
      </div>
      
      <div>
        <label htmlFor="stock" className="block text-sm font-medium mb-1">
          Stock disponible
        </label>
        <Input
          id="stock"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Cantidad en stock"
          required
          fullWidth
          variant="bordered"
        />
      </div>
    </form>
  );
} 