"use client";

import { useState } from "react";
import { AddButton } from "@/components/action-buttons";
import InventarioTable, { ItemInventario } from "@/components/dashboard/InventarioTable";
import Modal from "@/components/ui/Modal";
import InventarioForm from "@/components/forms/InventarioForm";

export default function InventarioPage() {
  // Estados
  const [items, setItems] = useState<ItemInventario[]>([
    // Productos regulares
    { 
      id: 1, 
      producto: "Soda Cola 2L", 
      categoria: "Soda", 
      cantidad: 120, 
      precioUnitario: 950, 
      fechaIngreso: "2023-06-15", 
      ubicacion: "Almacén Central, Estante A",
      esEnvase: false
    },
    { 
      id: 2, 
      producto: "Agua Mineral 1.5L", 
      categoria: "Agua", 
      cantidad: 200, 
      precioUnitario: 600, 
      fechaIngreso: "2023-06-16", 
      ubicacion: "Almacén Central, Estante B",
      esEnvase: false
    },
    // Envases
    {
      id: 3,
      producto: "Envase Agua 12L",
      categoria: "Envases",
      cantidad: 50, // Disponibles en almacén
      envasesEnClientes: 150, // En posesión de clientes
      precioUnitario: 2000,
      fechaIngreso: "2023-06-15",
      ubicacion: "Depósito de Envases, Sector A",
      esEnvase: true
    },
    {
      id: 4,
      producto: "Envase Agua 20L",
      categoria: "Envases",
      cantidad: 75,
      envasesEnClientes: 225,
      precioUnitario: 2500,
      fechaIngreso: "2023-06-15",
      ubicacion: "Depósito de Envases, Sector B",
      esEnvase: true
    },
    {
      id: 5,
      producto: "Envase Soda",
      categoria: "Envases",
      cantidad: 100,
      envasesEnClientes: 300,
      precioUnitario: 1800,
      fechaIngreso: "2023-06-15",
      ubicacion: "Depósito de Envases, Sector C",
      esEnvase: true
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ItemInventario | undefined>(undefined);

  // Cálculo de totales para el dashboard de productos
  const productosRegulares = items.filter(item => !item.esEnvase);
  const totalProductos = productosRegulares.reduce((sum, item) => sum + item.cantidad, 0);
  const valorInventarioProductos = productosRegulares.reduce((sum, item) => sum + (item.cantidad * item.precioUnitario), 0);
  const cantidadCategorias = new Set(productosRegulares.map(item => item.categoria)).size;

  // Cálculo de totales para el dashboard de envases
  const envases = items.filter(item => item.esEnvase);
  const totalEnvasesDisponibles = envases.reduce((sum, item) => sum + item.cantidad, 0);
  const totalEnvasesPrestados = envases.reduce((sum, item) => sum + (item.envasesEnClientes || 0), 0);
  const valorTotalEnvases = envases.reduce((sum, item) => 
    sum + ((item.cantidad + (item.envasesEnClientes || 0)) * item.precioUnitario), 0
  );

  // Funciones de acción
  const handleEdit = (id: number) => {
    const item = items.find(item => item.id === id);
    if (item) {
      setEditingItem(item);
      setIsModalOpen(true);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("¿Está seguro de que desea eliminar este elemento del inventario?")) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleAdd = () => {
    setEditingItem(undefined);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingItem(undefined);
  };

  const handleFormSubmit = (itemData: Omit<ItemInventario, "id">) => {
    if (editingItem) {
      // Actualizar elemento existente
      setItems(items.map(item => 
        item.id === editingItem.id ? { ...itemData, id: editingItem.id } : item
      ));
    } else {
      // Agregar nuevo elemento
      const newId = Math.max(0, ...items.map(item => item.id)) + 1;
      setItems([...items, { ...itemData, id: newId }]);
    }
    
    setIsModalOpen(false);
  };

  const modalTitle = editingItem ? "Editar Elemento de Inventario" : "Nuevo Elemento de Inventario";

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Gestión de Inventario</h2>
      
      {/* Dashboard de productos */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-3">Resumen de Productos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary-100 p-4 rounded-lg shadow-sm">
            <h4 className="text-sm text-primary-700 mb-1">Total de Productos</h4>
            <p className="text-2xl font-bold text-primary-800">{totalProductos} unidades</p>
          </div>
          <div className="bg-success-100 p-4 rounded-lg shadow-sm">
            <h4 className="text-sm text-success-700 mb-1">Valor del Inventario</h4>
            <p className="text-2xl font-bold text-success-800">${valorInventarioProductos.toLocaleString()}</p>
          </div>
          <div className="bg-warning-100 p-4 rounded-lg shadow-sm">
            <h4 className="text-sm text-warning-700 mb-1">Categorías</h4>
            <p className="text-2xl font-bold text-warning-800">{cantidadCategorias}</p>
          </div>
        </div>
      </div>

      {/* Dashboard de envases */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-3">Resumen de Envases</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-success-100 p-4 rounded-lg shadow-sm">
            <h4 className="text-sm text-success-700 mb-1">Envases Disponibles</h4>
            <p className="text-2xl font-bold text-success-800">{totalEnvasesDisponibles} unidades</p>
          </div>
          <div className="bg-warning-100 p-4 rounded-lg shadow-sm">
            <h4 className="text-sm text-warning-700 mb-1">Envases en Clientes</h4>
            <p className="text-2xl font-bold text-warning-800">{totalEnvasesPrestados} unidades</p>
          </div>
          <div className="bg-primary-100 p-4 rounded-lg shadow-sm">
            <h4 className="text-sm text-primary-700 mb-1">Valor Total Envases</h4>
            <p className="text-2xl font-bold text-primary-800">${valorTotalEnvases.toLocaleString()}</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg">Listado de Inventario</h3>
        <AddButton 
          onClick={handleAdd} 
          label="Agregar al Inventario" 
        />
      </div>
      
      <InventarioTable 
        items={items} 
        onEdit={handleEdit} 
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={modalTitle}
        onSubmit={() => {
          const formElement = document.querySelector('form') as HTMLFormElement;
          if (formElement) {
            const event = new Event('submit', { cancelable: true, bubbles: true });
            formElement.dispatchEvent(event);
          }
        }}
        submitLabel={editingItem ? "Actualizar" : "Guardar"}
      >
        <InventarioForm
          onSubmit={handleFormSubmit}
          itemInicial={editingItem}
        />
      </Modal>
    </>
  );
} 