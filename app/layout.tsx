import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import CorbadoProvider from '@/utils/corbado/Provider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CorbadoProvider>
        <body className={inter.className}>
          <main>
            {children}
          </main>
        </body>
      </CorbadoProvider>
    </html>
  );
}
