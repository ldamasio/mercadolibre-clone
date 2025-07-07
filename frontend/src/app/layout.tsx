// frontend/src/app/layout.tsx
import type { Metadata } from "next";
import { Roboto } from 'next/font/google';

import "@/styles/globals.css";


const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "MercadoLibre Clone",
  description: "Item detail page inspired by MercadoLibre",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
