import { Card } from '@/components/ui/Card';
import styles from '@/styles/page.module.css';

export default function DashboardPage() {
  return (
    <div className={styles.wrapper}>
      <Card className={styles.outerCard}>
        <Card variant="header" className={styles.headerCard}>
          <h1 className={styles.title}>Home</h1>
        </Card>
        <div className={styles.content}>
          <Card variant="inner">
            <h2 className={styles.sectionTitle}>Welcome to Stream Retriever</h2>
            <p className={styles.mutedText}>
              Your streaming toolkit, all in one place.
            </p>
          </Card>
        </div>
      </Card>
    </div>
  );
}
