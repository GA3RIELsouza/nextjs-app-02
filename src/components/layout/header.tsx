import Link from 'next/link';
import Navbar from './navbar'; // Importando nosso componente de navegação

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-slate-800">
          Fin<span className="text-indigo-600">Track</span>
        </Link>
        
        {/* Barra de Navegação */}
        <Navbar />

      </div>
    </header>
  );
}