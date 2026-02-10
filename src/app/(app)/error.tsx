'use client';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-6 h-full flex items-center justify-center">
      <Card className="max-w-md w-full text-center">
        <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
        <p className="text-sm text-[var(--text-muted)] mb-4">
          {error.message || 'An unexpected error occurred.'}
        </p>
        <Button onClick={reset} variant="secondary">
          Try Again
        </Button>
      </Card>
    </div>
  );
}
