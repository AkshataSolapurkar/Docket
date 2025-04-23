// src/app/(auth)/register/page.tsx
'use client';

import { SignUpForm } from '@/components/auth/SignupForm';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Create an Account</h1>
        <p className="text-gray-600 mt-2">Sign up to start taking notes</p>
      </div>
      <SignUpForm />
      <div className="text-center mt-6">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-orange-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}