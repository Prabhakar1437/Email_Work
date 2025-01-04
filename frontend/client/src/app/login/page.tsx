"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8000/api/accounts/login/", formData);
            alert("Login successful!");
        } catch (error) {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form
                className="bg-white p-6 rounded shadow-md w-80"
                onSubmit={handleSubmit}
            >
                <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>
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
                    className="bg-blue-500 text-white p-2 w-full rounded"
                >
                    Sign In
                </button>
                <div className="text-center mt-4">
                    Don't have an account?{" "}
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
