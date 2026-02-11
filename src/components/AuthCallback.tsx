'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Spinner } from '@/components/ui/Spinner';
import styles from './AuthCallback.module.css';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get('error');

    if (error) {
      router.push('/?error=auth_failed');
      return;
    }

    router.push('/home');
  }, [searchParams, router]);

  return (
    <div className={styles.wrapper}>
      <Spinner size="lg" />
    </div>
  );
}
