"use client";

import { useEffect, useRef, ReactNode } from "react";
import { Button } from "@heroui/button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onSubmit?: () => void;
  submitLabel?: string;
}

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  onSubmit,
  submitLabel = "Guardar" 
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Cerrar modal con Escape
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  // Prevenir scroll en el body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Cerrar al hacer clic fuera del modal
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="bg-content1 rounded-lg shadow-lg w-full max-w-md mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-default-100">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button 
            onClick={onClose}
            className="text-default-500 hover:text-danger p-1 rounded-full"
          >
            ✕
          </button>
        </div>
        
        <div className="p-4">
          {children}
        </div>
        
        {onSubmit && (
          <div className="p-4 border-t border-default-100 flex justify-end space-x-2">
            <Button 
              variant="flat" 
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button 
              color="primary" 
              onClick={onSubmit}
            >
              {submitLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 