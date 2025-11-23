// src/services/api.ts
import axios, { AxiosResponse } from "axios";
import { Document, UploadResponse, ApiResponse } from "../models/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 100000, // 100 seconds timeout
});

// Request interceptor for adding headers if needed
api.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("jwt_token") : null;
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export class DocumentService {
  static async uploadDocument(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append("file", file);

    const response: AxiosResponse<UploadResponse> = await api.post(
      "/analyze_pdf",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  }

  static async getDocuments(): Promise<Document[]> {
    const response: AxiosResponse<Document[]> = await api.get("/documents/");
    // Sanitiza los documentos para evitar errores si cited_jurisprudence viene como string vacío
    const sanitized = response.data.map((doc) => ({
      ...doc,
      cited_jurisprudence: Array.isArray(doc.cited_jurisprudence)
        ? doc.cited_jurisprudence
        : doc.cited_jurisprudence
        ? [doc.cited_jurisprudence]
        : [],
    }));
    return sanitized;
  }

  static async getDocument(id: number): Promise<Document> {
    const response: AxiosResponse<Document> = await api.get(`/documents/${id}`);
    return response.data;
  }

  static async updateDocument(
    id: number,
    document: Partial<Document>
  ): Promise<Document> {
    const response: AxiosResponse<Document> = await api.put(
      `/documents/${id}`,
      document
    );
    return response.data;
  }

  static async deleteDocument(id: number): Promise<void> {
    await api.delete(`/documents/${id}`);
  }

  static async downloadDocument(id: number): Promise<Blob> {
    const response: AxiosResponse<Blob> = await api.get(
      `/documents/download/${id}`,
      {
        responseType: "blob",
      }
    );
    return response.data;
  }
  static async searchEmbedding(query: string): Promise<any> {
    const response: AxiosResponse<any> = await api.get("/search", {
      params: { query },
    });
    return response.data;
  }
  static async getDocumentById(id: number): Promise<Document> {
    const response = await api.get(`/documents/${id}`);
    // Sanitiza cited_jurisprudence por si acaso
    return {
      ...response.data,
      cited_jurisprudence: Array.isArray(response.data.cited_jurisprudence)
        ? response.data.cited_jurisprudence
        : [],
    };
  }

  static async uploadPendingDocument(file: File): Promise<{
    msg: string;
    document_id: number;
    file_path: string;
  }> {
    const formData = new FormData();
    formData.append("file", file);

    const response: AxiosResponse<{
      msg: string;
      document_id: number;
      file_path: string;
    }> = await api.post("/upload_pending", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }

  static async getPendingDocuments(): Promise<
    Array<{
      id: number;
      uploaded_by: string;
      file_path: string;
      created_at: string;
      user: {
        first_name: string;
        last_name: string;
        email: string;
      };
    }>
  > {
    const response: AxiosResponse<any[]> = await api.get("/documents/pending");
    return response.data;
  }

  static async approveDocument(id: number): Promise<any> {
    const response: AxiosResponse<any> = await api.post(
      `/documents/approve/${id}`
    );
    return response.data;
  }

  static async rejectDocument(id: number): Promise<{ msg: string }> {
    const response: AxiosResponse<{ msg: string }> = await api.delete(
      `/documents/reject/${id}`
    );
    return response.data;
  }
  static async getIaResume(documentId: number): Promise<string> {
    const response: AxiosResponse<{ resume: string }> = await api.get(
      `/ia/${documentId}/resume`
    );
    return response.data.resume;
  }
}

export default api;
