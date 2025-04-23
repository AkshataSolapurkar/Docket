// src/app/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold mb-6">Welcome to Notes App</h1>
        <p className="text-xl mb-8">A beautiful and functional note-taking application</p>
        <div className="flex gap-4 justify-center">
          <Link href="/login" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Login
          </Link>
          <Link href="/register" className="bg-white hover:bg-gray-100 text-orange-500 border border-orange-500 px-6 py-3 rounded-lg font-medium transition-colors">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}