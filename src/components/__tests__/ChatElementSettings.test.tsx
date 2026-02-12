import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChatElementSettings } from '../ChatElementSettings';
import { Element } from '@/types/element';

const mockElement: Element = {
  id: 1,
  name: 'Chat',
  elementType: 'CHAT',
  elementChat: {
    id: 1,
    fontFamily: 'Open Sans',
    fontSize: 24,
    fontWeight: 'bold',
    fontColor: '#ff0000',
    strokeEnabled: true,
    strokeColor: '#000000',
    strokeSize: 1,
    shadowEnabled: true,
    shadowColor: '#000000',
    shadowSize: 4,
    backgroundColor: null,
    backgroundOpacity: null,
    extraSettings: null,
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

      expect(screen.getByLabelText('Size')).toBeInTheDocument();
      expect(screen.getByLabelText('Font')).toBeInTheDocument();
      expect(screen.getByLabelText('Stroke')).toBeInTheDocument();
      expect(screen.getByLabelText('Shadow')).toBeInTheDocument();
      expect(screen.getByText('Bold')).toBeInTheDocument();
      expect(screen.getByLabelText('Font Color')).toBeInTheDocument();
    });

    it('should show "Create" button when no element exists', () => {
      renderSettings({ element: null });

      expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
    });

    it('should show "Update" button when element exists', () => {
      renderSettings({ element: mockElement });

      expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument();
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

      expect(screen.getByText(/GoldenViewer/)).toBeInTheDocument();
      expect(screen.getByText(/YourModerator/)).toBeInTheDocument();
      expect(screen.getByText(/LaughingAndy/)).toBeInTheDocument();
      expect(screen.getByText(/CatVibes420/)).toBeInTheDocument();
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

      expect(screen.getByLabelText('Size')).toHaveValue('Medium');
      expect(screen.getByLabelText('Font')).toHaveValue('Roboto');
      expect(screen.getByLabelText('Stroke')).toHaveValue('Off');
      expect(screen.getByLabelText('Shadow')).toHaveValue('Off');
    });
  });

  describe('loading from element', () => {
    it('should populate controls from existing element', () => {
      renderSettings({ element: mockElement });

      expect(screen.getByLabelText('Size')).toHaveValue('Large');
      expect(screen.getByLabelText('Font')).toHaveValue('Open Sans');
      expect(screen.getByLabelText('Stroke')).toHaveValue('Thin');
      expect(screen.getByLabelText('Shadow')).toHaveValue('Medium');
    });
  });

  describe('save', () => {
    it('should call onSave with current settings when clicking Create', async () => {
      const onSave = vi.fn().mockResolvedValue(undefined);
      renderSettings({ element: null, onSave });

      fireEvent.click(screen.getByRole('button', { name: 'Create' }));

      await waitFor(() => {
        expect(onSave).toHaveBeenCalledWith(
          expect.objectContaining({
            fontFamily: 'Roboto',
            fontSize: 18,
            fontWeight: 'normal',
            fontColor: '#ffffff',
            strokeEnabled: false,
            shadowEnabled: false,
          })
        );
      });
    });

    it('should call onSave with modified settings', async () => {
      const onSave = vi.fn().mockResolvedValue(undefined);
      renderSettings({ element: null, onSave });

      fireEvent.change(screen.getByLabelText('Size'), { target: { value: 'Large' } });
      fireEvent.change(screen.getByLabelText('Stroke'), { target: { value: 'Thin' } });
      fireEvent.click(screen.getByRole('button', { name: 'Create' }));

      await waitFor(() => {
        expect(onSave).toHaveBeenCalledWith(
          expect.objectContaining({
            fontSize: 24,
            strokeEnabled: true,
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

      fireEvent.click(screen.getByRole('button', { name: 'Create' }));

      expect(screen.getByRole('button', { name: /Saving/ })).toBeDisabled();

      resolveSave!();

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Create' })).toBeEnabled();
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
