'use client';

import { Element } from '@/types/element';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import styles from './ChatElementList.module.css';

interface ChatElementListProps {
  elements: Element[];
  selectedId: number | null;
  onSelect: (element: Element) => void;
  onCreate: () => void;
}

export function ChatElementList({ elements, selectedId, onSelect, onCreate }: ChatElementListProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Your Elements</h2>
        <Button size="sm" onClick={onCreate}>
          + Create New
        </Button>
      </div>

      {elements.length === 0 ? (
        <Card variant="inner" className={styles.emptyState}>
          <p className={styles.emptyText}>No chat elements yet. Create one to get started.</p>
        </Card>
      ) : (
        <div className={styles.grid}>
          {elements.map((element) => (
            <button
              key={element.id}
              className={`${styles.elementCard} ${selectedId === element.id ? styles.selected : ''}`}
              onClick={() => onSelect(element)}
            >
              <div
                className={styles.preview}
                style={{
                  fontFamily: element.elementChat?.fontFamily ?? 'Open Sans',
                  fontSize: `${Math.min(element.elementChat?.fontSize ?? 16, 20)}px`,
                  fontWeight: element.elementChat?.fontWeight ?? 'normal',
                  color: element.elementChat?.fontColor ?? '#ffffff',
                }}
              >
                Aa
              </div>
              <span className={styles.elementName}>{element.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
