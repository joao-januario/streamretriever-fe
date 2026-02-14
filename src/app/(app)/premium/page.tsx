import { Card } from '@/components/ui/Card';
import styles from '@/styles/page.module.css';

export default function PremiumPage() {
  return (
    <div className={styles.wrapper}>
      <Card className={styles.outerCard}>
        <Card variant="header" className={styles.headerCard}>
          <h1 className={styles.title}>Premium</h1>
        </Card>
        <div className={styles.content}>
          <Card variant="inner">
            <h2 className={styles.sectionTitle}>Coming Soon</h2>
            <p className={styles.mutedText}>
              Premium features are currently in development.
            </p>
          </Card>
        </div>
      </Card>
    </div>
  );
}
