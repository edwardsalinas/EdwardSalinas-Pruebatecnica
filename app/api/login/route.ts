import { NextResponse } from "next/server";

const VALID_USER = {
    id: "1",
    ci: "1234567",
    email: "user@nextmail.com",
    password: "123456",
    name: "Edward Salinas",
};

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { ci, email, password } = body;

        if (!ci || !email || !password) {
            return NextResponse.json(
                { error: "Faltan credenciales requeridas." },
                { status: 400 },
            );
        }

        if (
            ci === VALID_USER.ci &&
            email === VALID_USER.email &&
            password === VALID_USER.password
        ) {
            return NextResponse.json(
                {
                    message: "Login exitoso",
                    user: {
                        id: VALID_USER.id,
                        name: VALID_USER.name,
                        email: VALID_USER.email,
                    },
                },
                { status: 200 },
            );
        }

        return NextResponse.json(
            { error: "Credenciales inválidas." },
            { status: 401 },
        );
    } catch {
        return NextResponse.json(
            { error: "Error interno del servidor." },
            { status: 500 },
        );
    }
}
