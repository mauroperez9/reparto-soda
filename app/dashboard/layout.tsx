"use client";

import { title } from "@/components/primitives";
import DashboardNav from "@/components/dashboard/DashboardNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto py-8">
      <h1 className={title({ class: "mb-6" })}>
        Dashboard de Administración
      </h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <DashboardNav />
        </div>
        
        {/* Main Content */}
        <div className="w-full md:w-3/4 bg-content1 rounded-lg p-4 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
} 