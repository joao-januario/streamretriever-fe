'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { ChatElementList } from '@/components/ChatElementList';
import { ChatElementSettings } from '@/components/ChatElementSettings';
import { useElements } from '@/hooks/useElements';
import { Element, CreateChatElementRequest, UpdateChatElementRequest } from '@/types/element';
import styles from '@/styles/page.module.css';
import chatStyles from './chat.module.css';

export default function ChatPage() {
  const { elements, isLoading, createElement, updateElement, deleteElement } = useElements();
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  function handleSelect(element: Element) {
    setIsCreating(false);
    setSelectedElement(element);
  }

  function handleCreate() {
    setSelectedElement(null);
    setIsCreating(true);
  }

  function handleCancel() {
    setSelectedElement(null);
    setIsCreating(false);
  }

  async function handleSave(data: CreateChatElementRequest | UpdateChatElementRequest) {
    if (isCreating) {
      const created = await createElement(data as CreateChatElementRequest);
      setIsCreating(false);
      setSelectedElement(created);
    } else if (selectedElement) {
      await updateElement(selectedElement.id, data as UpdateChatElementRequest);
      // Refresh the selected element from the updated list
      const updated = elements.find((e) => e.id === selectedElement.id);
      if (updated) setSelectedElement(updated);
    }
  }

  async function handleDelete() {
    if (selectedElement) {
      await deleteElement(selectedElement.id);
      setSelectedElement(null);
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
          <ChatElementList
            elements={elements}
            selectedId={selectedElement?.id ?? null}
            onSelect={handleSelect}
            onCreate={handleCreate}
          />
          {(selectedElement || isCreating) && (
            <ChatElementSettings
              element={selectedElement}
              isNew={isCreating}
              onSave={handleSave}
              onDelete={handleDelete}
              onCancel={handleCancel}
            />
          )}
        </div>
      </Card>
    </div>
  );
}
