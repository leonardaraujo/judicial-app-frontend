// src/components/views/ClassificationView.tsx
import { FileText, Tag, Layers, ChevronDown } from 'lucide-react';

export const ClassificationView = () => {
    const mockDocuments = [
        { id: 1, name: 'Sentencia_2024_001.pdf', type: 'Penal', category: 'Homicidio', confidence: 95 },
        { id: 2, name: 'Expediente_2024_042.pdf', type: 'Laboral', category: 'Despido', confidence: 87 },
        { id: 3, name: 'Recurso_2024_018.pdf', type: 'Civil', category: 'Responsabilidad Civil', confidence: 92 },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50">
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="bg-white border-2 border-border rounded-lg shadow-sm mb-6">
                        <div className="p-6 border-b border-border">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                                    <Tag className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground">PMV2-1: Clasificación Automática</h2>
                                    <p className="text-sm text-muted-foreground">Identificación y segmentación de secciones jurídicas</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                    <p className="text-xs font-semibold text-blue-700 mb-1">Documentos Procesados</p>
                                    <p className="text-2xl font-bold text-blue-900">42</p>
                                </div>
                                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                    <p className="text-xs font-semibold text-green-700 mb-1">Clasificación Exitosa</p>
                                    <p className="text-2xl font-bold text-green-900">98%</p>
                                </div>
                                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                                    <p className="text-xs font-semibold text-purple-700 mb-1">Categorías</p>
                                    <p className="text-2xl font-bold text-purple-900">7</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Classification Table */}
                    <div className="bg-white border-2 border-border rounded-lg shadow-sm">
                        <div className="p-6 border-b border-border">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-primary">
                                <Layers className="w-5 h-5" />
                                Documentos Clasificados
                            </h3>
                        </div>

                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-border bg-muted">
                                            <th className="text-left p-3 font-semibold text-foreground">Documento</th>
                                            <th className="text-left p-3 font-semibold text-foreground">Tipo Jurídico</th>
                                            <th className="text-left p-3 font-semibold text-foreground">Categoría</th>
                                            <th className="text-left p-3 font-semibold text-foreground">Confianza</th>
                                            <th className="text-right p-3 font-semibold text-foreground">Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mockDocuments.map((doc) => (
                                            <tr key={doc.id} className="border-b border-border hover:bg-muted/30 transition">
                                                <td className="p-3 font-medium text-foreground flex items-center gap-2">
                                                    <FileText className="w-4 h-4 text-primary" />
                                                    {doc.name}
                                                </td>
                                                <td className="p-3">
                                                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                                                        {doc.type}
                                                    </span>
                                                </td>
                                                <td className="p-3 text-foreground">{doc.category}</td>
                                                <td className="p-3">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-green-500"
                                                                style={{ width: `${doc.confidence}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-sm font-semibold text-foreground">{doc.confidence}%</span>
                                                    </div>
                                                </td>
                                                <td className="p-3 text-right">
                                                    <button className="text-primary hover:text-primary/80 font-medium text-sm">
                                                        Ver
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="mt-6 bg-blue-50 border-l-4 border-primary p-4 rounded-lg">
                        <p className="text-sm text-primary font-semibold mb-2">💡 Mockup: Clasificación Automática</p>
                        <p className="text-sm text-foreground">Esta es una vista de demostración que muestra cómo se clasificarían automáticamente los documentos jurídicos por tipo, categoría y nivel de confianza.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};
