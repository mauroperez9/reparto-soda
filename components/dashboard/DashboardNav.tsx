"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNav() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path;
  };
  
  return (
    <div className="w-full bg-content1 rounded-lg p-4 shadow-sm">
      <div className="flex flex-col space-y-2">
        <Link
          href="/dashboard/clientes"
          className={`p-3 rounded-lg text-left ${isActive("/dashboard/clientes") ? "bg-primary text-white" : "hover:bg-default-100"}`}
        >
          Clientes
        </Link>
        <Link
          href="/dashboard/productos"
          className={`p-3 rounded-lg text-left ${isActive("/dashboard/productos") ? "bg-primary text-white" : "hover:bg-default-100"}`}
        >
          Productos
        </Link>
        <Link
          href="/dashboard/inventario"
          className={`p-3 rounded-lg text-left ${isActive("/dashboard/inventario") ? "bg-primary text-white" : "hover:bg-default-100"}`}
        >
          Inventario
        </Link>
        <Link
          href="/dashboard/rutas"
          className={`p-3 rounded-lg text-left ${isActive("/dashboard/rutas") ? "bg-primary text-white" : "hover:bg-default-100"}`}
        >
          Rutas de Reparto
        </Link>
        <Link
          href="/dashboard/ventas"
          className={`p-3 rounded-lg text-left ${isActive("/dashboard/ventas") ? "bg-primary text-white" : "hover:bg-default-100"}`}
        >
          Historial de Ventas
        </Link>
      </div>
    </div>
  );
} 