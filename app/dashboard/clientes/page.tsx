"use client";

import { useState } from "react";
import { AddButton } from "@/components/action-buttons";
import ClientesTable, { Cliente } from "@/components/dashboard/ClientesTable";
import Modal from "@/components/ui/Modal";
import ClienteForm from "@/components/forms/ClienteForm";

export default function ClientesPage() {
  // Estados
  const [clientes, setClientes] = useState<Cliente[]>([
    { 
      id: 1, 
      nombre: "Restaurant El Buen Sabor", 
      direccion: "Av. Principal 123", 
      zona: "Capital", 
      telefono: "555-1234",
      envases: { agua12L: 2, agua20L: 5, soda: 3 }
    },
    { 
      id: 2, 
      nombre: "Hotel Plaza", 
      direccion: "Calle Comercio 456", 
      zona: "Godoy Cruz", 
      telefono: "555-5678",
      envases: { agua12L: 0, agua20L: 8, soda: 6 }
    },
    { 
      id: 3, 
      nombre: "Cafetería Central", 
      direccion: "Plaza Mayor 789", 
      zona: "Maipú", 
      telefono: "555-9012",
      envases: { agua12L: 3, agua20L: 4, soda: 2 }
    },
    { 
      id: 4, 
      nombre: "Gimnasio Fitness", 
      direccion: "Av. Deportiva 234", 
      zona: "Las Heras", 
      telefono: "555-3456",
      envases: { agua12L: 1, agua20L: 10, soda: 0 }
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Cliente | undefined>(undefined);

  // Funciones de acción
  const handleEdit = (id: number) => {
    const cliente = clientes.find(c => c.id === id);
    if (cliente) {
      setEditingCliente(cliente);
      setIsModalOpen(true);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("¿Está seguro de que desea eliminar este cliente?")) {
      setClientes(clientes.filter(cliente => cliente.id !== id));
    }
  };

  const handleAdd = () => {
    setEditingCliente(undefined);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingCliente(undefined);
  };

  const handleFormSubmit = (clienteData: Omit<Cliente, "id">) => {
    if (editingCliente) {
      // Actualizar cliente existente
      setClientes(clientes.map(c => 
        c.id === editingCliente.id ? { ...clienteData, id: editingCliente.id } : c
      ));
    } else {
      // Agregar nuevo cliente
      const newId = Math.max(0, ...clientes.map(c => c.id)) + 1;
      setClientes([...clientes, { ...clienteData, id: newId }]);
    }
    
    setIsModalOpen(false);
  };

  // Función para actualizar solo los envases
  const handleUpdateEnvases = (id: number, envases: Cliente["envases"]) => {
    setClientes(clientes.map(c => 
      c.id === id ? { ...c, envases } : c
    ));
  };

  const modalTitle = editingCliente ? "Editar Cliente" : "Nuevo Cliente";

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Gestión de Clientes</h2>
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg">Lista de Clientes</h3>
        <AddButton 
          onClick={handleAdd} 
          label="Nuevo Cliente" 
        />
      </div>
      
      <ClientesTable 
        clientes={clientes} 
        onEdit={handleEdit} 
        onDelete={handleDelete}
        onUpdateEnvases={handleUpdateEnvases}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={modalTitle}
        onSubmit={() => {
          // Disparamos el submit del formulario manualmente
          const formElement = document.querySelector('form') as HTMLFormElement;
          if (formElement) {
            const event = new Event('submit', { cancelable: true, bubbles: true });
            formElement.dispatchEvent(event);
          }
        }}
        submitLabel={editingCliente ? "Actualizar" : "Guardar"}
      >
        <ClienteForm
          onSubmit={handleFormSubmit}
          clienteInicial={editingCliente}
        />
      </Modal>
    </>
  );
} 