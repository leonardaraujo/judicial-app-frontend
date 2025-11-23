// src/models/types.ts
export interface Document {
  id: number;
  uploaded_by: string;
  file_path: string;
  created_at: string;
  case_number: string;
  case_year: string;
  crime: string;
  verdict: string;
  cited_jurisprudence: any[];
  user: {
    first_name: string;
    last_name: string;
    email: string;
  };
  resume?: string;
  // agrega aquí cualquier otro campo que devuelva la API
}

export interface DocumentMetadata {
  case_number: string;
  case_year: string;
  crime: string;
  verdict: string;
  cited_jurisprudence: string[];
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

export interface UploadResponse {
  metadata: DocumentMetadata;
  document_id: number;
  file_url: string;
  gemini_processing_time_seconds: number;
  total_processing_time_seconds: number;
  msg: string;
}

export type UploadStep = "idle" | "uploading" | "analyzing" | "done";

export type VerdictType =
  | "Absuelto"
  | "Culpable"
  | "Sobreseído"
  | "Archivado"
  | "Prescrito"
  | "Desestimado"
  | "Nulidad";

export interface SearchDocumentResult {
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
