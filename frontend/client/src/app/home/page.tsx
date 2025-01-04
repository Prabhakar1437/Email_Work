"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-96 text-center">
                <h1 className="text-2xl font-bold mb-4">Welcome!</h1>
                {session?.user && (
                    <div>
                        <p className="mb-2">
                            <strong>Email:</strong> {session.user.email}
                        </p>
                    </div>
                )}
                <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
