'use client';
import { useState } from 'react';
import { Search, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { DocumentController } from '../../controllers/DocumentController';

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

export default function BusquedaEmbeddingPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GroupedResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const grouped = await DocumentController.searchEmbedding(query);
      setResults(grouped);
    } catch (error) {
      console.error('Error searching:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpanded = (docId: number) => {
    setExpanded(expanded === docId ? null : docId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border-2 border-border rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Search className="w-8 h-8 text-primary" />
              Búsqueda por Embedding
            </h1>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ingresa tu consulta..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition disabled:opacity-50"
                >
                  {loading ? 'Buscando...' : 'Buscar'}
                </button>
              </div>
              {results.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Resultados:</h2>
                  {results.map((group) => (
                    <div key={group.document_id} className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium">Documento ID: {group.document_id}</p>
                            <p className="text-sm text-muted-foreground">Similitud: {group.mainChunk.score.toFixed(4)}</p>
                          </div>
                        </div>
                        {group.otherChunks.length > 0 && (
                          <button onClick={() => toggleExpanded(group.document_id)} className="text-primary">
                            {expanded === group.document_id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        )}
                      </div>
                      <div className="mt-2">
                        <p className="text-sm">{group.mainChunk.payload.text}</p>
                      </div>
                      {expanded === group.document_id && group.otherChunks.length > 0 && (
                        <div className="mt-4 space-y-2">
                          <h4 className="font-medium text-sm">Otros chunks relevantes:</h4>
                          {group.otherChunks.map((chunk) => (
                            <div key={chunk.id} className="bg-white p-2 rounded border">
                              <p className="text-xs text-muted-foreground">Chunk {chunk.payload.chunk_index} - Similitud: {chunk.score.toFixed(4)}</p>
                              <p className="text-sm">{chunk.payload.text}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}