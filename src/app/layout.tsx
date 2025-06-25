import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/app/QueryProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "User Management",
  description: "Manage users and their addresses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <Toaster />
          <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">{children}</div>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
