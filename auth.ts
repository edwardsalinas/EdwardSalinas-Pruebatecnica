import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

const VALID_USER = {
    id: "1",
    ci: "1234567",
    email: "user@nextmail.com",
    password: "123456",
    name: "Edward Salinas",
};

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({
                        ci: z.string().min(5),
                        email: z.string().email(),
                        password: z.string().min(6),
                    })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { ci, email, password } = parsedCredentials.data;

                    if (
                        ci === VALID_USER.ci &&
                        email === VALID_USER.email &&
                        password === VALID_USER.password
                    ) {
                        return {
                            id: VALID_USER.id,
                            name: VALID_USER.name,
                            email: VALID_USER.email,
                        };
                    }
                }

                return null;
            },
        }),
    ],
});
