import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-6">Welcome</h1>
            <div className="space-x-4">
                <Link href="/login">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Login
                    </button>
                </Link>
                <Link href="/signup">
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                        Sign Up
                    </button>
                </Link>
            </div>
        </div>
    );
}
