import type { Metadata } from "next";
import { Inter,Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const roboto = Roboto({weight:["300","400","700","900"],subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Scriptly - Write with ease and fast",
  description: "Write out perfect essays and documents using the power of AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
      <Toaster richColors />
    </html>
  );
}
