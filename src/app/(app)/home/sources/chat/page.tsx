'use client';

import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { ChatElementSettings } from '@/components/ChatElementSettings';
import { useElements } from '@/hooks/useElements';
import { apiService } from '@/services/apiService';
import { UpdateChatElementRequest } from '@/types/element';
import styles from '@/styles/page.module.css';
import chatStyles from './chat.module.css';

export default function ChatPage() {
  const { elements, isLoading, updateElement, deleteElement, refetch } = useElements();
  const element = elements[0] ?? null;

  async function handleSave(data: UpdateChatElementRequest) {
    if (element) {
      await updateElement(element.id, data);
    } else {
      // Create the element first, then update its chat settings in one flow.
      // We call the API directly (not the hook's createElement) to avoid
      // a mid-operation mutate() that would re-render and reset form state.
      const created = await apiService.createChatElement({ name: 'Chat' });
      try {
        await apiService.updateChatElement(created.id, data);
      } finally {
        // Always refresh SWR cache so the UI reflects the new element
        await refetch();
      }
    }
  }

  async function handleDelete() {
    if (element) {
      await deleteElement(element.id);
    }
  }

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <Card className={styles.outerCard}>
          <Card variant="header" className={styles.headerCard}>
            <h1 className={styles.title}>Chat</h1>
          </Card>
          <div className={chatStyles.loadingArea}>
            <Spinner />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <Card className={styles.outerCard}>
        <Card variant="header" className={styles.headerCard}>
          <h1 className={styles.title}>Chat</h1>
        </Card>
        <div className={styles.content}>
          <ChatElementSettings
            element={element}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        </div>
      </Card>
    </div>
  );
}
