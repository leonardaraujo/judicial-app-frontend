// src/components/views/StructuredView.tsx
import { BookOpen, FileJson, Layers3, ChevronRight, Check } from 'lucide-react';

export const StructuredView = () => {
    const caseStructure = {
        titulo: 'Sentencia de Homicidio Culposo',
        numero: 'EXP-2024-001',
        secciones: [
            {
                id: 1,
                nombre: 'Hechos Probados',
                subsecciones: [
                    'Contexto del incidente',
                    'Descripción de los hechos',
                    'Lugar y fecha de los hechos',
                ],
            },
            {
                id: 2,
                nombre: 'Cuestiones Jurídicas',
                subsecciones: [
                    'Aplicabilidad de la ley',
                    'Jurisprudencia pertinente',
                    'Principios legales aplicables',
                ],
            },
            {
                id: 3,
                nombre: 'Argumentos de las Partes',
                subsecciones: [
                    'Demanda de la acusación',
                    'Defensa del acusado',
                    'Contrarréplica',
                ],
            },
            {
                id: 4,
                nombre: 'Decisión del Tribunal',
                subsecciones: [
                    'Consideraciones',
                    'Análisis probatorio',
                    'Veredicto final',
                ],
            },
            {
                id: 5,
                nombre: 'Análisis y Conclusiones',
                subsecciones: [
                    'Síntesis de pruebas',
                    'Conclusión legal',
                    'Orden de ejecución',
                ],
            },
        ],
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50">
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="bg-white border-2 border-border rounded-lg shadow-sm mb-6">
                        <div className="p-6 border-b border-border">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-purple-100">
                                    <Layers3 className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground">PMV2-4: Visualización Estructurada</h2>
                                    <p className="text-sm text-muted-foreground">Entienda rápidamente el contenido del caso</p>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                                <h3 className="font-semibold text-foreground mb-2">{caseStructure.titulo}</h3>
                                <p className="text-sm text-muted-foreground">Expediente: {caseStructure.numero}</p>
                            </div>
                        </div>
                    </div>

                    {/* Structure Tree */}
                    <div className="bg-white border-2 border-border rounded-lg shadow-sm">
                        <div className="p-6 border-b border-border">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-primary">
                                <BookOpen className="w-5 h-5" />
                                Estructura del Documento
                            </h3>
                        </div>

                        <div className="p-6">
                            <div className="space-y-4">
                                {caseStructure.secciones.map((seccion, idx) => (
                                    <div key={seccion.id} className="border-l-2 border-primary pl-6 pb-6">
                                        {/* Main Section */}
                                        <div className="absolute w-4 h-4 bg-primary rounded-full ml-[-30px] mt-1" />

                                        <div className="bg-gradient-to-r from-primary/5 to-transparent rounded-lg p-4 border-l-4 border-primary mb-3">
                                            <div className="flex items-center gap-2 mb-2">
                                                <FileJson className="w-5 h-5 text-primary" />
                                                <h4 className="font-bold text-foreground text-lg">{seccion.nombre}</h4>
                                                <span className="ml-auto text-xs font-semibold bg-primary text-primary-foreground px-2 py-1 rounded">
                                                    Sección {idx + 1}
                                                </span>
                                            </div>

                                            {/* Subsections */}
                                            <div className="ml-7 mt-4 space-y-2">
                                                {seccion.subsecciones.map((sub, subIdx) => (
                                                    <div key={subIdx} className="flex items-center gap-2 text-sm text-foreground">
                                                        <Check className="w-4 h-4 text-green-600" />
                                                        <span>{sub}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Summary Panel */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white border-2 border-border rounded-lg p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                    <span className="font-bold text-blue-600">5</span>
                                </div>
                                <h4 className="font-semibold text-foreground">Secciones</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">Estructura completa del documento</p>
                        </div>

                        <div className="bg-white border-2 border-border rounded-lg p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                    <span className="font-bold text-green-600">15</span>
                                </div>
                                <h4 className="font-semibold text-foreground">Subsecciones</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">Detalles específicos identificados</p>
                        </div>

                        <div className="bg-white border-2 border-border rounded-lg p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                    <span className="font-bold text-purple-600">✓</span>
                                </div>
                                <h4 className="font-semibold text-foreground">Análisis</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">Jerarquía clara y completa</p>
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="mt-6 bg-blue-50 border-l-4 border-purple-600 p-4 rounded-lg">
                        <p className="text-sm text-purple-900 font-semibold mb-2">💡 Mockup: Visualización Estructurada</p>
                        <p className="text-sm text-foreground">Vista jerárquica que muestra claramente la estructura del documento jurídico, facilitando la navegación y comprensión rápida del contenido.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};
