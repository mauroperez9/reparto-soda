"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { button as buttonStyles } from "@heroui/theme";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    // Simulación de inicio de sesión
    try {
      // Aquí iría la lógica real de autenticación
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Verificación simple (en un sistema real esto se haría en el servidor)
      if (email === "admin@reparto.com" && password === "admin123") {
        console.log("Inicio de sesión exitoso");
        // Redireccionar al dashboard
        router.push("/dashboard");
      } else {
        setError("Correo electrónico o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Ocurrió un error al intentar iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-content1 rounded-xl shadow-medium">
      <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-danger-100 text-danger-600 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Correo electrónico
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@correo.com"
            required
            fullWidth
            variant="bordered"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Contraseña
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            fullWidth
            variant="bordered"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm">
              Recordarme
            </label>
          </div>
          
          <Link href="#" size="sm" color="primary" className="text-sm">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        
        <div>
          <Button
            type="submit"
            className={buttonStyles({
              color: "primary",
              radius: "lg",
              variant: "shadow",
              fullWidth: true,
            })}
            isLoading={isLoading}
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>
        </div>
      </form>
      
      <div className="mt-6 text-center text-sm">
        ¿No tienes una cuenta?{" "}
        <Link href="#" size="sm" color="primary">
          Regístrate aquí
        </Link>
      </div>
      
      <div className="mt-4 p-3 bg-default-100 rounded-lg text-sm">
        <strong>Credenciales de prueba:</strong>
        <div>Email: admin@reparto.com</div>
        <div>Contraseña: admin123</div>
      </div>
    </div>
  );
} 