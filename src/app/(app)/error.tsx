'use client';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import styles from './error.module.css';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
