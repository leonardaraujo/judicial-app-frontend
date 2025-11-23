"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { User } from "@/services/authService";
import { getMe } from "@/services/authService";
import { useRouter } from "next/navigation";
const TOKEN_KEY = "jwt_token";
const USER_KEY = "user";

interface AuthContextType {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean; // <--- NUEVO
  login: (jwt: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  isAuthenticated: false,
  loading: true, // <--- NUEVO
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // <--- NUEVO
  const router = useRouter(); // <--- agrega esto

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      setToken(storedToken);

      if (storedToken) {
        try {
          const userData = await getMe();
          setUser(userData);
          localStorage.setItem(USER_KEY, JSON.stringify(userData));
        } catch (error) {
          console.error("Error al obtener datos del usuario:", error);
          logout();
        }
      } else {
        const userStr = localStorage.getItem(USER_KEY);
        setUser(userStr ? JSON.parse(userStr) : null);
      }
      setLoading(false); // <--- NUEVO
    };

    initAuth();
    // eslint-disable-next-line
  }, []);

  const login = (jwt: string, user: User) => {
    localStorage.setItem(TOKEN_KEY, jwt);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    setToken(jwt);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
    setLoading(false); // Por si acaso
    router.push("/"); // <--- redirige al home
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ token, user, isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
