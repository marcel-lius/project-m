import type { Metadata } from "next";
import { Quicksand, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ContactDrawerProvider } from "@/context/contact-drawer-context";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
  title: "Marcellius - Senior Fullstack AEM and Web Specialist",
  description: "Marcellius is a Senior Fullstack AEM and Web Specialist with expertise in building scalable digital experiences using AEM, Java, React, Next.js, Vue.js,Tailwind CSS, and GSAP. Explore his portfolio and get in touch to collaborate on your next project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body
        className={`${jetbrainsMono.variable} ${quicksand.variable} antialiased dark`}
      >
        <ContactDrawerProvider>
          <Header />
          {children}
          <Toaster />
          <Footer />
        </ContactDrawerProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
