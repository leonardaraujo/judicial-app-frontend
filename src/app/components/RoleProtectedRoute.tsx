"use client";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  allowedRoles: string[];
  children: React.ReactNode;
}

export default function RoleProtectedRoute({ allowedRoles, children }: Props) {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !user || !allowedRoles.includes(user.role)) {
      router.replace("/"); // Redirige al inicio si no tiene el rol adecuado
    }
  }, [isAuthenticated, user, allowedRoles, router]);

  if (!isAuthenticated || !user || !allowedRoles.includes(user.role)) return null;

  return <>{children}</>;
}