"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  CheckCircle2,
  XCircle,
  Loader2,
  AlertCircle,
  Eye,
  Calendar,
  User,
  Mail,
} from "lucide-react";
import Link from "next/link";
import RoleProtectedRoute from "@/app/components/RoleProtectedRoute";
import { DocumentService } from "@/services/api";

interface PendingDocument {
  id: number;
  uploaded_by: string;
  file_path: string;
  created_at: string;
  user: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

export default function AprobacionPage() {
  const [documents, setDocuments] = useState<PendingDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [approving, setApproving] = useState<number | null>(null);
  const [rejecting, setRejecting] = useState<number | null>(null);

  useEffect(() => {
    fetchPendingDocuments();
  }, []);

  const fetchPendingDocuments = async () => {
    try {
      setLoading(true);
      const data = await DocumentService.getPendingDocuments();
      setDocuments(data);
      setError(null);
    } catch (err) {
      setError("Error al cargar documentos pendientes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (docId: number) => {
    setApproving(docId);
    try {
      await DocumentService.approveDocument(docId);
      setDocuments(documents.filter((doc) => doc.id !== docId));
      setError(null);
    } catch (err) {
      setError("Error al aprobar documento");
    } finally {
      setApproving(null);
    }
  };

  const handleReject = async (docId: number) => {
    setRejecting(docId);
    try {
      // TODO: Reemplazar con endpoint real cuando esté disponible
      // await DocumentService.rejectDocument(docId);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setDocuments(documents.filter((doc) => doc.id !== docId));
      setError(null);
    } catch (err) {
      setError("Error al rechazar documento");
    } finally {
      setRejecting(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPdfUrl = (filePath: string) => {
    const cleanPath = filePath
      .replace(/^.*pending_to_approve[\\/]/, "pending_to_approve/")
      .replace(/\\/g, "/");
    return `${process.env.NEXT_PUBLIC_API_URL}/static/${cleanPath}`;
  };

  return (
    <RoleProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="bg-white border-2 border-border rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Aprobación de Documentos
                </h1>
                <p className="text-sm text-muted-foreground">
                  Revisa y aprueba los documentos pendientes subidos por
                  usuarios
                </p>
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div className="bg-white border-2 border-border rounded-lg shadow-sm overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 text-primary mx-auto mb-3 animate-spin" />
                  <p className="text-muted-foreground">
                    Cargando documentos pendientes...
                  </p>
                </div>
              </div>
            ) : error ? (
              <div className="p-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-800">Error</p>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
                <button
                  onClick={fetchPendingDocuments}
                  className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition text-sm font-medium"
                >
                  Reintentar
                </button>
              </div>
            ) : documents.length === 0 ? (
              <div className="p-12 text-center">
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-40" />
                <p className="text-lg text-muted-foreground font-medium">
                  No hay documentos pendientes
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Todos los documentos han sido revisados
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-6 hover:bg-muted/20 transition"
                  >
                    {/* Información del documento */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <FileText className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">
                              Documento #{doc.id}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {doc.file_path.split("\\").pop()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-medium text-muted-foreground">
                            ID: {doc.id}
                          </p>
                        </div>
                      </div>

                      {/* Información del usuario */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 p-4 bg-muted/30 rounded-lg border border-border/50">
                        <div className="flex items-start gap-2">
                          <User className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <p className="text-xs text-muted-foreground">
                              Usuario
                            </p>
                            <p className="text-sm font-medium text-foreground truncate">
                              {doc.user.first_name} {doc.user.last_name}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Mail className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <p className="text-xs text-muted-foreground">
                              Email
                            </p>
                            <p className="text-sm font-medium text-foreground truncate">
                              {doc.user.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Calendar className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <p className="text-xs text-muted-foreground">
                              Subido el
                            </p>
                            <p className="text-sm font-medium text-foreground">
                              {formatDate(doc.created_at)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex gap-3 flex-wrap">
                      {/* Link para ver el PDF */}
                      <a
                        href={getPdfUrl(doc.file_path)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-initial px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition border border-primary/20 flex items-center justify-center gap-2 text-sm font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        Ver documento PDF
                      </a>

                      {/* Botón Aprobar */}
                      <button
                        onClick={() => handleApprove(doc.id)}
                        disabled={approving === doc.id || rejecting === doc.id}
                        className="flex-1 sm:flex-initial px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition border border-green-200 flex items-center justify-center gap-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {approving === doc.id ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Aprobando...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            Aprobar
                          </>
                        )}
                      </button>

                      {/* Botón Rechazar */}
                      <button
                        onClick={() => handleReject(doc.id)}
                        disabled={approving === doc.id || rejecting === doc.id}
                        className="flex-1 sm:flex-initial px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition border border-red-200 flex items-center justify-center gap-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {rejecting === doc.id ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Rechazando...
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4" />
                            Rechazar
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Información */}
          <div className="mt-6 p-4 bg-muted/30 border border-border rounded-lg">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">
                ℹ️ Información:
              </span>{" "}
              Al aprobar un documento, este se agregará a la base de datos
              pública y será accesible para todos los usuarios. Al rechazarlo,
              se eliminará.
            </p>
          </div>
        </div>
      </div>
    </RoleProtectedRoute>
  );
}
