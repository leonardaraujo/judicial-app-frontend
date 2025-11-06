# Estructura del Proyecto: Sistema Judicial - Buscador y Gestor de Documentos Legales

## 📋 Información General del Proyecto

**Nombre del Proyecto:** Sistema Judicial - Buscador y Gestor de Documentos Legales  
**Tipo de Aplicación:** Aplicación web full-stack para gestión y análisis de documentos judiciales  
**Arquitectura:** Multi-tier (Frontend + Backend + Bases de Datos)  
**Estado:** Funcional y desplegado localmente  
**Idioma Principal:** Español (interfaz de usuario)  
**Repositorio:** https://github.com/leonardaraujo/judicial-app  

## 🏗️ Arquitectura del Sistema

### Arquitectura General
- **Frontend (Capa de Presentación):** Next.js 15 con React 19 y TypeScript
- **Backend (Capa de Lógica de Negocio):** FastAPI con Python (no incluido en este workspace)
- **Base de Datos Relacional:** PostgreSQL (no incluido en este workspace)
- **Base de Datos Vectorial:** Qdrant (no incluido en este workspace)
- **IA/ML:** Google Gemini 2.5 Flash para procesamiento de lenguaje natural
- **Contenedorización:** Docker (para servicios backend)

### Diagrama de Arquitectura
```
┌─────────────────┐    HTTP/HTTPS    ┌─────────────────┐
│   Frontend      │◄────────────────►│   Backend       │
│   (Next.js)     │                  │   (FastAPI)     │
│   - React 19    │                  │   - Python      │
│   - TypeScript  │                  │   - SQLAlchemy  │
│   - TailwindCSS │                  │   - Pydantic    │
└─────────────────┘                  └─────────────────┘
         │                                   │
         │                                   │
┌─────────────────┐                  ┌─────────────────┐
│   Navegador     │                  │   PostgreSQL    │
│   Web           │                  │   (Metadatos)   │
└─────────────────┘                  └─────────────────┘
                                             │
                                             ▼
                                   ┌─────────────────┐
                                   │   Qdrant        │
                                   │   (Embeddings)  │
                                   └─────────────────┘
```

### Flujo de Datos Principal
1. **Carga de Documento:** Usuario → Frontend → Backend → IA (Gemini) → PostgreSQL + Qdrant
2. **Consulta:** Usuario → Frontend → Backend → PostgreSQL/Qdrant → Frontend
3. **CRUD:** Usuario → Frontend → Backend → PostgreSQL

## 🛠️ Tecnologías y Dependencias (Frontend)

### Dependencias Principales
```json
{
  "next": "15.5.4",
  "react": "19.1.0",
  "react-dom": "19.1.0",
  "axios": "^1.12.2",
  "lucide-react": "^0.544.0",
  "react-hot-toast": "^2.6.0"
}
```

### Dependencias de Desarrollo
```json
{
  "@biomejs/biome": "2.2.0",
  "@tailwindcss/postcss": "^4",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "tailwindcss": "^4",
  "typescript": "^5"
}
```

### Tecnologías Adicionales
- **Framework:** Next.js 15 con App Router
- **Lenguaje:** TypeScript 5
- **Estilos:** Tailwind CSS v4
- **Linter/Formatter:** Biome
- **Iconos:** Lucide React
- **Notificaciones:** React Hot Toast
- **HTTP Client:** Axios

## 📁 Estructura de Archivos Detallada

### Raíz del Proyecto
```
judicial-app-frontend/
├── biome.json                 # Configuración de Biome (linting/formatting)
├── next-env.d.ts             # Tipos de Next.js
├── next.config.ts            # Configuración de Next.js
├── package.json              # Dependencias y scripts de Node.js
├── postcss.config.mjs        # Configuración de PostCSS para Tailwind
├── README.md                 # Documentación del proyecto
├── tsconfig.json             # Configuración de TypeScript
├── tailwind.config.ts        # Configuración de Tailwind CSS
├── documentation/            # Documentación del proyecto
│   ├── actividad1.md         # Evaluación formativa del tablero Kanban
│   ├── actividad2.md         # Evaluación de usabilidad y accesibilidad
│   ├── actividad3.md         # Integración con backend ML
│   └── project_analysis.md   # Análisis completo del proyecto
├── public/                   # Archivos estáticos
└── src/                      # Código fuente
```

### Directorio `src/`
```
src/
├── app/                      # Páginas y layout (App Router)
│   ├── components/           # Componentes de página
│   │   └── Navbar.tsx        # Barra de navegación principal con dropdown PMV2
│   ├── consultar/            # Página de consulta y gestión
│   │   └── page.tsx          # Página de búsqueda y CRUD
│   ├── subir/                # Página de carga de documentos
│   │   └── page.tsx          # Página de subida de PDFs
│   ├── clasificar/           # PMV2-1: Clasificación automática
│   │   └── page.tsx          # Página de clasificación de documentos
│   ├── analizar/             # PMV2-2: Interfaz moderna
│   │   └── page.tsx          # Página de análisis moderno
│   ├── entidades/            # PMV2-3: Extracción de entidades
│   │   └── page.tsx          # Página de extracción de entidades
│   ├── estructura/           # PMV2-4: Visualización estructurada
│   │   └── page.tsx          # Página de estructura del documento
│   ├── normas/               # PMV2-5: Resaltado de normas
│   │   └── page.tsx          # Página de normas y artículos
│   ├── globals.css           # Estilos globales y tema
│   ├── layout.tsx            # Layout raíz de la aplicación
│   └── page.tsx              # Página principal (home)
├── components/               # Componentes reutilizables
│   └── views/                # Vistas principales
│       ├── DocumentsView.tsx # Vista de lista y gestión de documentos
│       ├── UploadView.tsx    # Vista de carga de documentos
│       ├── ClassificationView.tsx  # PMV2-1: Vista de clasificación
│       ├── ModernUIView.tsx        # PMV2-2: Vista de interfaz moderna
│       ├── EntitiesView.tsx        # PMV2-3: Vista de extracción de entidades
│       ├── StructuredView.tsx      # PMV2-4: Vista de estructura del documento
│       └── LegalNotesView.tsx      # PMV2-5: Vista de normas y artículos
├── controllers/              # Controladores (lógica de negocio frontend)
│   └── DocumentController.ts # Controlador de documentos
├── hooks/                    # Hooks personalizados de React
│   └── useDocuments.ts       # Hooks para gestión de documentos
├── lib/                      # Utilidades y constantes
│   └── constants.ts          # Constantes de la aplicación
├── models/                   # Modelos de datos y tipos
│   └── types.ts              # Definiciones TypeScript
├── services/                 # Servicios externos (APIs)
│   └── api.ts                # Cliente API para backend
└── utils/                    # Utilidades generales
    └── file.ts               # Utilidades para manejo de archivos
```

## 🔧 Configuración y Variables de Entorno

### Variables de Entorno Requeridas
```bash
# .env.local (frontend)
NEXT_PUBLIC_API_URL=http://localhost:8000  # URL del backend FastAPI
```

### Configuración de TypeScript (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]  // Alias para importar desde src/
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Configuración de Tailwind CSS
- **Versión:** Tailwind CSS v4
- **Tema:** Personalizado para dominio judicial
- **Colores:** Azul primario (#164e63), teal secundario (#0f766e), blanco puro
- **Tipografía:** Geist Sans y Geist Mono

## 📊 Modelos de Datos

### Document Model (Frontend)
```typescript
interface Document {
  id: number;
  case_number: string;           // Número de expediente
  case_year: string;             // Año del caso
  crime: string;                 // Delito principal
  verdict: string;               // Veredicto judicial
  cited_jurisprudence: string[]; // Referencias jurisprudenciales
  file_path: string;             // Ruta del archivo PDF
}
```

### Upload Response
```typescript
interface UploadResponse {
  metadata: DocumentMetadata;
  document_id: number;
  file_url: string;
  gemini_processing_time_seconds: number;
  total_processing_time_seconds: number;
  msg: string;
}
```

### Estados de Upload
```typescript
type UploadStep = 'idle' | 'uploading' | 'analyzing' | 'done';
```

## 🎯 Funcionalidades Principales

### PMV1: Funcionalidades Base
#### 1. Carga y Análisis de Documentos
- **Endpoint:** `POST /analyze_pdf` (backend)
- **Input:** Archivo PDF multipart
- **Proceso Frontend:**
  1. Validación de archivo (tipo PDF, tamaño ≤10MB)
  2. Upload con indicadores de progreso visual
  3. Análisis automático con IA (Google Gemini)
  4. Almacenamiento en base de datos
  5. Feedback de éxito/error

#### 2. Gestión CRUD de Documentos
- **Operaciones:**
  - `GET /documents/` - Listar todos los documentos
  - `GET /documents/{id}` - Obtener documento específico
  - `PUT /documents/{id}` - Actualizar metadatos
  - `DELETE /documents/{id}` - Eliminar documento
- **Funcionalidad:** Edición manual de metadatos extraídos por IA

#### 3. Sistema de Búsqueda
- **Búsqueda por Texto:** Filtro cliente-side por expediente, delito, año
- **Interfaz:** Campo de búsqueda con icono, resultados en tiempo real
- **Resultados:** Tabla responsive con información completa

#### 4. Interfaz de Usuario
- **Páginas:** Home, Subir documento, Consultar documentos
- **Componentes:** Navbar, formularios, tablas, modales de edición
- **Estilos:** Tailwind CSS con tema judicial profesional
- **Responsive:** Diseño mobile-first

### PMV2: Características Avanzadas de Análisis (Mockups)

#### PMV2-1: Clasificación Automática
- **Ruta:** `/clasificar`
- **Funcionalidad:** Identificación y segmentación de secciones jurídicas
- **Características:**
  - Clasificación automática de documentos por tipo jurídico
  - Categorización por delito/materia
  - Indicador de confianza de clasificación
  - Tabla con estadísticas de procesamiento
- **Componente:** `ClassificationView.tsx`

#### PMV2-2: Interfaz Moderna y Usable
- **Ruta:** `/analizar`
- **Funcionalidad:** Visualización de resultados y navegación rápida de casos
- **Características:**
  - Barra de filtros avanzada (estado, prioridad, búsqueda)
  - Cards de casos con información visual jerárquica
  - Indicadores de tiempo de lectura estimado
  - Estadísticas en tiempo real (casos resueltos, pendientes, etc.)
  - Interfaz optimizada para escaneo rápido
- **Componente:** `ModernUIView.tsx`

#### PMV2-3: Extracción de Entidades Jurídicas
- **Ruta:** `/entidades`
- **Funcionalidad:** Identificación y resalte de entidades relevantes
- **Características:**
  - Extracción automática de personas, organizaciones, ubicaciones, empresas
  - Clasificación por tipo de entidad con iconos
  - Contador de menciones en el documento
  - Rol de cada entidad en el caso
  - Interfaz interactiva para explorar referencias
- **Componente:** `EntitiesView.tsx`

#### PMV2-4: Visualización Estructurada del Caso
- **Ruta:** `/estructura`
- **Funcionalidad:** Vista jerárquica para comprensión rápida del contenido
- **Características:**
  - Árbol de estructura del documento
  - 5 secciones principales con subsecciones
  - Navegación entre secciones
  - Resumen visual de contenido
  - Indicadores de progreso por sección
- **Componente:** `StructuredView.tsx`

#### PMV2-5: Resaltado de Normas y Artículos
- **Ruta:** `/normas`
- **Funcionalidad:** Destaque de referencias legales para búsqueda rápida
- **Características:**
  - Identificación automática de artículos y códigos aplicables
  - Clasificación por relevancia (crítica, media)
  - Texto completo del artículo con contexto
  - Contador de menciones en el documento
  - Enlaces a jurisprudencia relacionada
  - Leyenda de relevancia visual
- **Componente:** `LegalNotesView.tsx`

## 🎨 Diseño de Interfaz y UX

### Paleta de Colores (Tema Judicial)
```css
:root {
  --primary: #164e63;        /* Cyan oscuro - confianza, autoridad */
  --secondary: #0f766e;      /* Teal - estabilidad, profesionalismo */
  --background: #ffffff;     /* Blanco - claridad, pureza */
  --muted: #f0f4f8;          /* Gris claro - neutralidad */
  --destructive: #be123c;    /* Rojo - alertas, acciones críticas */
  --border: #e2e8f0;         /* Gris borde - separación sutil */
}
```

### Componentes UI Principales
- **Navbar:** Navegación sticky con logo (Scale icon) y enlaces
- **Cards:** Diseño con sombras sutiles y bordes redondeados
- **Botones:** Estados hover, disabled, con iconos Lucide
- **Tablas:** Diseño profesional con headers iconográficos
- **Formularios:** Validación visual y feedback
- **Notificaciones:** React Hot Toast para feedback inmediato

### Principios de Usabilidad Implementados
- **Visibilidad del Estado del Sistema:** Indicadores de progreso en 3 pasos
- **Consistencia y Estándares:** Patrones UI uniformes en toda la app
- **Prevención de Errores:** Validaciones antes de submit, confirmaciones
- **Reconocimiento vs Recuerdo:** Labels claros, navegación intuitiva
- **Flexibilidad y Eficiencia:** Búsqueda en tiempo real, edición inline

## 🔄 Flujo de Trabajo Completo

### 1. Inicio de la Aplicación
```
Usuario accede → Next.js carga layout → Navbar renderiza → Página home muestra opciones
```

### 2. Carga de Documento
```
Usuario selecciona "Subir" → Página upload carga → Selecciona PDF → Validación → Upload → Análisis IA → Resultados → Redirección a consulta
```

### 3. Consulta y Gestión
```
Usuario selecciona "Consultar" → Página carga documentos → Búsqueda filtra → Tabla muestra resultados → Acciones CRUD disponibles
```

### 4. Operaciones CRUD
```
Usuario edita → Modal abre → Formulario carga datos → Usuario modifica → Submit → API call → Actualización BD → Notificación éxito
```

## ⚡ Características Técnicas

### Validaciones Implementadas
- **Archivo:** Solo PDFs, límite 10MB, validación de tipo MIME
- **API:** Endpoints RESTful con Axios, interceptores para errores
- **Formulario:** Validación en tiempo real, estados de carga
- **Usuario:** Confirmaciones para acciones destructivas

### Performance y Optimización
- **Bundle:** Next.js optimizado con Turbopack
- **Carga Inicial:** App Router para carga eficiente
- **Estado:** React hooks para gestión de estado local
- **API Calls:** Axios con timeout de 30 segundos

### Manejo de Errores
- **Frontend:** Try/catch en hooks, estados de error
- **UI:** Mensajes de error específicos, estados visuales
- **Recuperación:** Opción de reintentar operaciones fallidas

## 🚦 Estado del Proyecto

**✅ PMV1: Funcionalidades Base Implementadas:**
- ✅ Arquitectura Next.js completa con TypeScript
- ✅ Carga y análisis de PDFs con IA integrada
- ✅ CRUD completo de documentos
- ✅ Sistema de búsqueda y filtrado
- ✅ Interfaz moderna y responsive
- ✅ Tema judicial profesional
- ✅ Validaciones y manejo de errores
- ✅ Notificaciones y feedback de usuario

**✅ PMV2: Análisis Avanzado (Mockups Visuales):**
- ✅ PMV2-1: Clasificación Automática
- ✅ PMV2-2: Interfaz Moderna y Usable
- ✅ PMV2-3: Extracción de Entidades Jurídicas
- ✅ PMV2-4: Visualización Estructurada del Caso
- ✅ PMV2-5: Resaltado de Normas y Artículos
- ✅ Navbar con dropdown para acceso a PMV2
- ✅ 5 nuevas rutas en la aplicación

**🔮 Mejoras Futuras:**
- 📊 Dashboard con estadísticas
- 🔐 Sistema de autenticación
- 📈 Analytics de uso
- 🌐 API pública documentada
- 📱 Aplicación móvil nativa
- 🚀 Implementación del backend para PMV2

## 💻 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo con Turbopack
npm run build        # Construye la aplicación para producción
npm run start        # Inicia servidor de producción
npm run lint         # Ejecuta linting con Biome
npm run format       # Formatea código con Biome
```

## 🔗 Integración con Backend

### Endpoints Consumidos (PMV1)
- `POST /analyze_pdf` - Análisis de documentos PDF
- `GET /documents/` - Lista de documentos
- `GET /documents/{id}` - Documento específico
- `PUT /documents/{id}` - Actualizar documento
- `DELETE /documents/{id}` - Eliminar documento
- `GET /documents/download/{id}` - Descargar PDF

### Endpoints Futuros (PMV2)
Los mockups de PMV2 actualmente son solo visuales. Los siguientes endpoints se implementarán en el backend:
- `POST /classify` - Clasificación automática de documentos
- `POST /extract_entities` - Extracción de entidades jurídicas
- `POST /parse_structure` - Análisis de estructura del documento
- `POST /extract_legal_norms` - Extracción de normas y artículos
- `GET /legal_references/{article}` - Obtener referencias jurisprudenciales

### Comunicación
- **Protocolo:** HTTP/HTTPS con JSON
- **Autenticación:** No implementada (desarrollo local)
- **CORS:** Configurado para localhost:3000
- **Errores:** Manejo consistente con códigos HTTP

## 📚 Documentación Adicional

- **README.md:** Descripción general y guía de instalación
- **documentation/project_analysis.md:** Análisis técnico completo
- **documentation/actividad1.md:** Evaluación Kanban y código
- **documentation/actividad2.md:** Usabilidad y accesibilidad
- **documentation/actividad3.md:** Integración ML

## 🎯 Casos de Uso

- **Profesionales del Derecho:** Gestión centralizada de expedientes
- **Tribunales:** Análisis rápido de documentos judiciales
- **Estudiantes de Derecho:** Investigación de jurisprudencia
- **Investigadores Jurídicos:** Análisis de patrones en sentencias

---

**Última Actualización:** Noviembre 6, 2025  
**Versión:** 2.0.0 (PMV2 agregado)  
**Estado:** Producción con Mockups Visuales (PMV1 funcional, PMV2 visual)</content>
<parameter name="filePath">e:\LEO\judicial-app-frontend\project_structure.md