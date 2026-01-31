import { Suspense } from 'react';
import AuthCallback from '@/components/AuthCallback';
import { Spinner } from '@/components/ui/Spinner';

export default function CallbackPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><Spinner size="lg" /></div>}>
      <AuthCallback />
    </Suspense>
  );
}
