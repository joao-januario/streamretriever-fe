'use client';

import { authService } from '@/services/authService';
import { Button } from '@/components/ui/Button';
import styles from './LoginButton.module.css';

export default function LoginButton() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Stream Retriever</h1>
      <p className={styles.subtitle}>Login with your Twitch account to continue</p>
      <Button onClick={() => authService.login()} variant="primary" size="lg">
        Login with Twitch
      </Button>
    </div>
  );
}
