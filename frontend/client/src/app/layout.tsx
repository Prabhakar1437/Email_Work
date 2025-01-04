import "./globals.css";
import SessionProviderWrapper from "../components/SessionProviderWrapper";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-gray-100 text-gray-900">
                <SessionProviderWrapper>{children}</SessionProviderWrapper>
            </body>
        </html>
    );
}
