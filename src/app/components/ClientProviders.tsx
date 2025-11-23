"use client";
import { useContext } from "react";
import Login from "./Login";
import Register from "./Register";
import { LoginContext } from "../context/LoginContext";
import { RegisterContext } from "../context/RegisterContext";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const { loginOpen, setLoginOpen } = useContext(LoginContext);
  const { registerOpen, setRegisterOpen } = useContext(RegisterContext);

  return (
    <>
      {children}
      <Login isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
      <Register isOpen={registerOpen} onClose={() => setRegisterOpen(false)} />
    </>
  );
}