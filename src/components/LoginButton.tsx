'use client';

import { authService } from '@/services/authService';

export default function LoginButton() {

  const handleLogin = () => {
    console.log('LoginButton - Starting OAuth login');
    authService.login();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-5">
      <h1 className="text-4xl font-bold">🎮 TwitchMixer</h1>
      <p className="text-lg">Login with your Twitch account to continue</p>
      <button
        onClick={handleLogin}
        className="px-6 py-3 text-white bg-purple-600 rounded hover:bg-purple-700 transition"
      >
        Login with Twitch
      </button>
    </div>
  );
}
