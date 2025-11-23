"use client";
import Link from "next/link";
import {
  Scale,
  Upload,
  FileSearch,
  Search,
  LogIn,
  UserPlus,
} from "lucide-react";
import { useContext } from "react";
import UserIcon from "./UserIcon";
import { LoginContext } from "@/app/context/LoginContext";
import { useAuth } from "../context/AuthContext";
import { RegisterContext } from "@/app/context/RegisterContext";

export default function Navbar() {
  const { setLoginOpen } = useContext(LoginContext);
  const { isAuthenticated, user, loading } = useAuth();
  const { setRegisterOpen } = useContext(RegisterContext);

  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary flex-shrink-0">
              <Scale className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-lg sm:text-xl font-bold text-primary">
                Sistema Judicial
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Gestión de Documentos Legales
              </p>
            </div>
          </Link>

          <div className="flex flex-row gap-2 w-full sm:w-auto items-center">
            {loading ? (
              <div className="flex items-center justify-center h-10 px-6">
                <span className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></span>
              </div>
            ) : isAuthenticated ? (
              <>
                {user?.role === "admin" && (
                  <Link href="/subir" className="flex-1 sm:flex-initial">
                    <button className="w-full px-3 sm:px-4 py-2 rounded-lg hover:bg-muted transition flex items-center justify-center gap-2 text-foreground text-sm">
                      <Upload className="w-4 h-4" />
                      <span className="hidden sm:inline">
                        Subir (Administrador)
                      </span>
                    </button>
                  </Link>
                )}
                {user?.role === "admin" && (
                  <Link href="/consultar" className="flex-1 sm:flex-initial">
                    <button className="w-full px-3 sm:px-4 py-2 rounded-lg hover:bg-muted transition flex items-center justify-center gap-2 text-foreground text-sm">
                      <FileSearch className="w-4 h-4" />
                      <span className="hidden sm:inline">Consultar</span>
                    </button>
                  </Link>
                )}

                {/* Nuevo: Aprobación de documentos solo para admin */}
                {user?.role === "admin" && (
                  <Link href="/aprobacion" className="flex-1 sm:flex-initial">
                    <button className="w-full px-3 sm:px-4 py-2 rounded-lg hover:bg-muted transition flex items-center justify-center gap-2 text-foreground text-sm">
                      <Scale className="w-4 h-4" />
                      <span className="hidden sm:inline">
                        Aprobación de documentos
                      </span>
                    </button>
                  </Link>
                )}
                {/* Nuevo: Subir documento usuario */}
                {user?.role !== "admin" && (
                  <Link
                    href="/subir-usuario"
                    className="flex-1 sm:flex-initial"
                  >
                    <button className="w-full px-3 sm:px-4 py-2 rounded-lg hover:bg-muted transition flex items-center justify-center gap-2 text-foreground text-sm">
                      <Upload className="w-4 h-4" />
                      <span className="hidden sm:inline font-semibold">
                        Subir caso
                      </span>
                      <span className="sm:hidden font-semibold">Subir PDF</span>
                    </button>
                  </Link>
                )}
                <UserIcon />
              </>
            ) : (
              <>
                <button
                  onClick={() => setLoginOpen(true)}
                  className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition flex items-center gap-2 text-sm"
                >
                  <LogIn className="w-4 h-4" />
                  Iniciar sesión
                </button>
                <button
                  onClick={() => setRegisterOpen(true)}
                  className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition flex items-center gap-2 text-sm border border-primary"
                >
                  <UserPlus className="w-4 h-4" />
                  Registrarse
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
