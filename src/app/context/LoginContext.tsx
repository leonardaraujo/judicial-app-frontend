"use client";
import { createContext, useState, ReactNode } from "react";

export const LoginContext = createContext<{
  loginOpen: boolean;
  setLoginOpen: (open: boolean) => void;
}>({
  loginOpen: false,
  setLoginOpen: () => {},
});

export function LoginProvider({ children }: { children: ReactNode }) {
  const [loginOpen, setLoginOpen] = useState(false);
  return (
    <LoginContext.Provider value={{ loginOpen, setLoginOpen }}>
      {children}
    </LoginContext.Provider>
  );
}
