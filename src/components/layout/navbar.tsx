"use client"; 

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/actions/authcontext";
import { LogIn, LogOut, User as UserIcon } from "lucide-react"; // Importe o ícone de usuário

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Funcionalidades" },
  { href: "/pricing", label: "Preços" },
  { href: "/about", label: "Sobre Nós" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between p-4">
      {/* Links desktop */}
      <div className="hidden md:flex items-center gap-x-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors"
          >
            {link.label}
          </Link>
        ))}

        {/* Botões de Ação (Logado vs Deslogado) */}
        {user ? (
          // --- Se o usuário ESTIVER LOGADO ---
          <>
            <Link
              href="/profile"
              className="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors"
            >
              Meu Perfil
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm 
              transition-transform duration-300 hover:scale-105"
            >
              <LogOut size={18} />
              Sair
            </button>
          </>
        ) : (
          // --- Se o usuário NÃO ESTIVER LOGADO ---
          <>
            <Link
              href="/contato"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm 
                transition-transform duration-300 hover:scale-105"
            >
              Cadastrar
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-md border border-indigo-600 px-4 py-2 text-sm font-semibold text-indigo-600 shadow-sm 
                transition-transform duration-300 hover:scale-105"
            >
              <LogIn size={18} />
              Entrar
            </Link>
          </>
        )}
      </div>

      {/* Botão do Menu Mobile */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <p className="h-6 w-6">X</p> : <p className="h-6 w-6">|||</p>}
        </button>
      </div>

      {/* Menu mobile expansível */}
      {isOpen && (
        <div
          className="absolute left-0 top-16 w-full bg-white shadow-md md:hidden
            flex flex-col items-center p-4 gap-y-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg font-semibold text-slate-700 hover:text-indigo-600"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* Botões de Ação Mobile (Logado vs Deslogado) */}
          {user ? (
            // --- Se o usuário ESTIVER LOGADO (Mobile) ---
            <>
              <Link
                href="/profile"
                className="flex items-center justify-center gap-2 w-full rounded-md border border-indigo-600 px-4 py-2 text-lg font-semibold text-indigo-600 shadow-sm"
                onClick={() => setIsOpen(false)}
              >
                <UserIcon size={20} />
                Meu Perfil
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full rounded-md bg-red-500 px-4 py-2 text-lg font-semibold text-white shadow-sm"
              >
                <LogOut size={20} />
                Sair
              </button>
            </>
          ) : (
            // --- Se o usuário NÃO ESTIVER LOGADO (Mobile) ---
            <>
              <Link
                href="/contato"
                className="w-full text-center rounded-md bg-indigo-600 px-4 py-2 text-lg font-semibold text-white shadow-sm"
                onClick={() => setIsOpen(false)}
              >
                Cadastrar
              </Link>
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 w-full rounded-md border border-indigo-600 px-4 py-2 text-lg font-semibold text-indigo-600 shadow-sm"
                onClick={() => setIsOpen(false)}
              >
                <LogIn size={20} />
                Entrar
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}