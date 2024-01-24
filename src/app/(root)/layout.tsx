import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Leftside from "@/components/shared/Leftside";
import Rightside from "@/components/shared/Rightside";
import TopBar from "@/components/shared/TopBar";

const inter = Inter({ subsets: ["latin"] });

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
        <body className={` relative flex min-h-screen w-screen overflow-hidden bg-slate-800 text-white flex-col items-center ${inter.className}`}>
          {/*<TopBar/>*/}
          <main className=" w-screen relative flex flex-row">
            <Leftside />
            <div className=" w-full max-w-[650px]">
              {children}
            </div>
            <Rightside />
          </main>
        </body>
    </html>
    </ClerkProvider>
  );
}
