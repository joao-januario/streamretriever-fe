const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const authService = {
  login(): void {
    window.location.href = `${API_BASE}/oauth2/authorization/twitch`;
  },

  async logout(): Promise<void> {
    try {
      await fetch(`${API_BASE}/v1/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      window.location.href = '/';
    }
  }
};
