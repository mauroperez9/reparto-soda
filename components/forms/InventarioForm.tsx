"use client";

import { useState, useEffect } from "react";
import { Input } from "@heroui/input";
import { ItemInventario } from "@/components/dashboard/InventarioTable";

interface InventarioFormProps {
  onSubmit: (item: Omit<ItemInventario, "id">) => void;
  itemInicial?: ItemInventario;
}

// Lista de categorías disponibles
const CATEGORIAS = [
  "Agua",
  "Soda",
  "Bebida energética",
  "Envases"
];

export default function InventarioForm({ onSubmit, itemInicial }: InventarioFormProps) {
  const [producto, setProducto] = useState(itemInicial?.producto || "");
  const [categoria, setCategoria] = useState(itemInicial?.categoria || "");
  const [cantidad, setCantidad] = useState(itemInicial?.cantidad || 0);
  const [precioUnitario, setPrecioUnitario] = useState(itemInicial?.precioUnitario || 0);
  const [fechaIngreso, setFechaIngreso] = useState(itemInicial?.fechaIngreso || new Date().toISOString().split('T')[0]);
  const [ubicacion, setUbicacion] = useState(itemInicial?.ubicacion || "");
  const [esEnvase, setEsEnvase] = useState(itemInicial?.esEnvase || false);
  const [envasesEnClientes, setEnvasesEnClientes] = useState(itemInicial?.envasesEnClientes || 0);

  useEffect(() => {
    if (itemInicial) {
      setProducto(itemInicial.producto);
      setCategoria(itemInicial.categoria);
      setCantidad(itemInicial.cantidad);
      setPrecioUnitario(itemInicial.precioUnitario);
      setFechaIngreso(itemInicial.fechaIngreso);
      setUbicacion(itemInicial.ubicacion);
      setEsEnvase(itemInicial.esEnvase || false);
      setEnvasesEnClientes(itemInicial.envasesEnClientes || 0);
    }
  }, [itemInicial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!producto || !categoria || cantidad < 0 || precioUnitario < 0 || !fechaIngreso || !ubicacion) {
      alert("Por favor, complete todos los campos correctamente");
      return;
    }
    
    onSubmit({
      producto,
      categoria,
      cantidad,
      precioUnitario,
      fechaIngreso,
      ubicacion,
      esEnvase,
      envasesEnClientes: esEnvase ? envasesEnClientes : undefined
    });
  };

  // Determinar si mostrar campos de envases basado en la categoría
  const mostrarCamposEnvases = categoria === "Envases";

  useEffect(() => {
    if (categoria === "Envases") {
      setEsEnvase(true);
    } else {
      setEsEnvase(false);
      setEnvasesEnClientes(0);
    }
  }, [categoria]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="categoria" className="block text-sm font-medium mb-1">
          Categoría
        </label>
        <select
          id="categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full px-3 py-2 bg-content2 rounded-md border border-default-200 focus:outline-none focus:border-primary"
          required
        >
          <option value="">Seleccione una categoría</option>
          {CATEGORIAS.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="producto" className="block text-sm font-medium mb-1">
          {mostrarCamposEnvases ? "Tipo de Envase" : "Producto"}
        </label>
        <Input
          id="producto"
          value={producto}
          onChange={(e) => setProducto(e.target.value)}
          placeholder={mostrarCamposEnvases ? "Ej: Envase Agua 12L" : "Nombre del producto"}
          required
          fullWidth
          variant="bordered"
        />
      </div>
      
      <div>
        <label htmlFor="cantidad" className="block text-sm font-medium mb-1">
          {mostrarCamposEnvases ? "Cantidad Disponible" : "Cantidad"}
        </label>
        <Input
          id="cantidad"
          type="number"
          min="0"
          value={cantidad.toString()}
          onChange={(e) => setCantidad(parseInt(e.target.value) || 0)}
          placeholder="Cantidad"
          required
          fullWidth
          variant="bordered"
        />
      </div>

      {mostrarCamposEnvases && (
        <div>
          <label htmlFor="envasesEnClientes" className="block text-sm font-medium mb-1">
            Envases en Clientes
          </label>
          <Input
            id="envasesEnClientes"
            type="number"
            min="0"
            value={envasesEnClientes.toString()}
            onChange={(e) => setEnvasesEnClientes(parseInt(e.target.value) || 0)}
            placeholder="Cantidad de envases en posesión de clientes"
            required
            fullWidth
            variant="bordered"
          />
          <p className="mt-1 text-sm text-default-600">
            Total de envases: {cantidad + envasesEnClientes}
          </p>
        </div>
      )}
      
      <div>
        <label htmlFor="precioUnitario" className="block text-sm font-medium mb-1">
          Precio Unitario
        </label>
        <Input
          id="precioUnitario"
          type="number"
          min="0"
          value={precioUnitario.toString()}
          onChange={(e) => setPrecioUnitario(parseInt(e.target.value) || 0)}
          placeholder="Precio por unidad"
          required
          fullWidth
          variant="bordered"
        />
      </div>
      
      <div>
        <label htmlFor="fechaIngreso" className="block text-sm font-medium mb-1">
          Fecha de Ingreso
        </label>
        <Input
          id="fechaIngreso"
          type="date"
          value={fechaIngreso}
          onChange={(e) => setFechaIngreso(e.target.value)}
          required
          fullWidth
          variant="bordered"
        />
      </div>
      
      <div>
        <label htmlFor="ubicacion" className="block text-sm font-medium mb-1">
          Ubicación
        </label>
        <Input
          id="ubicacion"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          placeholder={mostrarCamposEnvases ? "Ej: Depósito de Envases, Sector A" : "Ubicación en almacén"}
          required
          fullWidth
          variant="bordered"
        />
      </div>
    </form>
  );
} 