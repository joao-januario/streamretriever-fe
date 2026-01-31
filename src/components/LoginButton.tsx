'use client';

import { authService } from '@/services/authService';
import { Button } from '@/components/ui/Button';

export default function LoginButton() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-5">
      <h1 className="text-4xl font-bold">Stream Retriever</h1>
      <p className="text-lg">Login with your Twitch account to continue</p>
      <Button onClick={() => authService.login()} variant="primary" size="lg">
        Login with Twitch
      </Button>
    </div>
  );
}
