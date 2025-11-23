"use client";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { LogOut, User } from "lucide-react";

export default function UserIcon() {
  const [openMenu, setOpenMenu] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpenMenu(!openMenu)}
        className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition"
        title={user?.email}
      >
        <User className="w-5 h-5" />
      </button>

      {openMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg p-2 z-50">
          <div className="px-3 py-2 border-b mb-2">
            <p className="text-sm font-medium">
              {user?.first_name} {user?.last_name}
            </p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
          <button
            onClick={() => {
              logout();
              setOpenMenu(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 rounded transition text-red-600"
          >
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
}