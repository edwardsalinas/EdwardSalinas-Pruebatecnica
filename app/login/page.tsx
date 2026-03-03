import LoginForm from "@/app/ui/loginForm";
import { Suspense } from "react";

export const metadata = {
  title: "Login - Banco Bisa Test",
};

export default function LoginPage() {
  return (
    <main className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
