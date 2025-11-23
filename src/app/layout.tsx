import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { LoginProvider } from "./context/LoginContext";
import ClientProviders from "./components/ClientProviders";
import { AuthProvider } from "./context/AuthContext"; // <-- Importa el AuthProvider
import { RegisterProvider } from "./context/RegisterContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sistema Judicial",
  description: "Gestión de documentos legales",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <AuthProvider>
          {" "}
          {/* <-- Envuelve todo con AuthProvider */}
          <LoginProvider>
            <RegisterProvider>
              <ClientProviders>
                <Navbar />
                {children}
              </ClientProviders>
            </RegisterProvider>
          </LoginProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
