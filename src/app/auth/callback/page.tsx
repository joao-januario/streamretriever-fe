import { Suspense } from 'react';
import AuthCallback from '@/components/AuthCallback';

export default function CallbackPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <AuthCallback />
    </Suspense>
  );
}
