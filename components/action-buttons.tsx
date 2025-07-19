"use client";

import { Button } from "@heroui/button";
import { button as buttonStyles } from "@heroui/theme";

interface ActionButtonProps {
  onClick: () => void;
  className?: string;
}

export function EditButton({ onClick, className = "" }: ActionButtonProps) {
  return (
    <Button 
      size="sm" 
      className={`text-primary ${className}`} 
      variant="light"
      onClick={onClick}
    >
      Editar
    </Button>
  );
}

export function DeleteButton({ onClick, className = "" }: ActionButtonProps) {
  return (
    <Button 
      size="sm" 
      className={`text-danger ${className}`} 
      variant="light"
      onClick={onClick}
    >
      Eliminar
    </Button>
  );
}

interface AddButtonProps extends ActionButtonProps {
  label?: string;
}

export function AddButton({ onClick, label = "Agregar", className = "" }: AddButtonProps) {
  return (
    <Button 
      className={buttonStyles({
        color: "primary",
        variant: "shadow",
        className
      })}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

// Componente de grupo de botones para acciones de fila
export function RowActions({ 
  onEdit, 
  onDelete,
  className = "" 
}: { 
  onEdit: () => void; 
  onDelete: () => void;
  className?: string;
}) {
  return (
    <div className={`flex gap-2 ${className}`}>
      <EditButton onClick={onEdit} />
      <DeleteButton onClick={onDelete} />
    </div>
  );
} 