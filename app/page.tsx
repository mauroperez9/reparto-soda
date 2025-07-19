import { title } from "@/components/primitives";
import { LoginForm } from "@/components/login-form";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen py-8 md:py-10">
      <div className="inline-block text-center justify-center mb-6">
        <span className={title({ color: "violet" })}>Reparto de Soda</span>
      </div>

      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </section>
  );
}

