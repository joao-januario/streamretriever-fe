'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { useUser } from '@/hooks/useUser';
import { authService } from '@/services/authService';
import styles from './DashboardContent.module.css';

export default function DashboardContent() {
  const { user, isLoading, error, refetch } = useUser();

  if (isLoading) {
    return (
      <div className={styles.loadingWrapper}>
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorWrapper}>
        <Card>
          <p className={styles.errorText}>Error: {error}</p>
          <Button onClick={() => refetch()} variant="secondary" size="sm">
            Retry
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Card className={styles.outerCard}>
        <Card variant="header" className={styles.headerCard}>
          <h1 className={styles.pageTitle}>Settings</h1>
        </Card>

        <div className={styles.content}>
          {user && (
            <>
              <div className={styles.grid}>
                <Card variant="inner">
                  <div className={styles.profileRow}>
                    {user.profileImageUrl && (
                      <Image
                        src={user.profileImageUrl}
                        alt="Profile"
                        width={80}
                        height={80}
                        className={styles.profileImage}
                      />
                    )}
                    <div>
                      <h2 className={styles.profileName}>{user.username}</h2>
                      <p className={styles.profileEmail}>
                        {user.email}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card variant="inner">
                  <h3 className={styles.detailsTitle}>Account Details</h3>
                  <div className={styles.detailsList}>
                    <div className={styles.detailsRow}>
                      <span>Account ID</span>
                      <span className={styles.detailsValue}>{user.accountId}</span>
                    </div>
                    <div className={styles.detailsRow}>
                      <span>Email</span>
                      <span className={styles.detailsValue}>{user.email}</span>
                    </div>
                    <div className={styles.detailsRow}>
                      <span>Username</span>
                      <span className={styles.detailsValue}>{user.username}</span>
                    </div>
                  </div>
                </Card>
              </div>

              <div className={styles.actions}>
                <Button onClick={() => refetch()} variant="secondary">
                  Refresh Data
                </Button>
                <Button onClick={() => authService.logout()} variant="danger">
                  Logout
                </Button>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
