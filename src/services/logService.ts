const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/v1`;

interface ErrorReport {
  message: string;
  context?: Record<string, string>;
}

/**
 * Fire-and-forget error reporting to the backend.
 * Never throws — logging failures must not break the app.
 */
function send(entry: ErrorReport) {
  fetch(`${API_BASE}/errors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(entry),
  }).catch(() => {
    // Silently ignore — nothing we can do if logging itself fails
  });
}

export const logService = {
  error(message: string, context?: Record<string, string>) {
    console.error(`[SR] ${message}`, context ?? '');
    send({ message, context });
  },
};
