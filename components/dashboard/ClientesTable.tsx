"use client";

import { useState } from "react";
import { RowActions } from "@/components/action-buttons";
import Modal from "@/components/ui/Modal";

// Tipo para los clientes
export interface Cliente {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  zona: string; // Departamento/zona para sectorizar rutas
  envases: {
    agua12L: number;
    agua20L: number;
    soda: number;
  };
}

interface ClientesTableProps {
  clientes: Cliente[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdateEnvases?: (id: number, envases: Cliente["envases"]) => void;
}

export default function ClientesTable({ clientes, onEdit, onDelete, onUpdateEnvases }: ClientesTableProps) {
  const [clienteEnvases, setClienteEnvases] = useState<Cliente | null>(null);
  const [isEnvasesModalOpen, setIsEnvasesModalOpen] = useState(false);
  const [editedEnvases, setEditedEnvases] = useState<Cliente["envases"]>({
    agua12L: 0,
    agua20L: 0,
    soda: 0
  });

  const handleOpenEnvases = (cliente: Cliente) => {
    setClienteEnvases(cliente);
    setEditedEnvases({...cliente.envases});
    setIsEnvasesModalOpen(true);
  };

  const handleCloseEnvases = () => {
    setIsEnvasesModalOpen(false);
    setClienteEnvases(null);
  };

  const handleEnvasesChange = (field: keyof typeof editedEnvases, value: number) => {
    setEditedEnvases({
      ...editedEnvases,
      [field]: value < 0 ? 0 : value
    });
  };

  const handleEnvasesSubmit = () => {
    if (clienteEnvases && onUpdateEnvases) {
      onUpdateEnvases(clienteEnvases.id, editedEnvases);
    }
    handleCloseEnvases();
  };

  // Calcula el total de envases para mostrar un resumen
  const getTotalEnvases = (envases: Cliente["envases"]) => {
    return envases.agua12L + envases.agua20L + envases.soda;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-default-100">
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Dirección</th>
            <th className="px-4 py-2 text-left">Zona/Departamento</th>
            <th className="px-4 py-2 text-left">Teléfono</th>
            <th className="px-4 py-2 text-center">Envases</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id} className="border-b border-default-200">
              <td className="px-4 py-2">{cliente.id}</td>
              <td className="px-4 py-2">{cliente.nombre}</td>
              <td className="px-4 py-2">{cliente.direccion}</td>
              <td className="px-4 py-2">{cliente.zona}</td>
              <td className="px-4 py-2">{cliente.telefono}</td>
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => handleOpenEnvases(cliente)}
                  className="bg-primary-100 hover:bg-primary-200 text-primary-700 px-2 py-1 rounded-lg text-sm flex items-center justify-center mx-auto"
                >
                  <span className="font-medium">{getTotalEnvases(cliente.envases)}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </td>
              <td className="px-4 py-2">
                <RowActions 
                  onEdit={() => onEdit(cliente.id)}
                  onDelete={() => onDelete(cliente.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para editar envases */}
      <Modal
        isOpen={isEnvasesModalOpen}
        onClose={handleCloseEnvases}
        title={`Envases - ${clienteEnvases?.nombre || ""}`}
        onSubmit={handleEnvasesSubmit}
        submitLabel="Guardar"
      >
        {clienteEnvases && (
          <div className="space-y-4">
            <p className="text-sm text-default-600 mb-4">
              Ajusta la cantidad de envases actualmente en posesión del cliente.
            </p>
            
            <div className="p-4 bg-default-50 rounded-lg">
              <h4 className="font-medium text-center mb-4">Control de Envases</h4>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-primary-50 p-3 rounded-lg">
                  <label htmlFor="agua12L" className="flex justify-between mb-2">
                    <span className="font-medium">Agua 12L:</span>
                    <input
                      id="agua12L"
                      type="number"
                      min="0"
                      value={editedEnvases.agua12L}
                      onChange={(e) => handleEnvasesChange('agua12L', parseInt(e.target.value) || 0)}
                      className="w-20 px-2 border border-default-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </label>
                </div>
                
                <div className="bg-primary-50 p-3 rounded-lg">
                  <label htmlFor="agua20L" className="flex justify-between mb-2">
                    <span className="font-medium">Agua 20L:</span>
                    <input
                      id="agua20L"
                      type="number"
                      min="0"
                      value={editedEnvases.agua20L}
                      onChange={(e) => handleEnvasesChange('agua20L', parseInt(e.target.value) || 0)}
                      className="w-20 px-2 border border-default-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </label>
                </div>
                
                <div className="bg-primary-50 p-3 rounded-lg">
                  <label htmlFor="soda" className="flex justify-between mb-2">
                    <span className="font-medium">Soda:</span>
                    <input
                      id="soda"
                      type="number"
                      min="0"
                      value={editedEnvases.soda}
                      onChange={(e) => handleEnvasesChange('soda', parseInt(e.target.value) || 0)}
                      className="w-20 px-2 border border-default-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </label>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-primary-50 rounded-lg text-center">
                <span className="font-medium">Total envases: </span>
                <span className="text-primary-700">{getTotalEnvases(editedEnvases)}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
} 