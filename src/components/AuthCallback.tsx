'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get('error');

    if (error) {
      console.error('AuthCallback - Authentication failed:', error);
      router.push('/?error=auth_failed');
      return;
    }

    // Backend has already set HttpOnly cookie during OAuth callback!
    // No need to extract or store token manually
    console.log('AuthCallback - Login successful, cookie set by backend');
    console.log('AuthCallback - Redirecting to dashboard');

    // Redirect to dashboard
    router.push('/dashboard');
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Authenticating...</p>
    </div>
  );
}
