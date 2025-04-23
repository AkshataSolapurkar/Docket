// src/providers/AppProvider.tsx
'use client';

import { AuthProvider } from '@/context/AuthContext';
import { QueryProvider } from '@/providers/QuearyProvider'
import { Toaster } from 'sonner';

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <QueryProvider>
        {children}
        <Toaster />
      </QueryProvider>
    </AuthProvider>
  );
}
