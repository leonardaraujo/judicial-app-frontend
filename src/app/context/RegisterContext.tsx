"use client";
import { createContext, useState, ReactNode } from "react";

export const RegisterContext = createContext<{
  registerOpen: boolean;
  setRegisterOpen: (open: boolean) => void;
}>({
  registerOpen: false,
  setRegisterOpen: () => {},
});

export function RegisterProvider({ children }: { children: ReactNode }) {
  const [registerOpen, setRegisterOpen] = useState(false);
  return (
    <RegisterContext.Provider value={{ registerOpen, setRegisterOpen }}>
      {children}
    </RegisterContext.Provider>
  );
}