// src/controllers/DocumentController.ts

import { Document, UploadResponse, UploadStep } from "../models/types";
import { DocumentService } from "../services/api";

interface SearchResult {
  id: number;
  version: number;
  score: number;
  payload: {
    chunk_index: number;
    document_id: number;
    full_text: string;
    text: string;
  };
}

interface GroupedResult {
  document_id: number;
  mainChunk: SearchResult;
  otherChunks: SearchResult[];
}

export class DocumentController {
  static validateFile(file: File): { isValid: boolean; error?: string } {
    // Check file type
    if (file.type !== "application/pdf") {
      return {
        isValid: false,
        error: "Por favor selecciona un archivo PDF válido",
      };
    }

    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      return { isValid: false, error: "El archivo no puede superar los 10MB" };
    }

    return { isValid: true };
  }

  static async uploadDocument(
    file: File,
    onProgress?: (step: UploadStep) => void
  ): Promise<UploadResponse> {
    try {
      onProgress?.("uploading");

      // Simulate upload delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 800));

      onProgress?.("analyzing");

      const response = await DocumentService.uploadDocument(file);

      onProgress?.("done");

      return response;
    } catch (error) {
      console.error("Upload error:", error);
      throw new Error(
        "Error al analizar el PDF. Por favor intente nuevamente."
      );
    }
  }

  static async fetchDocuments(): Promise<Document[]> {
    try {
      return await DocumentService.getDocuments();
    } catch (error) {
      console.error("Fetch documents error:", error);
      throw new Error("Error al cargar documentos");
    }
  }

  static async updateDocument(
    id: number,
    updates: Partial<Document>
  ): Promise<Document> {
    try {
      return await DocumentService.updateDocument(id, updates);
    } catch (error) {
      console.error("Update document error:", error);
      throw new Error("Error al actualizar el documento");
    }
  }

  static async deleteDocument(id: number): Promise<void> {
    try {
      await DocumentService.deleteDocument(id);
    } catch (error) {
      console.error("Delete document error:", error);
      throw new Error("Error al eliminar el documento");
    }
  }

  static async downloadDocument(id: number, filename: string): Promise<void> {
    try {
      const blob = await DocumentService.downloadDocument(id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      throw new Error("Error al descargar el documento");
    }
  }

  static filterDocuments(
    documents: Document[],
    searchTerm: string
  ): Document[] {
    if (!searchTerm.trim()) return documents;

    const term = searchTerm.toLowerCase();
    return documents.filter(
      (doc) =>
        doc.case_number.toLowerCase().includes(term) ||
        doc.crime.toLowerCase().includes(term) ||
        doc.case_year.includes(term)
    );
  }
  static async searchEmbedding(query: string): Promise<GroupedResult[]> {
    try {
      const data = await DocumentService.searchEmbedding(query);
      console.log("data:", data); // Debug
      if (!data || !data.results) return [];
      return groupResults(data.results);
    } catch (error) {
      console.error("Search embedding error:", error);
      throw new Error("Error al buscar por embedding");
    }
  }
}

function groupResults(results: SearchResult[]): GroupedResult[] {
  console.log("results:", results); // Debug
  if (!results || !Array.isArray(results)) return [];
  const grouped: { [key: string]: SearchResult[] } = {};
  results.forEach((result) => {
    console.log("result:", result); // Debug
    if (
      !result ||
      !result.payload ||
      typeof result.payload.document_id === "undefined"
    )
      return;
    const docId = result.payload.document_id.toString();
    if (!grouped[docId]) grouped[docId] = [];
    grouped[docId].push(result);
  });
  console.log("grouped:", grouped); // Debug

  return Object.keys(grouped)
    .map((docId) => {
      const chunks = grouped[docId];
      console.log("docId:", docId, "chunks:", chunks); // Debug
      if (!chunks || !Array.isArray(chunks) || chunks.length === 0) return null;
      chunks.sort((a, b) => b.score - a.score);
      return {
        document_id: parseInt(docId),
        mainChunk: chunks[0],
        otherChunks: chunks.slice(1),
      };
    })
    .filter(Boolean) as GroupedResult[];
}
