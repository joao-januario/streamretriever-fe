export interface User {
  accountId: number;
  username: string;
  email: string;
  profileImageUrl: string;
}

export interface AuthResponse {
  token: string;
  expiresAt: number;
}
