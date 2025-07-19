"use client";

import { useState } from "react";
import { AddButton } from "@/components/action-buttons";
import ProductosTable, { Producto } from "@/components/dashboard/ProductosTable";
import Modal from "@/components/ui/Modal";
import ProductoForm from "@/components/forms/ProductoForm";

export default function ProductosPage() {
  // Estados
  const [productos, setProductos] = useState<Producto[]>([
    { id: 1, nombre: "Soda Cola", precio: 1200, stock: 150 },
    { id: 2, nombre: "Agua Mineral", precio: 800, stock: 200 },
    { id: 3, nombre: "Soda Naranja", precio: 1200, stock: 120 },
    { id: 4, nombre: "Agua sin gas", precio: 750, stock: 180 },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProducto, setEditingProducto] = useState<Producto | undefined>(undefined);

  // Funciones de acción
  const handleEdit = (id: number) => {
    const producto = productos.find(p => p.id === id);
    if (producto) {
      setEditingProducto(producto);
      setIsModalOpen(true);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("¿Está seguro de que desea eliminar este producto?")) {
      setProductos(productos.filter(producto => producto.id !== id));
    }
  };

  const handleAdd = () => {
    setEditingProducto(undefined);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingProducto(undefined);
  };

  const handleFormSubmit = (productoData: Omit<Producto, "id">) => {
    if (editingProducto) {
      // Actualizar producto existente
      setProductos(productos.map(p => 
        p.id === editingProducto.id ? { ...productoData, id: editingProducto.id } : p
      ));
    } else {
      // Agregar nuevo producto
      const newId = Math.max(0, ...productos.map(p => p.id)) + 1;
      setProductos([...productos, { ...productoData, id: newId }]);
    }
    
    setIsModalOpen(false);
  };

  const modalTitle = editingProducto ? "Editar Producto" : "Nuevo Producto";

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Inventario de Productos</h2>
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg">Lista de Productos</h3>
        <AddButton 
          onClick={handleAdd} 
          label="Nuevo Producto" 
        />
      </div>
      
      <ProductosTable 
        productos={productos} 
        onEdit={handleEdit} 
        onDelete={handleDelete}
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
        submitLabel={editingProducto ? "Actualizar" : "Guardar"}
      >
        <ProductoForm
          onSubmit={handleFormSubmit}
          productoInicial={editingProducto}
        />
      </Modal>
    </>
  );
} 