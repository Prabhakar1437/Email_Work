"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { email, password } = formData;

        try {
            // Authenticate using credentials provider
            const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (res?.ok) {
                alert("Login successful!");
                router.push("/home");
            } else {
                setErrorMessage("Invalid email or password. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage("An error occurred. Please try again.");
        }
    };

    const handleGoogleLogin = async () => {
        await signIn("google", { callbackUrl: "/home" }); // Redirect to Home Page after Google login
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                className="bg-white p-6 rounded shadow-md w-80"
                onSubmit={handleSubmit}
            >
                <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>
                {errorMessage && (
                    <div className="text-red-500 text-sm text-center mb-4">
                        {errorMessage}
                    </div>
                )}
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 w-full mb-4"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 w-full mb-4"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 w-full rounded mb-4"
                >
                    Sign In
                </button>
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="bg-red-500 text-white p-2 w-full rounded"
                >
                    Continue with Google
                </button>
                <div className="text-center mt-4">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup">
                        <button className="text-blue-500 underline">
                            Sign Up
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
}
