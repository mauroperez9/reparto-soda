"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirigir a la sección de inventario
    router.replace("/dashboard/inventario");
  }, [router]);
  
  return (
    <div className="flex items-center justify-center p-8">
      <p>Redirigiendo...</p>
    </div>
  );
} 