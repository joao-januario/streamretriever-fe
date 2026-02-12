'use client';

import { useState, useEffect } from 'react';
import { Element, UpdateChatElementRequest } from '@/types/element';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import styles from './ChatElementSettings.module.css';

interface ChatElementSettingsProps {
  element: Element | null;
  onSave: (data: UpdateChatElementRequest) => Promise<void>;
  onDelete: () => void;
}

/* ── Preset maps ── */

const SIZE_MAP: Record<string, number> = { Small: 14, Medium: 18, Large: 24 };

const STROKE_MAP: Record<string, { enabled: boolean; size: number }> = {
  Off:    { enabled: false, size: 0 },
  Thin:   { enabled: true,  size: 0.9 },
  Medium: { enabled: true,  size: 1.3 },
  Thick:  { enabled: true,  size: 2 },
};

const SHADOW_MAP: Record<string, { enabled: boolean; size: number }> = {
  Off:    { enabled: false, size: 0 },
  Small:  { enabled: true,  size: 2 },
  Medium: { enabled: true,  size: 4 },
  Large:  { enabled: true,  size: 6 },
};

/* ── Reverse lookups ── */

function sizeToPreset(fontSize: number): string {
  let closest = 'Medium';
  let minDiff = Infinity;
  for (const [name, px] of Object.entries(SIZE_MAP)) {
    const diff = Math.abs(px - fontSize);
    if (diff < minDiff) { minDiff = diff; closest = name; }
  }
  return closest;
}

function strokeToPreset(enabled: boolean, size: number): string {
  if (!enabled) return 'Off';
  if (size <= 1) return 'Thin';
  if (size <= 2) return 'Medium';
  return 'Thick';
}

function shadowToPreset(enabled: boolean, size: number | null): string {
  if (!enabled) return 'Off';
  const s = size ?? 0;
  if (s <= 2) return 'Small';
  if (s <= 4) return 'Medium';
  return 'Large';
}

/* ── Component ── */

export function ChatElementSettings({ element, onSave, onDelete }: ChatElementSettingsProps) {
  const [size, setSize] = useState('Medium');
  const [fontFamily, setFontFamily] = useState('Open Sans');
  const [fontColor, setFontColor] = useState('#ffffff');
  const [bold, setBold] = useState(false);
  const [stroke, setStroke] = useState('Off');
  const [shadow, setShadow] = useState('Off');
  const [previewBg, setPreviewBg] = useState('#1e1840');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (element?.elementChat) {
      const chat = element.elementChat;
      setSize(sizeToPreset(chat.fontSize));
      setFontFamily(chat.fontFamily);
      setFontColor(chat.fontColor);
      setBold(chat.fontWeight === 'bold');
      setStroke(strokeToPreset(chat.strokeEnabled, chat.strokeSize));
      setShadow(shadowToPreset(chat.shadowEnabled, chat.shadowSize));
    } else {
      setSize('Medium');
      setFontFamily('Roboto');
      setFontColor('#ffffff');
      setBold(false);
      setStroke('Off');
      setShadow('Off');
    }
    setShowDeleteConfirm(false);
  }, [element]);

  async function handleSave() {
    setIsSaving(true);
    try {
      const strokeVal = STROKE_MAP[stroke];
      const shadowVal = SHADOW_MAP[shadow];
      const data: UpdateChatElementRequest = {
        fontFamily,
        fontSize: SIZE_MAP[size],
        fontWeight: bold ? 'bold' : 'normal',
        fontColor,
        strokeEnabled: strokeVal.enabled,
        strokeColor: '#000000',
        strokeSize: strokeVal.size,
        shadowEnabled: shadowVal.enabled,
        shadowColor: '#000000',
        shadowSize: shadowVal.size,
      };
      await onSave(data);
    } finally {
      setIsSaving(false);
    }
  }

  function handleDelete() {
    setShowDeleteConfirm(false);
    onDelete();
  }

  // Preview computed styles
  const strokeVal = STROKE_MAP[stroke];
  const shadowVal = SHADOW_MAP[shadow];
  const previewFontSize = SIZE_MAP[size];

  // Build text-shadow: circular outline (no blur) + soft outer pass for anti-aliasing
  const shadows: string[] = [];
  if (strokeVal.enabled) {
    const s = strokeVal.size;
    const STEPS = 20;
    for (let i = 0; i < STEPS; i++) {
      const angle = (2 * Math.PI * i) / STEPS;
      const x = (Math.cos(angle) * s).toFixed(2);
      const y = (Math.sin(angle) * s).toFixed(2);
      shadows.push(`${x}px ${y}px 0 #000`);
    }
    // soft outer glow for smoother anti-aliased edge
    shadows.push(`0 0 ${s * 0.75}px #000`);
  }
  if (shadowVal.enabled) {
    shadows.push(`${shadowVal.size}px ${shadowVal.size}px ${shadowVal.size * 1.5}px #000000`);
  }

  const textStyle: React.CSSProperties = {
    fontFamily,
    fontSize: `${previewFontSize}px`,
    fontWeight: bold ? 'bold' : 'normal',
    textShadow: shadows.length > 0 ? shadows.join(', ') : undefined,
  };

  return (
    <Card variant="inner" className={styles.panel}>
      {/* Primary action */}
      <div className={styles.topAction}>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving\u2026' : element ? 'Update' : 'Create'}
        </Button>
      </div>

      {/* Settings grid */}
      <div className={styles.settingsGrid}>
        <label className={styles.field}>
          <span className={styles.label}>Size</span>
          <select className={styles.select} value={size} onChange={(e) => setSize(e.target.value)}>
            {Object.keys(SIZE_MAP).map((key) => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Stroke</span>
          <select className={styles.select} value={stroke} onChange={(e) => setStroke(e.target.value)}>
            {Object.keys(STROKE_MAP).map((key) => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Font</span>
          <select className={styles.select} value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
            <option value="Open Sans">Open Sans</option>
            <option value="Roboto">Roboto</option>
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Shadow</span>
          <select className={styles.select} value={shadow} onChange={(e) => setShadow(e.target.value)}>
            {Object.keys(SHADOW_MAP).map((key) => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </label>

        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={bold}
            onChange={(e) => setBold(e.target.checked)}
          />
          <span>Bold</span>
        </label>
      </div>

      {/* Font color */}
      <label className={styles.field}>
        <span className={styles.label}>Font Color</span>
        <div className={styles.colorRow}>
          <input
            type="color"
            className={styles.colorSwatch}
            value={fontColor}
            onChange={(e) => setFontColor(e.target.value)}
          />
          <input
            type="text"
            className={styles.colorHex}
            value={fontColor}
            onChange={(e) => setFontColor(e.target.value)}
          />
        </div>
      </label>

      {/* Preview */}
      <div className={styles.previewArea}>
        <div className={styles.previewHeader}>
          <span>Preview</span>
          <input
            type="color"
            className={styles.previewBgPicker}
            value={previewBg}
            onChange={(e) => setPreviewBg(e.target.value)}
            title="Preview background color"
          />
        </div>
        <div className={styles.previewBox} style={{ backgroundColor: previewBg }}>
          {/* Message 1: text only, no emotes */}
          <div className={styles.chatLine}>
            <span style={textStyle}>
              <span className={styles.previewUsername} style={{ color: '#e6a817' }}>GoldenViewer</span>
              <span style={{ color: fontColor }}>{': gg wp that was insane'}</span>
            </span>
          </div>

          {/* Message 2: badges + KEKW */}
          <div className={styles.chatLine}>
            <span className={styles.badgeGroup}>
              <img className={styles.badge} src="/emotes/badge-subscriber.png" alt="Subscriber" draggable={false} />
              <img className={styles.badge} src="/emotes/badge-moderator.png" alt="Moderator" draggable={false} />
            </span>
            <span style={textStyle}>
              <span className={styles.previewUsername} style={{ color: '#b565e0' }}>YourModerator</span>
              <span style={{ color: fontColor }}>{': Nice stream! '}</span>
            </span>
            <img className={styles.emote} src="/emotes/kekw.png" alt="KEKW" draggable={false} />
          </div>

          {/* Message 3: PepeLaugh animated */}
          <div className={styles.chatLine}>
            <span className={styles.badgeGroup}>
              <img className={styles.badge} src="/emotes/badge-subscriber.png" alt="Subscriber" draggable={false} />
            </span>
            <span style={textStyle}>
              <span className={styles.previewUsername} style={{ color: '#00ad03' }}>LaughingAndy</span>
              <span style={{ color: fontColor }}>{': no way '}</span>
            </span>
            <img className={styles.emote} src="/emotes/pepelaugh.gif" alt="PepeLaugh" draggable={false} />
          </div>

          {/* Message 4: PartyKirby spam */}
          <div className={styles.chatLine}>
            <span style={textStyle}>
              <span className={styles.previewUsername} style={{ color: '#1e90ff' }}>CatVibes420</span>
              <span style={{ color: fontColor }}>{': '}</span>
            </span>
            {Array.from({ length: 12 }, (_, i) => (
              <img key={i} className={styles.emote} src="/emotes/catjam.gif" alt="catJAM" draggable={false} />
            ))}
          </div>
        </div>
      </div>

      {/* Delete action */}
      {element && (
        <div className={styles.actions}>
          {showDeleteConfirm ? (
            <div className={styles.deleteConfirm}>
              <span className={styles.deleteText}>Delete?</span>
              <Button variant="danger" size="sm" onClick={handleDelete}>
                Yes
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setShowDeleteConfirm(false)}>
                No
              </Button>
            </div>
          ) : (
            <Button variant="danger" onClick={() => setShowDeleteConfirm(true)}>
              Delete
            </Button>
          )}
        </div>
      )}
    </Card>
  );
}
