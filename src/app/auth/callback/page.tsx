import { Suspense } from 'react';
import AuthCallback from '@/components/AuthCallback';
import { Spinner } from '@/components/ui/Spinner';
import styles from './page.module.css';

export default function CallbackPage() {
  return (
    <Suspense fallback={<div className={styles.wrapper}><Spinner size="lg" /></div>}>
      <AuthCallback />
    </Suspense>
  );
}
