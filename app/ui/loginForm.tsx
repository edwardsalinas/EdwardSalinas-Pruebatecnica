"use client";

import { useActionState } from "react";
import { authenticate, LoginState } from "@/app/lib/actions";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/menu";

  const initialState: LoginState = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(
    authenticate,
    initialState,
  );

  return (
    <div className="card shadow-sm w-100" style={{ maxWidth: "400px" }}>
      <div className="card-body p-4">
        <h2 className="card-title text-center mb-4 text-primary fw-bold">
          Login
        </h2>

        <form action={formAction}>
          <div className="mb-3">
            <label htmlFor="ci" className="form-label fw-semibold">
              Cédula de Identidad
            </label>
            <input
              type="text"
              className={`form-control ${
                state?.errors?.ci ? "is-invalid" : ""
              }`}
              id="ci"
              name="ci"
              placeholder="1234567"
              aria-describedby="ci-error"
            />
            <div id="ci-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.ci &&
                state.errors.ci.map((error: string) => (
                  <p className="text-danger small mt-1 mb-0" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Correo Electrónico
            </label>
            <input
              type="email"
              className={`form-control ${
                state?.errors?.email ? "is-invalid" : ""
              }`}
              id="email"
              name="email"
              placeholder="nombre@ejemplo.com"
              aria-describedby="email-error"
            />
            <div id="email-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.email &&
                state.errors.email.map((error: string) => (
                  <p className="text-danger small mt-1 mb-0" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold">
              Contraseña
            </label>
            <input
              type="password"
              className={`form-control ${
                state?.errors?.password ? "is-invalid" : ""
              }`}
              id="password"
              name="password"
              placeholder="********"
              aria-describedby="password-error"
            />
            <div id="password-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.password &&
                state.errors.password.map((error: string) => (
                  <p className="text-danger small mt-1 mb-0" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          <input type="hidden" name="redirectTo" value={callbackUrl} />

          <button
            type="submit"
            className="btn btn-primary w-100 fw-bold py-2"
            aria-disabled={isPending}
            disabled={isPending}
          >
            {isPending
              ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  >
                  </span>
                  <span role="status">Ingresando...</span>
                </>
              )
              : (
                "Ingresar"
              )}
          </button>

          <div className="mt-3" aria-live="polite" aria-atomic="true">
            {state?.message && !state?.errors && (
              <div
                className="alert alert-danger py-2 d-flex align-items-center"
                role="alert"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-exclamation-triangle-fill me-2 flex-shrink-0"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>
                <span>{state.message}</span>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
