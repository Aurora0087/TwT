import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "TwT",
    description: "Clone of Twitter using next-14",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className=" bg-slate-800 min-h-screen grid place-content-center">
                    {children}
                </body>
            </html>
        </ClerkProvider>

    );
}