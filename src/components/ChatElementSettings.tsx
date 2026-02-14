'use client';

import { useState, useEffect } from 'react';
import { Element, UpdateChatElementRequest } from '@/types/element';
import { Button } from '@/components/ui/Button';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { logService } from '@/services/logService';
import { useChatPreview } from '@/hooks/useChatPreview';
import { EMOTE_MAP, BADGE_MAP } from '@/data/chatPreviewMessages';
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
  Small:  { enabled: true,  size: 1 },
  Medium: { enabled: true,  size: 2 },
  Large:  { enabled: true,  size: 4 },
};

const BG_COLORS = [
  { value: 'transparent', label: 'None' },
  { value: 'rgba(0, 0, 0, 0.5)', label: 'Black' },
  { value: 'rgba(220, 38, 38, 0.2)', label: 'Red' },
  { value: 'rgba(37, 99, 235, 0.2)', label: 'Blue' },
  { value: 'rgba(22, 163, 74, 0.2)', label: 'Green' },
  { value: 'rgba(147, 51, 234, 0.2)', label: 'Purple' },
  { value: 'rgba(255, 0, 128, 0.2)', label: 'Pink' },
  { value: 'rgba(234, 210, 30, 0.2)', label: 'Yellow' },
];

const DEFAULT_PREVIEW_BG = '#1e1840';

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
  if (s <= 1.5) return 'Small';
  if (s <= 3) return 'Medium';
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
  const [previewBg, setPreviewBg] = useState(DEFAULT_PREVIEW_BG);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Placeholder settings — hideCommands, fadeEnabled/fadeTime not yet wired to backend
  const [caps, setCaps] = useState(false);
  const [hideCommands, setHideCommands] = useState(false);
  const [hideBadges, setHideBadges] = useState(false);
  const [hideBots, setHideBots] = useState(true);
  const [fadeEnabled, setFadeEnabled] = useState(false);
  const [fadeTime, setFadeTime] = useState('30');
  const [chatBg, setChatBg] = useState('transparent');

  const previewMessages = useChatPreview();

  useEffect(() => {
    if (element?.elementChat) {
      const chat = element.elementChat;
      setSize(sizeToPreset(chat.fontSize));
      setFontFamily(chat.fontFamily);
      setFontColor(chat.fontColor);
      setBold(chat.fontWeight === 'bold');
      setStroke(strokeToPreset(chat.strokeEnabled, chat.strokeSize));
      setShadow(shadowToPreset(chat.shadowEnabled, chat.shadowSize));
      setChatBg(chat.backgroundColor ?? 'transparent');
    } else {
      setSize('Medium');
      setFontFamily('Roboto');
      setFontColor('#ffffff');
      setBold(false);
      setStroke('Off');
      setShadow('Off');
      setChatBg('transparent');
    }
    setShowDeleteConfirm(false);
  }, [element]);

  async function handleSave() {
    setIsSaving(true);
    setSaveError(null);
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
        ...(chatBg !== 'transparent' && {
          backgroundColor: chatBg,
          backgroundOpacity: 1,
        }),
      };
      await onSave(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      const stack = err instanceof Error ? (err.stack ?? '') : '';
      logService.error('Chat element save failed', { error: message, stack });
      setSaveError(`Failed to save: ${message}`);
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
    textTransform: caps ? 'uppercase' : undefined,
  };

  return (
    <>
      {/* ── Page header: CTA left, delete right ── */}
      <div className={styles.pageHeader}>
        <div className={styles.headerActions}>
          <Button
            size="lg"
            className={styles.actionButton}
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Saving\u2026' : element ? 'Update Settings' : 'Create Element'}
          </Button>
          {saveError && <p className={styles.errorMessage}>{saveError}</p>}
        </div>
        <div>
          {element && !showDeleteConfirm && (
            <Button variant="danger" size="sm" onClick={() => setShowDeleteConfirm(true)}>
              Delete
            </Button>
          )}
          {element && showDeleteConfirm && (
            <div className={styles.deleteConfirm}>
              <span className={styles.deleteText}>Delete?</span>
              <Button variant="danger" size="sm" onClick={handleDelete}>
                Yes
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setShowDeleteConfirm(false)}>
                No
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* ── Content area ── */}
      <div className={styles.content}>
        <div className={styles.layout}>
          {/* ── Settings area ── */}
          <div className={styles.settingsArea}>
            {/* Typography */}
            <div className={styles.sectionCard}>
              <h3 className={styles.sectionTitle}>Typography</h3>
              <div className={styles.fieldGroup}>
                <div className={styles.fieldRow}>
                  <label className={styles.field}>
                    <span className={styles.label}>Font</span>
                    <select
                      className={styles.select}
                      value={fontFamily}
                      onChange={(e) => setFontFamily(e.target.value)}
                    >
                      <option value="Open Sans">Open Sans</option>
                      <option value="Roboto">Roboto</option>
                    </select>
                  </label>
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
                </div>
                <SegmentedControl
                  label="Size"
                  options={Object.keys(SIZE_MAP)}
                  value={size}
                  onChange={setSize}
                />
                <div className={styles.toggleRow}>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={bold}
                      onChange={(e) => setBold(e.target.checked)}
                    />
                    <span>Bold</span>
                  </label>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={caps}
                      onChange={(e) => setCaps(e.target.checked)}
                    />
                    <span>All Caps</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Effects */}
            <div className={styles.sectionCard}>
              <h3 className={styles.sectionTitle}>Effects</h3>
              <div className={styles.fieldGroup}>
                <SegmentedControl
                  label="Stroke"
                  options={Object.keys(STROKE_MAP)}
                  value={stroke}
                  onChange={setStroke}
                />
                <SegmentedControl
                  label="Shadow"
                  options={Object.keys(SHADOW_MAP)}
                  value={shadow}
                  onChange={setShadow}
                />
              </div>
              <div className={styles.fieldGroup}>
                <div className={styles.field}>
                  <span className={styles.label}>Chat Background</span>
                  <div className={styles.swatchGrid}>
                    {BG_COLORS.map(({ value, label }) => (
                      <button
                        key={value}
                        type="button"
                        className={`${styles.bgSwatch} ${value === 'transparent' ? styles.bgSwatchTransparent : ''} ${chatBg === value ? styles.bgSwatchActive : ''}`}
                        style={value !== 'transparent' ? { backgroundColor: value } : undefined}
                        onClick={() => setChatBg(value)}
                        title={label}
                        aria-label={label}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Behavior */}
            <div className={styles.sectionCard}>
              <h3 className={styles.sectionTitle}>Behavior</h3>
              <div className={styles.fieldGroup}>
                <div className={styles.toggleGrid}>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={hideCommands}
                      onChange={(e) => setHideCommands(e.target.checked)}
                    />
                    <span>Hide Commands</span>
                  </label>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={hideBadges}
                      onChange={(e) => setHideBadges(e.target.checked)}
                    />
                    <span>Hide Badges</span>
                  </label>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={hideBots}
                      onChange={(e) => setHideBots(e.target.checked)}
                    />
                    <span>Hide Bots</span>
                  </label>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={fadeEnabled}
                      onChange={(e) => setFadeEnabled(e.target.checked)}
                    />
                    <span>Fade Messages</span>
                    {fadeEnabled && (
                      <>
                        <input
                          type="number"
                          className={styles.fadeTimeInput}
                          value={fadeTime}
                          onChange={(e) => setFadeTime(e.target.value)}
                          min="30"
                          max="600"
                        />
                        <span className={styles.fadeTimeLabel}>seconds</span>
                      </>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* ── Preview column ── */}
          <div className={styles.previewColumn}>
            <div className={styles.previewArea}>
              <div className={styles.previewBox} style={{ backgroundColor: previewBg }}>
                <div className={styles.previewControls}>
                  <input
                    type="color"
                    className={styles.previewBgPicker}
                    value={previewBg}
                    onChange={(e) => setPreviewBg(e.target.value)}
                    title="Preview background color"
                  />
                  <button
                    type="button"
                    className={styles.previewBgReset}
                    onClick={() => setPreviewBg(DEFAULT_PREVIEW_BG)}
                    title="Reset to card background"
                  >
                    ↺
                  </button>
                </div>
                <div
                  className={styles.previewContent}
                  style={{ backgroundColor: chatBg }}
                >
                  <div className={styles.messagesInner}>
                    {previewMessages
                      .filter(msg => !hideBots || !msg.isBot)
                      .map(msg => (
                        <div key={msg.key} className={styles.chatLine} style={textStyle}>
                          {!hideBadges && msg.badges && msg.badges.length > 0 && (
                            <span className={styles.badgeGroup}>
                              {msg.badges.map((badge, i) => (
                                <img
                                  key={i}
                                  className={styles.badge}
                                  src={BADGE_MAP[badge]}
                                  alt={badge === 'mod' ? 'Moderator' : 'Subscriber'}
                                  draggable={false}
                                />
                              ))}
                            </span>
                          )}
                          <span className={styles.previewUsername} style={{ color: msg.color }}>
                            {msg.user}
                          </span>
                          <span style={{ color: fontColor }}>
                            {`: ${msg.text}${msg.emotes && msg.emotes.length > 0 ? ' ' : ''}`}
                          </span>
                          {msg.emotes?.map((emote, i) => (
                            <img
                              key={i}
                              className={styles.emote}
                              src={EMOTE_MAP[emote]}
                              alt={emote}
                              draggable={false}
                            />
                          ))}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
