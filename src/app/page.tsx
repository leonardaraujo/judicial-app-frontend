'use client';
import { useState } from 'react';
import { Search, FileText, Scale, Upload, Shield, Download, Eye } from 'lucide-react';
import { DocumentController } from '@/controllers/DocumentController';
import Link from 'next/link';

interface SearchDocumentResult {
  document_id: number;
  metadata: {
    id: number;
    case_number: string;
    case_year: string;
    crime: string;
    verdict: string;
    cited_jurisprudence: string[];
  };
  chunk: {
    score: number;
    chunk_index: number;
    text: string;
    full_text: string;
  };
}

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchDocumentResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [downloading, setDownloading] = useState<number | null>(null);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const data = await DocumentController.searchEmbedding(query);
      setResults(data);
    } catch (error) {
      console.error('Error searching:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (documentId: number, caseNumber: string) => {
    setDownloading(documentId);
    try {
      await DocumentController.downloadDocument(documentId, `Expediente_${caseNumber}.pdf`);
    } catch (error) {
      console.error('Error downloading:', error);
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50 flex flex-col">
      {/* Hero Section - Solo visible sin búsqueda */}
      {!searched ? (
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
          <div className="text-center max-w-5xl w-full">
            {/* Logo y Título */}
            <div className="flex flex-col items-center gap-2 mb-6">
              <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-primary flex-shrink-0">
                <Scale className="w-10 h-10 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-primary">
                  Sistema Judicial
                </h1>
                <p className="text-sm text-muted-foreground">
                  Base de Documentos Judiciales
                </p>
              </div>
            </div>

            {/* Subtítulo */}
            <p className="text-xl text-muted-foreground mb-12">
              Encuentra documentos judiciales, sentencias y resoluciones de manera rápida y eficiente
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-20">
              <div className="flex gap-2 bg-white rounded-full shadow-lg p-2 border-2 border-transparent hover:border-primary transition items-center">
                <Search className="w-6 h-6 text-primary ml-3 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Busca por documento, sentencia, resolucion..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 px-3 py-3 outline-none text-foreground placeholder:text-muted-foreground bg-transparent"
                />
                <button
                  type="submit"
                  disabled={loading || !query.trim()}
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition disabled:opacity-50 flex-shrink-0"
                >
                  {loading ? 'Buscando...' : 'Buscar'}
                </button>
              </div>
            </form>

            {/* Features/Instrucciones */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-md border border-border hover:shadow-lg transition duration-300">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-bold text-lg text-foreground mb-3 text-center">
                  Apoya la Causa
                </h3>
                <p className="text-sm text-muted-foreground text-center leading-relaxed">
                  Sube documentos judiciales que tengas a la base de datos. Juntos construimos una base de datos más completa y confiable
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-md border border-border hover:shadow-lg transition duration-300">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-bold text-lg text-foreground mb-3 text-center">
                  Búsqueda Efectiva
                </h3>
                <p className="text-sm text-muted-foreground text-center leading-relaxed">
                  Encuentra los documentos más relevantes con rapidez. Nuestro sistema de búsqueda te conecta con lo que necesitas
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-md border border-border hover:shadow-lg transition duration-300">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <Scale className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-bold text-lg text-foreground mb-3 text-center">
                  Colaborativo
                </h3>
                <p className="text-sm text-muted-foreground text-center leading-relaxed">
                  Acceso compartido a documentos judiciales. Con la ayuda de usuarios como tú, mejoramos constantemente
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-md border border-border hover:shadow-lg transition duration-300">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-bold text-lg text-foreground mb-3 text-center">
                  Anonimizado
                </h3>
                <p className="text-sm text-muted-foreground text-center leading-relaxed">
                  Protegemos los datos personales. Todos los documentos se anonimizamos completamente por privacidad
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Resultados Section */
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            {/* Search Bar - Compacta */}
            <form onSubmit={handleSearch} className="mb-8 sticky top-20 z-40">
              <div className="flex gap-2 bg-white rounded-full shadow-md p-2 border-2 border-primary/20 hover:border-primary transition items-center">
                <Search className="w-5 h-5 text-primary ml-3 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Busca por documento, sentencia, resolucion..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 px-3 py-2 outline-none text-foreground placeholder:text-muted-foreground bg-transparent text-sm"
                />
                <button
                  type="submit"
                  disabled={loading || !query.trim()}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition disabled:opacity-50 flex-shrink-0 text-sm"
                >
                  {loading ? 'Buscando...' : 'Buscar'}
                </button>
              </div>
            </form>

            {/* Resultados o Mensaje vacío */}
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
                </div>
                <p className="text-muted-foreground mt-3">Buscando documentos...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">
                    {results.length} resultado(s) encontrado(s)
                  </h2>
                  <button
                    onClick={() => setSearched(false)}
                    className="text-xs text-primary hover:underline"
                  >
                    Nueva búsqueda
                  </button>
                </div>
                {results.map((result) => (
                  <div
                    key={result.document_id + '-' + result.chunk.chunk_index}
                    className="bg-white rounded-lg shadow-sm border border-border hover:shadow-md transition p-4"
                  >
                    {/* Header - Metadata compacta */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                          <p className="font-semibold text-foreground text-sm">
                            {result.metadata.case_number || "Sin expediente"}
                          </p>
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            {(result.chunk.score * 100).toFixed(0)}% relevancia
                          </span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-muted-foreground">
                          <div>
                            <span className="font-medium">Año:</span> {result.metadata.case_year || "-"}
                          </div>
                          <div>
                            <span className="font-medium">Delito:</span> {result.metadata.crime || "-"}
                          </div>
                          <div>
                            <span className="font-medium">Veredicto:</span> {result.metadata.verdict || "-"}
                          </div>
                          <div>
                            <span className="font-medium">Jurisprudencia:</span>{" "}
                            {result.metadata.cited_jurisprudence.length > 0 ? "Sí" : "No"}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <Link
                          href={`/document/${result.metadata.id}`}
                          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition flex items-center gap-2 text-sm font-medium"
                        >
                          <Eye className="w-4 h-4" />
                          Ver documento
                        </Link>
                        <button
                          onClick={() =>
                            handleDownload(
                              result.metadata.id,
                              result.metadata.case_number
                            )
                          }
                          disabled={downloading === result.metadata.id}
                          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition flex items-center gap-2 text-sm font-medium disabled:opacity-50"
                        >
                          <Download className="w-4 h-4" />
                          {downloading === result.metadata.id ? "Descargando..." : "Descargar"}
                        </button>
                      </div>
                    </div>

                    {/* Fragmento relevante */}
                    <div className="bg-muted/30 rounded-md p-3 border-l-2 border-primary">
                      <p className="text-xs font-semibold text-foreground mb-1">
                        Fragmento relevante:
                      </p>
                      <p className="text-sm text-foreground line-clamp-3">
                        {result.chunk.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : searched ? (
              <div className="text-center py-16">
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-40" />
                <p className="text-lg text-muted-foreground font-medium">
                  No se encontraron documentos
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Intenta con otros términos o palabras clave
                </p>
              </div>
            ) : null}
          </div>
        </main>
      )}
    </div>
  );
}