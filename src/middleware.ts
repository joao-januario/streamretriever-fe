import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname === '/';
  const isAuthCallback = request.nextUrl.pathname === '/auth/callback';
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');
  const hasTokenCookie = request.cookies.has('jwt_token');

  // Always allow auth callback to pass through
  if (isAuthCallback) {
    return NextResponse.next();
  }

  // If accessing dashboard without token cookie, redirect to login
  if (isDashboard && !hasTokenCookie) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If accessing login page with token cookie, redirect to dashboard
  if (isLoginPage && hasTokenCookie) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/auth/callback', '/dashboard/:path*'],
};
