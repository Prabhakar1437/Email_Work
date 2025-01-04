"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import axios from "axios";

export default function Signup() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        first_name: "",
        last_name: "",
    });
    const [errorMessage, setErrorMessage] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8000/api/accounts/register/", formData);
            alert("Registration successful!");
            router.push("/login");
        } catch (error: any) {
            setErrorMessage(
                error.response?.data?.message || "Error during registration. Please try again."
            );
        }
    };

    const handleGoogleSignup = () => {
        signIn("google");
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="absolute top-4 left-4">
                <Link href="/">
                    <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
                        Home
                    </button>
                </Link>
            </div>
            <form
                className="bg-white p-6 rounded shadow-md w-80"
                onSubmit={handleSubmit}
            >
                <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
                {errorMessage && (
                    <div className="text-red-500 text-sm text-center mb-4">
                        {errorMessage}
                    </div>
                )}
                <input
                    type="text"
                    placeholder="First Name"
                    className="border p-2 w-full mb-4"
                    value={formData.first_name}
                    onChange={(e) =>
                        setFormData({ ...formData, first_name: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    className="border p-2 w-full mb-4"
                    value={formData.last_name}
                    onChange={(e) =>
                        setFormData({ ...formData, last_name: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Username"
                    className="border p-2 w-full mb-4"
                    value={formData.username}
                    onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                    }
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 w-full mb-4"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 w-full mb-4"
                    value={formData.password}
                    onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                    }
                />
                <button
                    type="submit"
                    className="bg-green-500 text-white p-2 w-full rounded mb-4"
                >
                    Sign Up
                </button>
                <button
                    type="button"
                    onClick={handleGoogleSignup}
                    className="bg-red-500 text-white p-2 w-full rounded"
                >
                    Continue with Google
                </button>
            </form>
        </div>
    );
}
