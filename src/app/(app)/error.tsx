'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { logService } from '@/services/logService';
import styles from './error.module.css';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logService.error('Unhandled error', {
      error: error.message,
      stack: error.stack ?? '',
      ...(error.digest && { digest: error.digest }),
    });
  }, [error.message, error.digest]);

  return (
    <div className={styles.wrapper}>
      <Card className={styles.card}>
        <h2 className={styles.title}>Something went wrong</h2>
        <p className={styles.message}>
          {error.message || 'An unexpected error occurred.'}
        </p>
        <Button onClick={reset} variant="secondary">
          Try Again
        </Button>
      </Card>
    </div>
  );
}
