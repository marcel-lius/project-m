import type { Metadata } from "next";
import { Quicksand, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ContactDrawerProvider } from "@/context/contact-drawer-context";
import { Toaster } from "@/components/ui/sonner";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Project-M",
  description: "Project-M by Marcellius",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} ${quicksand.variable} antialiased dark`}
      >
        <ContactDrawerProvider>
          <Header />
          {children}
          <Toaster />
          <Footer />
        </ContactDrawerProvider>
      </body>
    </html>
  );
}
