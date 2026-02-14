import { useState, useEffect, useRef } from 'react';
import { PREVIEW_MESSAGES, PreviewMessage } from '@/data/chatPreviewMessages';

export interface ActiveMessage extends PreviewMessage {
  key: number;
}

/**
 * Feeds random preview messages into a capped queue.
 * - Seeds with 12 messages instantly
 * - Adds one new message every ~1.5–3.5 s (randomised for natural feel)
 * - Avoids picking a message whose user+text is already present
 * - Drops oldest messages beyond maxVisible (off-screen cleanup)
 */
export function useChatPreview(maxVisible = 100): ActiveMessage[] {
  const [messages, setMessages] = useState<ActiveMessage[]>([]);
  const keyRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    // Seed with initial messages
    const seed: ActiveMessage[] = [];
    const used = new Set<number>();
    const seedCount = Math.min(22, PREVIEW_MESSAGES.length);

    for (let i = 0; i < seedCount; i++) {
      let idx: number;
      do {
        idx = Math.floor(Math.random() * PREVIEW_MESSAGES.length);
      } while (used.has(idx));
      used.add(idx);
      seed.push({ ...PREVIEW_MESSAGES[idx], key: keyRef.current++ });
    }
    setMessages(seed);

    function scheduleNext() {
      const delay = 1500 + Math.random() * 2000;
      timeoutRef.current = setTimeout(() => {
        setMessages(prev => {
          const visible = new Set(prev.map(m => `${m.user}\0${m.text}`));
          const available = PREVIEW_MESSAGES.filter(
            m => !visible.has(`${m.user}\0${m.text}`),
          );
          const pool = available.length > 0 ? available : PREVIEW_MESSAGES;
          const pick = pool[Math.floor(Math.random() * pool.length)];
          const next = [...prev, { ...pick, key: keyRef.current++ }];
          return next.length > maxVisible
            ? next.slice(next.length - maxVisible)
            : next;
        });
        scheduleNext();
      }, delay);
    }

    scheduleNext();

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [maxVisible]);

  return messages;
}
