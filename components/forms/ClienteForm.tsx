"use client";

import { useState, useEffect } from "react";
import { Input } from "@heroui/input";
import { Cliente } from "@/components/dashboard/ClientesTable";

interface ClienteFormProps {
  onSubmit: (cliente: Omit<Cliente, "id">) => void;
  clienteInicial?: Cliente;
}

// Lista de departamentos/zonas de Mendoza
const ZONAS_MENDOZA = [
  "Capital",
  "Las Heras",
  "Guaymallén",
  "Godoy Cruz",
  "Maipú",
  "Luján de Cuyo",
  "San Martín",
  "Junín",
  "Rivadavia",
  "Lavalle",
  "San Rafael",
  "General Alvear",
  "Malargüe",
  "Tunuyán",
  "Tupungato",
  "San Carlos"
];

export default function ClienteForm({ onSubmit, clienteInicial }: ClienteFormProps) {
  const [nombre, setNombre] = useState(clienteInicial?.nombre || "");
  const [direccion, setDireccion] = useState(clienteInicial?.direccion || "");
  const [zona, setZona] = useState(clienteInicial?.zona || "");
  const [telefono, setTelefono] = useState(clienteInicial?.telefono || "");
  const [envases, setEnvases] = useState({
    agua12L: clienteInicial?.envases?.agua12L || 0,
    agua20L: clienteInicial?.envases?.agua20L || 0,
    soda: clienteInicial?.envases?.soda || 0,
  });
  const [envasesExpanded, setEnvasesExpanded] = useState(false);

  useEffect(() => {
    if (clienteInicial) {
      setNombre(clienteInicial.nombre);
      setDireccion(clienteInicial.direccion);
      setZona(clienteInicial.zona || "");
      setTelefono(clienteInicial.telefono);
      setEnvases({
        agua12L: clienteInicial.envases?.agua12L || 0,
        agua20L: clienteInicial.envases?.agua20L || 0,
        soda: clienteInicial.envases?.soda || 0,
      });

      // Si el cliente tiene envases, expandir el panel automáticamente
      if (
        clienteInicial.envases?.agua12L > 0 || 
        clienteInicial.envases?.agua20L > 0 || 
        clienteInicial.envases?.soda > 0
      ) {
        setEnvasesExpanded(true);
      }
    }
  }, [clienteInicial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!nombre || !direccion || !zona || !telefono) {
      alert("Por favor, complete todos los campos");
      return;
    }
    
    onSubmit({
      nombre,
      direccion,
      zona,
      telefono,
      envases
    });
  };

  // Maneja cambios en los campos de envases
  const handleEnvasesChange = (field: keyof typeof envases, value: number) => {
    setEnvases({
      ...envases,
      [field]: value < 0 ? 0 : value // Asegurarse de que no sea negativo
    });
  };

  // Calcular el total de envases
  const totalEnvases = envases.agua12L + envases.agua20L + envases.soda;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium mb-1">
          Nombre
        </label>
        <Input
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del cliente"
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
          placeholder="Dirección del cliente"
          required
          fullWidth
          variant="bordered"
        />
      </div>
      
      <div>
        <label htmlFor="zona" className="block text-sm font-medium mb-1">
          Zona/Departamento
        </label>
        <select
          id="zona"
          value={zona}
          onChange={(e) => setZona(e.target.value)}
          className="w-full px-3 py-2 bg-content2 rounded-md border border-default-200 focus:outline-none focus:border-primary"
          required
        >
          <option value="">Seleccione una zona</option>
          {ZONAS_MENDOZA.map((zonaNombre) => (
            <option key={zonaNombre} value={zonaNombre}>
              {zonaNombre}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label htmlFor="telefono" className="block text-sm font-medium mb-1">
          Teléfono
        </label>
        <Input
          id="telefono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="Teléfono del cliente"
          required
          fullWidth
          variant="bordered"
        />
      </div>

      <div className="border-t border-default-200 pt-4 mt-4">
        <button
          type="button"
          onClick={() => setEnvasesExpanded(!envasesExpanded)}
          className="w-full flex justify-between items-center p-3 bg-default-100 hover:bg-default-200 rounded-lg"
        >
          <div className="flex items-center">
            <span className="font-medium">Control de Envases</span>
            <span className="ml-3 bg-primary-100 text-primary-700 px-2 py-0.5 text-xs rounded-full">
              {totalEnvases} envases
            </span>
          </div>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transition-transform ${envasesExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {envasesExpanded && (
          <div className="mt-3 p-4 border border-default-200 rounded-lg bg-default-50">
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-primary-50 p-3 rounded-lg">
                <label htmlFor="agua12L" className="flex justify-between items-center">
                  <span className="font-medium">Envases Agua 12L</span>
                  <Input
                    id="agua12L"
                    type="number"
                    min="0"
                    value={envases.agua12L.toString()}
                    onChange={(e) => handleEnvasesChange('agua12L', parseInt(e.target.value) || 0)}
                    className="w-24"
                    size="sm"
                    variant="bordered"
                  />
                </label>
              </div>
              
              <div className="bg-primary-50 p-3 rounded-lg">
                <label htmlFor="agua20L" className="flex justify-between items-center">
                  <span className="font-medium">Envases Agua 20L</span>
                  <Input
                    id="agua20L"
                    type="number"
                    min="0"
                    value={envases.agua20L.toString()}
                    onChange={(e) => handleEnvasesChange('agua20L', parseInt(e.target.value) || 0)}
                    className="w-24"
                    size="sm"
                    variant="bordered"
                  />
                </label>
              </div>
              
              <div className="bg-primary-50 p-3 rounded-lg">
                <label htmlFor="soda" className="flex justify-between items-center">
                  <span className="font-medium">Envases Soda</span>
                  <Input
                    id="soda"
                    type="number"
                    min="0"
                    value={envases.soda.toString()}
                    onChange={(e) => handleEnvasesChange('soda', parseInt(e.target.value) || 0)}
                    className="w-24"
                    size="sm"
                    variant="bordered"
                  />
                </label>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-primary-50 rounded-lg text-center">
              <span className="font-medium">Total envases: </span>
              <span className="text-primary-700 font-bold">{totalEnvases}</span>
            </div>
          </div>
        )}
      </div>
    </form>
  );
} 