// src/app/auth/callback/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import supabase from '@/lib/supabase'

export default function OAuthCallback() {
  const router = useRouter()

  useEffect(() => {
    // Session has already been detected & stored by the client.
    // We can double-check it and then send the user on.
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error || !session) {
        console.error('No session after OAuth callback', error)
        return
      }
      router.replace('/dashboard')
    })
  }, [router])

  return <p className="p-4 text-center">Signing you in…</p>
}
