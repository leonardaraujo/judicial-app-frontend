'use client';
import Link from 'next/link';
import { Scale, Upload, FileSearch, Tag, Zap, Users, Layers3, BookMarked, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [openPMV2, setOpenPMV2] = useState(false);

  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        {/* Main navbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary flex-shrink-0">
              <Scale className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-lg sm:text-xl font-bold text-primary">Sistema Judicial</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Gestión de Documentos Legales</p>
            </div>
          </Link>
          <div className="flex flex-row gap-2 w-full sm:w-auto">
            <Link href="/subir" className="flex-1 sm:flex-initial">
              <button className="w-full px-3 sm:px-4 py-2 rounded-lg hover:bg-muted transition flex items-center justify-center gap-2 text-foreground text-sm">
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Subir</span>
              </button>
            </Link>
            <Link href="/consultar" className="flex-1 sm:flex-initial">
              <button className="w-full px-3 sm:px-4 py-2 rounded-lg hover:bg-muted transition flex items-center justify-center gap-2 text-foreground text-sm">
                <FileSearch className="w-4 h-4" />
                <span className="hidden sm:inline">Consultar</span>
              </button>
            </Link>
            {/* PMV2 Dropdown */}
            <div className="relative group flex-1 sm:flex-initial">
              <button
                onClick={() => setOpenPMV2(!openPMV2)}
                className="w-full px-3 sm:px-4 py-2 rounded-lg hover:bg-muted transition flex items-center justify-center gap-2 text-foreground text-sm group-hover:bg-muted"
              >
                <Tag className="w-4 h-4" />
                <span className="hidden sm:inline">Análisis</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {/* Dropdown Menu */}
              <div
                className={`absolute top-full right-0 mt-1 w-48 bg-white border border-border rounded-lg shadow-lg transition opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto ${openPMV2 ? 'opacity-100 pointer-events-auto' : ''
                  }`}
              >
                <Link href="/clasificar" className="block">
                  <div className="px-4 py-2 hover:bg-muted transition flex items-center gap-2 text-sm text-foreground border-b border-border">
                    <Tag className="w-4 h-4" />
                    Clasificar
                  </div>
                </Link>
                <Link href="/analizar" className="block">
                  <div className="px-4 py-2 hover:bg-muted transition flex items-center gap-2 text-sm text-foreground border-b border-border">
                    <Zap className="w-4 h-4" />
                    Interfaz Moderna
                  </div>
                </Link>
                <Link href="/entidades" className="block">
                  <div className="px-4 py-2 hover:bg-muted transition flex items-center gap-2 text-sm text-foreground border-b border-border">
                    <Users className="w-4 h-4" />
                    Entidades
                  </div>
                </Link>
                <Link href="/estructura" className="block">
                  <div className="px-4 py-2 hover:bg-muted transition flex items-center gap-2 text-sm text-foreground border-b border-border">
                    <Layers3 className="w-4 h-4" />
                    Estructura
                  </div>
                </Link>
                <Link href="/normas" className="block">
                  <div className="px-4 py-2 hover:bg-muted transition flex items-center gap-2 text-sm text-foreground">
                    <BookMarked className="w-4 h-4" />
                    Normas
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}