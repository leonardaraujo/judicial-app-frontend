import { Users, MapPin, Building2, Briefcase, Highlighter } from 'lucide-react';

export const EntitiesView = () => {
    const mockEntities = [
        { type: 'Persona', name: 'Roberto Carlos Mendoza García', role: 'Demandante', count: 3 },
        { type: 'Persona', name: 'Patricia Elena Flores Soto', role: 'Demandada', count: 2 },
        { type: 'Organización', name: 'Juzgado Civil de Lima', role: 'Tribunal', count: 5 },
        { type: 'Ubicación', name: 'Lima, Perú', role: 'Jurisdicción', count: 4 },
        { type: 'Empresa', name: 'Constructora Andina S.A.C.', role: 'Parte demandada', count: 3 },
    ];

    const extractedText = `"El demandante, Roberto Carlos Mendoza García, interpone demanda contra Patricia Elena Flores Soto en el Juzgado Civil de Lima ubicado en Lima, Perú, representado por la Constructora Andina S.A.C..."`;

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50">
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="bg-white border-2 border-border rounded-lg shadow-sm mb-6">
                        <div className="p-6 border-b border-border">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100">
                                    <Users className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground">PMV2-3: Extracción de Entidades Jurídicas</h2>
                                    <p className="text-sm text-muted-foreground">Identifique y resalte entidades jurídicamente relevantes del sistema legal peruano</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200 mb-4">
                                <p className="text-sm text-blue-900 mb-3">
                                    <span className="font-semibold">Documento analizado:</span> Sentencia_Expediente_2024_00001.pdf
                                </p>
                                <div className="bg-white rounded p-3 border border-blue-100">
                                    <p className="text-sm text-foreground leading-relaxed">
                                        "{extractedText.substring(0, extractedText.length - 3)}"
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                                    <Users className="w-5 h-5 text-red-600 mb-2" />
                                    <p className="text-xs font-semibold text-red-700 mb-1">Personas</p>
                                    <p className="text-2xl font-bold text-red-900">2</p>
                                </div>
                                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                                    <Building2 className="w-5 h-5 text-orange-600 mb-2" />
                                    <p className="text-xs font-semibold text-orange-700 mb-1">Organizaciones</p>
                                    <p className="text-2xl font-bold text-orange-900">1</p>
                                </div>
                                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                    <MapPin className="w-5 h-5 text-yellow-600 mb-2" />
                                    <p className="text-xs font-semibold text-yellow-700 mb-1">Ubicaciones</p>
                                    <p className="text-2xl font-bold text-yellow-900">1</p>
                                </div>
                                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                    <Briefcase className="w-5 h-5 text-green-600 mb-2" />
                                    <p className="text-xs font-semibold text-green-700 mb-1">Empresas</p>
                                    <p className="text-2xl font-bold text-green-900">1</p>
                                </div>
                                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                    <Highlighter className="w-5 h-5 text-blue-600 mb-2" />
                                    <p className="text-xs font-semibold text-blue-700 mb-1">Entidades Totales</p>
                                    <p className="text-2xl font-bold text-blue-900">5</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Entities List */}
                    <div className="bg-white border-2 border-border rounded-lg shadow-sm">
                        <div className="p-6 border-b border-border">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-primary">
                                <Highlighter className="w-5 h-5" />
                                Entidades Extraídas del Documento
                            </h3>
                        </div>

                        <div className="p-6">
                            <div className="space-y-3">
                                {mockEntities.map((entity, idx) => (
                                    <div key={idx} className="p-4 border border-border rounded-lg hover:bg-muted/30 transition">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center gap-3 flex-1">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${entity.type === 'Persona'
                                                    ? 'bg-red-100'
                                                    : entity.type === 'Organización'
                                                        ? 'bg-orange-100'
                                                        : entity.type === 'Ubicación'
                                                            ? 'bg-yellow-100'
                                                            : 'bg-green-100'
                                                    }`}>
                                                    {entity.type === 'Persona' && <Users className="w-5 h-5 text-red-600" />}
                                                    {entity.type === 'Organización' && <Building2 className="w-5 h-5 text-orange-600" />}
                                                    {entity.type === 'Ubicación' && <MapPin className="w-5 h-5 text-yellow-600" />}
                                                    {entity.type === 'Empresa' && <Briefcase className="w-5 h-5 text-green-600" />}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-foreground">{entity.name}</h4>
                                                    <p className="text-sm text-muted-foreground">{entity.role}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="px-3 py-1 rounded-full bg-muted text-sm font-medium text-foreground">
                                                    {entity.type}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="ml-13 flex items-center gap-2 text-sm text-muted-foreground">
                                            <span>Mencionada {entity.count} veces en el expediente</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg">
                        <p className="text-sm text-blue-900 font-semibold mb-2">💡 Mockup: Extracción de Entidades Jurídicas Peruanas</p>
                        <p className="text-sm text-foreground">Identificación automática de personas, organizaciones, ubicaciones y empresas relevantes en documentos del sistema legal peruano conforme al NCPP y CPC.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};