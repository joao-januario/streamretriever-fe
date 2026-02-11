import { Card } from '@/components/ui/Card';
import styles from '@/styles/page.module.css';

export default function ChatPage() {
  return (
    <div className={styles.wrapper}>
      <Card className={styles.outerCard}>
        <Card variant="header" className={styles.headerCard}>
          <h1 className={styles.title}>Chat</h1>
        </Card>
        <div className={styles.content}>
          <Card variant="inner">
            <h2 className={styles.sectionTitle}>Coming Soon</h2>
            <p className={styles.mutedText}>
              Chat source management is currently in development.
            </p>
          </Card>
        </div>
      </Card>
    </div>
  );
}
