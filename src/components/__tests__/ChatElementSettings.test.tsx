import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { ChatElementSettings } from '../ChatElementSettings';
import { Element } from '@/types/element';

vi.mock('@/hooks/useChatPreview', () => ({
  useChatPreview: () => [
    { key: 1, user: 'TestViewer', color: '#e6a817', text: 'hello world' },
    { key: 2, user: 'TestMod', color: '#b565e0', text: 'welcome', badges: ['mod', 'sub'], emotes: ['KEKW'] },
    { key: 3, user: 'TestSub', color: '#00ad03', text: 'lets go', badges: ['sub'] },
    { key: 4, user: 'TestBot', color: '#aaaaaa', text: 'bot response', isBot: true },
  ],
}));

const mockElement: Element = {
  id: 1,
  name: 'Chat',
  elementType: 'CHAT',
  elementChat: {
    id: 1,
    fontSizePreset: 'LARGE',
    fontSizeCustom: null,
    strokePreset: 'THIN',
    strokeCustom: null,
    shadowPreset: 'LARGE',
    shadowCustom: null,
    backgroundPreset: 'NONE',
    backgroundCustom: null,
    fontFamily: 'Open Sans',
    fontColor: '#ff0000',
    fontWeight: 'bold',
    strokeColor: '#000000',
    shadowColor: '#000000',
    allCaps: false,
    hideCommands: false,
    hideBadges: false,
    hideBots: false,
    fadeEnabled: false,
    fadeTime: 30,
    createdAt: '2024-01-01T00:00:00',
    updatedAt: '2024-01-01T00:00:00',
  },
  createdAt: '2024-01-01T00:00:00',
  updatedAt: '2024-01-01T00:00:00',
};

describe('ChatElementSettings', () => {
  const defaultProps = {
    element: null as Element | null,
    onSave: vi.fn().mockResolvedValue(undefined),
    onDelete: vi.fn(),
  };

  function renderSettings(props = {}) {
    return render(<ChatElementSettings {...defaultProps} {...props} />);
  }

  describe('rendering', () => {
    it('should render all setting controls', () => {
      renderSettings();

      // Typography
      expect(screen.getByLabelText('Font')).toBeInTheDocument();
      expect(screen.getByRole('radiogroup', { name: 'Size' })).toBeInTheDocument();
      expect(screen.getByText('Font Color')).toBeInTheDocument();
      expect(screen.getByText('Bold')).toBeInTheDocument();
      expect(screen.getByText('All Caps')).toBeInTheDocument();

      // Effects (includes chat background)
      expect(screen.getByRole('radiogroup', { name: 'Stroke' })).toBeInTheDocument();
      expect(screen.getByRole('radiogroup', { name: 'Shadow' })).toBeInTheDocument();
      expect(screen.getByText('Chat Background')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'None' })).toBeInTheDocument();

      // Behavior
      expect(screen.getByText('Hide Commands')).toBeInTheDocument();
      expect(screen.getByText('Hide Badges')).toBeInTheDocument();
      expect(screen.getByText('Hide Bots')).toBeInTheDocument();
      expect(screen.getByText('Fade Messages')).toBeInTheDocument();
    });

    it('should show "Create Element" button when no element exists', () => {
      renderSettings({ element: null });

      expect(screen.getByRole('button', { name: 'Create Element' })).toBeInTheDocument();
    });

    it('should show "Update Settings" button when element exists', () => {
      renderSettings({ element: mockElement });

      expect(screen.getByRole('button', { name: 'Update Settings' })).toBeInTheDocument();
    });

    it('should show delete button only when element exists', () => {
      const { rerender } = render(
        <ChatElementSettings {...defaultProps} element={null} />
      );

      expect(screen.queryByRole('button', { name: 'Delete' })).not.toBeInTheDocument();

      rerender(<ChatElementSettings {...defaultProps} element={mockElement} />);

      expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
    });

    it('should render preview messages', () => {
      renderSettings();

      expect(screen.getByText(/TestViewer/)).toBeInTheDocument();
      expect(screen.getByText(/TestMod/)).toBeInTheDocument();
      expect(screen.getByText(/TestSub/)).toBeInTheDocument();
    });

    it('should render badge images', () => {
      renderSettings();

      expect(screen.getAllByAltText('Subscriber').length).toBeGreaterThan(0);
      expect(screen.getAllByAltText('Moderator').length).toBeGreaterThan(0);
    });
  });

  describe('defaults', () => {
    it('should initialize with default values when no element', () => {
      renderSettings({ element: null });

      const sizeGroup = screen.getByRole('radiogroup', { name: 'Size' });
      const strokeGroup = screen.getByRole('radiogroup', { name: 'Stroke' });
      const shadowGroup = screen.getByRole('radiogroup', { name: 'Shadow' });

      expect(screen.getByLabelText('Font')).toHaveValue('Roboto');
      expect(within(sizeGroup).getByRole('radio', { name: 'Medium' })).toHaveAttribute('aria-checked', 'true');
      expect(within(strokeGroup).getByRole('radio', { name: 'Off' })).toHaveAttribute('aria-checked', 'true');
      expect(within(shadowGroup).getByRole('radio', { name: 'Off' })).toHaveAttribute('aria-checked', 'true');

      // Hide Bots defaults to on
      expect(screen.getByRole('checkbox', { name: 'Hide Bots' })).toBeChecked();
    });
  });

  describe('loading from element', () => {
    it('should populate controls from existing element', () => {
      renderSettings({ element: mockElement });

      const sizeGroup = screen.getByRole('radiogroup', { name: 'Size' });
      const strokeGroup = screen.getByRole('radiogroup', { name: 'Stroke' });
      const shadowGroup = screen.getByRole('radiogroup', { name: 'Shadow' });

      expect(within(sizeGroup).getByRole('radio', { name: 'Large' })).toHaveAttribute('aria-checked', 'true');
      expect(screen.getByLabelText('Font')).toHaveValue('Open Sans');
      expect(within(strokeGroup).getByRole('radio', { name: 'Thin' })).toHaveAttribute('aria-checked', 'true');
      expect(within(shadowGroup).getByRole('radio', { name: 'Large' })).toHaveAttribute('aria-checked', 'true');
    });
  });

  describe('save', () => {
    it('should call onSave with current settings when clicking Create Element', async () => {
      const onSave = vi.fn().mockResolvedValue(undefined);
      renderSettings({ element: null, onSave });

      fireEvent.click(screen.getByRole('button', { name: 'Create Element' }));

      await waitFor(() => {
        expect(onSave).toHaveBeenCalledWith(
          expect.objectContaining({
            fontFamily: 'Roboto',
            fontSizePreset: 'MEDIUM',
            fontWeight: 'normal',
            fontColor: '#ffffff',
            strokePreset: 'OFF',
            shadowPreset: 'OFF',
          })
        );
      });
    });

    it('should call onSave with modified settings', async () => {
      const onSave = vi.fn().mockResolvedValue(undefined);
      renderSettings({ element: null, onSave });

      const sizeGroup = screen.getByRole('radiogroup', { name: 'Size' });
      const strokeGroup = screen.getByRole('radiogroup', { name: 'Stroke' });

      fireEvent.click(within(sizeGroup).getByRole('radio', { name: 'Large' }));
      fireEvent.click(within(strokeGroup).getByRole('radio', { name: 'Thin' }));
      fireEvent.click(screen.getByRole('button', { name: 'Create Element' }));

      await waitFor(() => {
        expect(onSave).toHaveBeenCalledWith(
          expect.objectContaining({
            fontSizePreset: 'LARGE',
            strokePreset: 'THIN',
          })
        );
      });
    });

    it('should show saving state during save', async () => {
      let resolveSave: () => void;
      const onSave = vi.fn().mockImplementation(
        () => new Promise<void>((resolve) => { resolveSave = resolve; })
      );
      renderSettings({ element: null, onSave });

      fireEvent.click(screen.getByRole('button', { name: 'Create Element' }));

      expect(screen.getByRole('button', { name: /Saving/ })).toBeDisabled();

      resolveSave!();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Create Element' })).toBeEnabled();
      });
    });
  });

  describe('delete', () => {
    it('should show confirmation before deleting', () => {
      renderSettings({ element: mockElement });

      fireEvent.click(screen.getByRole('button', { name: 'Delete' }));

      expect(screen.getByText('Delete?')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument();
    });

    it('should call onDelete when confirming', () => {
      const onDelete = vi.fn();
      renderSettings({ element: mockElement, onDelete });

      fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
      fireEvent.click(screen.getByRole('button', { name: 'Yes' }));

      expect(onDelete).toHaveBeenCalled();
    });

    it('should cancel delete when clicking No', () => {
      renderSettings({ element: mockElement });

      fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
      fireEvent.click(screen.getByRole('button', { name: 'No' }));

      expect(screen.queryByText('Delete?')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
    });
  });
});
