"use client";

import { useState } from "react";
import { AddButton, EditButton } from "@/components/action-buttons";
import RutasReparto from "@/components/dashboard/RutasReparto";
import Modal from "@/components/ui/Modal";
import RutaForm from "@/components/forms/RutaForm";
import ClienteRutaForm, { Cliente } from "@/components/forms/ClienteRutaForm";
import VentaForm from "@/components/forms/VentaForm";
import { Venta } from "@/components/dashboard/VentasTable";
import { useRouter } from "next/navigation";

// Productos disponibles para ventas
const PRODUCTOS_DISPONIBLES = [
  { id: 1, nombre: "Agua 20L", precio: 1500 },
  { id: 2, nombre: "Refresco 2L Cola", precio: 950 },
  { id: 3, nombre: "Refresco 2L Naranja", precio: 950 },
  { id: 4, nombre: "Agua 5L", precio: 600 },
  { id: 5, nombre: "Agua con gas 2L", precio: 750 }
];

// Tipo para los clientes en rutas
interface ClienteRuta {
  id: number;
  nombre: string;
  direccion: string;
  productos: {
    id: number;
    nombre: string;
    cantidad: number;
  }[];
  envases?: {
    agua12L: number;
    agua20L: number;
    soda: number;
  };
}

// Tipo para las rutas
interface Ruta {
  id: number;
  nombre: string;
  dia: string; // Día de la semana: lunes, martes, etc.
  zona: string;
  repartidor: string;
  vehiculo: string;
  clientes: ClienteRuta[];
}

export default function RutasPage() {
  const router = useRouter();
  // Lista de clientes disponibles para asignar a rutas
  const [clientesDisponibles, setClientesDisponibles] = useState<Cliente[]>([
    { id: 1, nombre: "Restaurant El Buen Sabor", direccion: "Av. Principal 123", zona: "Capital", telefono: "555-1234", envases: { agua12L: 2, agua20L: 5, soda: 3 } },
    { id: 2, nombre: "Hotel Plaza", direccion: "Calle Comercio 456", zona: "Godoy Cruz", telefono: "555-5678", envases: { agua12L: 0, agua20L: 8, soda: 6 } },
    { id: 3, nombre: "Cafetería Central", direccion: "Plaza Mayor 789", zona: "Maipú", telefono: "555-9012", envases: { agua12L: 3, agua20L: 4, soda: 2 } },
    { id: 4, nombre: "Gimnasio Fitness", direccion: "Av. Deportiva 234", zona: "Las Heras", telefono: "555-3456", envases: { agua12L: 1, agua20L: 10, soda: 0 } },
    { id: 5, nombre: "Supermercado Economía", direccion: "Calle del Ahorro 567", zona: "Guaymallén", telefono: "555-7890", envases: { agua12L: 4, agua20L: 7, soda: 5 } },
    { id: 6, nombre: "Panadería La Esquina", direccion: "Esquina del Pan 123", zona: "Godoy Cruz", telefono: "555-4321", envases: { agua12L: 0, agua20L: 3, soda: 2 } },
    { id: 7, nombre: "Farmacia 24 Horas", direccion: "Av. Salud 789", zona: "Capital", telefono: "555-8765", envases: { agua12L: 1, agua20L: 2, soda: 0 } },
  ]);

  // Estados
  const [rutas, setRutas] = useState<Ruta[]>([
    { 
      id: 1, 
      nombre: "Ruta Norte", 
      dia: "lunes",
      zona: "Capital", 
      repartidor: "Juan Pérez", 
      vehiculo: "Camión 001", 
      clientes: [
        { 
          id: 1, 
          nombre: "Tienda ABC", 
          direccion: "Av. Norte 123",
          productos: [
            { id: 1, nombre: "Agua 20L", cantidad: 10 },
            { id: 2, nombre: "Refresco 2L", cantidad: 15 }
          ]
        }
      ]
    },
    { 
      id: 2, 
      nombre: "Ruta Centro", 
      dia: "miércoles",
      zona: "Godoy Cruz", 
      repartidor: "Miguel Rojas", 
      vehiculo: "Furgón 002", 
      clientes: []
    },
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClienteModalOpen, setIsClienteModalOpen] = useState(false);
  const [isClienteDiaModalOpen, setIsClienteDiaModalOpen] = useState(false);
  const [isVentaModalOpen, setIsVentaModalOpen] = useState(false);
  const [editingRuta, setEditingRuta] = useState<Ruta | undefined>(undefined);
  const [selectedRuta, setSelectedRuta] = useState<Ruta | undefined>(undefined);
  const [editingCliente, setEditingCliente] = useState<ClienteRuta | undefined>(undefined);
  const [selectedDia, setSelectedDia] = useState<string>("");
  const [selectedCliente, setSelectedCliente] = useState<ClienteRuta | undefined>(undefined);
  const [envasesModalOpen, setEnvasesModalOpen] = useState(false);
  const [selectedClienteEnvases, setSelectedClienteEnvases] = useState<ClienteRuta | null>(null);

  // Días de la semana
  const diasSemana = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];

  // Funciones de acción
  const handleAdd = () => {
    setEditingRuta(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (ruta: Ruta) => {
    setEditingRuta(ruta);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingRuta(undefined);
  };

  const handleClienteModalClose = () => {
    setIsClienteModalOpen(false);
    setEditingCliente(undefined);
  };

  const handleClienteDiaModalClose = () => {
    setIsClienteDiaModalOpen(false);
    setSelectedDia("");
    setEditingCliente(undefined);
  };

  const handleVentaModalClose = () => {
    setIsVentaModalOpen(false);
    setSelectedCliente(undefined);
  };

  const handleFormSubmit = (rutaData: Omit<Ruta, "id" | "clientes">) => {
    if (editingRuta) {
      // Actualizar ruta existente
      setRutas(rutas.map(r => 
        r.id === editingRuta.id ? { ...editingRuta, ...rutaData } : r
      ));
    } else {
      // Agregar nueva ruta
      const newId = Math.max(0, ...rutas.map(r => r.id)) + 1;
      setRutas([...rutas, { ...rutaData, id: newId, clientes: [] }]);
    }
    
    setIsModalOpen(false);
  };

  const handleAddCliente = (ruta: Ruta) => {
    setSelectedRuta(ruta);
    setEditingCliente(undefined);
    setIsClienteModalOpen(true);
  };

  const handleEditCliente = (ruta: Ruta, cliente: ClienteRuta) => {
    setSelectedRuta(ruta);
    setEditingCliente(cliente);
    setIsClienteModalOpen(true);
  };

  const handleAddClienteToDia = (dia: string) => {
    setSelectedDia(dia);
    setEditingCliente(undefined);
    setIsClienteDiaModalOpen(true);
  };

  const handleRegistrarVenta = (ruta: Ruta, cliente: ClienteRuta) => {
    setSelectedRuta(ruta);
    setSelectedCliente(cliente);
    setIsVentaModalOpen(true);
  };

  // Tipo para ClienteRutaForm data
  type ClienteRutaFormData = {
    id?: number;
    nombre: string;
    direccion: string;
    productos: {
      id: number;
      nombre: string;
      cantidad: number;
    }[];
    envases?: {
      agua12L: number;
      agua20L: number;
      soda: number;
    };
  };

  const handleClienteFormSubmit = (clienteData: ClienteRutaFormData) => {
    if (!selectedRuta) return;
    
    // Si se seleccionó un cliente existente, obtener sus datos de envases
    let envases = clienteData.envases;
    if (!envases && clienteData.nombre) {
      const clienteExistente = clientesDisponibles.find(c => c.nombre === clienteData.nombre);
      if (clienteExistente) {
        envases = clienteExistente.envases;
      }
    }
    
    setRutas(rutas.map(ruta => {
      if (ruta.id !== selectedRuta.id) return ruta;
      
      let nuevosClientes = [...ruta.clientes];
      
      if (editingCliente) {
        // Actualizar cliente existente
        nuevosClientes = nuevosClientes.map(c => 
          c.id === editingCliente.id ? {...clienteData, id: c.id, envases} : c
        );
      } else {
        // Agregar nuevo cliente
        const newId = Math.max(0, ...ruta.clientes.map(c => c.id), 0) + 1;
        nuevosClientes.push({ ...clienteData, id: newId, envases });
      }
      
      return { ...ruta, clientes: nuevosClientes };
    }));
    
    setIsClienteModalOpen(false);
  };

  const handleClienteDiaFormSubmit = (clienteData: ClienteRutaFormData) => {
    if (!selectedDia) return;
    
    // Si se seleccionó un cliente existente, obtener sus datos de envases
    let envases = clienteData.envases;
    if (!envases && clienteData.nombre) {
      const clienteExistente = clientesDisponibles.find(c => c.nombre === clienteData.nombre);
      if (clienteExistente) {
        envases = clienteExistente.envases;
      }
    }
    
    // Encontrar o crear una ruta para este día
    let rutaParaEsteDia = rutas.find(r => r.dia === selectedDia);
    
    if (rutaParaEsteDia) {
      // Si ya existe una ruta para este día, agregar cliente a esa ruta
      setRutas(rutas.map(ruta => {
        if (ruta.id !== rutaParaEsteDia!.id) return ruta;
        
        // Agregar nuevo cliente
        const newId = Math.max(0, ...ruta.clientes.map(c => c.id), 0) + 1;
        const nuevosClientes = [...ruta.clientes, { ...clienteData, id: newId, envases }];
        
        return { ...ruta, clientes: nuevosClientes };
      }));
    } else {
      // Crear una nueva ruta para este día
      const newId = Math.max(0, ...rutas.map(r => r.id)) + 1;
      const newClienteId = 1; // Primera ID para el cliente
      
      const nuevaRuta: Ruta = {
        id: newId,
        nombre: `Ruta ${selectedDia.charAt(0).toUpperCase() + selectedDia.slice(1)}`,
        dia: selectedDia,
        zona: "Por asignar",
        repartidor: "Por asignar",
        vehiculo: "Por asignar",
        clientes: [{ ...clienteData, id: newClienteId, envases }]
      };
      
      setRutas([...rutas, nuevaRuta]);
    }
    
    setIsClienteDiaModalOpen(false);
  };

  const handleVentaFormSubmit = (ventaData: Omit<Venta, "id">) => {
    // Aquí solo necesitamos navegar a la página de ventas
    // Los datos de la venta se pasarán como estado
    
    // Almacenar datos de venta en sessionStorage para recuperarlos en la página de ventas
    sessionStorage.setItem("nuevaVenta", JSON.stringify(ventaData));
    
    // Redirigir a la página de ventas
    router.push("/dashboard/ventas");
    
    setIsVentaModalOpen(false);
  };

  const handleShowEnvases = (cliente: ClienteRuta) => {
    setSelectedClienteEnvases(cliente);
    setEnvasesModalOpen(true);
  };

  const handleCloseEnvasesModal = () => {
    setEnvasesModalOpen(false);
    setSelectedClienteEnvases(null);
  };

  const modalTitle = editingRuta ? "Editar Ruta" : "Nueva Ruta";
  const clienteModalTitle = editingCliente ? "Editar Cliente en Ruta" : "Agregar Cliente a Ruta";
  const clienteDiaModalTitle = editingCliente ? "Editar Cliente en Día" : "Agregar Cliente a Día";
  const ventaModalTitle = "Registrar Venta";

  // Agrupar rutas por día de la semana
  const rutasPorDia = diasSemana.map(dia => {
    return {
      dia,
      rutas: rutas.filter(ruta => ruta.dia === dia)
    };
  });

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Rutas de Reparto</h2>
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg">Gestión de Rutas</h3>
        <AddButton 
          onClick={handleAdd} 
          label="Nueva Ruta" 
        />
      </div>
      
      <RutasReparto rutas={rutas} />

      {/* Rutas por día de la semana */}
      <div className="mt-6 space-y-6">
        {rutasPorDia.map(({ dia, rutas: rutasDia }) => (
          <div key={dia} className="rounded-lg overflow-hidden bg-content1">
            <div className={`${rutasDia.length > 0 ? 'bg-primary text-white' : 'bg-default-200 text-default-700'} p-3 font-medium capitalize flex justify-between items-center`}>
              <span>
                {dia} {rutasDia.length > 0 ? `(${rutasDia.length} ${rutasDia.length === 1 ? 'ruta' : 'rutas'})` : '(Sin rutas)'}
              </span>
              <AddButton
                onClick={() => handleAddClienteToDia(dia)}
                label="Agregar Cliente a este día"
                className="scale-90"
              />
            </div>
            
            {rutasDia.length > 0 ? (
              <div className="divide-y divide-default-200">
                {rutasDia.map(ruta => (
                  <div key={ruta.id} className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{ruta.nombre}</h4>
                        <div className="text-sm text-default-600">
                          <span>Zona: {ruta.zona}</span> • 
                          <span> Repartidor: {ruta.repartidor}</span> •
                          <span> Vehículo: {ruta.vehiculo}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <EditButton onClick={() => handleEdit(ruta)} />
                        <AddButton 
                          onClick={() => handleAddCliente(ruta)} 
                          label="Agregar Cliente" 
                        />
                      </div>
                    </div>
                    
                    {/* Clientes en esta ruta */}
                    {ruta.clientes.length > 0 ? (
                      <div className="mt-3 border border-default-200 rounded-lg">
                        <table className="w-full table-auto">
                          <thead>
                            <tr className="bg-default-100">
                              <th className="px-3 py-2 text-left text-sm">Cliente</th>
                              <th className="px-3 py-2 text-left text-sm">Dirección</th>
                              <th className="px-3 py-2 text-left text-sm">Productos</th>
                              <th className="px-3 py-2 text-center text-sm">Envases</th>
                              <th className="px-3 py-2 text-center text-sm w-36">Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ruta.clientes.map(cliente => (
                              <tr key={cliente.id} className="border-t border-default-200">
                                <td className="px-3 py-2">{cliente.nombre}</td>
                                <td className="px-3 py-2">{cliente.direccion}</td>
                                <td className="px-3 py-2">
                                  <div className="text-sm">
                                    {cliente.productos.map(p => (
                                      <div key={p.id}>
                                        {p.nombre}: {p.cantidad}
                                      </div>
                                    ))}
                                  </div>
                                </td>
                                <td className="px-3 py-2 text-center">
                                  <button
                                    onClick={() => handleShowEnvases(cliente)}
                                    className="bg-primary-100 hover:bg-primary-200 text-primary-700 px-2 py-1 rounded-lg text-sm flex items-center justify-center mx-auto"
                                    title="Ver detalles de envases"
                                  >
                                    <span className="font-medium">{(cliente.envases?.agua12L || 0) + (cliente.envases?.agua20L || 0) + (cliente.envases?.soda || 0)}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                  </button>
                                </td>
                                <td className="px-3 py-2 flex gap-2 justify-center">
                                  <EditButton 
                                    onClick={() => handleEditCliente(ruta, cliente)} 
                                  />
                                  <button
                                    onClick={() => handleRegistrarVenta(ruta, cliente)}
                                    className="bg-success text-white rounded-full p-1 w-8 h-8 flex items-center justify-center hover:bg-success-600"
                                    title="Registrar venta"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="mt-3 p-3 text-sm text-center border border-dashed border-default-300 rounded-lg">
                        No hay clientes asignados a esta ruta
                      </div>
                    )}
                    
                    {/* Resumen de productos para esta ruta */}
                    {ruta.clientes.length > 0 && (
                      <div className="mt-4 p-3 bg-default-50 rounded-lg">
                        <h5 className="font-medium mb-2">Productos necesarios para esta ruta:</h5>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(ruta.clientes.flatMap(c => c.productos)
                            .reduce((acc, prod) => {
                              acc[prod.nombre] = (acc[prod.nombre] || 0) + prod.cantidad;
                              return acc;
                            }, {} as Record<string, number>))
                            .map(([nombre, cantidad]) => (
                              <div key={nombre} className="bg-primary text-white p-2 rounded">
                                <span className="font-medium">{nombre}:</span> {cantidad} unidades
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {/* Modal para agregar/editar rutas */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={modalTitle}
        onSubmit={() => {
          const formElement = document.querySelector('#rutaForm') as HTMLFormElement;
          if (formElement) {
            const event = new Event('submit', { cancelable: true, bubbles: true });
            formElement.dispatchEvent(event);
          }
        }}
        submitLabel={editingRuta ? "Actualizar" : "Guardar"}
      >
        <RutaForm
          id="rutaForm"
          onSubmit={handleFormSubmit}
          rutaInicial={editingRuta}
          diasSemana={diasSemana}
        />
      </Modal>

      {/* Modal para agregar/editar clientes en una ruta */}
      <Modal
        isOpen={isClienteModalOpen}
        onClose={handleClienteModalClose}
        title={clienteModalTitle}
        onSubmit={() => {
          const formElement = document.querySelector('#clienteRutaForm') as HTMLFormElement;
          if (formElement) {
            const event = new Event('submit', { cancelable: true, bubbles: true });
            formElement.dispatchEvent(event);
          }
        }}
        submitLabel={editingCliente ? "Actualizar" : "Agregar"}
      >
        {selectedRuta && (
          <ClienteRutaForm
            id="clienteRutaForm"
            rutaNombre={selectedRuta.nombre}
            onSubmit={handleClienteFormSubmit}
            clienteInicial={editingCliente}
            clientesExistentes={clientesDisponibles}
          />
        )}
      </Modal>

      {/* Modal para agregar clientes directamente a un día */}
      <Modal
        isOpen={isClienteDiaModalOpen}
        onClose={handleClienteDiaModalClose}
        title={clienteDiaModalTitle}
        onSubmit={() => {
          const formElement = document.querySelector('#clienteDiaForm') as HTMLFormElement;
          if (formElement) {
            const event = new Event('submit', { cancelable: true, bubbles: true });
            formElement.dispatchEvent(event);
          }
        }}
        submitLabel={editingCliente ? "Actualizar" : "Agregar"}
      >
        {selectedDia && (
          <ClienteRutaForm
            id="clienteDiaForm"
            rutaNombre={`Día: ${selectedDia.charAt(0).toUpperCase() + selectedDia.slice(1)}`}
            onSubmit={handleClienteDiaFormSubmit}
            clienteInicial={editingCliente}
            clientesExistentes={clientesDisponibles}
          />
        )}
      </Modal>

      {/* Modal para registrar venta */}
      <Modal
        isOpen={isVentaModalOpen}
        onClose={handleVentaModalClose}
        title={ventaModalTitle}
        onSubmit={() => {
          const formElement = document.querySelector('#ventaForm') as HTMLFormElement;
          if (formElement) {
            const event = new Event('submit', { cancelable: true, bubbles: true });
            formElement.dispatchEvent(event);
          }
        }}
        submitLabel="Registrar Venta"
      >
        {selectedCliente && selectedRuta && (
          <div>
            <div className="bg-default-50 p-3 rounded-lg mb-4">
              <h4 className="font-medium text-sm">Detalles del cliente:</h4>
              <p className="text-default-700">{selectedCliente.nombre}</p>
              <p className="text-sm text-default-600">{selectedCliente.direccion}</p>
              <div className="mt-2">
                <h5 className="font-medium text-xs">Productos habituales:</h5>
                <div className="text-xs">
                  {selectedCliente.productos.map(p => (
                    <div key={p.id}>{p.nombre}: {p.cantidad}</div>
                  ))}
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-default-200">
                <h5 className="font-medium text-xs">Envases en posesión:</h5>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  <div className="bg-blue-50 p-1 rounded text-xs">
                    <span className="font-medium">Agua 12L:</span> {selectedCliente.envases?.agua12L || 0}
                  </div>
                  <div className="bg-blue-50 p-1 rounded text-xs">
                    <span className="font-medium">Agua 20L:</span> {selectedCliente.envases?.agua20L || 0}
                  </div>
                  <div className="bg-yellow-50 p-1 rounded text-xs">
                    <span className="font-medium">Soda:</span> {selectedCliente.envases?.soda || 0}
                  </div>
                </div>
              </div>
            </div>
            <VentaForm
              id="ventaForm"
              onSubmit={handleVentaFormSubmit}
              ventaInicial={{
                id: 0,
                fecha: new Date().toISOString().split('T')[0],
                cliente: selectedCliente.nombre,
                productos: selectedCliente.productos.map(p => {
                  // Buscar el precio del producto en la lista de productos disponibles
                  const productoInfo = PRODUCTOS_DISPONIBLES.find(prod => prod.nombre === p.nombre);
                  return {
                    nombre: p.nombre,
                    cantidad: p.cantidad,
                    precioUnitario: productoInfo ? productoInfo.precio : 0
                  };
                }),
                total: selectedCliente.productos.reduce((sum, p) => {
                  const productoInfo = PRODUCTOS_DISPONIBLES.find(prod => prod.nombre === p.nombre);
                  return sum + (p.cantidad * (productoInfo ? productoInfo.precio : 0));
                }, 0),
                metodoPago: "Efectivo",
                estado: "Pagada",
                repartidor: selectedRuta.repartidor
              }}
            />
          </div>
        )}
      </Modal>

      {/* Modal para ver envases */}
      <Modal
        isOpen={envasesModalOpen}
        onClose={handleCloseEnvasesModal}
        title={`Envases de ${selectedClienteEnvases?.nombre || ""}`}
        onSubmit={handleCloseEnvasesModal}
        submitLabel="Cerrar"
      >
        {selectedClienteEnvases && (
          <div className="p-4 bg-default-50 rounded-lg">
            <h4 className="font-medium text-center mb-4">Detalle de Envases</h4>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-primary-50 p-3 rounded-lg flex justify-between items-center">
                <span className="font-medium">Agua 12L:</span>
                <span className="px-3 py-1 bg-primary-100 rounded-full font-bold text-primary-700">
                  {selectedClienteEnvases.envases?.agua12L || 0}
                </span>
              </div>
              
              <div className="bg-primary-50 p-3 rounded-lg flex justify-between items-center">
                <span className="font-medium">Agua 20L:</span>
                <span className="px-3 py-1 bg-primary-100 rounded-full font-bold text-primary-700">
                  {selectedClienteEnvases.envases?.agua20L || 0}
                </span>
              </div>
              
              <div className="bg-primary-50 p-3 rounded-lg flex justify-between items-center">
                <span className="font-medium">Soda:</span>
                <span className="px-3 py-1 bg-primary-100 rounded-full font-bold text-primary-700">
                  {selectedClienteEnvases.envases?.soda || 0}
                </span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-primary-50 rounded-lg text-center">
              <span className="font-medium">Total envases: </span>
              <span className="text-primary-700 font-bold">
                {(selectedClienteEnvases.envases?.agua12L || 0) + 
                 (selectedClienteEnvases.envases?.agua20L || 0) + 
                 (selectedClienteEnvases.envases?.soda || 0)}
              </span>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
} 