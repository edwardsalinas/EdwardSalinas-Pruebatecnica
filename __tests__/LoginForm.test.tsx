import { render, screen } from "@testing-library/react";
import LoginForm from "@/app/ui/loginForm";

jest.mock("next/navigation", () => ({
    useSearchParams: () => ({
        get: () => null,
    }),
}));

jest.mock("@/app/lib/actions", () => ({
    authenticate: jest.fn(),
}));

describe("LoginForm", () => {
    it('renderiza el título "Login"', () => {
        render(<LoginForm />);
        expect(screen.getByText("Login")).toBeInTheDocument();
    });

    it("renderiza los 3 campos del formulario", () => {
        render(<LoginForm />);
        expect(screen.getByLabelText("Cédula de Identidad"))
            .toBeInTheDocument();
        expect(screen.getByLabelText("Correo Electrónico")).toBeInTheDocument();
        expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
    });

    it('renderiza el botón "Ingresar"', () => {
        render(<LoginForm />);
        const button = screen.getByRole("button", { name: "Ingresar" });
        expect(button).toBeInTheDocument();
        expect(button).not.toBeDisabled();
    });


});
