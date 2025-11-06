import { Scale, BookMarked, AlertCircle, Lightbulb, ExternalLink } from 'lucide-react';

export const LegalNotesView = () => {
    const highlightedNorms = [
        {
            id: 1,
            article: 'Artículo 106',
            code: 'Código Penal Peruano',
            title: 'Homicidio Culposo',
            text: 'El que, por culpa, ocasiona la muerte de una persona, será sancionado con pena privativa de libertad no mayor de dos años o con prestación de servicios a la comunidad de ciento veinte a ciento ochenta jornadas.',
            relevance: 'Alta',
            mentions: 7,
        },
        {
            id: 2,
            article: 'Artículo 1',
            code: 'Constitución Política del Perú',
            title: 'Derecho a la Vida',
            text: 'La defensa de la persona humana y el respeto de su dignidad son el fin supremo de la sociedad y del Estado. Todo persona tiene derecho a la vida.',
            relevance: 'Alta',
            mentions: 5,
        },
        {
            id: 3,
            article: 'Artículo 71',
            code: 'Nuevo Código Procesal Penal (NCPP)',
            title: 'Derecho al Debido Proceso',
            text: 'Toda persona tiene derecho a una defensa adecuada desde el inicio de su imputación. El acusado tiene derecho a ser informado clara, inmediata y detalladamente de los cargos formulados en su contra.',
            relevance: 'Alta',
            mentions: 8,
        },
        {
            id: 4,
            article: 'Artículos 21-28',
            code: 'Código Penal Peruano',
            title: 'Circunstancias Modificativas de la Responsabilidad Penal',
            text: 'Se consideran circunstancias de atenuación: 1) Que el agente haya actuado bajo amenaza que le haya producido miedo insuperable...',
            relevance: 'Media',
            mentions: 4,
        },
        {
            id: 5,
            article: 'Artículo 92',
            code: 'Código Civil Peruano',
            title: 'Responsabilidad Civil Extracontractual',
            text: 'Quien por dolo o culpa causa un daño a otra persona está obligado a indemnizarlo. La indemnización comprende las consecuencias que deriven naturalmente de la acción u omisión generadora del daño.',
            relevance: 'Media',
            mentions: 3,
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50">
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="bg-white border-2 border-border rounded-lg shadow-sm mb-6">
                        <div className="p-6 border-b border-border">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-amber-100">
                                    <Scale className="w-6 h-6 text-amber-700" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground">PMV2-5: Resaltado de Normas y Artículos</h2>
                                    <p className="text-sm text-muted-foreground">Destaque referencias legales peruanas para encontrar normas rápidamente</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200 mb-4">
                                <div className="flex items-start gap-3">
                                    <Lightbulb className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-semibold text-amber-900 mb-1">Documento analizado</p>
                                        <p className="text-sm text-amber-800">Sentencia_Expediente_2024_00001.pdf - Se encontraron 5 normas y artículos clave del sistema legal peruano</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                                    <p className="text-xs font-semibold text-red-700 mb-1">Normas Críticas</p>
                                    <p className="text-2xl font-bold text-red-900">3</p>
                                </div>
                                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                    <p className="text-xs font-semibold text-yellow-700 mb-1">Normas Importantes</p>
                                    <p className="text-2xl font-bold text-yellow-900">2</p>
                                </div>
                                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                    <p className="text-xs font-semibold text-blue-700 mb-1">Total Mencionadas</p>
                                    <p className="text-2xl font-bold text-blue-900">27</p>
                                </div>
                                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                    <p className="text-xs font-semibold text-green-700 mb-1">Códigos Aplicados</p>
                                    <p className="text-2xl font-bold text-green-900">4</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Highlighted Norms */}
                    <div className="bg-white border-2 border-border rounded-lg shadow-sm">
                        <div className="p-6 border-b border-border">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-primary">
                                <BookMarked className="w-5 h-5" />
                                Normas y Artículos Resaltados del Ordenamiento Jurídico Peruano
                            </h3>
                        </div>

                        <div className="p-6 space-y-4">
                            {highlightedNorms.map((norm) => (
                                <div
                                    key={norm.id}
                                    className={`rounded-lg border-l-4 p-4 transition ${norm.relevance === 'Alta'
                                        ? 'border-l-red-500 bg-red-50 border border-red-200'
                                        : 'border-l-yellow-500 bg-yellow-50 border border-yellow-200'
                                        }`}
                                >
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h4 className="font-bold text-foreground text-lg">
                                                    {norm.article} - {norm.code}
                                                </h4>
                                                <span className={`px-2 py-1 rounded text-xs font-semibold ${norm.relevance === 'Alta'
                                                    ? 'bg-red-200 text-red-800'
                                                    : 'bg-yellow-200 text-yellow-800'
                                                    }`}>
                                                    {norm.relevance}
                                                </span>
                                            </div>
                                            <p className="text-sm font-semibold text-foreground mb-2">{norm.title}</p>
                                        </div>
                                        <div className="text-right md:text-left">
                                            <p className="text-xs text-muted-foreground mb-1">Menciones en documento</p>
                                            <p className="text-2xl font-bold text-primary">{norm.mentions}</p>
                                        </div>
                                    </div>

                                    {/* Highlighted text */}
                                    <div className="bg-white rounded p-3 mb-3 border border-gray-200">
                                        <p className="text-sm text-foreground leading-relaxed">
                                            "{norm.text}"
                                        </p>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex gap-2">
                                        <button className="flex items-center gap-1 px-3 py-1.5 rounded text-sm font-medium bg-white border border-gray-300 hover:bg-gray-50 transition text-foreground">
                                            <AlertCircle className="w-4 h-4" />
                                            Más detalles
                                        </button>
                                        <button className="flex items-center gap-1 px-3 py-1.5 rounded text-sm font-medium bg-white border border-gray-300 hover:bg-gray-50 transition text-foreground">
                                            <ExternalLink className="w-4 h-4" />
                                            Ver jurisprudencia
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="mt-6 bg-white border-2 border-border rounded-lg p-6">
                        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-primary" />
                            Leyenda de Relevancia
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-3 bg-red-50 rounded border border-red-200">
                                <div className="w-4 h-4 rounded-full bg-red-500" />
                                <div>
                                    <p className="text-sm font-semibold text-red-900">Alta Relevancia</p>
                                    <p className="text-xs text-red-800">Normas críticas para el caso según el NCPP y Código Penal</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded border border-yellow-200">
                                <div className="w-4 h-4 rounded-full bg-yellow-500" />
                                <div>
                                    <p className="text-sm font-semibold text-yellow-900">Relevancia Media</p>
                                    <p className="text-xs text-yellow-800">Normas complementarias del ordenamiento jurídico peruano</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="mt-6 bg-blue-50 border-l-4 border-amber-700 p-4 rounded-lg">
                        <p className="text-sm text-amber-900 font-semibold mb-2">💡 Mockup: Resaltado de Normas Peruanas</p>
                        <p className="text-sm text-foreground">Identificación automática y resalte de normas, artículos y referencias legales del sistema peruano (Código Penal, Código Procesal Penal, Código Civil, Constitución Política) para encontrar rápidamente las disposiciones aplicables al caso conforme al marco legal vigente.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};