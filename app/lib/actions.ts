"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";

const LoginSchema = z.object({
    ci: z
        .string()
        .min(5, { message: "El CI debe tener al menos 5 dígitos" })
        .regex(/^[0-9]+$/, { message: "El CI solo debe contener números" }),
    email: z
        .string()
        .email({ message: "Por favor ingrese un correo electrónico válido" }),
    password: z
        .string()
        .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

export type LoginState = {
    errors?: {
        ci?: string[];
        email?: string[];
        password?: string[];
    };
    message?: string | null;
};

export async function authenticate(
    prevState: LoginState | undefined,
    formData: FormData,
) {
    const validatedFields = LoginSchema.safeParse({
        ci: formData.get("ci"),
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Campos inválidos. Por favor, revise el formulario.",
        };
    }

    try {
        await signIn("credentials", formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { message: "Credenciales inválidas." };
                default:
                    return { message: "Algo salió mal." };
            }
        }
        throw error;
    }
}
