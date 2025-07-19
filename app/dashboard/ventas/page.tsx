"use client";

import { useState, useEffect } from "react";
import { AddButton } from "@/components/action-buttons";
import VentasTable, { Venta } from "@/components/dashboard/VentasTable";
import Modal from "@/components/ui/Modal";
import VentaForm from "@/components/forms/VentaForm";

export default function VentasPage() {
  // Estados
  const [ventas, setVentas] = useState<Venta[]>([
    { 
      id: 1, 
      fecha: "2023-08-10", 
      cliente: "Restaurant El Buen Sabor", 
      productos: [
        { nombre: "Agua 20L", cantidad: 5, precioUnitario: 1500 },
        { nombre: "Refresco 2L Cola", cantidad: 10, precioUnitario: 950 }
      ],
      total: 17000, 
      metodoPago: "Efectivo", 
      estado: "Pagada",
      repartidor: "Juan Pérez"
    },
    { 
      id: 2, 
      fecha: "2023-08-12", 
      cliente: "Hotel Plaza", 
      productos: [
        { nombre: "Agua 20L", cantidad: 15, precioUnitario: 1500 },
        { nombre: "Agua 5L", cantidad: 10, precioUnitario: 600 }
      ],
      total: 28500, 
      metodoPago: "Transferencia", 
      estado: "Pagada",
      repartidor: "Miguel Rojas"
    },
    { 
      id: 3, 
      fecha: "2023-08-15", 
      cliente: "Cafetería Central", 
      productos: [
        { nombre: "Agua con gas 2L", cantidad: 8, precioUnitario: 750 },
        { nombre: "Refresco 2L Naranja", cantidad: 12, precioUnitario: 950 }
      ],
      total: 17400, 
      metodoPago: "Fiado", 
      estado: "Pendiente"
    },
    { 
      id: 4, 
      fecha: "2023-08-18", 
      cliente: "Gimnasio Fitness", 
      productos: [
        { nombre: "Agua 5L", cantidad: 20, precioUnitario: 600 }
      ],
      total: 12000, 
      metodoPago: "Transferencia", 
      estado: "Pagada",
      repartidor: "Carlos Sánchez"
    },
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVenta, setEditingVenta] = useState<Venta | undefined>(undefined);

  // Efecto para cargar datos de venta desde rutas
  useEffect(() => {
    const ventaData = sessionStorage.getItem("nuevaVenta");
    if (ventaData) {
      try {
        const nuevaVenta = JSON.parse(ventaData) as Omit<Venta, "id">;
        // Agregar nueva venta con un nuevo ID
        const newId = Math.max(0, ...ventas.map(v => v.id)) + 1;
        setVentas(prev => [...prev, { ...nuevaVenta, id: newId }]);
        
        // Limpiar sessionStorage después de usar los datos
        sessionStorage.removeItem("nuevaVenta");
      } catch (error) {
        console.error("Error al procesar datos de venta:", error);
      }
    }
  }, []); // Ejecutar solo al montar el componente

  // Cálculos para el dashboard
  const totalVentas = ventas.length;
  const ventasPagadas = ventas.filter(v => v.estado === "Pagada").length;
  const montoTotal = ventas.reduce((sum, venta) => sum + venta.total, 0);
  const ventasFiadas = ventas.filter(v => v.metodoPago === "Fiado").length;
  const montoFiado = ventas
    .filter(v => v.metodoPago === "Fiado")
    .reduce((sum, venta) => sum + venta.total, 0);

  // Funciones de acción
  const handleEdit = (id: number) => {
    const venta = ventas.find(v => v.id === id);
    if (venta) {
      setEditingVenta(venta);
      setIsModalOpen(true);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("¿Está seguro de que desea eliminar esta venta del historial?")) {
      setVentas(ventas.filter(venta => venta.id !== id));
    }
  };

  const handleAdd = () => {
    setEditingVenta(undefined);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingVenta(undefined);
  };

  const handleFormSubmit = (ventaData: Omit<Venta, "id">) => {
    if (editingVenta) {
      // Actualizar venta existente
      setVentas(ventas.map(v => 
        v.id === editingVenta.id ? { ...ventaData, id: editingVenta.id } : v
      ));
    } else {
      // Agregar nueva venta
      const newId = Math.max(0, ...ventas.map(v => v.id)) + 1;
      setVentas([...ventas, { ...ventaData, id: newId }]);
    }
    
    setIsModalOpen(false);
  };

  const modalTitle = editingVenta ? "Editar Venta" : "Registrar Nueva Venta";

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Historial de Ventas</h2>
      
      {/* Dashboard de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-primary-100 p-4 rounded-lg shadow-sm">
          <h4 className="text-sm text-primary-700 mb-1">Total de Ventas</h4>
          <p className="text-2xl font-bold text-primary-800">{totalVentas}</p>
        </div>
        <div className="bg-success-100 p-4 rounded-lg shadow-sm">
          <h4 className="text-sm text-success-700 mb-1">Monto Total</h4>
          <p className="text-2xl font-bold text-success-800">${montoTotal.toLocaleString()}</p>
        </div>
        <div className="bg-warning-100 p-4 rounded-lg shadow-sm">
          <h4 className="text-sm text-warning-700 mb-1">Ventas a Fiado</h4>
          <p className="text-2xl font-bold text-warning-800">{ventasFiadas}</p>
        </div>
        <div className="bg-warning-100 p-4 rounded-lg shadow-sm">
          <h4 className="text-sm text-warning-700 mb-1">Monto Fiado</h4>
          <p className="text-2xl font-bold text-warning-800">${montoFiado.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg">Registro de Ventas</h3>
        <AddButton 
          onClick={handleAdd} 
          label="Registrar Venta" 
        />
      </div>
      
      <VentasTable 
        ventas={ventas} 
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
        submitLabel={editingVenta ? "Actualizar" : "Guardar"}
      >
        <VentaForm
          onSubmit={handleFormSubmit}
          ventaInicial={editingVenta}
        />
      </Modal>
    </>
  );
} 