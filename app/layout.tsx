import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Flowbite } from "flowbite-react";

import { ToastProvider } from "./components/Context/ToastProvider";

import FlowbiteTheme from "./theme";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Everest Effect Portal - Home",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Flowbite theme={{ theme: FlowbiteTheme }}>
        <ToastProvider>
          <body className={inter.className}>
            <main className="bg-gray-200">{children}</main>
          </body>
        </ToastProvider>
      </Flowbite>
    </html>
  );
}
