'use client';

import { ModernUIView } from "@/components/views/ModernUIView";
import ProtectedRoute from "@/app/components/ProtectedRoute";

export default function AnalizarPage() {
    return (
        <ProtectedRoute>
            <ModernUIView />
        </ProtectedRoute>
    );
}