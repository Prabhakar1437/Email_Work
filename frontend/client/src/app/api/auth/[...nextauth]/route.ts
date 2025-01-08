import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authHandler = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const res = await fetch("http://127.0.0.1:8000/api/login/", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(credentials),
                    });

                    const user = await res.json();
                    if (res.ok && user) {
                        return user; // Return user object
                    }
                    return null;
                } catch (error) {
                    console.error("Error during authorization:", error);
                    return null;
                }
            },
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                id: token.id,
                email: token.email,
            };
            return session;
        },
    },
    pages: {
        signIn: "/login",
        signOut: "/login",
        error: "/login",
    },
});

// Export named HTTP methods
export { authHandler as GET, authHandler as POST };