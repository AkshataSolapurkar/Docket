// src/app/(auth)/login/page.tsx
'use client';

import { SignInForm } from '@/components/auth/SinginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="w-full max-w-md p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-gray-600 mt-2">Sign in to access your notes</p>
      </div>
      <SignInForm />
      <div className="text-center mt-6">
        <p className="text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-orange-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}