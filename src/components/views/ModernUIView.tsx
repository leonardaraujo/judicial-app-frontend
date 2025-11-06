// src/components/views/ModernUIView.tsx
import { Zap, BarChart3, Filter, Clock, TrendingUp } from 'lucide-react';

export const ModernUIView = () => {
    const mockCases = [
        {
            id: 1,
            expediente: 'EXP-2024-001',
            title: 'Sentencia de Homicidio Culposo',
            date: '2024-11-05',
            status: 'Fallado',
            priority: 'Alta',
            timeToReview: '3 min',
        },
        {
            id: 2,
            expediente: 'EXP-2024-042',
            title: 'Recurso de Apelación - Laboral',
            date: '2024-11-04',
            status: 'En Revisión',
            priority: 'Media',
            timeToReview: '5 min',
        },
        {
            id: 3,
            expediente: 'EXP-2024-089',
            title: 'Demanda Civil - Responsabilidad',
            date: '2024-11-03',
            status: 'Pendiente',
            priority: 'Baja',
            timeToReview: '2 min',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50">
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header con filtros */}
                    <div className="bg-white border-2 border-border rounded-lg shadow-sm mb-6">
                        <div className="p-6 border-b border-border">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/10">
                                    <Zap className="w-6 h-6 text-secondary" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground">PMV2-2: Interfaz Moderna</h2>
                                    <p className="text-sm text-muted-foreground">Visualiza resultados y navega casos rápidamente</p>
                                </div>
                            </div>

                            {/* Barra de filtros */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                <div className="relative">
                                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <input
                                        type="text"
                                        placeholder="Buscar expediente..."
                                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                    />
                                </div>
                                <select className="px-4 py-2 rounded-lg border border-border bg-input text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                                    <option>Todos los Estados</option>
                                    <option>Fallado</option>
                                    <option>En Revisión</option>
                                    <option>Pendiente</option>
                                </select>
                                <select className="px-4 py-2 rounded-lg border border-border bg-input text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                                    <option>Todas las Prioridades</option>
                                    <option>Alta</option>
                                    <option>Media</option>
                                    <option>Baja</option>
                                </select>
                                <button className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground font-medium hover:opacity-90 transition">
                                    Filtrar
                                </button>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                                <BarChart3 className="w-5 h-5 text-blue-600 mb-2" />
                                <p className="text-xs font-semibold text-blue-700">Total de Casos</p>
                                <p className="text-2xl font-bold text-blue-900">156</p>
                            </div>
                            <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                                <TrendingUp className="w-5 h-5 text-green-600 mb-2" />
                                <p className="text-xs font-semibold text-green-700">Resueltos</p>
                                <p className="text-2xl font-bold text-green-900">128</p>
                            </div>
                            <div className="p-4 rounded-lg bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200">
                                <Clock className="w-5 h-5 text-yellow-600 mb-2" />
                                <p className="text-xs font-semibold text-yellow-700">En Proceso</p>
                                <p className="text-2xl font-bold text-yellow-900">18</p>
                            </div>
                            <div className="p-4 rounded-lg bg-gradient-to-br from-red-50 to-red-100 border border-red-200">
                                <Filter className="w-5 h-5 text-red-600 mb-2" />
                                <p className="text-xs font-semibold text-red-700">Pendientes</p>
                                <p className="text-2xl font-bold text-red-900">10</p>
                            </div>
                        </div>
                    </div>

                    {/* Cases Grid */}
                    <div className="grid grid-cols-1 gap-4">
                        {mockCases.map((caseItem) => (
                            <div
                                key={caseItem.id}
                                className="bg-white border-2 border-border rounded-lg p-6 hover:shadow-lg transition hover:border-primary"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                                                {caseItem.expediente}
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${caseItem.status === 'Fallado'
                                                    ? 'bg-green-100 text-green-800'
                                                    : caseItem.status === 'En Revisión'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {caseItem.status}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-foreground mb-2">{caseItem.title}</h3>
                                        <p className="text-sm text-muted-foreground">Fecha: {caseItem.date}</p>
                                    </div>

                                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                        <div className="text-right">
                                            <p className="text-xs text-muted-foreground mb-1">Prioridad</p>
                                            <span className={`px-3 py-1 rounded text-xs font-semibold ${caseItem.priority === 'Alta'
                                                    ? 'bg-red-100 text-red-800'
                                                    : caseItem.priority === 'Media'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-green-100 text-green-800'
                                                }`}>
                                                {caseItem.priority}
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-muted-foreground mb-1">Tiempo de Lectura</p>
                                            <p className="font-bold text-foreground">{caseItem.timeToReview}</p>
                                        </div>
                                        <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition">
                                            Ver
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Info Box */}
                    <div className="mt-6 bg-blue-50 border-l-4 border-secondary p-4 rounded-lg">
                        <p className="text-sm text-secondary font-semibold mb-2">💡 Mockup: Interfaz Moderna</p>
                        <p className="text-sm text-foreground">Vista optimizada para navegar rápidamente entre casos con filtros avanzados y visualización de prioridades y estados.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};
