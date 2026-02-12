'use client';

import { useState, useEffect } from 'react';
import { Element, CreateChatElementRequest, UpdateChatElementRequest } from '@/types/element';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import styles from './ChatElementSettings.module.css';

interface ChatElementSettingsProps {
  element: Element | null;
  isNew: boolean;
  onSave: (data: CreateChatElementRequest | UpdateChatElementRequest) => void;
  onDelete: () => void;
  onCancel: () => void;
}

const DEFAULTS = {
  name: '',
  fontFamily: 'Open Sans',
  fontSize: 16,
  fontWeight: 'normal',
  fontColor: '#ffffff',
  strokeEnabled: false,
  strokeColor: '#000000',
  strokeSize: 1,
  shadowEnabled: false,
  shadowColor: '#000000',
  shadowSize: 2,
  backgroundColor: '#000000',
  backgroundOpacity: 0,
};

export function ChatElementSettings({ element, isNew, onSave, onDelete, onCancel }: ChatElementSettingsProps) {
  const [name, setName] = useState(DEFAULTS.name);
  const [fontFamily, setFontFamily] = useState(DEFAULTS.fontFamily);
  const [fontSize, setFontSize] = useState(DEFAULTS.fontSize);
  const [fontWeight, setFontWeight] = useState(DEFAULTS.fontWeight);
  const [fontColor, setFontColor] = useState(DEFAULTS.fontColor);
  const [strokeEnabled, setStrokeEnabled] = useState(DEFAULTS.strokeEnabled);
  const [strokeColor, setStrokeColor] = useState(DEFAULTS.strokeColor);
  const [strokeSize, setStrokeSize] = useState(DEFAULTS.strokeSize);
  const [shadowEnabled, setShadowEnabled] = useState(DEFAULTS.shadowEnabled);
  const [shadowColor, setShadowColor] = useState(DEFAULTS.shadowColor);
  const [shadowSize, setShadowSize] = useState(DEFAULTS.shadowSize);
  const [backgroundColor, setBackgroundColor] = useState(DEFAULTS.backgroundColor);
  const [backgroundOpacity, setBackgroundOpacity] = useState(DEFAULTS.backgroundOpacity);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (element?.elementChat) {
      const chat = element.elementChat;
      setName(element.name);
      setFontFamily(chat.fontFamily);
      setFontSize(chat.fontSize);
      setFontWeight(chat.fontWeight);
      setFontColor(chat.fontColor);
      setStrokeEnabled(chat.strokeEnabled);
      setStrokeColor(chat.strokeColor);
      setStrokeSize(chat.strokeSize);
      setShadowEnabled(chat.shadowEnabled);
      setShadowColor(chat.shadowColor ?? '#000000');
      setShadowSize(chat.shadowSize ?? 2);
      setBackgroundColor(chat.backgroundColor ?? '#000000');
      setBackgroundOpacity(chat.backgroundOpacity ?? 0);
    } else if (isNew) {
      setName(DEFAULTS.name);
      setFontFamily(DEFAULTS.fontFamily);
      setFontSize(DEFAULTS.fontSize);
      setFontWeight(DEFAULTS.fontWeight);
      setFontColor(DEFAULTS.fontColor);
      setStrokeEnabled(DEFAULTS.strokeEnabled);
      setStrokeColor(DEFAULTS.strokeColor);
      setStrokeSize(DEFAULTS.strokeSize);
      setShadowEnabled(DEFAULTS.shadowEnabled);
      setShadowColor(DEFAULTS.shadowColor);
      setShadowSize(DEFAULTS.shadowSize);
      setBackgroundColor(DEFAULTS.backgroundColor);
      setBackgroundOpacity(DEFAULTS.backgroundOpacity);
    }
    setShowDeleteConfirm(false);
  }, [element, isNew]);

  function handleSave() {
    if (isNew) {
      const data: CreateChatElementRequest = { name };
      onSave(data);
    } else {
      const data: UpdateChatElementRequest = {
        fontFamily,
        fontSize,
        fontWeight,
        fontColor,
        strokeEnabled,
        strokeColor,
        strokeSize,
        shadowEnabled,
        shadowColor,
        shadowSize,
        backgroundColor: backgroundOpacity > 0 ? backgroundColor : undefined,
        backgroundOpacity: backgroundOpacity > 0 ? backgroundOpacity : undefined,
      };
      onSave(data);
    }
  }

  const previewStyle: React.CSSProperties = {
    fontFamily,
    fontSize: `${fontSize}px`,
    fontWeight,
    color: fontColor,
    textShadow: shadowEnabled ? `${shadowSize}px ${shadowSize}px ${shadowSize}px ${shadowColor}` : undefined,
    WebkitTextStroke: strokeEnabled ? `${strokeSize}px ${strokeColor}` : undefined,
    backgroundColor: backgroundOpacity > 0 ? `${backgroundColor}${Math.round(backgroundOpacity * 255).toString(16).padStart(2, '0')}` : 'transparent',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
  };

  return (
    <Card variant="inner" className={styles.panel}>
      <h3 className={styles.panelTitle}>{isNew ? 'Create Chat Element' : 'Edit Settings'}</h3>

      {/* Live Preview — only when editing */}
      {!isNew && (
        <div className={styles.previewArea}>
          <span className={styles.previewLabel}>Preview</span>
          <div className={styles.previewBox}>
            <span style={previewStyle}>Hello, World!</span>
          </div>
        </div>
      )}

      <div className={styles.form}>
        {/* Name */}
        {isNew && (
          <label className={styles.field}>
            <span className={styles.label}>Name</span>
            <input
              type="text"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Chat Element"
            />
          </label>
        )}

        {/* Style settings only shown when editing an existing element */}
        {!isNew && <>
        {/* Font Family */}
        <label className={styles.field}>
          <span className={styles.label}>Font Family</span>
          <select className={styles.select} value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
            <option value="Open Sans">Open Sans</option>
            <option value="Roboto">Roboto</option>
          </select>
        </label>

        {/* Font Size & Weight */}
        <div className={styles.row}>
          <label className={styles.field}>
            <span className={styles.label}>Font Size</span>
            <input
              type="number"
              className={styles.input}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              min={8}
              max={72}
            />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Font Weight</span>
            <select className={styles.select} value={fontWeight} onChange={(e) => setFontWeight(e.target.value)}>
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
            </select>
          </label>
        </div>

        {/* Font Color */}
        <label className={styles.field}>
          <span className={styles.label}>Font Color</span>
          <div className={styles.colorRow}>
            <input
              type="color"
              className={styles.colorInput}
              value={fontColor}
              onChange={(e) => setFontColor(e.target.value)}
            />
            <input
              type="text"
              className={styles.input}
              value={fontColor}
              onChange={(e) => setFontColor(e.target.value)}
            />
          </div>
        </label>

        {/* Stroke */}
        <fieldset className={styles.section}>
          <legend className={styles.sectionTitle}>
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={strokeEnabled}
                onChange={(e) => setStrokeEnabled(e.target.checked)}
              />
              <span>Stroke</span>
            </label>
          </legend>
          <div className={styles.row}>
            <label className={styles.field}>
              <span className={styles.label}>Color</span>
              <input
                type="color"
                className={styles.colorInput}
                value={strokeColor}
                onChange={(e) => setStrokeColor(e.target.value)}
                disabled={!strokeEnabled}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>Size</span>
              <input
                type="number"
                className={styles.input}
                value={strokeSize}
                onChange={(e) => setStrokeSize(Number(e.target.value))}
                min={1}
                max={10}
                disabled={!strokeEnabled}
              />
            </label>
          </div>
        </fieldset>

        {/* Shadow */}
        <fieldset className={styles.section}>
          <legend className={styles.sectionTitle}>
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={shadowEnabled}
                onChange={(e) => setShadowEnabled(e.target.checked)}
              />
              <span>Shadow</span>
            </label>
          </legend>
          <div className={styles.row}>
            <label className={styles.field}>
              <span className={styles.label}>Color</span>
              <input
                type="color"
                className={styles.colorInput}
                value={shadowColor}
                onChange={(e) => setShadowColor(e.target.value)}
                disabled={!shadowEnabled}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>Size</span>
              <input
                type="number"
                className={styles.input}
                value={shadowSize}
                onChange={(e) => setShadowSize(Number(e.target.value))}
                min={1}
                max={20}
                disabled={!shadowEnabled}
              />
            </label>
          </div>
        </fieldset>

        {/* Background */}
        <fieldset className={styles.section}>
          <legend className={styles.sectionTitle}>Background</legend>
          <div className={styles.row}>
            <label className={styles.field}>
              <span className={styles.label}>Color</span>
              <input
                type="color"
                className={styles.colorInput}
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>Opacity</span>
              <div className={styles.rangeRow}>
                <input
                  type="range"
                  className={styles.range}
                  value={backgroundOpacity}
                  onChange={(e) => setBackgroundOpacity(Number(e.target.value))}
                  min={0}
                  max={1}
                  step={0.1}
                />
                <span className={styles.rangeValue}>{backgroundOpacity.toFixed(1)}</span>
              </div>
            </label>
          </div>
        </fieldset>
        </>}
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <Button onClick={handleSave} disabled={isNew && !name.trim()}>
          {isNew ? 'Create' : 'Save'}
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        {!isNew && (
          showDeleteConfirm ? (
            <div className={styles.deleteConfirm}>
              <span className={styles.deleteText}>Delete this element?</span>
              <Button variant="danger" size="sm" onClick={onDelete}>
                Confirm
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setShowDeleteConfirm(false)}>
                No
              </Button>
            </div>
          ) : (
            <Button variant="danger" onClick={() => setShowDeleteConfirm(true)}>
              Delete
            </Button>
          )
        )}
      </div>
    </Card>
  );
}
