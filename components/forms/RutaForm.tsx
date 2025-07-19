"use client";

import { useState } from "react";
import { Input } from "@heroui/input";

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

interface Ruta {
  id?: number;
  nombre: string;
  dia: string;
  zona: string;
  repartidor: string;
  vehiculo: string;
}

interface RutaFormProps {
  id?: string;
  onSubmit: (ruta: Omit<Ruta, "id">) => void;
  rutaInicial?: Ruta;
  diasSemana: string[];
}

export default function RutaForm({ id, onSubmit, rutaInicial, diasSemana }: RutaFormProps) {
  const [nombre, setNombre] = useState(rutaInicial?.nombre || "");
  const [dia, setDia] = useState(rutaInicial?.dia || diasSemana[0]);
  const [zona, setZona] = useState(rutaInicial?.zona || "");
  const [repartidor, setRepartidor] = useState(rutaInicial?.repartidor || "");
  const [vehiculo, setVehiculo] = useState(rutaInicial?.vehiculo || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!nombre || !dia || !zona || !repartidor || !vehiculo) {
      alert("Por favor, complete todos los campos");
      return;
    }
    
    onSubmit({
      nombre,
      dia,
      zona,
      repartidor,
      vehiculo
    });
  };

  return (
    <form id={id} onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium mb-1">
          Nombre de la Ruta
        </label>
        <Input
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej: Ruta Norte"
          required
          fullWidth
          variant="bordered"
        />
      </div>
      
      <div>
        <label htmlFor="dia" className="block text-sm font-medium mb-1">
          Día de Reparto
        </label>
        <select
          id="dia"
          value={dia}
          onChange={(e) => setDia(e.target.value)}
          className="w-full px-3 py-2 bg-content2 rounded-md border border-default-200 focus:outline-none focus:border-primary"
          required
        >
          {diasSemana.map((d) => (
            <option key={d} value={d} className="capitalize">
              {d}
            </option>
          ))}
        </select>
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
        <label htmlFor="repartidor" className="block text-sm font-medium mb-1">
          Repartidor Asignado
        </label>
        <Input
          id="repartidor"
          value={repartidor}
          onChange={(e) => setRepartidor(e.target.value)}
          placeholder="Nombre del repartidor"
          required
          fullWidth
          variant="bordered"
        />
      </div>
      
      <div>
        <label htmlFor="vehiculo" className="block text-sm font-medium mb-1">
          Vehículo
        </label>
        <Input
          id="vehiculo"
          value={vehiculo}
          onChange={(e) => setVehiculo(e.target.value)}
          placeholder="Ej: Camión, Furgón..."
          required
          fullWidth
          variant="bordered"
        />
      </div>
    </form>
  );
} 