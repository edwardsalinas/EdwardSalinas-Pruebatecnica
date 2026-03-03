import { auth, signOut } from "@/auth";

export const metadata = {
    title: "Menú Principal - Banco Bisa Test",
};

export default async function MenuPage() {
    const session = await auth();

    return (
        <main className="min-vh-100 bg-light d-flex flex-column align-items-center justify-content-center">
            <div className="container text-center">
                <h1 className="display-4 fw-bold text-success mb-3">
                    ¡Bienvenido al Menú!
                </h1>
                <p className="lead mb-1">Has iniciado sesión correctamente.</p>
                {session?.user && (
                    <p className="text-muted mb-4">
                        Conectado como: <strong>{session.user.email}</strong>
                    </p>
                )}
                <form
                    action={async () => {
                        "use server";
                        await signOut({ redirectTo: "/login" });
                    }}
                >
                    <button
                        type="submit"
                        className="btn btn-outline-danger mt-3"
                    >
                        Cerrar Sesión
                    </button>
                </form>
            </div>
        </main>
    );
}
