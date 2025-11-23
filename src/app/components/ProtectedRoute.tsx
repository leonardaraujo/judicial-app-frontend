"use client";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/"); // Redirige al inicio si no está autenticado
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null; // O un loader

  return <>{children}</>;
}