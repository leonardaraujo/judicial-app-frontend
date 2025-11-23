"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DocumentController } from "@/controllers/DocumentController";
import { FileText, Download, Calendar, Gavel, Shield, Zap } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";

const STATIC_BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/static/";

export default function DocumentoDetallePage() {
  const { id } = useParams();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [documento, setDocumento] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [resumiendo, setResumiendo] = useState(false);
  const [resumen, setResumen] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDoc() {
      setLoading(true);
      try {
        const doc = await DocumentController.fetchDocumentById(Number(id));
        setDocumento(doc);
        setResumen(doc.resume || null); // <-- aquí
      } catch (e) {
        setDocumento(null);
        setResumen(null);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchDoc();
  }, [id]);

  const handleResumenIA = async () => {
    if (!isAuthenticated) return;

    setResumiendo(true);
    try {
      // Llama al endpoint real solo si no hay resumen
      const iaResume = await DocumentController.getIaResume(Number(id));
      setResumen(iaResume);
    } catch (error) {
      console.error("Error al resumir:", error);
      setResumen("Error al generar el resumen. Por favor intenta de nuevo.");
    } finally {
      setResumiendo(false);
    }
  };

  if (authLoading || loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-teal-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando documento...</p>
        </div>
      </div>
    );

  if (!documento)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-teal-50">
        <div className="text-center">
          <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-lg text-muted-foreground">
            Documento no encontrado
          </p>
        </div>
      </div>
    );

  // Construir la URL pública del PDF
  let pdfUrl = "";
  if (documento.file_path) {
    // Extrae solo el nombre del archivo
    const filename = documento.file_path.split(/[/\\]/).pop();
    // Construye la URL con el subdirectorio 'approved'
    pdfUrl = STATIC_BASE_URL + "approved/" + filename;
    console.log("PDF URL:", pdfUrl);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary flex items-center gap-3 mb-2">
            <FileText className="w-8 h-8" />
            Detalle del Expediente
          </h1>
          <p className="text-muted-foreground">
            {documento.case_number || "Sin número de expediente"}
          </p>
        </div>

        {/* Layout 2 Columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Izquierda - Metadata (1/4) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md border border-border sticky top-8 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Información
              </h2>

              {/* Expediente */}
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Expediente
                </p>
                <p className="text-sm font-mono font-semibold text-foreground mt-1">
                  {documento.case_number || "-"}
                </p>
              </div>

              {/* Subido por */}
              <div className="pt-3 border-t border-border">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                  Subido por
                </p>
                <p className="text-sm font-semibold text-foreground ml-1">
                  {documento.user?.first_name || "-"}{" "}
                  {documento.user?.last_name || ""}
                </p>
              </div>

              {/* Año */}
              <div className="pt-3 border-t border-border">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-primary" />
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Año
                  </p>
                </div>
                <p className="text-sm font-semibold text-foreground ml-6">
                  {documento.case_year || "-"}
                </p>
              </div>

              {/* Delito */}
              <div className="pt-3 border-t border-border">
                <div className="flex items-center gap-2 mb-1">
                  <Gavel className="w-4 h-4 text-primary" />
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Delito
                  </p>
                </div>
                <p className="text-sm font-semibold text-foreground ml-6 line-clamp-3">
                  {documento.crime || "-"}
                </p>
              </div>

              {/* Veredicto */}
              <div className="pt-3 border-t border-border">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-4 h-4 text-primary" />
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Veredicto
                  </p>
                </div>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mt-1">
                  {documento.verdict || "-"}
                </span>
              </div>

              {/* Jurisprudencia */}
              <div className="pt-3 border-t border-border">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  Jurisprudencia
                </p>
                {documento.cited_jurisprudence?.length > 0 ? (
                  <ul className="space-y-1">
                    {documento.cited_jurisprudence
                      .slice(0, 3)
                      .map((j: string, i: number) => (
                        <li
                          key={i}
                          className="text-xs text-muted-foreground truncate"
                        >
                          • {j}
                        </li>
                      ))}
                    {documento.cited_jurisprudence.length > 3 && (
                      <li className="text-xs text-primary font-medium">
                        +{documento.cited_jurisprudence.length - 3} más
                      </li>
                    )}
                  </ul>
                ) : (
                  <p className="text-xs text-muted-foreground">-</p>
                )}
              </div>

              {/* Botón Descargar */}
              {pdfUrl && (
                <div className="pt-4 border-t border-border">
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Descargar
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Main Content (3/4) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Visor PDF */}
            <div className="bg-white rounded-lg shadow-md border border-border overflow-hidden">
              <div className="bg-gradient-to-r from-primary/5 to-primary/10 px-6 py-4 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground">
                  Vista previa del PDF
                </h2>
              </div>

              {pdfUrl ? (
                <div className="p-4">
                  <iframe
                    src={pdfUrl}
                    title="PDF Viewer"
                    width="100%"
                    height="800px"
                    className="border border-border rounded-lg"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <FileText className="w-16 h-16 text-muted-foreground mb-4 opacity-40" />
                  <p className="text-muted-foreground font-medium">
                    No hay archivo PDF disponible
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Este documento no tiene un PDF asociado
                  </p>
                </div>
              )}
            </div>

            {/* Sección Resumen con IA */}
            <div className="bg-white rounded-lg shadow-md border border-border overflow-hidden">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4 border-b border-border flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500" />
                  Resumen con IA
                </h2>
              </div>

              <div className="p-6">
                {!isAuthenticated ? (
                  <div className="text-center py-8">
                    <div className="inline-block p-4 bg-primary/10 rounded-lg mb-4">
                      <FileText className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-foreground font-medium mb-3">
                      Inicia sesión para usar el resumen con IA
                    </p>
                    <p className="text-sm text-muted-foreground mb-6">
                      Obtén un resumen automático de este documento usando
                      inteligencia artificial
                    </p>
                    <Link
                      href="/"
                      className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium text-sm"
                    >
                      Iniciar sesión
                    </Link>
                  </div>
                ) : resumen ? (
                  <div className="space-y-4">
                    <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                      <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                        {resumen}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <button
                      onClick={handleResumenIA}
                      disabled={resumiendo}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition font-medium text-sm disabled:opacity-50"
                    >
                      <Zap className="w-4 h-4" />
                      {resumiendo
                        ? "Generando resumen..."
                        : "Generar resumen con IA"}
                    </button>
                    <p className="text-xs text-muted-foreground mt-3">
                      Esto puede tomar unos segundos
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
