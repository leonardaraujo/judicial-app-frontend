'use client';

import { useState } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle2, Heart } from 'lucide-react';
import Link from 'next/link';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { DocumentService } from '@/services/api';

export default function SubirUsuarioPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validar que sea PDF
    if (selectedFile.type !== 'application/pdf') {
      setError('Solo se aceptan archivos PDF');
      return;
    }

    // Validar tamaño (máximo 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      setError('El archivo es demasiado grande. Máximo 10MB');
      return;
    }

    setFile(selectedFile);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);
    try {
      await DocumentService.uploadPendingDocument(file);
      setSuccess(true);
      setFile(null);
    } catch (err) {
      setError('Error al subir el documento. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border-2 border-border rounded-lg shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-border bg-gradient-to-r from-primary/5 to-primary/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/20">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-primary">
                    Apoya la Causa
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Comparte tu caso judicial para mejorar la base de datos
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8">
              {success ? (
                // Estado de éxito
                <div className="text-center py-12">
                  <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-green-700 mb-2">
                    ¡Gracias por tu aporte!
                  </h2>
                  <p className="text-muted-foreground mb-2">
                    Tu documento ha sido recibido correctamente.
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Nuestro equipo revisará y aprobará tu documento antes de agregarlo a la base de datos pública. Esto puede tomar de 24 a 48 horas.
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-left">
                    <p className="text-sm text-green-800 font-medium mb-2">
                      ¿Qué sucede ahora?
                    </p>
                    <ul className="text-sm text-green-700 space-y-1 ml-4 list-disc">
                      <li>Tu caso será revisado por nuestro equipo</li>
                      <li>Se validará la información y se aplicarán medidas de privacidad</li>
                      <li>Se guardará en nuestra base de datos pública</li>
                      <li>Será accesible para todos los usuarios del sistema</li>
                    </ul>
                  </div>
                  <Link href="/">
                    <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium">
                      Volver al inicio
                    </button>
                  </Link>
                </div>
              ) : (
                // Formulario de subida
                <div className="space-y-6">
                  {/* Descripción */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      Ayuda a construir una base de datos judicial mejor
                    </h3>
                    <p className="text-sm text-blue-800 leading-relaxed mb-3">
                      Al compartir tu caso judicial, contribuyes a crear una base de datos pública más completa y accesible para todos. Esto fortalece la transparencia y el acceso a la información judicial.
                    </p>
                    <p className="text-sm text-blue-700 font-medium">
                      ✓ Tu documento será revisado antes de publicarse
                      <br />
                      ✓ Se protegerá la privacidad de las personas mencionadas
                      <br />
                      ✓ Será disponible para abogados, estudiantes e investigadores
                    </p>
                  </div>

                  {/* Términos */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      <span className="font-semibold">⚠️ Importante:</span> Solo se aceptan archivos PDF. El documento será revisado y aprobado antes de agregarse a la base de datos. Máximo 10MB.
                    </p>
                  </div>

                  {/* Formulario */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="file-upload"
                        className="text-base font-medium text-foreground block"
                      >
                        Selecciona tu caso (PDF)
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        disabled={loading}
                        className="w-full text-sm text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer border border-border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      <p className="text-xs text-muted-foreground">
                        Formatos soportados: PDF | Tamaño máximo: 10MB
                      </p>
                    </div>

                    {file && (
                      <div className="bg-card border border-primary/20 rounded-lg p-4 flex items-start gap-3">
                        <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground">
                            <span className="font-medium">Archivo seleccionado:</span> {file.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            ({(file.size / 1024 / 1024).toFixed(2)}MB)
                          </p>
                        </div>
                      </div>
                    )}

                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-800">{error}</p>
                      </div>
                    )}

                    <div className="flex gap-3 pt-4">
                      <button
                        type="submit"
                        disabled={!file || loading}
                        className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        {loading ? 'Enviando...' : 'Enviar documento'}
                      </button>
                      <Link href="/" className="flex-initial">
                        <button
                          type="button"
                          className="px-6 py-3 rounded-lg font-medium border border-border hover:bg-muted transition"
                        >
                          Cancelar
                        </button>
                      </Link>
                    </div>
                  </form>

                  {/* Info adicional */}
                  <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-semibold text-sm mb-2 flex items-center gap-2 text-foreground">
                      <Heart className="w-4 h-4 text-primary" />
                      ¿Por qué tu aporte es importante?
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                      <li>Fortalece la transparencia judicial</li>
                      <li>Ayuda a abogados, estudiantes e investigadores</li>
                      <li>Crea precedentes accesibles para todos</li>
                      <li>Mejora el acceso a la justicia</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}